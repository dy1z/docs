---
title: "Components"
slug: "components"
description: "Import components into your HTML email templates and render them with custom slot content and data"
---

import Alert from '~/components/Alert.vue'

# Components

Components are files that you can pull into a Template. 
You can pass data and content to them, and they help you organize blocks of markup that you use often.

## Syntax

To create a Component, simply create an HTML file with a `<content>` tag:

```html
<!-- src/components/example.html -->
<content></content>
```

The `<content>` tag is where content passed to the Component will be output.

<alert type="info">You can safely omit the <code>&lt;content&gt;</code> tag if you're using Components as includes, and don't actually need to pass any content to them.</alert>

To use a Component in a Template, you can use the `<component>` tag:

```html
<component src="src/components/example.html">
  This text will replace the `content` tag in the Component.
</component>
```

## Configuration

You can define where you keep your Components and what markup they use.

### Attribute

Use a custom attribute name:

```js
module.exports = {
  build: {
    components: {
      attribute: 'href',
    }
  }
}
```

You can now use it like this:

```html
<component href="src/components/example.html">
  Content to pass inside component...
</component>
```

### Tag

Use a custom tag name:

```js
module.exports = {
  build: {
    components: {
      tag: 'module',
    }
  }
}
```

You can now use it like this:

```html
<module src="src/components/example.html">
  Content to pass inside component...
</module>
```

### Root

By default, when using a Component you have to reference its path relative to your project root (like we did above).

However, you can customize this path:

```js
module.exports = {
  build: {
    components: {
      root: 'src/components',
    }
  }
}
```

Now you can reference them relative to that `root` path, and write less code:

```html
<component src="example.html">
  Content to pass inside component...
</component>
```

<alert>When customizing the root folder of the Components, make sure to update the paths so that <g-link to="/docs/code-cleanup/#content">PurgeCSS</g-link> and <g-link to="/docs/build-config/#watch">Browsersync</g-link> know about them.</alert>

## Example

Let's create a VML background image Component, to which we can pass data about the image, and the HTML to be overlayed on top of it.

We might imagine something like this:

```html
<!--[if mso]>
<v:image src="{{ page.image.url || 'https://via.placeholder.com/600x400' }}" xmlns:v="urn:schemas-microsoft-com:vml" style="width:{{ page.image.width || 600 }}px;height:{{ page.image.height || 400 }}px;" />
<v:rect fill="false" stroke="false" style="position:absolute;width:{{ page.image.width || 600 }}px;height:{{ page.image.height || 400 }}px;">
<v:textbox inset="0,0,0,0"><div><![endif]-->
<content></content>
<!--[if mso]></div></v:textbox></v:rect><![endif]-->
```

The content of the Component or, in our case, the HTML to be overlayed, will be output in place of the `<content>` tag.

The variables that we are referencing from the `page` object are currently undefined, so we let's create them in Front Matter:

```html
---
image:
  url: https://example.com/image.jpg
  width: 600
  height: 400
---

<extends src="src/layouts/main.html">
  <block name="template">
    <component src="src/components/my-component.html">
      <div>
        Overlayed HTML!
      </div>
    </component>
  </block>
</extends>
```

Result:

```html
<!--[if mso]>
<v:image src="https://example.com/image.jpg" xmlns:v="urn:schemas-microsoft-com:vml" style="width:600px;height:400px;" />
<v:rect fill="false" stroke="false" style="position:absolute;width:600px;height:400px;">
<v:textbox inset="0,0,0,0"><div><![endif]-->
  <div>
    Overlayed HTML!
  </div>
<!--[if mso]></div></v:textbox></v:rect><![endif]-->
```

## Variables

When creating a Component, you have access to global variables:

```html
<!-- src/components/example.html -->
<div>
  A 'global' variable: {{ page.env }}
</div>
```

You can also manually provide data to the Component, in the form of a JSON string that you pass inside a `locals` attribute:

```html
<extends src="src/layouts/main.html">
  <block name="template">
    <component src="src/components/vmlbg.html" locals='{"foo": "bar"}'>
      <div>
        Foo is {{ foo }}
      </div>
    </component>
  </block>
</extends>
```

Of course, you can use both approaches at the same time.

<alert type="danger">Data passed inside <code>locals=''</code> must be a <g-link to="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Object_literal_notation_vs_JSON">valid JSON string</g-link>.</alert>

### Ignoring

Ignoring expressions inside a Component is a bit different.

To ignore a single expression:

```html
@@{{ foo }}
```

To ignore a code block:

```html
<raw>
  @{{ foo }}
</raw>
```
