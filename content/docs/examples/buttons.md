---
title: "Buttons"
slug: "buttons"
description: "Learn how to create simple buttons for your HTML email templates in Maizzle"
---

# Buttons

Buttons in HTML email can be created with simple table structures with an anchor inside, or advanced techniques involving <abbr title="Vector Markup Language">VML</abbr> or even `mso-` CSS, for fully-clickable buttons in Outlook and Windows 10 Mail 🤯

## Table-based

A simple table structure, with background color set on the cell.

### Filled

The common type of button. 

For an extra touch, let's add rounded corners and a hover effect:

```html
<table>
  <tr>
    <th class="bg-indigo-500 hover:bg-indigo-600 rounded" style="mso-padding-alt: 12px 48px;">
      <a href="https://maizzle.com" class="block text-white text-sm leading-full py-12 px-48 no-underline">Button</a>
    </th>
  </tr>
</table>
```

<div class="mt-8 mb-4 items-center flex flex-wrap">
  Here's how that would look like: <button class="mt-4 sm:mt-0 sm:ml-8 rounded bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold leading-full py-3 px-12 focus:outline-none">Button</button>
</div>

### Outlined

No background color, so it inherits its container's background (white in our case). We add a colored border to the table cell to create the outline.

To make it more interesting, let's also change the background on hover:

```html
<table>
  <tr>
    <th class="border-2 border-indigo-500 hover:bg-indigo-500 block rounded" style="mso-padding-alt: 12px 48px;">
      <a href="https://maizzle.com" class="block text-sm text-indigo-500 hover:text-white leading-full py-12 px-48 no-underline">Button</a>
    </th>
  </tr>
</table>
```

<div class="mt-8 mb-4 items-center flex">
  Example: <button class="ml-8 rounded border-2 border-indigo-500 hover:border-indigo-600 hover:bg-indigo-600 text-sm text-indigo-500 hover:text-white font-bold leading-full py-3 px-12 focus:outline-none">Button</a>
</div>

### Pill

Pill buttons use a larger border-radius value. Remember, Outlook doesn't support this:

```html
<table>
  <tr>
    <th class="bg-indigo-500 hover:bg-indigo-600 shadow-md rounded-full" style="mso-padding-alt: 12px 48px;">
      <a href="https://maizzle.com" class="block text-sm text-white leading-full py-12 px-48 no-underline">Button</a>
    </th>
  </tr>
</table>
```

<div class="mt-8 mb-4 items-center flex">
  Example: <button class="ml-8 rounded-full shadow-md bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold leading-full py-3 px-12 focus:outline-none">Button</a>
</div>

### Look & feel

For modern email clients, we use CSS padding on the `<a>` to make the entire button clickable. In Outlook and Windows 10 Mail, because CSS padding isn't supported on anchor tags, the MSO `mso-padding-alt` CSS property can be used on the table cell in order to _preserve the aspect_. 

However, this means that only the text itself will be clickable.

Bulletproof buttons can help us fix that.

## Bulletproof

Bulletproof buttons in HTML email traditionally refer to buttons that are _fully_ clickable in all email clients, including Outlook and Windows 10 Mail. 

### Traditional (VML)

The classic approach to bulletproof buttons is coding them with <abbr title="Vector Markup Language">VML</abbr>, and Campaign Monitor has a very useful [tool](https://buttons.cm/) for this.

However, VML buttons are fixed in size and require you add the URL in two places, which makes them less flexible and harder to maintain.

### Semantic (CSS)

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Credit goes to <a href="https://twitter.com/M_J_Robbins" target="_blank" rel="nofollow noopener noreferrer">@M_J_Robbins</a> for this technique.</div>
</div>

We can use a smart combination of basic and Outlook-specific CSS properties to get fully clickable buttons in HTML - no VML required!

Here's the Filled button, fully clickable in Outlook:

```html
<a 
  href="https://maizzle.com/"
  class="inline-block p-16 text-sm leading-none no-underline p-16 text-white rounded bg-indigo-500 hover:bg-indigo-600">
  <!--[if mso]><i style="letter-spacing: 27px; mso-font-width: -100%; mso-text-raise: 26pt;">&nbsp;</i><![endif]-->
    <span style="mso-text-raise:13pt;">Read more</span>
  <!--[if mso]><i style="letter-spacing: 27px; mso-font-width: -100%;">&nbsp;</i><![endif]-->
</a>
```

It's just a simple `<a>` tag, but with some nifty workarounds for Outlook's lack of support for `padding` on inline elements:

- left/right padding is faked with a `<i>` elements that use `letter-spacing` to grow in width; these elements are wrapped in conditional comments, so they only show in Outlook and Windows 10 Mail
- text is wrapped in a `<span>` and `mso-text-raise` adjusts its vertical position
- the first `<i>` uses double the `pt` that the `<span>` uses
- finally, the width of the `&nbsp;` character is reset (as in, canceled) through the `mso-font-width` property

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Line breaks and spaces between tags in the example above might render the button larger, although it would be barely visible. If you want your button to be a precise size, just remove them.</div>
</div>
