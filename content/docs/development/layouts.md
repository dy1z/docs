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

Simply create a `mylayout.njk` file in there, and add a minimal boilerplate with tags to yield the CSS and the Template body:

```html
<!DOCTYPE html>
<html>
<head>
  {% if css %}<style>{{ css }}</style>{% endif %}
</head>
<body>
  {% block template %}{% endblock %}
</body>
``` 

You can use this as a Layout that your Templates [extend](/docs/templates/#extending-layouts).

## Template Blocks

In the example above, the Layout simply pulls in a Nunjucks `{% block %}` named `template` - 
it looks for a block with the same name in every Template that [extends](/docs/templates/#extends) it.

Read more about blocks, in the [Nunjucks documentation &nearr;](https://mozilla.github.io/nunjucks/templating.html#template-inheritance)

## Variables

Variables from your environment config or from the Template's own Front Matter are available in a Layout under the `page` object:

```html
<meta charset="{{ page.charset or 'utf8' }}">
```

The compiled Tailwind CSS for the current Template is available under `css` :

```html
{% if css %}<style>{{ css }}</style>{% endif %}
```

The environment name is available under `env`. You can use it to output stuff based on the `build` command you ran.

For example, we could use `env` to output some content only when running the `maizzle build production` command:

```html
{% if env == 'production' %}
  <p>This text will show when running `maizzle build production`</p>
{% endif %}
```
