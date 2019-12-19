---
title: "Node.js"
slug: "nodejs"
description: "Use Maizzle in Node.js on the server to compile a string to an HTML email, styled with Tailwind CSS"
---

# Use in Node.js

You can use Maizzle in your Node.js app, to compile a string to an HTML email.

## Usage

First, `require()` the framework in your application:

```js
const Maizzle = require('@maizzle/framework')
```

Then, call the `render()` method, passing it a string and an options object:

```js
const html = Maizzle.render(`html string`, options)
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Of course, your <code class="shiki-inline">html string</code> can use Front Matter and Nunjucks templating, so you can extend <a href="/docs/layouts/">Layouts</a>, include <a href="/docs/partials/">Partials</a>, or use <a href="/docs/components/">Components</a>. 
  <br><br>See <a href="#nunjucks">Nunjucks section</a> below.</div>
</div>

`options` is an object with the following structure:

```js
{
  tailwind: {
    config: {},
    css: '',
    compiled: '',
  },
  maizzle: {
    config: {},
  },
  afterConfig() {},
  beforeRender() {},
  afterRender() {},
  afterTransformers() {},
}
```

###### `tailwind`

| Option | Required | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `config` | Yes | Object | `null` | A Tailwind CSS config object. |
| `css` | No | String | @tailwind components; @tailwind utilities; | A string with CSS in PostCSS syntax. Gets compiled with Tailwind CSS. To use Tailwind, you should at least use _@tailwind utilities_ |
| `compiled` | No | String | '' | A CSS string to use as-is. If provided, will override `css`. This will not be compiled with Tailwind, resulting in faster render time. |

###### `maizzle`

| Option | Required | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `config` | Yes | Object | null | A complete Maizzle config object. |

Besides `tailwind` and `maizzle`, as you can see you can also pass certain functions to the `options` object. These are lifecycle hooks, also called [Events](/docs/events/) in Maizzle.

## Example

```js
const Maizzle = require('@maizzle/framework')

let str = `---
title: Using Maizzle on the server
layout: src/layouts/master.njk
---

{% block template %}
<table>
  <tr>
    <td class="button">
      <a href="https://maizzle.com">Confirm email address</a>
    </td>
  </tr>
</table>
{% endblock %}`

Maizzle.render(
  str,
  {
    tailwind: {
      config: require('./tailwind.config'),
      css: `
        @tailwind utilities;
        .button { @apply rounded text-center bg-blue-500 text-white; }
        .button:hover { @apply bg-blue-700; }
        .button a { @apply inline-block py-16 px-24 text-sm font-semibold no-underline text-white; }
      `,
    },
    maizzle: {
      config: require('./config'),
    }
  }
).then(html => console.log(html))
```

## Nunjucks

You can use [Nunjucks templating](https://mozilla.github.io/nunjucks/templating.html) to extend a [Layout](/docs/layouts/) or include [Partials](/docs/partials/) or [Components](/docs/components/) when using Maizzle in Node.js.

<div class="bg-gray-100 border-l-4 border-gradient-b-red-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Paths to Layouts or any includes in your string to be rendered must be relative to the location where you execute the script.</div>
</div>

## Env Config

You should always provide the `render()` method with a _full_ Maizzle config object.

This means that if you want to use the default `config.production.js` that Maizzle comes with (which only contains options that need to be different from the base config), you should first merge it with the base `config.js` and provide _that_ in the options object of the `render()` method.

We can do this with the [`deepmerge`](https://www.npmjs.com/package/deepmerge) package.

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">This is also what Maizzle does internally when you run <code class="shiki-inline">maizzle build [env]</code>.</div>
</div>

1\. First, make sure to install the package in your project:

```sh
npm i deepmerge
```

2\. Next, create a merged Maizzle config in your script, and pass it to `render()`:

```js
const deepmerge = require('deepmerge')
const Maizzle = require('@maizzle/framework')
// create a full config for production
const maizzleConfig = deepmerge(require('./config'), require('./config.production'))

let str = `---
title: Using Maizzle on the server
layout: src/layouts/master.njk
---

{% block template %}
<table>
  <tr>
    <td class="rounded text-center bg-blue-500 hover-bg-blue-700 text-white">
      <a href="https://maizzle.com" class="inline-block py-16 px-24 text-sm font-semibold no-underline text-white">Confirm email address</a>
    </td>
  </tr>
</table>
{% endblock %}`

Maizzle.render(
  str,
  {
    tailwind: {
      config: require('./tailwind.config'),
    },
    maizzle: {
      config: maizzleConfig,
    }
  }
).then(html => console.log(html))
```
