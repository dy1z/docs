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
isClimateChangeReal: true
---
```

Each of those variables will be available under the `page` object, which means you can render them in your Templates, like this:

```html
<p>{{ page.title }}</p>
```

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Front Matter must be defined at the very top of your Template, starting on line 1.</div>
</div>

## Extending Layouts

A Template needs to extend a Layout, otherwise it won't render anything.

To do so, simply use the `<extends>` tag right after the Front Matter:

```html
---
preheader: The Weekly Newsletter
---

<extends src="layouts/base.html">
  <!-- Add block tags here -->
</extends>
```

The path provided in the `src=""` attribute must be relative to the path in `build.posthtml.layouts.root` from your config. 

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">If there is no file at that path, the build will fail with a <code class="shiki-inline">Template render error</code></div>
</div>

### How Extending Works

When a Template `<extends>` a Layout, a `<block>` tag with an identical `name=""` attribute is searched for in the Layout being extended. 
If one is found, it will be replaced with the contents of its corresponding `<block>` from the Template.

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

For example, Maizzle uses a `head` block in its default Layout, allowing you to inject additional code into the `<head>` of you HTML email, right from the Template.

## Extending Templates

A Template can also extend another Template 🤯 

For example, imagine `src/templates/first.html` :

```html
<extends src="layouts/base.html">
  <block name="template">
    Parent
    <block name="button">Child in first.html</block>
  </block>
</extends>
```

We could then extend it in `src/templates/second.html` :

```html
<extends src="templates/first.html">
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
<extends src="templates/first.html">
  <block name="template">
    <block name="button">Child in second.html</block>
  </block>
</extends>
```

Result:

```html
Child in second.html
```

## Basic Example

Here's a very basic Template example:

```html
<extends src="layouts/base.html">
  <block name="template">
    <table>
      <tr>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
      </tr>
    </table>
  </block>
</extends>
```

## Variables

Just as with [Layouts](/docs/layouts/#variables), variables from your [environment config](/docs/environments/) or from the Template's Front Matter are available on the `page` object:

```html
---
preheader: This week's newsletter
---

<extends src="layouts/base.html">
  <block name="template">
    {{ page.preheader }}
  </block>
</extends>
```

## Expressions

Contents of curly braces will be evaluated, so you can write JavaScript expressions inside them:

```html
<extends src="layouts/base.html">
  <block name="template">
    doctype is {{ page.doctype || 'not set' }}
  </block>
</extends>
```

The above will render `doctype is html` if you have `doctype: 'html'` set in your environment config. 
It will otherwise fallback to `doctype is not set`.

### Tag Conflicts

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

Maizzle will only compile templates found in your `build.templates.root` path(s).

However, if you create a lot of emails, your builds can start to slow down, since all templates are rebuilt every time you run the `build` command.

Archive Templates (and their assets) that you no longer need built, by simply moving them to a directory outside that path.
