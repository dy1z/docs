---
title: "Events"
slug: "events"
description: "Use lifecycle hooks to hook into the email build process at specific points in time"
---

import Alert from '~/components/Alert.vue'

# Events

When compiling your email templates, Maizzle goes through a series of steps, like generating a Template config, rendering, or applying Transformers.

You can hook into the build process and manipulate it, by using functions that run before or after some of these steps.

## Usage

You can use Events both when developing locally with the CLI `build` or `serve` commands, and when using the `render()` method in Node.js.

### CLI

To use events when developing locally with the CLI commands, add them inside an `events` object in your config:

```js
module.exports = {
  events: {
    beforeCreate(config) {
      // do stuff with config
    },
    // some other event...
  }
},
```

### Node.js

To use Events in a Node context, add them inside the second argument that you pass to the `render()` method:

```js
const Maizzle = require('@maizzle/framework')
let html = `some HTML string...`

html = Maizzle.render(str, {
    tailwind: {},
    maizzle: {},
    beforeRender(config) {
      // ...
    },
  }
).then(({html}) => console.log(html))
```

## Events

These are the Events that you can use in Maizzle.

The following Events are CLI-only - they run only when added inside the `events: {}` object in your `config.js` and when you run one of the [build commands](/docs/commands/):

- [`beforeCreate`](#beforecreate)
- [`afterBuild`](#afterbuild)

These always run, every time a Template is compiled:

- [`beforeRender`](#beforerender)
- [`afterRender`](#afterrender)
- [`afterTransformers`](#aftertransformers)

<alert>If you don't need to manipulate a Template's unique config or its HTML, consider using one of the CLI-only Events instead.</alert>

### beforeCreate

Runs after the [Environment config](/docs/environments/) has been computed, but before Templates are processed.
Exposes the config object so you can further customize it.

For example, let's use a custom highlight function for Markdown fenced code blocks:

```js
const Prism = require('prismjs')

module.exports = {
  // ...
  events: {
    async beforeCreate(config) {
      config.markdown.highlight = (code, lang, callback) => {
        return Prism.highlight(code, Prism.languages[lang], lang)
      }
    },
  },
}
```

<alert>Use <code>beforeCreate</code> if you need to your config manipulation to run only <em>once</em>.</alert>

### beforeRender

Runs after the Template's config has been computed, but just before it is compiled.
It exposes the Template's config, so you can further manipulate it.

For (a silly) example, let's fetch data from an API and set it as the preheader text:

```js
// config.js
const axios = require('axios')

module.exports = {
  events: {
    async beforeRender(config) {
      const url = 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
      config.preheader = await axios(url).then(result => result.data).catch(error => 'Could not fetch preheader, using default one.')
    },
  },
},
```

Then, you'd render it in your HTML, like so:

```html
<!-- layouts/master.html -->
<if condition="page.preheader">
  <div class="hidden">{{ page.preheader }}</div>
</if>
```

<alert><code>beforeRender</code> runs for each template that is going to be compiled. For performance reasons, you should use it only if you need access to the <em>Template</em> config (which includes variables from the template's Front Matter).</alert>

### afterRender

Runs after the Template has been compiled, but before any Transfomers have been applied.
Exposes the rendered `html` string and the `config`.

It's your last chance to alter the HTML or any settings in your config, before Transformers process your email template.

For example, let's disable CSS inlining:

```js
// config.js
module.exports = {
  events: {
    afterRender(html, config) {
      config.inlineCSS.enabled = false

      // must always return the `html`
      return html
    },
  },
},
```

<alert type="warning">You must always return the <code>html</code> when using <code>afterRender()</code>.</alert>

### afterTransformers

Runs after all Transformers have been applied, just before the final HTML is returned.

Same as `afterRender()`, it exposes the `html` and the `config`, so you can do further adjustments to the HTML, or read some config settings.

For example, maybe you don't like the minifier that Maizzle includes, and you disabled it in your config so that you can use your own after the Template has been compiled:

```js
// config.js
const Minifier = require('imaginary-minifier')

module.exports = {
  minify: {
    enabled: false,
  },
  events: {
    afterTransformers(html, config) {
      if (!config.minify.enabled) {
        return Minifier.minify(html)
      }

      return html
    },
  },
},
```

<alert type="warning">You must always return the <code>html</code> when using <code>afterTransformers()</code>.</alert>

### afterBuild

Runs after all Templates have been compiled and output to disk.
Returns an array with the paths to all the files inside the [`destination.path`](/docs/build-config/#path) directory.

```js
// config.js
module.exports = {
  events: {
    afterBuild(files) {
      console.log(files)
    },
  },
},
```

Using it with the [Starter](https://github.com/maizzle/maizzle), `maizzle build production` will output:

```js
[
  'build_production/images/maizzle.png',
  'build_production/promotional.html',
  'build_production/transactional.html'
]
```

<alert type="warning">The <code>afterBuild</code> event is available only when using the <code>maizzle build</code> CLI command, so it will only work if added to the <code>events</code> object in your environment config.</alert>
