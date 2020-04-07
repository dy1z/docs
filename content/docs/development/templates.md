---
title: "Templates"
slug: "templates"
description: "Learn how to create HTML emails with template inheritance in Maizzle"
---

# Templates

Templates in Maizzle contain the body of your email templates.

They're made up of two distinct sections:

1. Front Matter
2. `<extends>` and `<block>` tags

## Front Matter

Templates can override environment config variables and even define new ones, through YAML-style Front Matter.

It looks like this:

```yaml
---
title: "Please confirm your email address"
makeItSo: true
---
```

Each of those variables will be available under the `page` object, which means you can render them in your Templates, like this:

```html
<p>{{ page.title }}</p>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">If you want to use Front Matter, it must be defined at the very top of your Template, on the first line - it will not work otherwise.</div>
</div>

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

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">If there is no file at that path, the build will fail with a <code>Template render error</code></div>
</div>

### How Extending Works

When a Template `<extends>` a Layout, a `<block>` tag with an identical `name=""` attribute is searched for in the Layout being extended. 

If a matching tag is found in the Layout, it will be replaced with the contents of its corresponding `<block>` tag from the Template.

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

## Tags

Tags that you can use for templating logic in Maizzle. These are all provided by the [`posthtml-expressions`](https://github.com/posthtml/posthtml-expressions) plugin.

### Conditionals

You can use if/elseif/else conditionals in your email templates.

For example, the Starter uses it to output a preheader in its Layout:

```html
<if condition="page.preheader">
  <div class="hidden">{{ page.preheader }}</div>
</if>
```

Of course, you can create more complex conditions:

```html
<if condition="page.env === 'node'">
  <p>Using Maizzle programmatically</p>
</if>
<elseif condition="page.env === 'production'">
  <p>We are in production!</p>
</elseif>
<else>
  <p>We are probably developing locally.</p>
</else>
```

###### Custom conditionals tag

You can customize the tag names:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        conditionalTags: ['when', 'ifnotthen', 'otherwise']
      }
    }
    // ...
  }
}
```

Example:

```html
<when condition="page.env === 'node'">
  <p>Using Maizzle programmatically</p>
</when>
<ifnotthen condition="page.env === 'production'">
  <p>We are in production!</p>
</ifnotthen>
<otherwise>
  <p>We are probably developing locally.</p>
</otherwise>
```

### Switch

Need to use a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)?

```html
<switch expression="page.user.subscription">
  <case n="'monthly'">
    <p>Your monthly subscription is about to renew.</p>
  </case>
  <case n="'yearly'">
    <p>Heads up! Yearly renewal coming soon, make sure you have enough money in your account.</p>
  </case>
  <default>
    <p>Your subscription will soon renew.</p>
  </default>
</switch>
```

###### Custom switch tag

You can define custom tags for the switch statement:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        switchTags: ['clause', 'when', 'fallback']
      }
    }
    // ...
  }
}
```

Example:

```html
<clause expression="page.env">
  <when n="'production'">
    production
  </when>
  <fallback>
    fallback
  </fallback>
</clause>
```

### Loops

You can iterate over arrays and objects with the `<each>` tag.

For arrays:

```html
<each loop="item, index in someArray">
  <p>{{ index }}: {{ item }}</p>
</each>
```

For objects:

```html
<each loop="value, key in anObject">
  <p>{{ key }}: {{ value }}</p>
</each>
```

In both cases, you will have access to a `{{ loop }}` object that contains information about the loop currently being executed:

- `loop.index` - the current iteration of the loop (0 indexed)
- `loop.remaining` - number of iterations until the end (0 indexed)
- `loop.first` - boolean indicating if it's the first iteration
- `loop.last` - boolean indicating if it's the last iteration
- `loop.length` - total number of items

Example:

```html
<each loop="item, index in [1,2,3]">
  <p>Number of iterations until the end: {{ loop.remaining }}</p>
</each>
```

###### Custom loop tag

You can customize the name of the loop tag:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        loopTags: ['for']
      }
    }
    // ...
  }
}
```

You can now use a `<for>` tag instead:

```html
<for loop="item, index in [1,2,3]">
  <p>{{ item }}</p>
</for>
```

### Scope

Use `<scope>` tags to provide a data context to the content inside.

Imagine we had this data on the `page` object:

```js
roles {
  author: { name: 'John'},
  editor: { name: 'Jane'},
}
```

We could provide each object as a scope, so we can then access it from the context, instead of going up to the parent:

```html
<!-- Will output 'John' -->
<scope with="page.roles.author">
  {{ name }} <!-- no need to write {{ page.roles.author.name }} -->
</scope>

<!-- Will output 'Jane' -->
<scope with="page.roles.editor">
  {{ name }}
</scope>
```

###### Custom scope tag

You can customize the `<scope>` tag name:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        scopeTags: ['context']
      }
    }
    // ...
  }
}
```

Example:

```html
<!-- Will output 'Jane' -->
<context with="page.roles.editor">
  {{ name }}
</context>
```

### Fetch

You can fetch and display remote content in your email templates.

```html
<fetch url="https://jsonplaceholder.typicode.com/users">
  <each loop="user in response">
    {{ user.name }}
  </each>
</fetch>
```

Inside the tag, you have access to the `{{ response }}` variable.

[`posthtml-fetch`](https://github.com/posthtml/posthtml-fetch) is used, and you can pass options to it.

For example, let's use custom tag and attribute names:

```js
module.exports = {
  build: {
    posthtml: {
      fetch: {
        tags: ['get'],
        attribute: 'resource'
        got: {} // options to pass to got
      }
    }
  }
}
```

We can now use this syntax:

```html
<get resource="https://jsonplaceholder.typicode.com/users/1">
  User name is: {{ response.name }}
</get>
```

### Raw

Need to skip tag and expressions parsing in a whole block?

```html
<raw>
  This will not be parsed:
  <if condition="page.env">
    {{ page.env }}
  </if>
  Neither will this expression: {{ page.env }}
</raw>
```

This will output:

```html
This will not be parsed:
<if condition="page.env">
  {{ page.env }}
</if>
Neither will this expression: {{ page.env }}
```

###### Custom raw tag

The `<raw>` tag name can be customized:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        ignoredTag: 'verbatim'
      }
    }
    // ...
  }
}
```

Example: 

```html
<verbatim>
  This will not be parsed: {{ page.env }}
</verbatim>
```

## Variables

Just as with [Layouts](/docs/layouts/#variables), variables from your [environment config](/docs/environments/) or from the Template's Front Matter are available on the `page` object:

```html
---
preheader: This week's newsletter
---

<extends src="src/layouts/master.html">
  <block name="template">
    {{ page.preheader }}
  </block>
</extends>
```

## Expressions

Curly brace content will be evaluated, so you can use JavaScript expressions:

```html
<extends src="src/layouts/master.html">
  <block name="template">
    doctype is {{ page.doctype || 'not set' }}
  </block>
</extends>
```

The above will render `doctype is html` if you have `doctype: 'html'` set in your environment config. 
It will otherwise fallback to `doctype is not set`.

### Curly Brace Conflicts

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

## Archiving

Maizzle will only compile templates found in your `build.templates.root` path(s), that use the extension defined in `build.templates.extensions`.

However, if you create a lot of emails, your builds can start to slow down, since all templates are rebuilt every time you run the `build` command.

You can archive Templates in two ways:

1. Move them to a directory outside that path, so they don't get copied over to the destination directory (recommended).
2. Change their file extension to something that is not defined in `build.templates.extensions`. They will still be copied over to the destination, but Maizzle will not try to compile them.
