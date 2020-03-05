---
title: "Build process"
slug: "build-process"
description: "See how the build process works and how Maizzle builds your emails"
---

# Build process

When you run `maizzle build`, your Nunjucks templates go through a series of events that compile them to plain HTML, and apply various, email-specific transformations.

To get a better understanding of how Maizzle builds your emails, here's a step-by-step guide of what's going on under the hood:

## Environment config

A configuration object is computed by merging your environment config on top of the base `config.js`.

For example, running `maizzle build production` will look for `config.production.js` in your project's root, and merge it on top of `config.js`.

If `config.production.js` is not found, or of you're simply running `maizzle build` or `maizzle serve`, only the base `config.js` will be used.

## Compile Tailwind CSS

Tailwind CSS is compiled, based on the config determined above. Various [PostCSS](https://postcss.org/) plugins are enabled depending on the build environment and your config.

When _not_ developing locally, PurgeCSS is used to remove any unused classes from the compiled CSS. It scans all your layouts/templates/partials/components, and any other, custom sources you specify, and removes any unused classes from the compiled CSS that will be passed to the final template.

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">
    Yes, <code class="shiki-inline">email-comb</code> can also remove unused CSS. But in order to speed things up it's best to feed it as little CSS per Template as possible.
  </div>
</div>

## Copy sources

Your source Templates are copied to the destination directory defined in your `config`. This is so that we can then process them in place.

## beforeCreate()

The [`beforeCreate`](/docs/events/#beforecreate) event is triggered, giving you access to the `config` before Maizzle loops over your Templates to compile them.

## Compile templates

Each Template is parsed and compiled in place, in your destination directory:

1. Maizzle reads the Template file

2. It extracts its Front Matter (FM)

3. A unique Template `config` is computed by merging the Template's Front Matter keys with the Environment `config`
  
4. [`afterConfig`](/docs/events/#afterconfig) event is triggered, giving you access to the Template's `config`

5. The [Nunjucks](https://mozilla.github.io/nunjucks/) templating engine is initialized. This is also where we configure the `{% component %}` custom tag

6. [`beforeRender`](/docs/events/#beforerender) event is triggered

7. Nunjucks renders the template string

    Your Environment name, the compiled Tailwind CSS, and all `config` options (including any you defined in Front Matter) are exposed to all your templating parts as Nunjucks variables that you can use (`page`, `env`, and `css`).

8. [`afterRender`](/docs/events/#afterrender) event is triggered

9. The compiled HTML is now passed on to a series of Transformers. 

  The order of events is exactly as follows, and *they all happen (or not) depending on how you've configured them in your Environment config or in the Template's Front Matter*:

    - escaped characters in `<head>` and `<body>` CSS are replaced with email-safe alternatives
    - [posthtml-content](https://github.com/posthtml/posthtml-content) is used to transform content marked with custom attributes. By default, it looks for any `<style tailwind>` tag in the Template. If it finds any, it tries to compile the contents with Tailwind CSS. Useful if you need to use Tailwind CSS inside a style block right in your Template.
    - [posthtml-markdown](https://github.com/OzymandiasTheGreat/posthtml-markdown) is used to compile Markdown
    - [prevent-widows](https://github.com/bashaus/prevent-widows) looks for any `prevent-widows` attribute on any tag. When it finds one, it will replace the last space in your text with a `&nbsp;`.
    - [Juice](https://github.com/Automattic/juice) inlines CSS
    - [email-comb](https://www.npmjs.com/package/email-comb) removes any unused CSS
    - inline CSS sizes are removed (`width=""` and `height=""` are preserved)
    - inline background colors are removed (`bgcolor=""` is preserved)
    - any extra attributes defined are added to tags
    - `baseImageURL` is prepended to both inline and background image paths
    - append any `urlParameters` to links
    - ensure six digit HEX color codes (see [package](https://www.npmjs.com/package/color-shorthand-hex-to-six-digit))
    - [pretty](https://www.npmjs.com/package/pretty) is used to prettify your code
    - [html-minifier](https://www.npmjs.com/package/html-minifier) minifies HTML/CSS, and removes empty attributes
    - strings are replaced based on your `replaceStrings` definitions

10. [`afterTransformers`](/docs/events/#aftertransformers) event is triggered

11. The compiled email template is saved at the [configured location](/docs/build-paths/#destination), with the [configured extension](/docs/build-paths/#extension).

    9.1 A plaintext version is output at the same location and with the same name, if `plaintext` is set to `true`

12. Your assets are copied to the destination folder. All files and folders in `build.assets.source` are copied to `build.assets.destination`

## afterBuild()

The [`afterBuild`](/docs/events/#afterbuild) event is triggered (CLI-only).
