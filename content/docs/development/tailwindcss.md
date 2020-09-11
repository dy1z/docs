---
title: "Tailwind CSS"
slug: "tailwindcss"
description: "Learn how to use Tailwind CSS to create HTML email templates with CSS utility classes"
---

import Alert from '~/components/Alert.vue'

# Tailwind CSS

Maizzle uses the [Tailwind CSS](https://tailwindcss.com) framework, so you can rapidly prototype email templates with utility classes instead of writing inline styles.

For most of the time, you won't be writing CSS anymore 😎

## Workflow

The compiled Tailwind CSS is available under `page.css`, so you should first add it inside a `<style>` tag in your Layout's `<head>`:

```html
<!DOCTYPE html>
<html>
<head>
  <if condition="page.css">
    <style>{{{ page.css }}}</style>
  </if>
</head>
<body>
  <block name="template"></block>
</body>
```

In the example above, we used a [conditional](/docs/tags/#conditionals) to output the `<style>` tag only if `page.css` is truthy (i.e. not an empty string).

You might have noticed that we used `{{{ }}}` instead of the usual `{{ }}`. 

We do this to avoid double-escaping the CSS, which can break the build process when quoted property values are encountered (for example quoted font family names, background image URLs, etc.).

<alert type="warning">In order to use Tailwind CSS, the Layout that you're extending must ouput <code>page.css</code> inside a <code>&lt;style&gt;</code> tag.</alert>

### Utility-first

Next, simply write your HTML markup and add Tailwind classes to elements.

Instead of writing something like this:

```html
<table style="width: 100%;">
  <tr>
    <td style="padding: 24px 0; background-color: #e5e7eb;">
      <h1 style="margin: 0; font-size: 36px; font-family: -apple-system, 'Segoe UI', sans-serif; color: #000000;">Some title</h1>
      <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151;">Content here...</p>
    </td>
  </tr>
</table>
```

You simply write:

```html
<table class="w-full">
  <tr>
    <td class="py-24 px-0 bg-gray-200">
      <h1 class="m-0 text-4xl font-sans text-black">Some title</h1>
      <p class="m-0 text-base leading-24 text-gray-700">Content here...</p>
    </td>
  </tr>
</table>
```

Read more about the concept of utility-first CSS, and familiarize yourself with the syntax, in the [Tailwind CSS docs](https://tailwindcss.com/docs/utility-first).

### Components

If you prefer wasting time with naming your CSS classes or actually need to extract a repeating markup pattern, or maybe you're used to other frameworks such as Bootstrap, you can do that too!

Tailwind supports [extracting components with `@apply`](https://tailwindcss.com/docs/extracting-components#extracting-css-components-with-apply), which means you can define a new class by applying existing utility classes to it.

Here's a quick example:

```css
.button-danger {
  @apply px-24 py-12 text-white bg-red-500;
}
```

Unlike utility classes in `tailwind.config.js`, you'd add that in a CSS file that Maizzle tells Tailwind to compile along with the rest of the CSS.

And that brings us to...

## CSS Files

The [official Maizzle Starter](https://github.com/maizzle/maizzle) uses a `main.css` file stored in `src/assets/css`.

Although optional, this is included in order to provide an example of how you'd use custom CSS components that go beyond the utility-first concept of Tailwind. 

For example, it's common practice with HTML emails to use... [creative CSS selectors](https://howtotarget.email/) to get things working in a certain email client; stuff Tailwind can't do out of the box.

This file does two things:

1. it imports Tailwind CSS components and utilities
2. it imports custom CSS files


`config.js` then contains a reference to this file, which tells Tailwind to load it and compile the CSS based on it:

```js
// config.js
module.exports = {
  build: {
    tailwind: {
      css: 'src/assets/css/main.css',
      config: 'tailwind.config.js'
    }
  }
}
```

As mentioned, this is totally optional: you can use Tailwind CSS in Maizzle without creating any CSS file at all! In this case, Tailwind will only generate components and utilities, based on your `tailwind.config.js`.

### Custom CSS

Add custom CSS files anywhere under `src/assets/css`.

Maizzle adds the following ones in `src/assets/css/custom` :

- `reset.css` - browser and email client CSS resets.

- `utilities.css` - custom utility classes that Tailwind CSS doesn't provide.

<alert type="warning">Files that you <code>@import</code> in <code>main.css</code> must be relative to <code>src/assets/css</code></alert>

## Plugins

To use a Tailwind CSS plugin, simply `npm install` it and follow its instructions to add it to `plugins: []` in your `tailwind.config.js`. 
See the [Tailwind CSS docs](https://tailwindcss.com/docs/configuration#plugins).


## CSS purging

When running `maizzle build [env]`, if `[env]` is not `local`, Maizzle will use [postcss-purgecss](https://github.com/FullHuman/postcss-purgecss) to remove unused classes from the CSS that is being injected into the template currently being rendered.

This is needed so that the CSS inliner and `email-comb` (which run _after_ the purging step) receive as little CSS as possible to parse. 

_It greatly improves build speed._

To make sure the Tailwind CSS classes that you use in your emails are not purged, pass Layouts and any Partial or Component directory paths to the `purgeCSS.content` config key, as an array of file globs:

```js
// config.js
module.exports = {
  purgeCSS: {
    content: [
      'src/layouts/**/*.*',
      'src/partials/**/*.*',
      'src/components/**/*.*'
    ]
  }
}
```

<alert type="warning">Don't pass directory paths here, because PostCSS will fail.</alert>

### Purging strategy

Although it picks up [`purge`](https://tailwindcss.com/docs/controlling-file-size#removing-unused-css) options in your `tailwind.config.js` (like `content` or `extractor`), Maizzle doesn't actually use Tailwind's CSS purging functionality. 

Instead, a custom CSS purging strategy is used.

This is mainly required in order to respect the build environment and enable purging based on it, and especially so that we can purge sources that you wouldn't be able to define in `tailwind.config.js`.

These are the default content sources used for CSS purging in Maizzle:

```js
const purgeSources = [
  'src/layouts/**/*.*',
  'src/partials/**/*.*',
  'src/components/**/*.*',
  ...templateSources, // paths from `build.templates.source` in your config.js
  ...tailwindSources, // purge paths from your tailwind.config.js 
  ...extraPurgeSources, // paths you define in `purgeCSS.content` in your config.js
  {raw: html} // only used when compiling with the render() method
]
```

## Shorthand CSS

<alert>This section refers to CSS inside <code>&lt;style&gt;</code> tags. For <em>inline</em> CSS shorthand, see the CSS inlining <g-link to="/docs/css-inlining/#mergelonghand">docs</g-link>.</alert>

Maizzle uses [postcss-merge-longhand](https://github.com/cssnano/cssnano/tree/master/packages/postcss-merge-longhand) to rewrite your CSS `padding`, `margin`, and `border` properties in shorthand-form, when possible.

Because utility classes map one-to-one with CSS properties, this normally doesn't have any effect with Tailwind CSS. However, it's useful when you extract utilities to components, with Tailwind's `@apply`.

Consider this template:

```html
<extends src="src/layouts/master.html">
  <block name="template">
    <div class="col">test</div>
  </block>
</extends>
```

Let's use `@apply` to compose a `col` class by  extracting two padding utilities: 

```css
/* src/assets/css/custom/components.css */

.col {
  @apply py-8 px-4;
}
```

When building with inlining enabled, normally that would yield:

```html
<div style="padding-top: 8px; padding-bottom: 8px; padding-left: 4px; padding-right: 4px;">test</div>
```

However, Maizzle will merge those with [`postcss-merge-longhand`](https://www.npmjs.com/package/postcss-merge-longhand), so we get this:

```html
<div style="padding: 8px 4px;">test</div>
```

This results in smaller HTML size, reducing the risk of [Gmail clipping your email](https://github.com/hteumeuleu/email-bugs/issues/41).

Using shorthand CSS for these is well supported in email clients and will make your HTML lighter, but the shorthand border is particularly useful because it's the only way Outlook will render it properly.

<alert>For shorthand CSS to work with <code>padding</code> or <code>margin</code>, you need to specify property values for all four sides. For borders, keep reading.</alert>

### Shorthand borders

To get shorthand-form CSS borders, you need to specify all these:

- border-width
- border-style
- border-color

With Tailwind's `@apply`, that means you can do something like this:

```css
.my-border {
  @apply border border-solid border-blue-500;
}
```

... which will turn this:

```html
<div class="my-border">Border example</div>
```

... into this:

```html
<div style="border: 1px solid #3f83f8;">Border example</div>
```

## Use in Template

You can use Tailwind CSS, including directives like `@apply`, `@responsive`, and even nested syntax, right inside a template.
You simply need to use a `<block>` to push a `<style postcss>` tag to the Layout being extended.

First, add a `<block name="head">` inside your Layout's `<head>` tag:

```html
<!DOCTYPE html>
<html>
<head>
  <if condition="page.css">
    <style>{{{ page.css }}}</style>
  </if>
  <block name="head"></block>
</head>
<body>
  <block name="template"></block>
</body>
```

Next, use that block in a Template:

```html
<extends src="src/layouts/master.html">
  <block name="head">
    <style postcss>
      a {
        @apply text-blue-500;
      }
      @screen sm {
        table { 
          @apply w-full;
        }
      }
    </style>
  </block>

  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

[posthtml-content](https://github.com/posthtml/posthtml-content) is used to parse the contents of any `<style>` tag that has a `postcss` attribute - the contents are compiled with PostCSS.

<alert>The <code>postcss</code> attribute is only required if you want the CSS to be compiled with PostCSS - for example, when using Tailwind CSS syntax. If you're just writing regular CSS syntax, you don't need to include this attribute.</alert>

### Prevent inlining

When adding a `<style>` tag inside a Template, you can prevent all rules inside it from being inlined by using a `data-embed` attribute:

```html
<extends src="src/layouts/master.html">
  <block name="head">
    <style postcss data-embed>
      /* This rule will not be inlined */
      img {
        border: 0;
        @apply leading-full align-middle;
      }
    </style>
  </block>

  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

<alert>Although it won't be inlined, the CSS will still be processed by <a href="/docs/code-cleanup/#removeunusedcss">email-comb</a>.</alert>
