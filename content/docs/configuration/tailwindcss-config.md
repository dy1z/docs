---
title: "Tailwind CSS Config"
slug: "tailwindcss-config"
description: "Tailwind CSS email-tailored configuration in Maizzle"
---

# Tailwind CSS Config

Maizzle comes with an email-tailored `tailwind.config.js`

## Spacing units

Because they are poorly supported in email, `rem` units have been replaced with `px` ones, with values better suited for email client viewports.

## !important

The `important` option needs to be `true`, in order for the responsive utilities to actually override inlined CSS:

```js
// tailwind.config.js
module.exports = {
  important: true,
}
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">This applies only to <code class="shiki-inline">&lt;head&gt;</code> CSS, inlined CSS will not contain <code class="shiki-inline">!important</code></div>
</div>

### amp4email

⚡4email doesn't support inline CSS, so there's no reason to enable `!important`.

Use the [`tailwind.config`](/docs/build-paths/#tailwind) option in your environment config to define a path to a _custom_ Tailwind CSS config file, where you disable the option:

```js
// config.amp.js
build : {
  tailwind: {
    css: 'src/assets/css/main.css',
    config: 'tailwind.amp.js',
  },
},

// tailwind.amp.js
module.exports = {
  important: false,
}
```

Now you can run the `maizzle amp command`

## Separator

Separators like `:` in `hover:bg-black` or `/` in `w-1/2` need to be \escaped in CSS. 

Because some email clients (Gmail 👀) fail to parse selectors with escaped characters, 
Maizzle normalizes all your CSS selectors and HTML classes, replacing any escaped characters it finds with `-`.

So you can safely use Tailwind's awesome default separator and write classes like `sm:w-1/2` - 
Maizzle will convert that to `sm-w-1-2` in your compiled template:

```js
// tailwind.config.js
module.exports = {
  separator: ':',
  theme: {
    spacing: {
      '1/2': '50%',
    }
  }
}
```

## Screens

A custom set of `@media` query breakpoints is defined.

Maizzle uses a desktop-first approach with `max-width`, instead of Tailwind's default mobile-first with `min-width`. Of course, you're free to adjust these as you like:

```js
screens: {
  all: {'raw': 'screen'},
  xs: {'max': '480px'},
  sm: {'max': '600px'},
},
```

- **all** 
  
  This creates an `@media screen {}` query. All its utility classes are prefixed with `all-` - you can use it for things like: 
    
    - defining (web) font stacks for modern email clients 
    - preventing Juice from inlining a utility class

- **xs** 
  
  Most smartphone viewports currently fit within this breakpoint.

- **sm** 

  Breakpoint to mark the most common email width boundary.

More on screens, in the [Tailwind CSS docs &nearr;](https://tailwindcss.com/docs/responsive-design)

## Plugins

Maizzle comes with the [tailwindcss-gradients](https://www.npmjs.com/package/tailwindcss-gradients) plugin.
See the [Gradients docs](/docs/gradients/) for examples showing how to configure and use it.

Of course, you can add any plugin you want, like [CSS grid](https://www.npmjs.com/package/tailwindcss-grid) or [border image gradients](https://www.npmjs.com/package/tailwindcss-border-gradients).
