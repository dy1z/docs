---
title: "Tailwind CSS Config"
slug: "tailwindcss-config"
description: "See how the Tailwind CSS configuration is customized for email development in Maizzle"
---

# Tailwind CSS Config

Maizzle comes with an email-tailored `tailwind.config.js`

## Spacing units

Because they are poorly supported in email, `rem` units have been replaced with `px` ones, with values better suited for email client viewports.

## !important

Emails still need to use inline CSS, most notably for these reasons:

- Outlook only reads the first class in a `class=""` attribute, and ignores the rest. 
  So it'll only use `a` from `class="a b"`
- Some email clients don't support embedded CSS (i.e. in `<style>`)

Because of this, the `important` option is set to `true`, in order for the responsive utilities to actually override inlined CSS:

```js
// tailwind.config.js
module.exports = {
  important: true,
}
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">This applies only to <code>&lt;head&gt;</code> CSS, inlined CSS will not contain <code>!important</code></div>
</div>

## Separator

Characters like `:` in `hover:bg-black` need to be \escaped in CSS. 

Because some email clients (Gmail 👀) fail to parse selectors with escaped characters, 
Maizzle normalizes all your CSS selectors and HTML classes, replacing any escaped characters it finds with `-`.

So you can safely use Tailwind's awesome default separator and write classes like `sm:w-1/2` - 
Maizzle will convert that to `sm-w-1-2` in your compiled template:

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

[`posthtml-safe-class-names`](https://github.com/posthtml/posthtml-safe-class-names) is used to normalize `:` `/` `.` and `%` characters in your class names - these are the safe characters they are replaced with:


- `:` is replaced with `-`
- `\/` is replaced with `-`
- `%` is replaced with `pc`
- `.` is replaced with `_`

You can define new replacement mappings (or overwrite existing ones) by adding a `safeClassNames` key to your config.

For example, let's replace `:` with a `_` instead of the default `-`:

```js
// config.js
module.exports = {
  safeClassNames: {
    ':': '__'
  },
}
```

## Screens

Maizzle uses a desktop-first approach with `max-width`, instead of Tailwind's default mobile-first with `min-width`. 

Of course, you're free to adjust this as you like:

```js
screens: {
  sm: {'max': '600px'},
},
```

More on screens, in the [Tailwind CSS docs](https://tailwindcss.com/docs/responsive-design).

## Plugins

You can of course use any Tailwind plugin, please [see the docs](https://tailwindcss.com/docs/configuration#plugins).
