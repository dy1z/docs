---
title: "Using custom web fonts in Maizzle email templates"
slug: "custom-web-fonts-html-emails-font-face"
description: "See how you can register custom web fonts in your email templates, and learn how to use them efficiently through Tailwind CSS utilities."
date: 2020-01-31
---

Maizzle already makes it super easy to [use Google Fonts in your email templates](/docs/google-fonts/), but what if you need to use a custom web font? 

Maybe your brand uses a custom type that isn't available through Google Fonts, 
or maybe you're just developing Shopify notification email templates (where the usual `@import` and `<link>` techniques aren't supported).

In this tutorial, you'll learn how to add your own custom fonts to emails in Maizzle.

## Initial setup

First, make sure you have the [Maizzle CLI](/docs/installation/#install-the-cli-globally) installed.

We'll be using the default Maizzle starter, so let's start by creating a new project.

Open a terminal window and run the `new` command:

```sh
maizzle new font-face-project
```

That will create a `font-face-project` at your current location.

Once it finishes installing dependencies, open the folder in your favourite editor. 

I use VS Code, so I'll do:

```sh 
cd font-face-project && code .
```

## Register @font-face

Imagine we have a display font called Barosan, which we're hosting on our website.

We'll use `@font-face` to register our custom font family - we can do this in the Template or in the Layout that we extend.

### Add in Template

Open `src/templates/transactional.njk` and add this before `{% block template %}` :

```handlebars
{% block head %}
<style>
  @font-face {
    font-family: 'Barosan';
    font-style: normal;
    font-weight: 400;
    src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2');
  }
</style>
{% endblock %}
```

Registering the font inside the Template will add a separate `<style>` tag in the compiled email HTML, right after the main one.

### Add in Layout

If you prefer a single `<style>` tag in your email template, you can register the font in the Layout instead. 
Open `src/layouts/default.njk` and replace this:

```handlebars
{% if css %}<style>{{ css }}</style>{% endif %}
```

with this:

```handlebars
{% if css %}
  <style>
    @font-face {
      font-family: 'Barosan';
      font-style: normal;
      font-weight: 400;
      src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2');
    }

    {{ css }}
  </style>
{% endif %}
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">
    <p>You can use the same technique to load font files from Google Fonts - it's currently the only way to get them working in Shopify notifications.</p> 
    To find out the URL of a Google Font (and actually, its entire <code class="shiki-inline">@font-face</code> CSS) simply access the URL they give you in the browser.
  </div>
</div>

## Tailwind utility

Now that we're importing the font, we should register a Tailwind CSS utility for it.

Open `tailwind.config.js`, scroll down to `fontFamily`, and add a new font:

```js
fontFamily: {
  barosan: [
    'Barosan',
    '-apple-system',
    '"Segoe UI"',
    'sans-serif',
  ],
  // sans: {}, etc...
}
```

Of course, you can change the other fonts in the stack. For example, display fonts often fallback to `cursive`.

Great! We're now ready to use the utility class in our email template.

## Quick use

Simply add the `font-baros` class on every element where you want text to be rendered using your custom font.

For example, you can add it on a heading:

```html
<h2 class="font-barosan">An article title</h2>
```

With [CSS inlining](/docs/css-inlining/) enabled, that would result in:

```html
<h2 style="font-family: Barosan, -apple-system, 'Segoe UI', sans-serif;">An article title</h2>
```

## Advanced use

Repeatedly writing that `font-barosan` class on all elements isn't just impractical, 
it also increases HTML file size (especially when inlining), which then leads to [Gmail clipping](https://github.com/hteumeuleu/email-bugs/issues/41).

We can make use of Tailwind's `screen` variants and an Outlook `font-family` fallback to reduce bloat and write less code 👌

First, let's register a new `@media` query:

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

We can now use it on the outermost<sup>1</sup> element:

```html
{% block template %}
<table class="screen:font-barosan">
  <!-- ... -->
</table>
{% endblock %}
```

This will tuck the `font-family` away in an `@media` query:

```css
/* Compiled CSS. Maizzle replaces escaped \: with - */
@media screen {
  .screen-font-barosan {
    font-family: Barosan, -apple-system, "Segoe UI", sans-serif !important;
  }
}
```

Since Outlook doesn't read `@media` queries, define a fallback<sup>2</sup> for it in your Layout:

```html
<!--[if mso]>
<style>
  td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif;}
</style>
<![endif]-->
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600"><sup>1</sup> Don't add it to the <code class="shiki-inline">&lt;body&gt;</code> - some email clients remove or replace this tag.</div>
</div>

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600"><sup>2</sup>  Maizzle includes this fallback in the default Layout.</div>
</div>

## Outlook bugs

Custom fonts aren't supported in Outlook 2007-2016 - these email clients will fallback to Times New Roman. 
To avoid this, you can wrap the `@font-face` declaration in a `@media` query, so that Outlook will ignore it:

```css
@media screen {
  @font-face {
    font-family: 'Barosan';
    font-style: normal;
    font-weight: 400;
    src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2');
  }
}
```

Also, note that `font-family` isn't inherited on child elements in Outlook.

## Extra weights

If your font comes with dedicated files for other weights, don't just slap `font-bold` on an element. 
Instead, import both the regular and bold versions of your font:

```css
@font-face {
  font-family: 'Barosan';
  font-style: normal;
  font-weight: 400;
  src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2');
}

@font-face {
  font-family: 'Barosan';
  font-style: normal;
  font-weight: 700;
  src: local('Barosan Bold'), local('Barosan-Bold'), url(https://example.com/fonts/barosan-bold.woff2) format('woff2');
}
```

## Resources

- [The Ultimate Guide to Web Fonts](https://litmus.com/blog/the-ultimate-guide-to-web-fonts) on Litmus
- [@font-face support in email](https://www.caniemail.com/search/?s=font-face)
