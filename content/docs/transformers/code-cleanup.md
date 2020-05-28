---
title: "Code Cleanup"
slug: "code-cleanup"
description: "Define settings for HTML and CSS email code optimization and cleanup"
---

import Alert from '~/components/Alert.vue'

# Code Cleanup

Cleaning up your HTML email results in smaller file sizes, which translates to faster email sendouts, faster opens (think slow 3G), and snappier paint times.

Also, Gmail will clip your email [around 102KB](https://github.com/hteumeuleu/email-bugs/issues/41), so anything past that mark won't even be in the DOM (which can lead to unexpected results like tracking pixel not loaded or, worse, hidden unsubscribe links).

In email, bigger is never better. _Clean up your production emails._

---

These are the cleanup-related options in `config.js` :

```js
// config.js
module.exports = {
  purgeCSS: {},
  removeUnusedCSS: {},
  replaceStrings: false,
  removeAttributes: [],
  safeClassNames: {},
  sixHex: false,
}
```

Let's go through each of those options.

## purgeCSS

When not developing locally, [postcss-purgecss](https://github.com/FullHuman/postcss-purgecss) is used to do a first pass over the compiled Tailwind CSS - this happens before CSS is injected into the HTML, so that tools like the Juice inliner or `email-comb` receive as little code to process as possible.

However, it can sometimes happen that it purges classes that you actually need - for example, if you have dynamic classes that you reference in HTML like this:

```handlebars
<div class="text-{{ computedTextSizeName }}">...</div>
``` 

To give you control, Maizzle exposes some of its options to your cleanup config.

Add a `purgeCSS` key to your config, to customize its settings:

```js
module.exports = {
  purgeCSS: {
    content: [], // array of filenames or globs to scan for selectors
    whitelist: [], // array of strings
    whitelistPatterns: [], // array of regular expressions
    extractor: /[\w-/:%]+(?<!:)/g, // regular expression
  }
}
```

### content

Use the `content` key to define _additional_ paths that the plugin should scan for CSS selectors - Maizzle already configures it with all your build source paths.

```js
purgeCSS: {
  content: ['/Code/emails/project/', 'src/archive/'],
}
```

### whitelist

Use `whitelist` to define an array of class names that you want to preserve:

```js
purgeCSS: {
  whitelist: ['wrapper', 'button--active'],
}
```

### whitelistPatterns

Use `whitelistPatterns` to define an array of regular expressions that match class names that you want to preserve:

```js
purgeCSS: {
  whitelistPatterns: [/text-red-/, /button/],
}
```

### extractor

If your Tailwind class names include characters not covered by the default extractor, use this option to specify a custom one.

For example, let's make sure we don't purge classes that include a `!` character:

```js
purgeCSS: {
  extractor: /[\w-/:.%!]+(?<!:)/g
}
```

<alert type="warning">Characters like <code>$</code> need to be escaped in CSS. This isn't well supported in email clients. When using class names with characters other than <code>:</code>, <code>/</code>, <code>./</code> and <code>%</code>, you need to <a href="#safeclassnames">rewrite</a> them yourself.</alert>

<alert>Learn more about these options, in the <a href="https://github.com/FullHuman/postcss-purgecss#options" target="_blank" rel="nofollow noopener">PostCSS Purgecss docs &nearr;</a></alert>

## removeUnusedCSS

This is where you can configure the [email-comb](https://www.npmjs.com/package/email-comb) library. Options under `removeUnusedCSS` will be passed directly to it, to clean up your CSS.

### enabled

Enables CSS cleanup through `email-comb`:

```js
removeUnusedCSS: {
  enabled: true,
  // ...
}
```

### whitelist

Array of classes or id's that you don't want removed. You can use all [matcher](https://www.npmjs.com/package/matcher) patterns.

```js
removeUnusedCSS: {
  enabled: true,
  whitelist: ['.External*', '.ReadMsgBody', '.yshortcuts', '.Mso*', '#*'],
  // ...
}
```

<alert>Resetting email client styles is often done through CSS selectors that do not exist in your email's code - <code>whitelist</code> ensures these selectors are not removed.</alert>

### backend

If you use computed class names, like for example `class="{{ computedRed }} text-sm"`, the library will normally treat `{{` and `}}` as class names.

To prevent this from happening, set `backend` to an array of objects that define the start and end delimiters:

```js
removeUnusedCSS: {
  enabled: true,
  backend: [
    { heads: "{{", tails: "}}" }, 
    { heads: "{%", tails: "%}" }
  ],
  // ...
},
```

### removeHTMLComments

Set to `false` to prevent `email-comb` from removing `<!-- HTML comments -->`.

```js
removeUnusedCSS: {
  enabled: true,
  removeHTMLComments: false,
  // ...
}
```

### removeCSSComments

Set to `false` to prevent `email-comb` from removing `/* CSS comments */`.

```js
removeUnusedCSS: {
  enabled: true,
  removeCSSComments: false,
  // ...
}
```

<alert type="warning">If you have <a href="/docs/css-inlining/">CSS inlining</a> enabled, CSS comments will still be removed, even with <code>removeCSSComments</code> disabled here.</alert>

You can use the `data-embed` attribute on a `<style>` tag to disable inlining for CSS inside it, if you need to preserve CSS comments.

For example, MailChimp uses CSS comments to define styles that are editable in their email editor. Here's how you can preserve them:

1. Set `removeCSSComments: false` in your config, as above
2. Write your CSS with comments in a separate `<style>` tag:

```css
<style data-embed>
  /*
    @tab Page
    @section Body Background
    @tip Set the background colour for the email body.
  */
  .wrapper {
    /*@editable*/background-color: #EEEEEE !important;
  }
</style>
```

#### doNotRemoveHTMLCommentsWhoseOpeningTagContains

HTML email code often includes Outlook or IE conditional comments, which you probably want to preserve. If the opening tag of a conditional includes any of the strings you list here, `email-comb` will not remove that comment.

```js
removeUnusedCSS: {
  enabled: true,
  doNotRemoveHTMLCommentsWhoseOpeningTagContains: ['[if', '[endif'],
  // ...
}
```

### uglifyClassNames

Set this to `true`, to rename all classes and id's in both your `<style>` tags and your body HTML elements, to be as few characters as possible.

Used in production, it will help trim down your HTML size.

```js
removeUnusedCSS: {
  enabled: true,
  uglifyClassNames: true,
  // ...
}
```

## replaceStrings

Maizzle can batch replace strings in your HTML email template, and it even works with regular expressions!

Use the `replaceStrings` option to define key-value pairs of regular expressions and strings to replace them with:

```js
// config.production.js
module.exports = {
  replaceStrings: {
    'find and replace this exact string': 'with this one',
    '\\s?data-src=""': '', // remove empty data-src="" attributes
  },
}
```

Maizzle sets this to `false` in the development config, so that the function doesn't run and build time isn't unnecessarily affected: 

```js
// config.js
module.exports = {
  replaceStrings: false,
}
```

<alert type="warning">Character classes need to be escaped when defining a regular expression for <code>replaceStrings</code>. As you can see above, <code>\s</code> becomes <code>\\s</code>.</alert>

## removeAttributes

You can have Maizzle remove some attributes from your HTML after it's compiled.

```js
// config.js
module.exports = {
  removeAttributes: [
    { name: 'data-src' }, // remove empty data-src="" attributes
    { name: 'foo', value: 'bar'}, // remove all foo="bar" attributes
  ],
  // ...
}
```

Internally, Maizzle uses this to remove any CSS inlining leftovers, like `style=""`.

## safeClassNames

[`posthtml-safe-class-names`](https://github.com/posthtml/posthtml-safe-class-names) is used to normalize `:` `/` `.` and `%` characters in your class names - these are the safe characters they are replaced with:


- `:` is replaced with `-`
- `\/` is replaced with `-`
- `%` is replaced with `pc`
- `.` is replaced with `_`

You can define new replacement mappings (or overwrite existing ones) by adding a `safeClassNames` key to your config.

For example, let's replace `:` with a `_` instead of the default `-`:

```js
// config.js
module.exports = {
  safeClassNames: {
    ':': '__'
  },
}
```

That would turn `sm:w-full` into `sm__w-full`.

You can prevent Maizzle from rewriting your class names with safe characters, by setting this option to `false`:

```js
// config.js
module.exports = {
  safeClassNames: false,
}
```

## Six-digit HEX

Ensures that all your HEX colors are defined with six digits - some email clients do not support 3-digit HEX colors, like `#fff`. Uses [color-shorthand-hex-to-six-digit &nearr;](https://www.npmjs.com/package/color-shorthand-hex-to-six-digit)

<alert>For better email client compatibility, this transformer is always enabled.</alert>
