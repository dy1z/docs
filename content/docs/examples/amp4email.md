---
title: "AMP for Email"
slug: "amp4email"
description: "Use AMP for Email in Maizzle to easily create interactive HTML emails with realtime information and in-line actions"
---

# ⚡4email

You can easily get started with AMP for Email in Maizzle.

For a syntax refresher, checkout [AMP by Example &nearr;](https://ampbyexample.com/amphtml-email/introduction/hello_world/)

## Layout

⚡4email requires some special markup, so let's create an `amp4email.njk` Layout:

```html
<!doctype html>
<html ⚡4email>
<head>
  <meta charset="{{ page.charset or 'utf8' }}">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  {% if page.googleFonts %}<link href="https://fonts.googleapis.com/css?family={{ page.googleFonts }}" rel="stylesheet" media="screen">{%- endif %}
  {% if css %}<style amp-custom>{{ css }}</style>{% endif %}
  {% block head %}{% endblock %}
</head>
<body {% if page.bodyClass %}class="{{ page.bodyClass }}"{% endif %}>
{% block template %}{% endblock %}
</body>
</html>
```

## Template

Let's create `src/templates/amp-carousel.njk`, where we add a basic AMP carousel:

```handlebars
{% extends "src/layouts/amp4email.njk" %}

{% block head %}
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
{% endblock %}

{% block template %}
<div class="p-16">
  <div class="max-w-full">
    <amp-carousel width="800" height="600" layout="responsive" type="slides">
      <amp-img src="https://ampbyexample.com/img/image1.jpg" width="800" height="600" alt="a sample image"></amp-img>
      <amp-img src="https://ampbyexample.com/img/image2.jpg" width="800" height="600" alt="another sample image"></amp-img>
      <amp-img src="https://ampbyexample.com/img/image3.jpg" width="800" height="600" alt="and another sample image"></amp-img>
    </amp-carousel>
  </div>
</div>
{% endblock %}
```

### AMP Components

Add any [AMP components](https://ampbyexample.com/amphtml-email/introduction/hello_world/#amp-components) inside the `{% block head %}` tag, as seen above.

## Disable inlining

Inline style attributes are not allowed in AMP, so make sure CSS inlining is disabled. 

Do it either globally, in your environment config:

```js
// config.js
module.exports = {
  inlineCSS: {
    enabled: false,
  },
  // ...
}
```

... or locally, in the Template's Front Matter:

```yaml
---
inlineCSS:
  enabled: false
---

{% extends "src/layouts/amp4email.njk" %}

# ...
```

## !important

Since inline styles aren't supported in AMP for Email, we cannot have `!important` added to our CSS. This can be easily turned off in `tailwind.config.js`:

```js
module.exports = {
  important: false,
  // ...
}
```

However, you might want to turn it off _only_ for AMP templates.

You can do this with a custom build environment:

1. Create a folder at `src/templates/amp` and only keep ⚡4email templates here.
2. Create `config.amp.js`:

  ```js
  module.exports = {
    build: {
      destination: {
        path: 'build_amp',
      },
      templates: {
        source: 'src/templates/amp',
      },
      tailwind: {
        config: 'tailwind.amp.js',
      },
    },
  }
  ```
3. Duplicate `tailwind.config.js` to `tailwind.amp.js`, and disable `important`:

  ```js
  module.exports = {
    important: false,
    // ...
  }
  ```
4. Run `maizzle build amp` to build your ⚡4email templates.
