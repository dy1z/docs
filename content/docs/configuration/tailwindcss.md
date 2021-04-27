---
title: "Tailwind CSS Config"
slug: "tailwindcss-config"
description: "See how the Tailwind CSS configuration is customized for email development in Maizzle"
---

import Alert from '~/components/Alert.vue'
import TailwindColors from '~/components/TailwindColors.vue'

# Tailwind CSS Config

Maizzle comes with an email-tailored `tailwind.config.js` that changes a few things for better email client compatibility.

These are the differences from the original Tailwind config.

## Spacing units

Because of poor email client support, `rem` units have been replaced with `px`.

This affects the following:

- borderRadius
- fontSize
- lineHeight
- spacing (max/min width and height, width, height, margin, padding, etc)

### Extra spacing

The `spacing` scale also includes all percentage-based utilities, so you can use things like `mb-1/2` or `max-w-3/4` if you ever need to.

### Extended leading

The `lineHeight` utilities have been extended to include all `spacing` scale values, so you can use leading to easily create vertical spacing, like this:

```html
<div class="leading-64">&zwnj;</div>
<!-- Result: <div style="line-height: 64px">&zwnj;</div> -->
```

## Colors

Maizzle doesn't define any colors, it uses the [default colors](https://tailwindcss.com/docs/customizing-colors) in Tailwind:

<tailwind-colors class="mb-8" />

You can define your own colors, or even extend or change the default colors by adding a `colors` key in your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          // change 'blue-500'
          500: '#03a9f4',
          // add 'blue-1000'
          1000: '#101e47',
        },
        // custom color
        primary: '#FFCC00',
      }
    }
  }
}
```

Tailwind 2.x comes with many other color palettes, which are not included by default.

You can import and use them like this:

```js
// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        yellow: colors.amber,
      }
    }
  }
}
```

See the [Tailwind color palette reference](https://tailwindcss.com/docs/customizing-colors#color-palette-reference).

## !important

Emails still need to use inline CSS, most notably for these reasons:

- Outlook only reads the first class in a `class=""` attribute, and ignores the rest. 
  So it'll only use `a` from `class="a b"`
- Some email clients don't support embedded CSS (i.e. in `<style>`)

Because of this, the `important` option is set to `true` by default, so that responsive utilities can actually override inlined CSS.

<alert>This applies only to <code>&lt;head&gt;</code> CSS, inlined CSS will not contain <code>!important</code></alert>

You may disable this by adding the `important` key to your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  important: false
}
```

## Separator

Characters like `:` in `hover:bg-black` need to be \escaped in CSS. 

Because some email clients (Gmail 👀) fail to parse selectors with escaped characters, Maizzle normalizes all your CSS selectors and HTML classes, replacing any escaped characters it finds with email-safe alternatives.

So you can safely use Tailwind's awesome default separator and write classes like `sm:w-1/2` - Maizzle will convert that to `sm-w-1-2` in your compiled template:

```js
// tailwind.config.js
module.exports = {
  separator: ':',
  theme: {
    width: {
      '2/5': '40%', // w-2-5
      '50%': '50%', // w-50pc
      '2.5': '0.625rem', // w-2_5
    }
  }
}
```

You can also [configure the replacement mappings](/docs/code-cleanup#safeclassnames).

## Screens

Maizzle uses a desktop-first approach with `max-width`, instead of Tailwind's default mobile-first with `min-width`. 

Of course, you're free to adjust this as you like:

```js
screens: {
  sm: {max: '600px'}
},
```

More on screens, in the [Tailwind CSS docs](https://tailwindcss.com/docs/responsive-design).

## Plugins

You can of course use any Tailwind plugin, please [see the docs](https://tailwindcss.com/docs/configuration#plugins).

### Disabled

Due to poor support in email clients, Maizzle disables the following Tailwind plugins:

- animation
- backgroundOpacity
- borderOpacity
- divideOpacity
- placeholderOpacity
- ringColor
- ringWidth
- ringOpacity
- ringOffsetColor
- textOpacity

If you want to use one of these plugins, simply set it to `true` in `corePlugins` at the bottom of your `tailwind.config.js`:

```diff
corePlugins: {
+ animation: true,
  backgroundOpacity: false,
  borderOpacity: false,
  divideOpacity: false,
  placeholderOpacity: false,
  textOpacity: false,
}
```

### boxShadow

Since v3.1.5, Maizzle uses [tailwindcss-box-shadow](https://www.npmjs.com/package/tailwindcss-box-shadow) to output box-shadow CSS values exactly as you have them defined in your Tailwind config.

The default Tailwind CSS variables-based box shadows are suppressed internally, because email clients have very poor support for CSS variables.
