---
title: "Layouts"
slug: "layouts"
description: "See how to use layouts with Nunjucks templating inheritance to build your HTML emails"
---

# Layouts

Layouts are the foundation of any email template in Maizzle.

Besides the standard parent-child templating relation, you can use Layouts to define markup that doesn't need to change often, like `doctype`, and `<head>` or `<body>` tags, with all the necessary child tags, like `<meta>`.

## Creating Layouts

Layouts are typically stored in the `src/layouts` directory.

Simply create a `layout.html` file in there, and add a minimal boilerplate with tags to yield the CSS and the Template body:

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

The Layout above defines where the contents of a block should be yielded. It looks for a `<block name="template">` tag in every Template that [extends](/docs/templates/#extends) it.

Of course, you can use custom names for blocks, like `<block name="content">`.

## Variables

Variables from your environment config or from the Template's own Front Matter are available in a Layout under the `page` object.

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

### Environment 

The environment name is available under `page.env`. You can use it to output stuff based on the `build` command that you ran.

For example, we could use `page.env` to output some content only when running the `maizzle build production` command:

```html
<if condition="page.env === 'production'">
  <p>This text will show when running `maizzle build production`</p>
</if>
```

## Root

You can define a path to the directory where your Layouts live:

```js
// config.js
module.exports = {
  build: {
    posthtml: {
      layouts: {
        root: 'src/layouts',
      }
    }
  }
}
```

This allows you to specify a `src=""` relative to the path in that `root` key:

```html
<extends src="base.html">
  <block name="template">
    <!--  -->
  </block>
</extends>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-red-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">If you're extending a file that also extends a file (i.e. when extending a Template), this will not work. Instead, don't define the <code>root</code> key and only use project root-relative paths (i.e. <code>src/templates/template.html</code>)</div>
</div>
