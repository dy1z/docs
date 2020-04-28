---
title: "Grids"
slug: "grids"
description: "Learn how to create a simple grid system for HTML email with Tailwind CSS in Maizzle"
---

import Alert from '~/components/Alert.vue'

# Grids

You'll sometimes need to create multi-column HTML email layouts.
Here's how to create a responsive email grid with Tailwind CSS in Maizzle.

## Percentage

The simplest (and recommended) approach is to use Tailwind percentage widths:

<div class="bg-cool-gray-100 flex p-8 justify-center -mb-1">
  <table class="example w-full max-w-600" cellpadding="8">
    <tr>
      <td class="w-4/12 bg-cool-gray-200">4 cols</td>
      <td class="w-8/12 bg-cool-gray-300">8 cols</td>
    </tr>
  </table>
</div>

```html
<table class="w-600 sm:w-full">
  <tr>
    <td class="w-4/12">4 cols</td>
    <td class="w-8/12">8 cols</td>
  </tr>
</table>
```

Tailwind comes configured with `2`, `3`, `4`, `5`, `6` and `12` column grids, so you can create columns with classes like `w-2/3` or `w-4/6`.

### Full Grid

Here's how the full grid looks like:

<div class="flex justify-center -mb-1 text-cool-gray-500">
  <div class="max-w-600 w-full mx-auto leading-8">
    <div class="w-1/12 bg-cool-gray-100 text-cool-gray-500 text-center text-sm whitespace-no-wrap">w-1/12</div>
    <div class="w-2/12 bg-cool-gray-100 text-cool-gray-500 text-right pr-4 whitespace-no-wrap">w-2/12</div>
    <div class="w-3/12 bg-cool-gray-200 text-cool-gray-500 text-right pr-4">w-3/12</div>
    <div class="w-4/12 bg-cool-gray-300 text-cool-gray-500 text-right pr-4">w-4/12</div>
    <div class="w-5/12 bg-cool-gray-400 text-cool-gray-600 text-right pr-4">w-5/12</div>
    <div class="w-6/12 bg-cool-gray-500 text-cool-gray-300 text-right pr-4">w-6/12</div>
    <div class="w-7/12 bg-cool-gray-600 text-cool-gray-300 text-right pr-4">w-7/12</div>
    <div class="w-8/12 bg-cool-gray-700 text-cool-gray-300 text-right pr-4">w-8/12</div>
    <div class="w-9/12 bg-cool-gray-800 text-cool-gray-300 text-right pr-4">w-9/12</div>
    <div class="w-10/12 bg-cool-gray-700 text-cool-gray-300 text-right pr-4">w-10/12</div>
    <div class="w-11/12 bg-cool-gray-800 text-cool-gray-300 text-right pr-4">w-11/12</div>
    <div class="w-full bg-cool-gray-900 text-cool-gray-300 text-right pr-4">w-full</div>
  </div>
</div>

## Fixed

Of course, you can use fixed widths if you prefer.

For example, imagine we registered `'272': '272px'` in the `spacing` section of Tailwind. 
We could then create two fixed width columns like this:

<div class="bg-cool-gray-100 flex p-8 justify-center -mb-1">
  <table class="example w-full max-w-600" cellpadding="8">
    <tr>
      <td class="bg-cool-gray-200" width="272">6 cols</td>
      <td class="bg-cool-gray-300" width="272">6 cols</td>
    </tr>
  </table>
</div>

```html
<table class="w-600 sm:w-full">
  <tr>
    <td class="w-272">6 cols</td>
    <td class="w-272">6 cols</td>
  </tr>
</table>
```

## Stacking

Responsive HTML emails usually reset the columns to stack on mobile.
We can easily achieve this with a couple utility classes.

Consider the percentage example above:

<div class="bg-cool-gray-100 flex p-8 justify-center -mb-1">
  <table class="example w-full max-w-600" cellpadding="8">
    <tr>
      <td class="w-full sm:w-4/12 inline-block bg-cool-gray-200">4 cols</td>
      <td class="w-full sm:w-8/12 inline-block bg-cool-gray-300">8 cols</td>
    </tr>
  </table>
</div>

```html
<table class="w-600 sm:w-full">
  <tr>
    <td class="w-4/12 sm:w-full inline-block">4 cols</td>
    <td class="w-8/12 sm:w-full inline-block">8 cols</td>
  </tr>
</table>
```

<alert>Some email clients strip the <code>doctype</code> of your email, which prevents <code>inline-block</code> from working on <code>&lt;td&gt;</code>. This can be fixed by using <code>&lt;th&gt;</code> instead, but requires resetting the font weight and text alignment.</alert>

<alert>Need a custom column stacking order on mobile? See the <g-link to="/docs/reverse-stack/">reverse stack</g-link> docs.</alert>
