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

When writing Markdown inside nested elements that are indented, make sure to unindent the Markdown block itself, so it doesn't get treated as a code block:

```html
<table>
  <tr>
    <td markdown>

  | Head | row |
  |------|-----|
  | Data | row |

    </td>
  </tr>
</table>
```

You can use two spaces for indentation at most; Markdown indented with 4 spaces will be treated as a code block.

## GFM

[GitHub Flavored Markdown](https://github.github.com/gfm/) is supported and enabled by default in Maizzle.

## Config

Maizzle uses the [Marked.js defaults](https://marked.js.org/#/USING_ADVANCED.md#options), but you can override them in your config by adding a `markdown` key:

```js
// config.js
module.exports = {
  markdown: {
    langPrefix: 'lang-', // override the default class name for code tags
  },
  // ...
}
```

## Front Matter

You can override the base Markdown config from your Template's Front Matter.

For example, let's set a `baseUrl` for Markdown links:

```html
---
markdown:
  baseUrl: https://github.com
---

<extends src="src/layouts/base.html">
  <block name="template">
    <md>
      [Contribute to Maizzle](maizzle/framework)
    </md>
  </block>
</extends>
```

That will output:

```html
<p>
  <a href="https://github.com/maizzle/framework">Contribute to Maizzle</a>
</p>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">When using <code>headerIds</code>, you need to add a <a href="#classes">whitelist pattern</a> to  <code>config.removeUnusedCSS</code> (otherwise they'll be removed).</div>
</div>

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-red-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">JavaScript is not supported in Front Matter, so you can't use functions like <code>highlight</code>, <code>renderer</code>, or <code>sanitizer</code> here.</div>
</div>

## Gotchas

There are some situations where Markdown might not work as expected, or requires some additional work on your side.

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
    whitelist: ['.lang*'],
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
    whitelist: ['.lang*', '#*'],
  },
}
```
