---
title: "Events"
slug: "events"
description: "Use lifecycle hooks to control the email build process at specific steps"
---

# Lifecycle Hooks

When compiling your email templates, Maizzle goes through a series of steps, like generating a Template config, rendering with Nunjucks, or applying Transformers. 

Along the way, it also runs some functions known as lifecycle hooks. 

We'll call them Events, for short.

## Usage

You can use Events both when developing locally with the CLI `build` or `serve` commands, and when using the `render()` method in Node.js.

### CLI

To use events when developing locally with the CLI commands, add them inside an `events` object in your config:

```js
module.exports = {
  events: {
    afterConfig(config) {
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
const str = `some HTML string...`

html = Maizzle.render(str, {
    tailwind: { /* ... */ },
    maizzle: { /* ... */ },
    beforeRender(nunjucks, config) {
      // ..
    },
  }
)
```

## Events

These are the events that you can use in Maizzle.

The following events are CLI-only, meaning you can only use them in the `events: {}` object in your `config.js`:

- [`beforeCreate`](#beforecreate)
- [`afterBuild`](#afterbuild)

The rest of the events run every time a Template is compiled. Unless you need access to the Template-specific config, or to its HTML, consider using the ones above instead:

- [`afterConfig`](#afterconfig)
- [`beforeRender`](#beforerender)
- [`afterRender`](#afterrender)
- [`afterTransformers`](#aftertransformers)

### beforeCreate

Runs after the [Environment](/docs/environments/) config has been computed, but before Templates are processed.
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

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Use <code class="shiki-inline">beforeCreate</code> if you need to your config manipulation to run only <em>once</em>.</div>
</div>

### afterConfig

Runs right after your Template-specific config has been generated.
It accepts the `config` as a parameter, so you can further customize it.

For example, let's use [Axios](https://github.com/axios/axios) to set a random [Bacon Ipsum](https://baconipsum.com/) preheader:

```js
// config.js
const axios = require('axios')

module.exports = {
  events: {
    async afterConfig(config) {
      const preheader = await axios('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1')
      config.preheader = preheader.data[0]
    },    
  },
},
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600"><code class="shiki-inline">afterConfig</code> runs for each template that is going to be compiled. For performance reasons, you should use it only if you need access to the <em>Template</em> config (which includes variables from the template's Front Matter).</div>
</div>

### beforeRender

Runs after Nunjucks is initialized, but before your Templates are rendered. 
It exposes the Nunjucks environment so you can add your own filters, extensions, or globals.

It also exposes the config, so you can further customize that as well.

As an example, let's add a custom filter to Nunjucks, that will allow us to shorten paragraphs to a custom character length (20 by default):

```js
// config.js
module.exports = {
  events: {
    beforeRender(nunjucks, config) {
      nunjucks.addFilter('shorten', (str, count) => str.slice(0, count || 20))
    },    
  },
},
```

```html
<!-- layouts/default.njk -->
{% if page.preheader %}
  <div class="hidden text-0 leading-0">{{ page.preheader | shorten(35) }}</div>
{% endif %}
```

### afterRender

Runs after the Template has been rendered with Nunjucks, but before any Transfomers have been applied.
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
      // must return `html`
      return html.replace(/Confirm email/g, 'Confirm your email')
    },    
  },
},
```

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">You must always return the <code class="shiki-inline">html</code> when using <code class="shiki-inline">afterRender()</code>.</div>
</div>

### afterTransformers

Runs after all Transformers have been applied, just before the final HTML is returned.

Same as `afterRender()`, it exposes the `html` and the `config`, so you can do further adjustments to the HTML, or read some config settings.

For example, maybe you don't like the minifier that Maizzle includes, and you disabled it in your config so that you can use your own once the template has been compiled:

```js
// config.js
const Minifier = require('imaginary-minifier')

module.exports = {
  minify: {
    enabled: false,
  },
  events: {
    afterTransformers(html, config) {
      // must return `html`
      if (!config.minify.enabled) {
        return Minifier.minify(html)
      }
  
      return html
    },
  },
},
```

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">You must always return the <code class="shiki-inline">html</code> when using <code class="shiki-inline">afterTransformers()</code>.</div>
</div>

### afterBuild

Runs after all Templates have been compiled and output to disk. 

Returns an array with a list of all files inside the [`build.destination.path`](/docs/build-paths/#path) directory.

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

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">The <code class="shiki-inline">afterBuild</code> event is available only when using the <code class="shiki-inline">maizzle build</code> CLI command, so it will only work if added to the <code class="shiki-inline">events</code> object in your environment config.</div>
</div>
