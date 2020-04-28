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
    mergeLonghand: false,
    applySizeAttribute: {
      width: [],
      height: [],
    },
    keepOnlyAttributeSizes: {
      width: [],
      height: [],
    },
    preferBgColorAttribute: {
      enabled: false,
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

### mergeLonghand

Uses [`posthtml-postcss-merge-longhand`](https://github.com/posthtml/posthtml-postcss-merge-longhand) to rewrite longhand CSS with shorthand syntax. Only works with `margin`, `padding` and `border`, and only when all sides are specified.

Something like this:

```html
<p class="mx-2 my-4">Example</p>
```

... instead of becoming this:

```html
<p style="margin-left: 2px; margin-right: 2px; margin-top: 4px; margin-bottom: 4px;">Example</p>
```

... becomes this:

```html
<p style="margin: 4px 2px;">Example</p>
```

Enable it for all tags:

```js
// config.js
module.exports = {
  inlineCSS: {
    mergeLonghand: true
    // ..
  },
}
```

Enable it only for a selection of tags:

```js
// config.js
module.exports = {
  inlineCSS: {
    mergeLonghand: {
      enabled: true,
      tags: ['td', 'div']
    },
    // ..
  },
}
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

### keepOnlyAttributeSizes

Define for which elements should Maizzle keep _only_ attribute sizes, like `width=""` and `height=""`. Elements in these arrays will have their inline CSS widths and heights removed.

It's set to empty arrays by default, so that no elements are affected:

```js
keepOnlyAttributeSizes: {
  width: [],
  height: [],
},
```

You can add HTML elements like this:

```js
keepOnlyAttributeSizes: {
  width: ['TABLE', 'TD', 'TH', 'IMG', 'VIDEO'],
  height: ['TABLE', 'TD', 'TH', 'IMG', 'VIDEO'],
},
```

<alert>This will only work for elements defined in <a href="/docs/css-inlining/#applysizeattribute">applySizeAttribute</a>.</alert>

<alert type="warning">Using only attribute sizes is known to cause <a href="https://www.courtneyfantinato.com/correcting-outlook-dpi-scaling-issues/" target="_blank" rel="noopener noreferrer">scaling issues in Outlook &nearr;</a></alert>

### preferBgColorAttribute

If you're inlining your CSS and have `'background-color': 'bgcolor'` in the `styleToAttribute` option of the inliner, you can shave off some bytes by having Maizzle keep just the `bgcolor=""` attribute.

Enable this option to remove any inlined `background-color` CSS properties:

```js
// config.js
module.exports = {
  preferBgColorAttribute: {
    enabled: true,
  }
  // ...
}
```

You can optionally provide an array of tag names that it should remove the `background-color` inline CSS from:

```js
// config.js
module.exports = {
  preferBgColorAttribute: {
    enabled: true,
    tags: ['td'], // default: ['body', 'marquee', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr']
  }
  // ...
}
```

In this case, `background-color` will be removed only from `<td>` elements.

### excludedProperties

Array of CSS property names that should be excluded from the CSS inlining process. Names are considered unique, so you need to specify each one you'd like to exclude. 

For example:

```js
'excludedProperties' => ['padding', 'padding-left'],
```

## Prevent inlining

Use the `data-embed` attribute on a `<style>` tag to prevent Juice from inlining the CSS inside it.
Useful for writing email client CSS hacks, or for preserving CSS comments in tandem with the [`removeCSSComments: false`](/docs/code-cleanup/#removecsscomments) Cleanup option.

<alert>Email client CSS hacks will still need to be <a href="/docs/code-cleanup/#whitelist-1">whitelisted</a> with <code>email-comb</code>.</alert>
