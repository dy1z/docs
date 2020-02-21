---
title: "Google Fonts"
slug: "google-fonts"
description: "Easily import and use Google Fonts in your HTML email templates"
---

# Google Fonts

Maizzle supports Google Fonts out-of-the-box, and it's very easy to use. 

When checking Google's embed instructions for your font selection, simply copy and use the bold part after `?family=`. Then, register the Tailwind CSS utility.

For example, let's pull in Merriweather, and Open Sans with some custom weights:

```js
// config.js
module.exports = {
  googleFonts: 'Merriweather|Open+Sans:300,400,700',
  // ...
}
```

You can then use a `<link>` tag to import them in your Layout:

```handlebars
{% if page.googleFonts %}<link href="https://fonts.googleapis.com/css?family={{ page.googleFonts }}" rel="stylesheet" media="screen">{%- endif %}
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">When using the default Starter project, setting <code class="shiki-inline">googleFonts</code> in your config will make Google Fonts available globally, to all Templates.</div>
</div>

## Front Matter

Use the `googleFonts` key in the Front Matter of a Template to import Google Fonts _only in this Template_:

```handlebars
---
googleFonts: "Roboto|Hind+Madurai&amp;subset=latin-ext"
---

{% block template %}
  ...
{% endblock %}
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
      'sans-serif',
    ],
    // ...
  },
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
      screen: {'raw': 'screen'},
      sm: {'max': '600px'},
    },
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

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">For this to work, Maizzle sets <code class="shiki-inline">fontFamily: ['responsive']</code>, in your <code class="shiki-inline">tailwind.config.js</code>.</div>
</div>

