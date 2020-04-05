---
title: "Events"
slug: "events"
description: "Use lifecycle hooks to hook into the email build process at specific points in time"
---

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
      //
    },
    // other events...
  }
},
```

### Node.js

To use Events in a Node context, add them inside the `options` object that you pass to the `render()` method:

```js
const Maizzle = require('@maizzle/framework')
let html = `some HTML string...`

html = Maizzle.render(str, {
    tailwind: {},
    maizzle: {},
    beforeRender(nunjucks, config) {
      // ..
    },
  }
).then(result => console.log(result))
```

## Events

These are the Events that you can use in Maizzle.

The following events are CLI-only - they run only when added inside the `events: {}` object in your `config.js` and when you run one of the [build commands](/docs/commands/):

- [`beforeCreate`](#beforecreate)
- [`afterBuild`](#afterbuild)

These always run, every time a Template is compiled:

- [`beforeRender`](#beforerender)
- [`afterRender`](#afterrender)
- [`afterTransformers`](#aftertransformers)

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">If you don't need to manipulate a Template's unique config or its HTML, consider using one of the CLI-only Events instead.</div>
</div>

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

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Use <code>beforeCreate</code> if you need to your config manipulation to run only <em>once</em>.</div>
</div>

### beforeRender

Runs after the Template's config has been computed, but just before it is rendered. 
It exposes the Template's config, so you can further manipulate it.

For (a silly) example, let's fetch data from an API and set it as the preheader text:

```js
// config.js
const axios = require('axios')

module.exports = {
  events: {
    async beforeRender(config) {
      const url = 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
      config.preheader = await axios('url').then(result => result.data).catch(error => 'Could not fetch preheader, using default one.')
    },    
  },
},
```

Then, you'd render it in your HTML, like so:

```html
<!-- layouts/base.html -->
<if condition="page.preheader">
  <div class="hidden">{{ page.preheader }}</div>
</if>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500"><code>beforeRender</code> runs for each template that is going to be compiled. For performance reasons, you should use it only if you need access to the <em>Template</em> config (which includes variables from the template's Front Matter).</div>
</div>

### afterRender

Runs after the Template has been compiled, but before any Transfomers have been applied.
Exposes the rendered `html` string and the `config`.

You can use it to alter the HTML, even before CSS inlining takes place. 
It's also your last chance to modify any Transformer-related settings in your config.

For example, let's assume that for some reason we change our mind and want to disable inlining. 
Oh, and we also want to rewrite all call-to-action labels (maybe they're coming from an external source, like a database?):

```js
// config.js
module.exports = {
  events: {
    afterRender(html, config) {
      config.inlineCSS.enabled = false
      // must always return the `html`
      return html.replace(/Confirm email/g, 'Confirm your email')
    },    
  },
},
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">You must always return the <code>html</code> when using <code>afterRender()</code>.</div>
</div>

### afterTransformers

Runs after all Transformers have been applied, just before the final HTML is returned.

Same as `afterRender()`, it exposes the `html` and the `config`, so you can do further adjustments to the HTML, or read some config settings.

For example, maybe you don't like the minifier that Maizzle includes, and you had it disabled in your config so that you can use your own once the Template has been compiled:

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
  
      // must always return the `html`
      return html
    },
  },
},
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">You must always return the <code>html</code> when using <code>afterTransformers()</code>.</div>
</div>

### afterBuild

Runs after all Templates have been compiled and output to disk. 
Returns an array with the paths to all the files inside the [`build.destination.path`](/docs/build-paths/#path) directory.

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

Using it with the [default Starter](https://github.com/maizzle/maizzle), `maizzle build production` will output:

```js
[
  'build_production/images/maizzle.png',
  'build_production/promotional.html',
  'build_production/transactional.html'
]
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">The <code>afterBuild</code> event is available only when using the <code>maizzle build</code> CLI command, so it will only work if added to the <code>events</code> object in your environment config.</div>
</div>
