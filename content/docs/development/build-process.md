---
title: "Build process"
slug: "build-process"
description: "See how the build process works and how Maizzle builds your emails"
---

import Alert from '~/components/Alert.vue'

# Build process

When you run `maizzle build`, your templates go through a series of events that compile them to plain HTML and apply various, email-specific transformations.

To get a better understanding of how Maizzle builds your emails, here's a step-by-step guide of what's going on under the hood:

## Environment config

A global configuration object is computed by merging your environment config on top of the base `config.js`.

For example, running `maizzle build production` will tell Maizzle to look for `config.production.js` at your current location, and merge it on top of `config.js`.

Otherwise, if you're simply running the `maizzle build` or `maizzle serve` commands, only the base `config.js` will be used.

## Compile Tailwind CSS

Tailwind CSS is compiled, and various [PostCSS](https://postcss.org/) plugins are enabled depending on the build environment and your config.

When you specify a build environment, i.e. `maizzle build production`, PurgeCSS removes any unused classes from the compiled CSS. It scans all your source folders and any other, custom sources that you specify, and removes any unused CSS from the compiled CSS that will be passed to the final template.

<alert>Yes, <a href="/docs/code-cleanup/#removeunusedcss"><code>email-comb</code></a> can also remove unused CSS. But in order to speed things up it's best to feed it as little CSS as possible.</alert>

## Clean destination

The destination directories that you have defined under `destination.path` in your environment config are deleted.

<alert type="warning">Be careful when customizing this path, so you don't end up deleting important directories and files on your machine.</alert>

## Copy sources

All of your source Templates are copied over to the `destination.path` directories. 

This is done so that we can then process the files in-place, which makes it easier to preserve your directory structure.

## beforeCreate()

The [`beforeCreate`](/docs/events/#beforecreate) event (CLI-only) is triggered, giving you access to the config before Maizzle loops over your Templates to compile them.

## Compile templates

Each Template is parsed and compiled in-place, in your destination directory:

1. Maizzle reads the Template file

2. It extracts its Front Matter

3. A unique Template `config` is computed by merging the Template's Front Matter keys with the Environment `config`
  
4. [`beforeRender`](/docs/events/#beforerender) event is triggered

5. PostHTML renders the template string

    Your Environment name, the compiled Tailwind CSS, and all `config` options (including any you defined in Front Matter) are exposed to all your templating parts as PostHTML expressions that you can use, under the `page` object.

6. [`afterRender`](/docs/events/#afterrender) event is triggered

7. The compiled HTML is now passed on to a series of Transformers. 

  The order of events is exactly as follows, and *they all happen (or not) depending on how you've configured them in your Environment config or in the Template's Front Matter*:

    - escaped characters in `<head>` and `<body>` CSS classes are replaced with email-safe alternatives
    - [posthtml-content](https://github.com/posthtml/posthtml-content) is used to transform content marked with custom attributes. By default, it looks for any `<style postcss>` tag in the Template. If it finds any, it tries to compile the contents with PostCSS. Useful if you need to use Tailwind CSS inside a style block right in your Template.
    - [posthtml-md2html](https://github.com/posthtml/posthtml-md2html) is used to compile Markdown
    - [prevent-widows](https://github.com/bashaus/prevent-widows) looks for tags containing the `prevent-widows` attribute. When it finds one, it will replace the last space in your text with a `&nbsp;`.
    - [Juice](https://github.com/Automattic/juice) inlines CSS
    - [email-comb](https://www.npmjs.com/package/email-comb) removes any unused CSS
    - attributes are removed based on your config. By default, Maizzle cleans up any empty `style=""` attributes.
    - inline CSS sizes are removed (`width=""` and `height=""` are preserved)
    - inline background colors are removed (`bgcolor=""` is preserved)
    - any [extra attributes](/docs/extra-attributes/) defined are added to tags
    - [`baseImageURL`](/docs/base-image-url/) is prepended to both inline and background image paths
    - [`urlParameters`](/docs/url-parameters/) are added to links
    - ensure six digit HEX color codes (see [package](https://www.npmjs.com/package/color-shorthand-hex-to-six-digit))
    - [pretty](https://www.npmjs.com/package/pretty) is used to prettify your code
    - [html-crush](https://www.npmjs.com/package/html-crush) minifies your email code
    - strings are replaced based on your [`replaceStrings`](/docs/code-cleanup/#replacestrings) definitions

8. [`afterTransformers`](/docs/events/#aftertransformers) event is triggered

9. The compiled email template is saved at the [configured location](/docs/build-config/#path), with the [configured extension](/docs/build-config/#extension).

    9.1 A plaintext version is output at the same location and with the same name, if `plaintext` is set to `true`

10. Your assets are copied to the destination folder. All files and folders in `assets.source` are copied to `assets.destination`

## afterBuild()

The [`afterBuild`](/docs/events/#afterbuild) event is triggered (CLI-only).
