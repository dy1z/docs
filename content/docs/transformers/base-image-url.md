---
title: "Base Image URL"
slug: "base-image-url"
description: "Set a base image URL and easily use absolute URLs or a CDN for your HTML email template images"
---

# Base Image URL

Define a base URL that will be prepended to all image sources in your email. It will be applied to both inline and background images.

Useful if you already host your images somewhere like a CDN, so you don't have to write the full URL every time when developing.

Make it globally available by setting it in your environment config:

```js
// config.production.js
module.exports = {
  baseImageURL: 'https://cdn.example.com',
  // ...
}
```

Override it for a single template, through Front Matter:

```html
---
baseImageURL: 'https://res.cloudinary.com/user/image/upload/v1234567890/'
---

<extends src="src/layouts/base.html">
  <block name="template">
    <img  src="example.jpg">
  </block>
</extends>
```

## Trailing slash

Mind the trailing slash on your URL, this influences how you reference images:

```html
<!-- baseImageURL: 'https://cdn.example.com/img' -->
<img src="/folder/product-1.png">

<!-- baseImageURL: 'https://cdn.example.com/img/' -->
<img src="folder/product-1.png">
```

## Disabling

Disable `baseImageURL` by setting its value to an empty string or a falsy value.

Here's an example of how you can do that with Front Matter:

```js
---
baseImageURL: ''
---
```

or

```js
---
baseImageURL: false
---
```
