---
title: "Spacers"
slug: "spacers"
description: "Learn how to create reliable vertical spacing for HTML email with Tailwind CSS in Maizzle"
---

import Alert from '~/components/Alert.vue'

# Spacers

Vertical spacing in HTML emails can be tricky, mainly because of inconsistent support for (and rendering of) margin, padding, and `<br>` tags. 

Here's how easy it is to create simple, yet reliable spacers for your emails, using basic HTML and Tailwind CSS utility classes.

## Div

This is the simplest spacer you can use in an HTML email.

```html
<div class="leading-64">&zwnj;</div>
```

How it works:

1. `leading-64` sets the height with `line-height: 64px;`
3. We use `&zwnj;` to add something inside, so the element can take up height reliably in all email clients

We can define a responsive height:

```html
<div class="leading-64 sm:leading-32">&zwnj;</div>
```

Note that this will only work where `@media` queries are supported.

<alert>Feel free to use <code>&amp;nbsp;</code> instead of <code>&amp;zwnj;</code>, both work just fine.</alert>

## Row

Use this one directly inside a `<table>`:

```html
<tr>
  <td class="leading-64">&zwnj;</td>
</tr>
```

## Table

The Row spacer, but as a full `<table>`.

```html
<table class="w-full">
  <tr>
    <td class="leading-64">&zwnj;</td>
  </tr>
</table>
```

## Semantic

We can use an `<hr>` to create a semantic Spacer.

```html
<p>Paragraph about the weather</p>
<hr class="border-0 text-white my-64 min-h-full">
<p>Paragraph about my day at work</p>
```

How it works:

- we hide the line by resetting the border 
- we give it the same color as the background of the page, for Outlook
- we define height with top and bottom margins

The `min-h-full` class is used to get it working in Apple email clients.
