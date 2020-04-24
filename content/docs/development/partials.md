---
title: "Partials"
slug: "partials"
description: "Learn how to use PostHTML includes to import partials in your HTML email templates"
---

import Alert from '~/components/Alert.vue'

# Partials

Partials are separate files that you can pull into a Template.

## Syntax

To include a Partial in a Template, use the `<include>` tag:

```html
<extends src="src/layouts/base.html">
  <block name="template">
    <include src="src/partials/example.html"></include>
  </block>
</extends>
```

The path to the Partial file must be relative to the project root.

## Locals

You can pass data to partials, with the help of the `locals=""` attribute:

```html
<extends src="src/layouts/base.html">
  <block name="template">
    <include 
      src="src/partials/example.html" 
      locals='{"text": "Button"}'
    ></include>
  </block>
</extends>
```

Need to send variables to the partial?

Simply pass in the `page` object:

```html
<extends src="src/layouts/base.html">
  <block name="template">
    <include 
      src="src/partials/example.html" 
      locals="{{ page }}"
    ></include>
  </block>
</extends>
```

... and then you'll be able to reference it in the partial:

```html
<p>{{ page.title || 'Fallback title' }}</p>
```

## Paths

Partials are referenced relative to the project root, but you can change that by simply adding the `build.includes` config key: 

```js
module.exports = {
  build: {
    includes: {
      root: './src/partials'
    }
  }
}
```

You can now write just the file name relative to that `partials` directory:

```html
<include src="example.html"></include>
```

When changing the path to the partials directory, make sure to update it for `purgeCSS` and `browsersync` as well:

```js
// config.js
module.exports = {
  cleanup: {
    purgeCSS: {
      content: [
        'src/partials/**/*.*', // update if needed
        'src/components/**/*.*',
        // ...
      ],
    },
  },
  browsersync: {
    watch: [
      'src/partials/**/*.*', // update if needed
      'src/components/**/*.*',
      // ...
    ],
  },
}
```

[PurgeCSS](/docs/code-cleanup/#purgecss) needs that path, so that any Tailwind CSS classes in your Partials will not be removed when doing code cleanup. Likewise, [Browsersync](/docs/browsersync) needs to know about it so it can automatically reload your page if a Partial changes.

<alert type="danger">You need to use file globs in these paths, just as shown above. Using directory paths will make PostCSS fail with a <code>EISDIR</code> read error.</alert>
