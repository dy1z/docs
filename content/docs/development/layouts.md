---
title: "Layouts"
slug: "layouts"
description: "See how to use layouts with Nunjucks templating inheritance to build your HTML emails"
---

import Alert from '~/components/Alert.vue'

# Layouts

Layouts are the foundation of any email template in Maizzle.

Besides the standard parent-child templating relation, you can use Layouts to define markup that doesn't need to change often, like `doctype`, and `<head>` or `<body>` tags, with all the necessary child tags, like `<meta>`.

## Creating Layouts

Layouts are typically stored in the `src/layouts` directory.
Create a `layout.html` file with the required tags to yield the CSS and the Template body:

```html
<!DOCTYPE html>
<html>
<head>
  <if condition="page.css">
    <style>{{{ page.css }}}</style>
  </if>
</head>
<body>
  <block name="template"></block>
</body>
``` 

You can use this as a Layout that your Templates [extend](/docs/templates/#extending-layouts).

## Template Blocks

The Layout above uses a `<block>` tag that acts like a 'marker'. 

For each Template that [extends](/docs/templates/#extends) this Layout, that marker is replaced with the contents of the Template's own `<block name="template">` (as long as it has one, obviously).

Of course, you can use custom names for blocks, like `<block name="content">`.

## Variables

Variables from your [environment config](/docs/environments/) or from the Template's own Front Matter are available in a Layout under the `page` object.

You can use curly braces to output variables:

```html
<meta charset="{{ page.charset || 'utf8' }}">
```

As you can see, inside curly braces you can write JavaScript expressions. These will be evaluated and the result will be output in your HTML.

### Compiled CSS

The compiled Tailwind CSS for the current Template is available under `page.css` :

```html
<if condition="page.css">
  <style>{{{ page.css }}}</style>
</if>
```

We use 3 curly braces so that we output the CSS without escaping it - this is required for quoted property values, so that we don't get `&quot;` instead of `"`.

### Environment 

The environment name is available under `page.env`. You can use it to output stuff based on the `build` command that you ran.

For example, we could use `page.env` to output some content only when running the `maizzle build production` command:

```html
<if condition="page.env === 'production'">
  <p>This text will show when running `maizzle build production`</p>
</if>
```

## Configuration

You can add options to `config.js`, to customize the way you use Layouts.

### Encoding

You may specify the encoding used by your Layout files through the `encoding` option:

```js
// config.js
module.exports = {
  build: {
    layouts: {
      encoding: 'windows-1250',
    }
  }
}
```

By default, this is set to `utf8`.

<alert>This encoding is only used when reading a Layout file from disk, it does not automatically set the <code>&lt;meta charset&gt;</code> tag in your compiled Template.</alert>

### Blocks

Normally, Template Blocks are defined through the `<block>` tag, as explained above.

However, you may customize this to your liking:

```js
// config.js
module.exports = {
  build: {
    layouts: {
      slotTagName: 'slot', // default: 'block'
      fillTagName: 'fill' // default: 'block'
    }
  }
}
```

Now you can use `<slot>` tags in the Layout, and `<fill>` tags in your Template:

```html
<!DOCTYPE html>
<html>
<head>
  <if condition="page.css">
    <style>{{{ page.css }}}</style>
  </if>
</head>
<body>
  <slot name="template"></slot>
</body>
```

```html
---
title: "A template with a <fill> tag"
---

<fill name="template"></fill>
```

### Root

You may define a path to the directory where your Layouts live:

```js
// config.js
module.exports = {
  build: {
    layouts: {
      root: 'src/layouts',
    }
  }
}
```

This allows you to specify a `src=""` relative to the path in that `root` key:

```html
<extends src="master.html">
  <block name="template">
    <!--  -->
  </block>
</extends>
```

<alert type="danger">If you're extending a file that also extends a file (i.e. when extending a Template), this will not work. Instead, don't define the <code>root</code> key and only use project root-relative paths (i.e. <code>src/templates/template.html</code>)</alert>

### Tag

You may use a tag name other than `extends`:

```js
// config.js
module.exports = {
  build: {
    layouts: {
      tagName: 'layout',
    }
  }
}
```

```html
<layout src="master.html">
  <block name="template">
    <!-- ... -->
  </block>
</layout>
```
