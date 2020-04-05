---
title: "Partials"
slug: "partials"
description: "Learn how to use PostHTML includes to import partials in your HTML email templates"
---

# Partials

Partials are separate files that you can pull into a Template.

## Syntax

To include a Partial in a Template, use the `<include>` tag:

```html
<extends src="layouts/base.html">
  <block name="template">
    <include src="src/partials/example.html"></include>
  </block>
</extends>
```

The path to the Partial file must be relative to the project root.

## Locals

You can pass data to partials, with the help of the `locals=""` attribute:

```html
<extends src="layouts/base.html">
  <block name="template">
    <include 
      src="src/partials/example.html" 
      locals='{"text": "Button"}'
    ></include>
  </block>
</extends>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Currently, you can only pass a valid JSON string to <code>locals</code>.</div>
</div>

## Paths

Partials live in the `src/partials` folder in Maizzle, but you can keep them wherever you'd like - just be sure to update their `purgeCSS` and `browsersync` paths:

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

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">You need to use file globs in these paths, just as shown above. Using directory paths will make PostCSS fail with a <code>EISDIR</code> read error.</div>
</div>


