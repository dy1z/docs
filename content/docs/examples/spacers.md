---
title: "Spacers"
slug: "spacers"
description: "Learn how to create reliable vertical spacing for HTML email with Tailwind CSS in Maizzle"
---

# Spacers

Vertical spacing in HTML emails can be tricky, because of inconsistent support for margin, padding, and `<br>` tags. 

Here's how easy it is to create simple, yet reliable spacers for your emails, using basic HTML and Tailwind CSS utility classes.

## Div

This is the simplest spacer you can use in an HTML email.

```html
<div class="leading-64 sm:h-32">&amp;zwnj;</div>
```

How it works:

1. `leading-64` adds `line-height: 64px;` - the default height, for desktop clients
2. `sm:h-32` sets `height: 32px;` for the `sm` breakpoint - the responsive height
3. We use `&zwnj;` to add something inside, so it can take up height reliably in all email clients

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Feel free to use <code class="shiki-inline">&&zwnj;nbsp;</code> instead of <code class="shiki-inline">&amp;zwnj;</code>, both work just fine.</div>
</div>

## Row

Use this one directly inside a `<table>`:

```html
<tr>
  <td class="h-64 sm:h-32"></td>
</tr>
```

## Table

The Row spacer, but as a full `<table>`.

```html
<table class="w-full">
  <tr>
    <td class="h-64 sm:h-32"></td>
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
