---
title: "Alerts"
slug: "alerts"
description: "Create simple, effective attention grabbers in HTML emails with Tailwind CSS in Maizzle"
---

# Alerts

Simple, colorful boxes that grab the user's attention.

## Filled

The basic alert type

<div class="bg-cool-gray-100 flex p-8 justify-center -mb-1">
  <table class="example w-full">
    <tr>
      <td class="bg-blue-500 text-lg text-white py-4 px-8">
        This is an alert with background colour
      </td>
    </tr>
  </table>
</div>

```html
<table class="w-full">
  <tr>
    <td class="bg-blue-500 text-white py-16 px-32">
      This is an alert with background colour
    </td>
  </tr>
</table>
```

## Outlined

This one has a 2px border.

<div class="bg-cool-gray-100 flex p-8 justify-center -mb-1">
  <table class="example w-full border-2 border-blue-500">
    <tr>
      <td class="text-blue-500 text-lg py-4 px-8">
        This is an alert with an outline border
      </td>
    </tr>
  </table>
</div>

```html
<table class="w-full border-2 border-solid border-blue-500">
  <tr>
    <td class="text-blue-500 text-lg py-16 px-32">
      This is an alert with an outline border
    </td>
  </tr>
</table>
```

## Announcement

A two column table with a button.

<div class="bg-cool-gray-100 flex p-8 justify-center -mb-1">
  <table class="example w-full">
    <tr>
      <td class="bg-blue-500 text-white rounded" style="padding: 16px 32px;">
        <table class="example w-full">
          <tr>
            <td class="text-lg w-8/12">
              📢 We have some big news for you!
            </td>
            <td class="w-4/12">
              <table class="example">
                <tr>
                  <th class="bg-white hover:bg-blue-50 text-blue-500 text-center rounded">
                    <button class="w-full text-sm font-bold leading-full no-underline" style="padding: 12px 40px;">Learn more</button>
                  </th>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>

```html
<table class="w-full">
  <tr>
    <td class="bg-blue-500 text-white rounded py-16 px-32">
      <table class="w-full">
        <tr>
          <th class="text-lg w-8/12 inline-block sm:w-full">
            📢 We have some big news for you!
          </th>
          <th class="w-4/12 inline-block sm:w-full">
            <table class="">
              <tr>
                <th class="bg-white hover:bg-blue-50 text-center rounded" style="mso-padding-alt: 12px 48px;">
                  <a href="" class="w-full text-blue-500 text-sm leading-full no-underline py-12 px-48">Learn more</a>
                </th>
              </tr>
            </table>
          </th>
        </tr>
      </table>
    </td>
  </tr>
</table>
```
