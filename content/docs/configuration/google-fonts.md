---
title: "Google Fonts"
slug: "google-fonts"
description: "Easily import and use Google Fonts in your HTML email templates"
---

import Alert from '~/components/Alert.vue'

# Google Fonts

Maizzle supports Google Fonts out-of-the-box, and it's very easy to use. 

When checking Google's embed instructions for your font selection, simply copy and use the bold part after `?family=`. Then, register the Tailwind CSS utility.

For example, let's pull in Merriweather, and Open Sans with some custom weights:

```js
// config.js
module.exports = {
  googleFonts: 'Merriweather|Open+Sans:300,400,700'
}
```

You can then use a `<link>` tag to import them in your Layout:

```html
<if condition="page.googleFonts">
  <link href="https://fonts.googleapis.com/css?family={{ page.googleFonts }}" rel="stylesheet" media="screen">
</if>
```

<alert>When using the default Starter project, setting <code>googleFonts</code> in your config will make Google Fonts available globally, to all Templates.</alert>

## Front Matter

Use the `googleFonts` key in the Front Matter of a Template to import Google Fonts _only in this Template_:

```html
---
googleFonts: "Roboto|Hind+Madurai&amp;subset=latin-ext"
---

<extends src="src/layouts/base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

## Tailwind CSS utility

After defining which Google Fonts to import, you need to register the `fontFamily` utilities in your `tailwind.config.js`.

For example, let's register an utility for Open Sans:

```js
// tailwind.config.js

theme: {
  fontFamily: {
    'open-sans': [
      '"Open Sans"',
      '-apple-system',
      '"Segoe UI"',
      'sans-serif'
    ]
  }
}
```

_Now_ we can use the `font-open-sans` utility class.

## Avoid inlining

Email clients that support web fonts don't require the `font-family` CSS to be inlined in your HTML. 
Therefore, we can make use of Tailwind's breakpoints and tuck the class inside an `@media screen {}` query. 

This way, Juice doesn't inline it, and we also shave off some bytes 😎

First, we register a `screen` breakpoint:

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      screen: {raw: 'screen'},
      sm: {max: '600px'}
    }
  }
}
```

We can now use it in the HTML:

```html
<div class="screen:font-open-sans">
  <h1>Lorem ipsum</h1>
  <p>Labore exercitation consequat tempor quis eu nulla amet.</p>
</div>
```

<alert>For this to work, Maizzle sets <code>fontFamily: ['responsive']</code>, in your <code>tailwind.config.js</code>.</alert>
