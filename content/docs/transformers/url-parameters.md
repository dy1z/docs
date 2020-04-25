---
title: "URL Parameters"
slug: "url-parameters"
description: "Easily append custom URL parameters to links in your HTML email template"
---

# URL Parameters

Maizzle can automatically append custom parameters to your URLs.

## Global

To add the same parameters to all URLs in all Templates, use your environment config:

```js
// config.production.js
module.exports = {
  urlParameters: {
    _options: {
      tags: ['a'], 
      qs: {},
    },
    utm_source: 'maizzle',
    utm_campaign: 'Campaign Name',
    utm_medium: 'email',
    custom_parameter: 'foo',
    '1stOfApril': 'bar',
  }
  // ...
}
```

## Local

Of course, you can define URL parameters at a Template level, through Front Matter:

```html
---
title: "These URL params are unique to this template"
urlParameters:
  utm_source: custom
  utm_campaign: "Pre-launch August"
---

<extends src="src/layouts/base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

## Options

You can define a few options.

### tags

Type: `array`
<br>
Default: `['a']`

Array of tag names to process. Only URLs inside `href=""` attributes of tags in this array will be processed.

### qs

Options to pass to the [query-string](https://github.com/sindresorhus/query-string#stringifyobject-options) library.

For example, Maizzle disables encoding by default, but you can enable it:

```js
module.exports = {
  urlParameters: {
    _options: {
      qs: {
        encode: true
      },
    },
    foo: '@Bar@',
  }
  // ...
}
```

Result:

```
https://example.com/?foo=%40Bar%40
```
