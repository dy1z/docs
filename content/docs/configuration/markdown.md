---
title: "Markdown"
slug: "markdown"
description: "Use Markdown in your HTML email templates. GitHub Flavored Markdown included, too."
---

# Markdown

Maizzle supports Markdown in your email templates.

[Marked.js](https://github.com/markedjs/marked) is used together with Nunjucks, and you can even fully configure it, either from your environment config, or through Front Matter, for each Template.

## Nunjucks Tags

Markdown content needs to be added inside special Nunjucks tags, in order to be rendered by Marked. Under the hood, [nunjucks-markdown](https://www.npmjs.com/package/nunjucks-markdown) is used. 

### Block

Use the `{% markdown %}` Nunjucks block tag to add Markdown to your emails:

```md
{% markdown %}

  ### A level 3 heading

  Lorem ipsum dolor sit amet...

  And a [link](https://maizzle.com)

{% endmarkdown %}
```

### Import

Already have Markdown somewhere in a file? You can import it:

```sh
{% markdown 'src/partials/markdown.md' %}
```

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

```handlebars
---
title: Overriding the default Markdown config
markdown:
  headerIds: true
  baseUrl: https://github.com
---

{% block template %}
  ...
{% endblock %}
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">When using <code class="shiki-inline">headerIds</code>, you need to add a whitelist pattern to   <code class="shiki-inline">config.removeUnusedCSS</code> (otherwise they'll be removed).</div>
</div>

<div class="bg-gray-100 border-l-4 border-gradient-b-red-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">JavaScript is not supported in Front Matter, so you can't use <code class="shiki-inline">highlight</code>, <code class="shiki-inline">renderer</code>, or <code class="shiki-inline">sanitizer</code> here.</div>
</div>
