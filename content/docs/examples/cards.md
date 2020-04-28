---
title: "Cards"
slug: "cards"
description: "Create simple, effective attention grabbers in HTML emails with Tailwind CSS in Maizzle"
---

# Cards

The traditional content block for showing article excerpts, like those from a blog.

## Rounded with Shadow

<div class="bg-cool-gray-100 flex py-8 justify-center -mb-1">
  <table class="example w-4/5 sm:w-3/5 lg:w-1/2 font-sans shadow-xl rounded">
    <tr>
      <td>
        <img class="rounded-tl rounded-tr" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=300&q=80" alt="">
      </td>
    </tr>
    <tr>
      <td class="bg-white p-6 rounded-br rounded-bl">
        <span class="text-xs text-cool-gray-500">April 7, 2020</span>
        <h2 style="margin-top:8px;margin-bottom:12px;font-size:24px;line-height:100%;display:block;padding:0;">
          <a href="https://example.com" style="color:#000;display:inline-block;position:relative;margin:0;" class="text-gradient-none no-underline">Lorem ipsum dolor sit amet, consectetur</a>
        </h2>
        <p class="m-0 mb-16 text-base text-cool-gray-500">Anim ullamco anim ipsum Lorem id voluptate consequat excepteur proident cillum mollit. Tempor eiusmod fugiat minim Lorem.</p>
        <a href="https://example.com" class="text-gradient-none text-blue-500 no-underline hover:underline">Learn more &rarr;</a>
      </td>
    </tr>
  </table>
</div>

```html
<table class="w-1/2 sm:w-full font-sans shadow-xl rounded">
  <tr>
    <td>
      <img class="rounded-tl rounded-tr" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=300&q=80" alt="">
    </td>
  </tr>
  <tr>
    <td class="bg-white p-20 rounded-br rounded-bl">
      <span class="text-xs text-cool-gray-500">April 7, 2020</span>
      <h2 class="mt-8 mb-12 text-2xl leading-full">
        <a href="https://example.com" class="text-black hover:text-cool-gray-700 no-underline">Lorem ipsum dolor sit amet, consectetur</a>
      </h2>
      <p class="m-0 mb-16 text-base text-cool-gray-500">Anim ullamco anim ipsum Lorem id voluptate consequat excepteur proident cillum mollit. Tempor eiusmod fugiat minim Lorem.</p>
      <a href="https://example.com" class="text-blue-500 no-underline hover:underline">Learn more &rarr;</a>
    </td>
  </tr>
</table>
```
