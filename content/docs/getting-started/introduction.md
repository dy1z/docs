---
title: "Introduction"
slug: "introduction"
description: "Getting started with the Maizzle Email Framework"
---

# What is Maizzle?

Maizzle is a framework for HTML email development.

It's powered by [Tailwind CSS](https://tailwindcss.com/) and an email-tailored, custom Node.js build system that enables various transformations necessary for HTML emails.

Unlike other email frameworks, Maizzle doesn't use any custom tags that expand into email client-friendly, table-based HTML markup.
Instead, you write your own, _real_ HTML that you style with Tailwind's utility classes.

If you're looking for a framework that offers abstractions like `<row>` and `<column>`, then Maizzle might not be the right choice for you.

But if you need full control over your markup, you might want to [give it a try](/docs/installation/) 😉

---

## Build System

The build system in Maizzle is based on what we call _environment configurations_. 

These allow you to define distinct build scenarios for your email workflow.

Each environment is customized through a JavaScript config file, so you can even `require()` packages or programatically set options.

[PostHTML](https://posthtml.org/) plugins are used for the templating logic, and you can use loops, partials, and even remote content in your emails. Markdown with <abbr title="GitHub Flavored Markdown">GFM</abbr> is supported, too.

## Tailwind CSS

Maizzle uses the [Tailwind CSS](https://tailwindcss.com/) framework, enabling you to rapidly prototype HTML email templates. There's never been a faster way to style your emails. 

For most of the time, you won't need to write CSS anymore: just add classes to your markup. 
And depending on your settings, Maizzle can automatically inline CSS.

A custom, email-tailored `tailwind.config.js` is provided - this adapts or disables some of the default Tailwind CSS settings, for optimal email client support.

Maizzle also uses some [PostCSS](https://postcss.org/) plugins, enabling various optimizations (like unused CSS purging), or conveniences such as writing nested CSS, like in Sass 🤙

## BYOHTML

Maizzle doesn't force you to write abstractions such as `<row>` or `<column>`. You code your emails the way you want to, it doesn't get in your way.

Knowing how bad email clients are at rendering HTML, this might sound terrifying to some, but this way you don't need to worry about markup being locked into the framework core. So you're free to code your emails however you like 💪

_Bring Your Own HTML_ <sup>&trade;</sup>

## Responsive

Because of the lack of standards and the wildly varying CSS support in email clients, there are many techniques that email designers use to code responsive emails.

Since you need to <abbr title="Bring Your Own HTML">BYOHTML</abbr>, Maizzle doesn't have an opinion on how you should code your emails: from _spongy_ to _fluid_ to _responsive_ to _hybrid_, everything is supported, so you're free to use whatever technique you like or need.

Maizzle comes with Tailwind CSS configured for a desktop-first _responsive_ approach, where you define widths and other properties for desktop clients, and then use `@media` queries to override them for mobile clients:

```js
// tailwind.config.js
module.exports = {
  screens: {
    sm: {'max': '600px'},
  },
}
```

## Configure It Out!

Maizzle is configured in JavaScript.

Besides basic things like "_should inlining be enabled?_" or "_do we need to minify the HTML?_", you can even pass options to the Markdown renderer, or choose where on your machine the compiled HTML should be output.

Being JavaScript, you can even do advanced things in your config, like pulling data from an API and passing it to a template, or `require()` some NPM package to further transform your markup or data.

Each config file represents a distinct [build environment](/docs/environments/) that can be triggered with its own `maizzle build [environment]` command, so you can define settings for as many build scenarios as you need!
