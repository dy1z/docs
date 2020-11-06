---
title: "Tailwind CSS Config"
slug: "tailwindcss-config"
description: "See how the Tailwind CSS configuration is customized for email development in Maizzle"
---

import Alert from '~/components/Alert.vue'

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

Maizzle uses the more vivid color palette from [Tailwind UI](https://tailwindui.com/documentation#how-tailwindcss-ui-extends-tailwind).

Want to use the original Tailwind colors? Simply remove the `colors` key from `tailwind.config.js`. Since we redefine the originals by _extending_ the default Tailwind config, doing this will revert to the original colors.

<alert>This is subject to change, depending on what new colors Tailwind CSS 2.0 will ship with. In the future, we might remove the <code>colors</code> key from your <code>tailwind.config.js</code> and just use Tailwind's defaults ✌</alert>

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
  important: false,
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
  sm: {max: '600px'},
},
```

More on screens, in the [Tailwind CSS docs](https://tailwindcss.com/docs/responsive-design).

## Plugins

You can of course use any Tailwind plugin, please [see the docs](https://tailwindcss.com/docs/configuration#plugins).

### Disabled

Because CSS variables are poorly supported in email clients, Maizzle's `tailwind.config.js` disables Tailwind's opacity plugins:

- backgroundOpacity
- borderOpacity
- divideOpacity
- placeholderOpacity
- textOpacity

Additionally, the `animation` core plugin is also disabled, since it is not purged from the CSS and you won't need it in most cases.

If you _do_ need the animation utilties, simply delete the line from `corePlugins` at the bottom of your `tailwind.config.js`:

```diff
corePlugins: {
- animation: false,
  backgroundOpacity: false,
  borderOpacity: false,
  divideOpacity: false,
  placeholderOpacity: false,
  textOpacity: false,
},
```
