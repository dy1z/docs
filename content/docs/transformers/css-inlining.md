---
title: "CSS Inlining"
slug: "css-inlining"
description: "Configure automatic CSS inlining options for your HTML email templates"
---

import Alert from '~/components/Alert.vue'

# CSS Inlining

Maizzle uses the Juice library to automatically inline your CSS.

Let's first take a look at all the options available:

```js
// config.js
module.exports = {
  inlineCSS: {
    enabled: false,
    styleToAttribute: {
      'background-color': 'bgcolor',
      'background-image': 'background',
      'text-align': 'align',
      'vertical-align': 'valign',
    },
    applySizeAttribute: {
      width: [],
      height: [],
    },
    excludedProperties: null,
  },
  // ...
}
```

## Options

Changing these options in your environment config will apply to all Templates when building emails for that environment.

### enabled

Enable automatic CSS inlining. When set to `false`, inlining will not take place and all other settings inside `inlineCSS` will be ignored.

<alert>Note: you will need to turn this off when developing <a href="/docs/amp4email/">⚡4email templates</a>.</alert>

### styleToAttribute

Defines which CSS properties should Juice duplicate as what HTML attributes.

For example, this property-attribute assignment:

```js
styleToAttribute: {
  'background-color': 'bgcolor',
},
```

... will transform this:

```html
<table class="bg-cool-gray-300">
  <tr>
    <td>...</td>
  </tr>
</table>
```

... into this:

```html
<table bgcolor="#e2e8f0">
  <tr>
    <td>...</td>
  </tr>
</table>
```

### applySizeAttribute

Specify an array of HTML tag names for which the inliner should duplicate inline CSS widths and heights as `width=""` and `height=""` attributes.

These are passed to Juice, which will add any inline width and height CSS rules it finds as HTML attributes, but only for the tags specified here.

Example:

```js
module.exports = {
  inlineCSS: {
    applySizeAttribute: {
      width: ['TABLE', 'TD', 'TH', 'IMG', 'VIDEO'],
      height: ['TABLE', 'TD', 'TH', 'IMG', 'VIDEO'],
    },
    //
  },
}
```

### excludedProperties

Array of CSS property names that should be excluded from the CSS inlining process. Names are considered unique, so you need to specify each one you'd like to exclude. 

For example:

```js
'excludedProperties' => ['padding', 'padding-left'],
```

### codeBlocks

An object where each value has a start and end to specify fenced code blocks that should be ignored during parsing and inlining.

```js
// config.js
module.exports = {
  inlineCSS: {
    codeBlocks: {
      'ASP': {
        start: '<%',
        end: '%>'
      }
    }
    // ..
  },
}
```

## Prevent inlining

Use the `data-embed` attribute on a `<style>` tag to prevent Juice from inlining the CSS inside it.
Useful for writing email client CSS hacks, or for preserving CSS comments in tandem with the [`removeCSSComments: false`](/docs/code-cleanup/#removecsscomments) Cleanup option.

<alert>Email client CSS hacks will still need to be <a href="/docs/code-cleanup/#whitelist-1">whitelisted</a> with <code>email-comb</code>.</alert>
