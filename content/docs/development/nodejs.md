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

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Of course, your <code>html string</code> can use Front Matter and templating tags, so you can extend <a href="/docs/layouts/">Layouts</a>, include <a href="/docs/partials/">Partials</a>, or use <a href="/docs/components/">Components</a>.</div>
</div>

### Options

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
  beforeRender() {},
  afterRender() {},
  afterTransformers() {},
}
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500"><code>options</code> is not required: when ommited, Maizzle will the defaults below.</div>
</div>

###### tailwind

Pass in a custom Tailwind CSS configuration, or a pre-compiled CSS string.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `config` | Object | `{}` | A Tailwind CSS config object. |
| `css` | String | <span class="font-mono text-cool-gray-500">@tailwind components; @tailwind utilities;</span> | A string with CSS in PostCSS syntax. Gets compiled with Tailwind CSS. To use Tailwind, you should at least use _@tailwind utilities_ |
| `compiled` | String | (empty string) | A pre-compiled CSS string, to use as-is. This will skip compilation, resulting in faster render speed. |

###### maizzle

The Maizzle environment configuration object.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `config` | Object | `{}` | A Maizzle config object. |

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">The other options listed above, like <code>afterConfig() {}</code>, are <a href="/docs/events/">Events</a>.</div>
</div>

## Example

```js
const Maizzle = require('@maizzle/framework')

let str = `---
title: Using Maizzle on the server
---

<extends src="src/layouts/base.html">
  <block name="template">
    <table>
      <tr>
        <td class="button">
          <a href="https://maizzle.com">Confirm email address</a>
        </td>
      </tr>
    </table>
  </block>
</extends>`

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
).then(html => console.log(html)).catch(error => console.log(error))
```

## Templating

You can use templating tags when using Maizzle in Node.js.

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-red-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Paths to Layouts or any includes/modules in your string to be rendered must be relative to the location where you execute the script.</div>
</div>

## Gotchas

Since the config you can pass to the `render()` method is optional, there are a few gotchas that you need to be aware of.

### Default Tailwind

If you don't specify a [config object](#tailwind), Maizzle will try to compile Tailwind using `tailwind.config.js` at your current path.

**If the file is not found, Tailwind will be compiled with its [default config](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js).**

That config is not adapted to HTML email design: it uses the default `rem` units and `@media` query breakpoints, which are better suited for _web_ design.

### Safe Class Names

The `safeClassNames` Transformer runs only when an environment name is specified, and as long as that name is not `local`.


If you don't specify it in `maizzle.config`, class names won't be rewritten with email client-safe characters. 
This could break rendering in some clients, such as Gmail.

To avoid this, always specify the environment name:

```js
Maizzle.render('html string',
  {
    maizzle: {
      config: {
        env: 'node',
      },
    }
  }
).then(html => console.log(html))
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">You can use any name for <code>env</code> (except <code>local</code>, which does nothing).</div>
</div>

### Transformers

Transformers, such as CSS inlining or minification, are opt-in: they transform content only when you enable them.
Since you don't need to pass in a Maizzle config object, this means that most of them will not run.

The following Transformers _always_ run, regardless of your config:

- Markdown
- Prevent Widows
- Remove Attributes - removes empty `style` attributes by default
- Transform Contents - processes CSS with PostCSS inside elements with a `postcss` attribute
