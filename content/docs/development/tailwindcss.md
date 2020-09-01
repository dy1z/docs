---
title: "Tailwind CSS"
slug: "tailwindcss"
description: "Learn how to use Tailwind CSS to create HTML email templates with CSS utility classes"
---

import Alert from '~/components/Alert.vue'

# Tailwind CSS

Maizzle uses the [Tailwind CSS](https://tailwindcss.com) framework, so you can rapidly prototype email templates with utility classes instead of having to write inline styles.

For most of the time, you won't be writing CSS anymore 😎

## Structure

CSS files are typically stored in `src/assets/css`, and are imported in `main.css`.

### main.css

The `src/assets/css/main.css` file imports Tailwind's utilities and components, and our custom, email-specific resets, components, and utilities.

This is the file that Maizzle looks for when compiling Tailwind CSS, and you can configure where it lives and how it's named:

```js
// config.js
module.exports = {
  build: {
    tailwind: {
      css: 'src/assets/css/main.css',
      // ...
    }
  }
}
```

### Custom CSS Files

Add custom CSS files anywhere under `src/assets/css`.

Maizzle adds the following ones in `src/assets/css/custom` :

- `reset.css` - browser and email client CSS resets.

- `utilities.css` - custom utility classes that Tailwind CSS doesn't provide.

<alert type="warning">Files that you <code>@import</code> in <code>main.css</code> must be relative to <code>src/assets/css</code></alert>

### Plugins

To use a Tailwind CSS plugin, simply `npm install` it and follow its instructions to add it to `plugins: []` in your `tailwind.config.js`. 
See the [Tailwind docs](https://tailwindcss.com/docs/configuration#plugins).


## CSS purging

When running `maizzle build [env]`, if `[env]` is not equal to `local`, Maizzle will use [postcss-purgecss](https://github.com/FullHuman/postcss-purgecss) to remove unused classes from the CSS that is being injected into the template currently being rendered.

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

## Shorthand CSS

<alert>This section refers to CSS inside <code>&lt;style&gt;</code> tags. For <em>inline</em> CSS shorthand, see the CSS inlining <g-link to="/docs/css-inlining/#mergelonghand">docs</g-link>.</alert>

Maizzle uses [postcss-merge-longhand](https://github.com/cssnano/cssnano/tree/master/packages/postcss-merge-longhand) to rewrite your CSS `padding`, `margin`, and `border` properties in shorthand-form, when possible.

Because utility classes map one-to-one with CSS properties, this normally doesn't have any effect with Tailwind CSS. However, it's useful when you extract utilities to components, with Tailwind's `@apply`.

Consider this template:

```html
<extends src="src/layouts/base.html">
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
<extends src="src/layouts/base.html">
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
<extends src="src/layouts/base.html">
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
