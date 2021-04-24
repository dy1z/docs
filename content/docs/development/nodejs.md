---
title: "Node.js"
slug: "nodejs"
description: "Use Maizzle in Node.js on the server to compile a string to an HTML email, styled with Tailwind CSS"
---

import Alert from '~/components/Alert.vue'

# Use in Node.js

You can use Maizzle in your Node.js app, to compile a string to an HTML email.

## Usage

First, `require()` the framework in your application:

```js
const Maizzle = require('@maizzle/framework')
```

Then, call the `render()` method, passing it a string and an options object:

```js
const {html, config} = Maizzle.render(`html string`, options)
```

The `render()` method returns an object containing the compiled HTML, and the [environment config](/docs/environments/) computed for this template.

And of course, your `html string` can use Front Matter and templating tags, so you can even extend [Layouts](/docs/layouts/) or use [Components](/docs/components/).

### Options

`options` is an object with the following structure:

```js
{
  tailwind: {
    config: {},
    css: '',
    compiled: '',
  },
  maizzle: {},
  beforeRender() {},
  afterRender() {},
  afterTransformers() {},
}
```

<alert><code>options</code> is not required: when ommited, Maizzle will use the defaults below.</alert>

###### tailwind

Pass in a custom Tailwind CSS configuration, or a pre-compiled CSS string.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `config` | Object | `{}` | A Tailwind CSS config object. |
| `css` | String | <span class="font-mono text-cool-gray-500">@tailwind components; @tailwind utilities;</span> | A string with CSS in PostCSS syntax. Gets compiled with Tailwind CSS. To use Tailwind, you should at least use _@tailwind utilities_ |
| `compiled` | String | (empty string) | A pre-compiled CSS string, to use as-is. This will skip Tailwind compilation, resulting in faster render speed. |

###### maizzle

The Maizzle environment configuration object.

| Type | Default | Description |
| --- | --- | --- |
| Object | `{}` | A Maizzle config object. |

<alert>The other options listed above, like <code>beforeRender() {}</code>, are <a href="/docs/events/">Events</a>.</alert>

## Example

```js
const Maizzle = require('@maizzle/framework')

const template = `---
title: Using Maizzle on the server
---

<extends src="src/layouts/main.html">
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
  template,
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
    maizzle: require('./config.js')
  }
).then(({html}) => console.log(html)).catch(error => console.log(error))
```

## Templating

You can use templating tags when using Maizzle in Node.js.

<alert type="danger">Paths to Layouts or any includes/modules in your string to be rendered must be relative to the location where you execute the script.</alert>

## Gotchas

Since the config you can pass to the `render()` method is optional, there are a few gotchas that you need to be aware of.

### Default Tailwind

If you don't specify a [Tailwind config object](#tailwind), Maizzle will try to compile Tailwind using `tailwind.config.js` at your current path.

_If the file is not found, Tailwind will be compiled with its [default config](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js)._

The default config is not optimized for HTML email: it uses units like `rem` and CSS properties that are used for _web_ design and which have little to no support in the majority of email clients.

### Safe Class Names

The `safeClassNames` Transformer runs only when an environment name is specified, and as long as that name is not `local`.


If you don't specify it in the `maizzle` object, class names won't be rewritten with email client-safe characters. 
This could break rendering in some clients, such as Gmail.

To avoid this, always specify the environment name:

```js
Maizzle.render('html string', {
  maizzle: {
    env: 'node',
  }
}).then(({html}) => console.log(html))
```

<alert>You can use any name for <code>env</code> (except <code>local</code>, which does nothing).</alert>

### Transformers

Transformers, such as CSS inlining or minification, are opt-in: they transform content only when you enable them.
Since you don't need to pass in a Maizzle config object, this means that most of them will not run.

The following Transformers always run:

- Markdown (can be disabled)
- Prevent Widows
- Remove Attributes - removes empty `style` attributes by default
- Transform Contents - processes CSS with PostCSS inside elements with a `postcss` attribute
