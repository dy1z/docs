---
title: "How to use CSS background gradients in HTML emails"
slug: "css-background-gradients-html-emails"
description: "Learn how to add CSS background image gradients with Outlook VML fallback to your HTML email templates in Maizzle."
date: 2020-02-21
---

import Alert from '~/components/Alert.vue'

[Many](https://www.campaignmonitor.com/css/color-background/css-gradients/) email clients support CSS background gradients.

In this tutorial, you will learn how to use the [tailwindcss-gradients](https://www.npmjs.com/package/tailwindcss-gradients) plugin to add colorful gradients to your HTML email templates. 
We will also cover how to add a fallback so that we render gradients in Outlook too, using <abbr title="Vector Markup Language">VML</abbr>.

## Getting started

Let's start by creating a new Maizzle project.

Open a terminal window and run the `new` command:

```bash
maizzle new
```

Follow the steps, using `example-gradients` as the folder name.

We said we'll use the `tailwindcss-gradients` plugin, so let's go ahead and install it. 

First, `cd` into the project directory:

```bash
cd example-gradients
```

Next, install the plugin using NPM:

```bash
npm install tailwindcss-gradients
```

Once it finishes, open the `example-gradients` folder in your editor.

## CSS Gradients

Let's configure and use `tailwindcss-gradients` with Tailwind CSS.

### Tailwind config

We need to tell Tailwind to use the plugin. Edit `tailwind.config.js` and `require()` the plugin inside the `plugins: []` array:

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-gradients'),
  ]
}
```

Next, we need to define what kind of gradients we want to generate, based on which colors. 
We do that in the `theme: {}` key from `tailwind.config.js`.

For example, let's register linear gradients based on the existing color palette:

```js
// tailwind.config.js
module.exports = {
  theme: {
    linearGradientColors: theme => theme('colors'),
  }
}
```

If you run `maizzle build` and take a look at one of the templates in `build_local`, you will see file size almost doubled and there are lots of background image gradient utility classes in there:

```css
.bg-gradient-t-transparent {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0), transparent) !important;
}
/* + many more! */
```

The reason for so many classes is that `tailwindcss-gradients` outputs utilities for all combinations of colors defined in our config.

We can, of course, change that and only generate a handful of gradients:

```js
// tailwind.config.js
module.exports = {
  theme: {
    linearGradientColors: {
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
    }
  }
}
```

Run `maizzle build` again and you should now see only 64 utility classes generated.

<alert><code>tailwindcss-gradients</code> can generate many other types of gradients (although not all are supported in email). See all <g-link to="https://github.com/benface/tailwindcss-gradients">configuration options</g-link>.</alert>

### Use in HTML

Simply add the utility class on an element that supports `background-image` CSS. 

We also specify a background color first, so that email clients that don't support CSS background-image gradients can display a fallback:

```html
<table class="w-full">
  <tr>
    <td class="bg-gray-200 bg-gradient-b-black">
      <!-- ... -->
    </td>
  </tr>
</table>
```

## Outlook VML

Outlook for Windows doesn't support CSS gradients, but we can use <abbr title="Vector Markup Language">VML</abbr>.

You need to add it right after the element with the CSS gradient class:

```html
<table class="w-full">
  <tr>
    <td class="bg-blue-500 bg-gradient-b-black-transparent">
      <!--[if gte mso 9]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;">
      <v:fill type="gradient" color="#0072FF" color2="#00C6FF" angle="90" />
      <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">            
      <div><![endif]-->
      [your overlayed HTML here]
      <!--[if gte mso 9]></div></v:textbox></v:rect><![endif]-->
    </td>
  </tr>
</table>
```

As you can see, you need to set a fixed width on the `<v:rect>` element - it is recommended instead of using `mso-width-percent: 1000;`, as that is pretty buggy (especially in Outlook 2013). 

<alert>The width of the <code>&lt;v:rect&gt;</code> element needs to match the width of its parent element (in our case, the <code>&lt;td&gt;</code>).</alert>

### Body gradient

We can also add a gradient to the body of the email - Outlook support included.

To achieve this, we:

1. create a `<div>` that wraps our template: this will be used as the solid background color fallback
2. place the VML code immediately inside that div, basically wrapping our entire template.
    Note how we're using `mso-width-percent: 1000;` instead of a fixed width on the `<v:rect>`

Here's an example:

```html
<div class="bg-gray-200">
  <!--[if gte mso 9]>
  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="mso-width-percent:1000;">
  <v:fill type="gradient" color="#edf2f7" color2="#cbd5e0" />
  <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
  <div><![endif]-->
  <table class="w-full font-sans">
    <tr>
      <td align="center" class="bg-gradient-t-gray-400">
        <!-- your content here... -->
      </td>
    </tr>
  </table>
  <!--[if gte mso 9]></div></v:textbox></v:rect><![endif]-->
</div>
```

You can see both examples in the [project repository &nearr;](https://github.com/maizzle/example-gradients)

## Avoid inlining

Most email clients that support CSS gradients also support `@media` queries.

We can register a `screen` breakpoint to prevent Juice from inlining our gradient:

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      screen: {raw: 'screen'},
      sm: {max: '600px'},
    }
  }
}
```

We can then write the utility class like this:

```html
<table class="w-full">
  <tr>
    <td class="bg-gray-200 screen:bg-gradient-b-black">
      <!-- ... -->
    </td>
  </tr>
</table>
```

## Resources

- [tailwindcss-gradients](https://www.npmjs.com/package/tailwindcss-gradients) plugin
- [GitHub repo](https://github.com/maizzle/example-gradients) for this tutorial
