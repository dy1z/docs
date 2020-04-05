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
    assets: {
      source: './src/assets/images',
      destination: 'images',
    },
    destination: {
      path: 'build_local',
      extension: 'html',
    },
    posthtml: {
      plugins: [],
      options: {},
      layouts: {
        root: './',
      },
      modules: {
        root: './'
      },
      templates: {
        root: 'src/templates',
        extensions: 'html',
      },
    },
    tailwind: {
      css: './src/assets/css/main.css',
      config: 'tailwind.config.js',
    },
  },
  // ...
}
```

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

## destination

This allows you to customize the output path and file extension.

### path

Directory path where Maizzle should output the compiled emails. A Jigsaw-inspired `build_${env}` naming pattern is used by default.

```js
destination: {
  path: 'build_local',
},
```

### extension

Define the file extension (without the dot) to be used for all templates that are output. Useful if you need to pass the file to other frameworks or templating languages.

For example, let's output [Laravel Blade](https://laravel.com/docs/5.8/blade) files:

```js
destination: {
  extension: 'blade.php',
},
```

#### permalink

You can override `destination.path` for each Template, with the help of the `permalink` <abbr title="Front Matter">FM</abbr> key:

```html
---
permalink: path/to/file.html
---

<extends src="src/layouts/base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

You can use both relative and absolute file paths.

Output one level above project directory:

```html
---
permalink: ../newsletter.html
---
```

Output at a specific system location:

```html
---
permalink: C:/Users/Cosmin/Newsletter/2019/12/index.html
---
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500"><code>permalink</code> must be a <em>file</em> path, and can be used only in the Template's Front Matter. Using a directory path will result in a build error.</div>
</div>

## posthtml

Templating-related options.

### plugins

Register any PostHTML plugins you would like to use:

```js
posthtml: {
  plugins: [
    require('posthtml-spaceless')(),
  ]
}
```

Maizzle already comes with the following plugins:

- [`posthtml-extend`](https://github.com/posthtml/posthtml-extend)
- [`posthtml-include`](https://github.com/posthtml/posthtml-include)
- [`posthtml-modules`](https://github.com/posthtml/posthtml-modules)
- [`posthtml-expressions`](https://github.com/posthtml/posthtml-expressions)

### options

Pass options to PostHTML.

For example, tell it to ignore `<?php ?>` tags:

```js
posthtml: {
  options: {
    directives: [
      { name: '?php', start: '<', end: '>' },
    ],
  }
}
```

### layouts

You can define the path where your Layouts are located:

```js
posthtml: {
  layouts: {
    root: './src/layouts',
  }
}
```

You could then extend layouts by referencing them relative to that path - no need to write out the full path relative to your project root:

```html
<extends src="base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-red-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">If you're extending a file that also extends a file (i.e. when extending a Template), this will not work. Instead, don't define the <code>root</code> key and only use project root-relative paths (i.e. <code>&lt;extends src="/templates/template.html"&gt;</code>)</div>
</div>

### modules

Just like with Layouts, you can define a base path for your modules:

```js
posthtml: {
  modules: {
    root: './src/components',
  }
}
```

... so you can reference them relative to that path:

```html
<module href="module.html">
  <!-- ... -->
</module>
```

### templates

Options to define your Template's `source` directories and file extensions to look for.

```js
posthtml: {
  templates: {
    root: 'src/templates',
    filetypes: 'html',
  },
}
```

#### root

Define the path to your [Templates](/docs/templates/). This is where Maizzle looks for templates to compile. It's also used by `postcss-purgecss` when scanning for selectors.

It can be a string:

```js
templates: {
  root: 'src/templates',
},
```

Or an array of strings:

```js
templates: {
  root: ['src/templates', '/path/to/more/templates'],
},
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Remember, Maizzle will copy these folders over to the <code>destination.path</code> directory, with <em>everything</em> inside them.</div>
</div>

#### filetypes

Define what file extensions you use for your Templates. 

`filetypes` can be a string, but it can also be an array or a pipe-delimited list:

```js
templates: {
  filetypes: ['html', 'blade.php'], // or even 'html|blade.php'
},
```

Maizzle will only look for files ending in _these_ extensions, when searching your `build.templates.source` directory for Templates to build.

This means you can keep other files alongside your Templates, and Maizzle will simply copy them over to the build destination directory - it will not try to parse them.

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

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="font-semibold mb-2">No effect in Front Matter</div>
  <div class="text-cool-gray-500">Since Tailwind CSS is compiled only once, <em>before</em> Templates are built, using <code>build.tailwind.config</code> in Front Matter will have no effect.</div>
</div>
