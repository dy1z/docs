---
title: "Build process"
slug: "build-process"
description: "See how the build process works and how Maizzle builds your emails"
---

# Build process

When you run `maizzle build`, your templates go through a series of events that compile them to plain HTML, and apply various, email-specific transformations.

To get a better understanding of how Maizzle builds your emails, here's a step-by-step guide of what's going on under the hood:

## Environment config

A global configuration object is computed by merging your environment config on top of the base `config.js`.

For example, running `maizzle build production` will tell Maizzle to look for `config.production.js` in your project's root and merge it on top of `config.js`.

Otherwise if you're simply running the `maizzle build` or `maizzle serve` commands, only the base `config.js` will be used.

## Compile Tailwind CSS

Tailwind CSS is compiled, using settings from the config determined above. Various [PostCSS](https://postcss.org/) plugins are enabled depending on the build environment and your config.

When you specify a build environment, i.e. `maizzle build production`, PurgeCSS removes any unused classes from the compiled CSS. It scans all your source folders and any other, custom sources that you specify, and removes any unused CSS from the compiled CSS that will be passed to the final template.

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">
    Yes, <code class="shiki-inline">email-comb</code> (which we use in Code Cleanup) can also remove unused CSS. But in order to speed things up it's best to feed it as little CSS as possible.
  </div>
</div>

## Clean destination

The destination directory that you have defined under `build.destination.path` in your environment config is deleted.

## Copy sources

Your source Templates are copied over to the destination directory that you have defined in your `config`. This is so that we can then process them in place.

## beforeCreate()

The [`beforeCreate`](/docs/events/#beforecreate) event is triggered, giving you access to the global configuration object, before Maizzle loops over your Templates to compile them.

## Compile templates

Each Template is parsed and compiled in place, in your destination directory:

1. Maizzle reads the Template file

2. It extracts its Front Matter (FM)

3. A unique Template `config` is computed by merging the Template's Front Matter keys with the Environment `config`
  
4. [`beforeRender`](/docs/events/#beforerender) event is triggered

5. PostHTML renders the template string

    Your Environment name, the compiled Tailwind CSS, and all `config` options (including any you defined in Front Matter) are exposed to all your templating parts as PostHTML expressions that you can use, under the `page` object.

6. [`afterRender`](/docs/events/#afterrender) event is triggered

7. The compiled HTML is now passed on to a series of Transformers. 

  The order of events is exactly as follows, and *they all happen (or not) depending on how you've configured them in your Environment config or in the Template's Front Matter*:

    - escaped characters in `<head>` and `<body>` CSS are replaced with email-safe alternatives
    - [posthtml-content](https://github.com/posthtml/posthtml-content) is used to transform content marked with custom attributes. By default, it looks for any `<style postcss>` tag in the Template. If it finds any, it tries to compile the contents with PostCSS. Useful if you need to use Tailwind CSS inside a style block right in your Template.
    - [posthtml-markdown](https://github.com/OzymandiasTheGreat/posthtml-markdown) is used to compile Markdown
    - [prevent-widows](https://github.com/bashaus/prevent-widows) looks for any `prevent-widows` attribute on any tag. When it finds one, it will replace the last space in your text with a `&nbsp;`.
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
    - [html-minifier](https://www.npmjs.com/package/html-minifier) minifies HTML/CSS, and removes empty attributes
    - strings are replaced based on your [`replaceStrings`](/docs/code-cleanup/#replacestrings) definitions

8. [`afterTransformers`](/docs/events/#aftertransformers) event is triggered

9. The compiled email template is saved at the [configured location](/docs/build-paths/#destination), with the [configured extension](/docs/build-paths/#extension).

    9.1 A plaintext version is output at the same location and with the same name, if `plaintext` is set to `true`

10. Your assets are copied to the destination folder. All files and folders in `build.assets.source` are copied to `build.assets.destination`

## afterBuild()

The [`afterBuild`](/docs/events/#afterbuild) event is triggered (CLI-only).
