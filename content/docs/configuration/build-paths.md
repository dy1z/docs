---
title: "Build Paths"
slug: "build-paths"
description: "Configure build source and destination paths for Maizzle to process and output your email templates"
---

# Build Paths

This is where you define source and destination paths and files for Maizzle to use.

Let's first take a look at all the options:

```js
// config.js
module.exports = {
  build: {
    destination: {
      path: 'build_local',
      extension: 'html',
    },
    layout: 'src/layouts/master.njk',
    templates: {
      source: 'src/templates',
      filetypes: 'html|njk|nunjucks',
    },
    tailwind: {
      css: 'src/assets/css/main.css',
      config: 'tailwind.config.js',
    },
    assets: {
      source: 'src/assets/images',
      destination: 'images',
    },
  },
  // ...
}
```

## destination

This allows you to customize the output path and file extension.

### path

Directory path where Maizzle should output the compiled emails. A Jigsaw-inspired `build_${env}` naming pattern is used by default.

```js
destination: {
  path: 'build_local',
},
```

#### permalink

You can override `destination.path` for each Template, with the `permalink` <abbr title="Front Matter">FM</abbr> key:

```handlebars
---
permalink: path/to/file.html
---

{% block template %}
  <!-- ... -->
{% endblock %}
```

You can use both relative and absolute file paths.

```handlebars
---
# Relative - output one level above project directory
permalink: ../newsletter.html
---
```

```handlebars
---
# Absolute - output at a specific system location
permalink: C:/Users/Cosmin/Newsletter/2019/12/index.html
---
```

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">
    <code class="shiki-inline">permalink</code> must be a <em>file</em> path, and can be used only in the Template's Front Matter. Using a directory path will result in a build error.
  </div>
</div>

### extension

Define the file extension (without the dot) to be used for all templates that are output. Useful if you need to pass the file to other frameworks or templating languages.

For example, let's output [Laravel Blade](https://laravel.com/docs/5.8/blade) files:

```js
destination: {
  extension: 'blade.php',
},
```

## layout

Path to the file that you want to use as the [default Layout](/docs/templates/#default-layout). 
This will be used for all templates that do not specify a Layout to extend in their Front Matter.

```js
build: {
  layout: 'src/layouts/master.njk',
},
```

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">If the file does not exist, build will fail and the script will exit.</div>
</div>

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">You can <a href="/docs/templates/#extending-layouts">override this from a Template</a>, with the <code class="shiki-inline">layout</code> Front Matter key.</div>
</div>

## templates

Options to define your Template's `source` directories and file extensions to look for.

```js
templates: {
  source: 'src/templates',
  filetypes: 'html|njk|nunjucks',
},
```

### source

Define the path to your [Templates](/docs/templates/). This is where Maizzle looks for templates to compile. It's also used by `postcss-purgecss` when scanning for selectors.

It can be a string:

```js
templates: {
  source: 'src/templates',
  // ...
},
```

Or an array of strings:

```js
templates: {
  source: ['src/templates', '/path/to/more/templates'],
  // ...
},
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Remember, Maizzle will copy these folders over to the <code class="shiki-inline">destination.path</code> directory, with <em>everything</em> inside them.</div>
</div>

### filetypes

Define what file extensions you use for your Templates. 

Maizzle will only look for files ending in _these_ extensions, when searching your `build.templates.source` directory for Templates to build.

```js
templates: {
  filetypes: ['html', 'njk', 'nunjucks'], // or 'html|njk|nunjucks'
},
```

This means you can keep other files alongside your Templates, and Maizzle will simply copy them over to the build destination directory - it will not try to parse them.

You can define `filetypes` as an array, or as a pipe-delimited list of strings.

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">While you can use any file extension for your Templates, <code class="shiki-inline">njk</code> is recommended, as it clearly shows that Nunjucks templating is being used.</div>
</div>


## tailwind

Paths for Tailwind CSS.

```js
build : {
  tailwind: {
    css: 'src/assets/css/main.css',
    config: 'tailwind.config.js',
  },
},
```

### css

Paths to your [main CSS file](/docs/tailwindcss/#maincss), that will be compiled with Tailwind CSS.

### config

Path to the Tailwind CSS config file to use.

You can use this to specify a Tailwind config file for any build scenario.

For example, you might want to use a separate Tailwind config, where you:

- define fewer theming options (faster CSS compilation)
- disable `!important` (like in ⚡4email templates)
- use different Tailwind plugins

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="font-semibold mb-2">No effect in Front Matter</div>
  <div class="text-gray-600">Since Tailwind CSS is compiled only once, <em>before</em> Templates are built, using <code class="shiki-inline">build.tailwind.config</code> in Front Matter will have no effect.</div>
</div>

## assets

Source and destination directories for your asset files.

At build time, `assets.destination` will be created relative to `build.destination`, and everything inside `assets.source` will be copied into it:

```js
assets: {
  source: 'src/assets/images',
  destination: 'images',
},
```

You can use it to store _any_ global email assets, not just images.

## Nunjucks

You can configure the Nunjucks environment by adding a `nunjucks` object.

Currently, Maizzle only supports customizing the `path` and `tags` for Nunjucks:

```js
// config.js
module.exports = {
  build: {
    // ..
    nunjucks: {
      path: '/Code/emails/project-name',
      tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '[[',
        variableEnd: ']]',
        commentStart: '<#',
        commentEnd: '#>'
      }
    },
  },
}
```

### path

Use the `path` key to define a base path for Nunjucks to use - extends, includes, components will all be referenced relative to it.

### tags

Customize the default syntax for Nunjucks blocks, variables, and comments.

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Careful! Angle brackets for Nunjucks tags like <code class="shiki-inline">&lt;</code> and <code class="shiki-inline">&gt;</code> can trip up the minifier or inliner. Both <a href="https://github.com/Automattic/juice#juicecodeblocks" target="_blank" ref="noopener noreferrer">Juice</a> and <a href="https://github.com/kangax/html-minifier#options-quick-reference" target="_blank" rel="noopener noreferrer">html-minifier</a> have options to mitigate this.</div>
</div>
