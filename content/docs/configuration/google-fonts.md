---
title: "Google Fonts"
slug: "google-fonts"
description: "Easily import and use Google Fonts in your HTML email templates"
---

import Alert from '~/components/Alert.vue'

# Google Fonts

Maizzle supports Google Fonts out-of-the-box, and it's very easy to use. 

When checking Google's embed instructions for your font selection, simply copy and use the `family=...` parameters. Then, register the Tailwind CSS utility.

For example, let's pull in Merriweather and Open Sans with some custom weights:

```js
// config.js
module.exports = {
  googleFonts: 'family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600'
}
```

Notice how the first `family=` parameter does not include the `?` - we use that in the Layout, when defining the `<link>` tag.

You can then use a `<link>` tag to import them in your Layout:

```html
<if condition="page.googleFonts">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?{{{ page.googleFonts }}}&display=swap" rel="stylesheet" media="screen">
</if>
```

Checkout the [Google Fonts CSS API v2](https://developers.google.com/fonts/docs/css2) for advanced examples of pulling in specific weights or working with variable fonts.

<alert>When using the default Starter project, setting <code>googleFonts</code> in your config will make Google Fonts available globally, to all Templates.</alert>


## Front Matter

Use the `googleFonts` key in the Front Matter of a Template to import Google Fonts _only in this Template_:

```html
---
googleFonts: "family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600"
---

<extends src="src/layouts/base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

## Tailwind utility

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

## @font-face

Some email clients don't support `<link>` tags or CSS `import()`, but do support web fonts.
In such cases, you can use `@font-face` and add your Google Fonts right inside your `<style>` tag.

First, visit the URL that Google Fonts creates for you after you've selected your fonts. 

In our example, it's the following:

```
https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600&display=swap
```

You will see lots of `@font-face` declarations in there, for example

```css
/* latin */
@font-face {
  font-family: 'Merriweather';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweather/v22/u-440qyriQwlOrhSvowK_l5-fCZM.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Copy only the `@font-face` declarations that you need and add them either in a Template or in the Layout your templates extend (for global usage) - see our [web fonts in HTML emails guide](https://maizzle.com/guides/custom-web-fonts-html-emails-font-face/#add-in-template) to learn how to do so.

Note that you'll still need to register the [Tailwind utility](#tailwind-utility) in order to use the fonts.
