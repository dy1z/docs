---
title: "Divider"
slug: "divider"
description: "Create dividers or horizontal rules for your HTML email template in Maizzle"
---

import Alert from '~/components/Alert.vue'

# Divider

A Divider is basically a thin horizontal line that separates content areas.

Similar to Spacers, Dividers provide consistent vertical spacing while also offering visual separation of your content.

To create a Divider, we can use a regular `<hr>` element:

```html
<hr class="border-0 bg-gray-500 text-gray-500 h-px">
```

## How it works

1. We first reset the `border-width`, so we can apply our own colors
2. We use a combination of `background-color` and `color` - the latter is for Outlook (Windows)
3. Removing the border means the element now has no `height`, so we use `h-px` to set it to `1px`

## Customization

You can customize the divider and give it a custom width or height, change its color, the top/bottom space around it, and even its alignment.

### Width

An `<hr>` goes full width by default, but we can set a custom width.

Let's also use `max-w-full`, to make it responsive:

```js
// tailwind.config.js
module.exports = {
  spacing: {
    '400': '400px',
    // ...,
  }
}
```


```html
<hr class="border-0 bg-gray-500 text-gray-500 h-px w-400 max-w-full">
```

Need a custom width for mobile devices? Use the `sm` breakpoint:

```html
<hr class="border-0 bg-gray-500 text-gray-500 h-px sm:w-64">
```

### Margin

You can customize top and bottom spacing with CSS margins.

For example, let's add `32px` to the top and bottom:

```html
<hr class="border-0 bg-gray-500 text-gray-500 h-px my-32">
```

Need uneven spacing?

```html
<hr class="border-0 bg-gray-500 text-gray-500 h-px mt-16 mb-32">
```

<alert>Note that <code>&lt;hr&gt;</code> elements come with margins by default, so you might want to set a custom one or reset it with <code>m-0</code>. For example, Chrome resets to <code>8px</code>.</alert>

### Alignment

You can use the `align` attribute to align a Divider.

```html
<hr align="right" class="border-0 bg-gray-500 text-gray-500 h-px mt-16 mb-32">
```

By default, it will be centered.

### Vertical

For a vertical Divider, simply use a narrow width and a bigger height:

```html
<hr class="border-0 bg-gray-500 text-gray-500 w-px h-64 m-0">
```

## Other notes

This page initially documented [table-based Dividers](https://github.com/maizzle/docs/blob/5f0d8f04abf5049a1ca6eae542094b9c14f492d8/content/docs/examples/divider.md).

We are now recommending an `<hr>`-based Divider, following Mark Robbins' excellent [goodemailcode.com](https://www.goodemailcode.com/email-code/hr) examples.
