---
title: "Components"
slug: "components"
description: "Import components into your HTML email templates and render them with custom slot content and data"
---

# Components

Components are supercharged [Partials](/docs/partials/): besides data, they also allow you to pass content to the file that you are importing into your Template.

## Syntax

To import a component, you need to use the `<component>` tag:

```html
<extends src="src/layouts/base.html">
  <block name="template">
    <component src="src/components/example.html">
      Content to pass inside component...
    </component>
  </block>
</extends>
```

### Customization

Customize the tag and attribute names in `build.components`:

```js
module.exports = {
  build: {
    components: {
      tag: 'module',
      attribute: 'href',
    }
  }
}
```

You can now use it like this:

```html
<module href="src/components/example.html">
  Content to pass inside component...
</module>
```

## Example

Let's create a VML background image component, to which we can pass data about the image, and the HTML to be overlayed on top of it.

We might imagine something like this:

```html
<!--[if mso]>
<v:image src="{{ src || 'https://via.placeholder.com/600x400' }}" xmlns:v="urn:schemas-microsoft-com:vml" style="width:{{ width || 600 }}px;height:{{ height || 400 }}px;" />
<v:rect fill="false" stroke="false" style="position:absolute;width:{{ width || 600 }}px;height:{{ height || 400 }}px;">
<v:textbox inset="0,0,0,0"><div><![endif]-->
<content></content>
<!--[if mso]></div></v:textbox></v:rect><![endif]-->
```

The content of the Component or, in our case, the HTML to be overlayed, will be accessible through the `<content>` tag.

Save the Component to `src/components/vmlbg.html` and import it into a Template, passing any data in a `locals=""` attribute:

```html
<extends src="src/layouts/base.html">
  <block name="template">
    <component 
      src="/components/vmlbg.html"
      locals='{"src": "https://example.com/image.jpg", "width": 600, "height": 400}'>
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

## File Paths

Just like with Partials, you can keep your Components wherever you'd like. Just make sure to [update the paths](/docs/partials/#paths) so PurgeCSS and Browsersync know about them.
