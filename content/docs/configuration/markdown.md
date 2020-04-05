---
title: "Markdown"
slug: "markdown"
description: "Use Markdown in your HTML email templates. GitHub Flavored Markdown included, too."
---

# Markdown

Maizzle supports Markdown in your email templates.

[Marked.js](https://github.com/markedjs/marked) is used together with PostHTML and you can fully configure it, either from your environment config, or through Front Matter for each Template.

## Tags

You can use one of two custom tags to add Markdown to your emails:

```html
<markdown>This Markdown will be **compiled** to HTML</markdown>
<md>There's also a _shorter_ version of the tag above.</md>
```

Result: 

```html
<p>This Markdown will be <strong>compiled</strong> to HTML</p>
<p>There's also a <em>shorter</em> version of the tag above.</p>
```

## Attributes

Use attributes if you need the element wrapping your Markdown to be preserved:

```html
<div markdown>This Markdown will be **compiled** to HTML</div>
<p md>There's also a _shorter_ version of the tag above.</p>
```

Result: 

```html
<div>
  <p>This Markdown will be <strong>compiled</strong> to HTML</p>
</div>
<p>There's also a <em>shorter</em> version of the tag above.</p>
```

## Importing files

Already have Markdown somewhere in a file? Simply include it:

```html
<md>
  <include src="path/to/file.md"></include>
</md>
```

## Nesting

You can even nest Markdown inside child elements:

```html
<table markdown>
  <tr>
    <td>

    | Head | row |
    |------|-----|
    | Data | row |

    </td>
  </tr>
</table>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Nesting requires extra empty lines around Markdown, like in the <code>&lt;div&gt;</code> above.</div>
</div>

## GFM

Marked supports [GitHub Flavored Markdown](https://github.github.com/gfm/), and it's enabled by default in Maizzle.

## Config

Here's how Marked.js is configured in Maizzle:

```js
// config.js
module.exports = {
  markdown: {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: false,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pendantic: false,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tables: true,
    xhtml: false
  },
  // ...
}
```

For an explanation of what each option does, please see the [Marked.js docs &nearr;](https://marked.js.org)

## Front Matter

You can override the base Markdown config from your Template's Front Matter.
Need a `baseUrl` for Markdown links, or to enable `headerIds` for a particular Template? 

No problem:

```html
---
title: Overriding the default Markdown config
markdown:
  headerIds: true
  baseUrl: https://github.com
---

<extends src="src/layouts/base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">When using <code>headerIds</code>, you need to add a whitelist pattern to   <code>config.removeUnusedCSS</code> (otherwise they'll be removed).</div>
</div>

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-red-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">JavaScript is not supported in Front Matter, so you can't use functions like <code>highlight</code>, <code>renderer</code>, or <code>sanitizer</code> here.</div>
</div>

## Gotchas

There are some situations where Markdown might not work as expected, or requires some additional work on your side.

### Unclosed Tags

Because Maizzle uses [`cheerio`](https://github.com/cheeriojs/cheerio) in some of its Transformers that run after the Markdown Transformer, something like this:

```handlebars
<md>`<div>`</md>
```

... will be compiled to:

```html
<p><code><div></div></code></p>
```

Basically, `cheerio` will automatically close any unclosed tags.

### Classes

If you have fenced code blocks like this in your Markdown:

```markdown
    ```html
    <div>Lorem ipsum</div>
    ```
```

... then `config.markdown.langPrefix` needs to be whitelisted inside `removeUnusedCSS`:

```js
// config.production.js
module.exports = {
  removeUnusedCSS: {
    enabled: true,
    whitelist: ['.language-*'],
  },
}
```

### IDs

When using the `headerIds` option, you also need to whitelist IDs with `email-comb`:

```js
// config.js
module.exports = {
  markdown: {
    headerIds: true,
    // ...
  },
  removeUnusedCSS: {
    enabled: true,
    whitelist: ['.language-*', '#*'],
  },
}
```
