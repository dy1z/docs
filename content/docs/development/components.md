---
title: "Components"
slug: "components"
description: "Import components into your HTML email templates and render them with custom slot content and data"
---

# Components

Components are supercharged [Partials](/docs/partials/): they allow you to pass content and data to the file that you are importing into your Template.

## Syntax

To import a module, you need to use the `<module>` tag:

```html
<extends src="layouts/base.html">
  <block name="template">
    <module href="/components/module.html">
      Content to pass inside module...
    </module>
  </block>
</extends>
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
<extends src="layouts/base.html">
  <block name="template">
    <module 
      href="/components/vmlbg.html"
      locals='{"src": "https://example.com", "width": 600, "height": 400}'
    >
      <div>
        Overlayed HTML!
      </div>
    </module>
  </block>
</extends>
```

Result:

```html
<!--[if mso]>
<v:image src="{{ src || 'https://via.placeholder.com/600x400' }}" xmlns:v="urn:schemas-microsoft-com:vml" style="width:{{ width || 600 }}px;height:{{ height || 400 }}px;" />
<v:rect fill="false" stroke="false" style="position:absolute;width:{{ width || 600 }}px;height:{{ height || 400 }}px;">
<v:textbox inset="0,0,0,0"><div><![endif]-->
  <div>
    Overlayed HTML!
  </div>
<!--[if mso]></div></v:textbox></v:rect><![endif]-->
```

## File Paths

Just like with Partials, you can keep your Components wherever you'd like. Just make sure to [update the paths](/docs/partials/#paths) so PurgeCSS and Browsersync know about them.
