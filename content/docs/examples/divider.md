---
title: "Divider"
description: "Create dividers or horizontal rules for your HTML email template in Maizzle"
---

# Divider

Similar to Spacers, a Divider provides consistent vertical spacing while allowing visual separation of your content.

A Divider has a thin horizontal line in the middle, which you can style to suit your needs. It can be used anywhere a `<table>` is allowed: before/after other tables, or inside table cells or divs.

The spacing above and below the Divider line is defined through the vertical padding of the inner `<td>` element, with Tailwind CSS utilities:

```html
<table class="w-full">
  <tr>
    <td class="py-24">
      <div class="bg-gray-300 h-px leading-px">&amp;zwnj;</div>
    </td>
  </tr>
</table>
```

## How it works

1. `py-24` adds `24px` top and bottom padding
2. The `<div>` is the horizontal line: we set its height and line-height to `1px`, and give it a background color
3. We use a `&zwnj;` to add something inside the `<div>`, so it can take up height

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Feel free to use <code class="shiki-inline">&amp;nbsp;</code> instead of <code class="shiki-inline">&amp;zwnj;</code>, both work just fine 👌</div>
</div>

## Outlook note

The `<div>` element where we use `leading-px` needs some extra attention for Outlook. Otherwise, it will render thicker than intended 😩

To make Outlook respect the line height you set on elements, Maizzle uses a <abbr title="Microsoft Office">MSO</abbr> proprietary CSS rule in the Starter's [default Layout &nearr;](https://github.com/maizzle/maizzle/blob/6c0951ad7f27f00ee5fa62eacd39a2d858e0991b/src/layouts/default.njk#L18)

```css
mso-line-height-rule: exactly;
```

Maizzle also defines a utility class for this, so if you're not using the default Layout you can code your Divider like this:

```html
<table class="w-full">
  <tr>
    <td class="py-24">
      <div class="bg-gray-300 h-px leading-px mso-leading-exactly">&amp;zwnj;</div>
    </td>
  </tr>
</table>
```

## Customization

Use padding utilities on the `<td>` to push and pull the horizontal line as needed.

For example:

```html
<table class="w-full">
  <tr>
    <td class="pt-24 pr-64 pb-48 pl-0">
      <div class="bg-gray-300 h-px leading-px">&amp;zwnj;</div>
    </td>
  </tr>
</table>
```

Need a thicker divider hairline? Bump up the height and line-height:

```html
<table class="w-full">
  <tr>
    <td class="pt-24 pr-64 pb-48 pl-0">
      <div class="bg-gray-300 h-4 leading-4">&amp;zwnj;</div>
    </td>
  </tr>
</table>
```

Shorter Divider on mobile devices? Use the `sm` breakpoint:

```html
<table class="w-full">
  <tr>
    <td class="py-24 px-16 sm-py-12 sm-py-8">
      <div class="bg-gray-300 h-px leading-px">&amp;zwnj;</div>
    </td>
  </tr>
</table>
```

### Vertical

Need a vertical Divider?

```html
<table>
  <tr>
    <td class="bg-black w-px h-64"></td>
  </tr>
</table>
```

