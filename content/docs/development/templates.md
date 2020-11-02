---
title: "Templates"
slug: "templates"
description: "Learn how to create HTML emails with template inheritance in Maizzle"
---

import Alert from '~/components/Alert.vue'

# Templates

Templates in Maizzle contain the body of your email templates.

They're made up of two distinct sections:

1. Front Matter
2. Your HTML

## Front Matter

Templates can define variables and even override existing ones in your config, through YAML-style Front Matter.

It looks like this:

```yaml
---
title: "Please confirm your email address"
---
```

Front Matter variables are available under the `page` object, which means you can render them in your Templates, like this:

```html
<p>{{ page.title }}</p>
```

<alert type="warning">If you want to use Front Matter, it must be defined at the very top of your Template, on the first line - it will not work otherwise.</alert>

## Extending Layouts

A Template can extend a Layout using the `<extends>` tag:

```html
---
preheader: The Weekly Newsletter
---

<extends src="src/layouts/master.html">
  <!-- Add block tags here -->
</extends>
```

The path provided in the `src=""` attribute must be relative to the path in `build.layouts.root` from your config. 

<alert type="warning">If there is no file at that path, the build will fail with a <code>Template render error</code></alert>

### How Extending Works

When a Template `<extends>` a Layout, a `<block>` tag with an identical `name=""` attribute is searched for in the Layout being extended. 

Each matching tag found in the Layout will be replaced with the contents of its corresponding `<block>` tag from the Template.

### Extending Templates

A Template can also extend another Template.

For example, imagine `src/templates/first.html` :

```html
<extends src="src/layouts/master.html">
  <block name="template">
    Parent
    <block name="button">Child in first.html</block>
  </block>
</extends>
```

We could then extend it in `src/templates/second.html` :

```html
<extends src="src/templates/first.html">
  <block name="button">Child in second.html</block>
</extends>
```

The body of `second.html` would be:

```html
Parent
Child in second.html
```

Of course, if we use a `template` block in `second.html`, then we overwrite everything in `first.html`:

```html
<extends src="src/templates/first.html">
  <block name="template">
    Second
    <block name="button">Child in second.html</block>
  </block>
</extends>
```

Result:

```html
Second
Child in second.html
```

## Blocks

For a Layout to render a Template's body, that body must be wrapped in a `<block>` that has the same `name=""` attribute in both the Template and the Layout.
 
In the Starter, we named it `template`:

```html
<block name="template">
  <!-- email body -->
</block>
```

Everything inside that `<block>` will be output into the Layout that the Template extends, wherever a `<block name="template"></block>` is found.

### Multiple Blocks

Your Templates can use as many blocks as you need. 

For example, the [Starter](https://github.com/maizzle/maizzle) uses a `head` block in its master Layout, allowing you to inject additional code into the `<head>` of you HTML email, right from the Template.

## Basic Example

Here's a very basic Template example:

```html
<extends src="src/layouts/master.html">
  <block name="template">
    <table>
      <tr>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
      </tr>
    </table>
  </block>
</extends>
```

## Expressions

Maizzle uses [`posthtml-expressions`](https://github.com/posthtml/posthtml-expressions), allowing you to access variables from your [environment config](/docs/environments/) or from the Template's Front Matter, inside curly brace syntax:

```html
<extends src="src/layouts/master.html">
  <block name="template">
    You ran the `maizzle build {{ page.env }}` command
  </block>
</extends>
```

Running `maizzle build production` would render this:

```html
You ran the `maizzle build production` command
```

You can even use _some_ JavaScript expressions within curly braces:

```html
<extends src="src/layouts/master.html">
  <block name="template">
    doctype is {{ page.doctype || 'not set' }}
    this email {{ page.env === 'production' ? "is" : "isn't" }} production ready!
  </block>
</extends>
```

### Escaping

Other templating engines, as well as many <abbr title="Email Service Provider">ESP</abbr>s  also use the `{{ }}` syntax.

If you want to output the curly braces as they are, so you can evaluate them at a later stage, you have two options:

1. Use `@{{ }}`

  The Blade-inspired syntax is useful for one-offs, where you need to ignore a single expression.
  The compiled email will render `{{ }}` without the `@`.

2. Use the `<raw>` tag

  This is useful if you have multiple lines containing `{{ }}` and want to ignore them all in one go:

  ```html
  <raw>
    Nostrud laboris sunt Lorem {{ var1 }} cupidatat fugiat tempor ad tempor anim.
    Veniam non sit {{ var2 }} ipsum ad qui.
  </raw>
  ```

  The `<raw>` tag will be removed in the final output, but the curly braces will be left untouched.

### Options

You can configure `posthtml-expressions` in your `config.js`:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        // posthtml-expressions options
      }
    }
  }
}
```

Besides configuring templating tag names, here you can also pass other options to the plugin. For example, you could change the default expression delimiters from `{{ }}` to something like `[[ ]]`:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        delimiters: ['[[', ']]']
      }
    }
  }
}
```

You'd now use variables or expressions like this:

```html
<extends src="src/layouts/master.html">
  <block name="template">
    doctype is [[ page.doctype || 'not set' ]]
  </block>
</extends>
```

See all [`posthtml-expressions` options](https://github.com/posthtml/posthtml-expressions#options).

## Archiving

Maizzle will only compile templates found in path(s) you have defined in `build.templates.source`, and which use the extension defined in `build.templates.extensions`.

If you create a lot of emails, your builds can start to slow down, since all templates are rebuilt every time you run the `build` command.

You can archive Templates in two ways:

1. Move them to a directory outside the one defined in `build.templates.source`, so they don't get copied over to the destination directory (recommended).
2. Change their file extension to something that is not defined in `build.templates.filetypes`. They will still be copied over to the destination, but Maizzle will not try to compile them.
