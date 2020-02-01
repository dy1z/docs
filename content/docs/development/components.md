---
title: "Components"
slug: "components"
description: "Import components into your HTML emails and render them with custom slot content and data"
---

# Components

Components are supercharged [Partials](/docs/partials/): they allow you to pass content and data to the file that you are importing into your Template.

## Create

Let's create a VML background image component, to which we can pass data about the image, and the HTML to be overlayed on top of it.

We might imagine something like this:

```html
<!--[if mso]>
<v:image src="{{ data.src or 'https://via.placeholder.com/600x400' }}" xmlns:v="urn:schemas-microsoft-com:vml" style="width:{{ data.width or 600 }}px;height:{{ data.height or 400 }}px;" />
<v:rect fill="false" stroke="false" style="position:absolute;width:{{ data.width or 600 }}px;height:{{ data.height or 400 }}px;">
<div><![endif]-->
{{ content }}
<!--[if mso]></div></v:rect><![endif]-->
```

We would like to access data being sent to the Component under the `data` variable. 
The 'body' of the Component or, in our case, the HTML to be overlayed, will be accessible under the `content` variable.

Save the Component to `src/components/vmlbg.njk`

## Import

Import the Component you just created in a Template, with the `{% component %}` tag:

```js
{% component "src/components/vmlbg.njk" %}
  <div>
    Overlayed HTML!
  </div>
{% endcomponent %}
```

## Arguments

The `{% component %}` tag takes two arguments: a file path and a data object.

### path

The first argument must be the path to our component file, for example `"src/components/vmlbg.njk"`.

The path needs to be relative to the project directory root.

### data

The second argument can be:

- a string
- an array
- an object

It will be available under the `data` object inside the Component. 

Check the Component definition above, you'll see variables like `{{ data.width }}`

Here's how you'd pass both arguments:

```js
{% component "src/components/vmlbg.njk", {width: 600, height: 500, src: 'some/image/path.jpg'} %}
  <div>
    Overlayed HTML!
  </div>
{% endcomponent %}
```

Finally, anything that you add between the `{% component %} {% endcomponent %}` tags will be available to the component under a `content` variable.

---

Congratulations! 🎉

You've just recreated the `vmlbg.njk` Component that Maizzle ships with.

## File Paths

Just like with Partials, you can keep your Components wherever you'd like. Just make sure to [update the paths](/docs/partials/#paths) so PurgeCSS and Browsersync know about them.
