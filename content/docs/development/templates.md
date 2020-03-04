---
title: "Templates"
slug: "templates"
description: "Learn how to create HTML emails with Nunjucks template inheritance in Maizzle"
---

# Templates

Templates in Maizzle contain the body of your email templates.

They're made up of two distinct sections:

1. Front Matter
2. Nunjucks blocks

## Front Matter

Templates can override environment config variables and even define new ones, through YAML-style Front Matter.

It looks like this:

```yaml
---
title: "Please confirm your email address"
isClimateChangeReal: true
---
```

Each of those variables will be available under the `page` object, which means you can use Nunjucks to render them in your Templates, like this:

```html
<p>{{ page.title }}</p>
```

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Front Matter must be defined at the very top of your Template, starting on line 1.</div>
</div>

## Nunjucks Blocks

For a Layout to render a Template's body, that body must be wrapped in a Nunjucks block that has the same name in both the Template and the Layout.
 
In the Starter, we named it `template`:

```html
{% block template %}
<table>
  <tr>
    <td>...</td>
  </tr>
</table>
{% endblock %}
```

Everything that is inside that block will be output into the Layout that the Template extends, wherever a `{% block template %}{% endblock %}` is found.

### Multiple Blocks

Your Templates can use as many blocks as you need. 

For example, Maizzle uses a `head` block in its default Layout, allowing you to insert additional tags into the `<head>`, right from the Template.

## Extending Layouts

A Template can specify a Layout to extend. 
The `{% extends %}` Nunjucks tag is used to extend a Layout, and it must be placed after the Front Matter:

```handlebars
---
title: Weekly Newsletter
---

{% extends "src/layouts/default.njk" %}

{% block template %}
<table>
  <tr>
    <td>...</td>
  </tr>
</table>
{% endblock %}
```

The path provided in `{% extends %}` must be relative to the root of the project. 

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">If there is no file at that path, the build will fail with a <code class="shiki-inline">Template render error</code></div>
</div>

### How Extending Works

When a Template _extends_ a Layout, the `{% block template %}{% endblock %}` section in the Layout being extended is replaced with the contents of the Template's _own_ `{% block template %}`.

Read more about inheritance, in the [Nunjucks docs &nearr;](https://mozilla.github.io/nunjucks/templating.html#template-inheritance)


## Extending Templates

A Template can also extend another Template 🤯 

For example, imagine `src/templates/first.njk` :

```handlebars
---
title: "1st Template"
---

{% extends "src/layouts/default.njk" %}

{% block template %}
  1st Template
  {% block button %}First Button{% endblock %}
{% endblock %}
```

We could then extend it in `src/templates/second.njk` :

```handlebars
---
title: "2nd Template"
---

{% extends "src/templates/first.njk" %}

{% block template %}
  {% block button %}Second Button{% endblock %}
{% endblock %}
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">You can also use <a href="https://mozilla.github.io/nunjucks/templating.html#super" target="_blank" rel="noopener noreferrer"><code class="shiki-inline">{{ super() }}</code></a> in the <code class="shiki-inline">{% block template %}</code> of <code class="shiki-inline">second.njk</code>.</div>
</div>

## Variables

Just as with [Layouts](/docs/layouts/#variables), variables from your [environment config](/docs/environments/) or from the Template's Front Matter are available on the `page` object:

```handlebars
---
text: "The following block will show only if `config.inlineCSS.enabled` is `true`"
---

{% extends "src/layouts/default.njk" %}

{% block template %}
  {{ page.text }}
  {% if page.inlineCSS.enabled === true %}
    <p>Inlining is enabled</p>
  {% endif %}
{% endblock %}
```

### Tag Conflicts

Other templating engines also use the `{{ }}` syntax.

If you want to output any of the special Nunjucks tags like `{{` or `{%` in your template, use the `{% raw %}` block:

```handlebars
{% extends "src/layouts/default.njk" %}

{% block template %}
  <!-- Wrapping a single variable -->
  <a href="{% raw %}{{ unsubLink }}{% endraw %}">Unsubscribe</a>

  <!-- Wrapping an entire section - anything inside will be ignored by Nunjucks -->
  {% raw %}
  <table>
    {{#each users}}
    <tr data-user="{{ this.id }}">
      <td>{{ this.first_name }} {{ this.last_name }}</td>
    </tr>
    {{/each}}
  </table>
  {% endraw %}
{% endblock %}
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Need Twig compatibility? You can also use the <code class="shiki-inline">{% verbatim %}</code> tag, it does the same thing as <code class="shiki-inline">{% raw %}</code>.</div>
</div>

## Basic Example

Here's a very basic Template example:

```handlebars
---
title: "This month's news from Maizzle"
---

{% extends "src/layouts/default.njk" %}

{% block template %}
<table class="w-full">
  <tr>
    <td>
      <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </td>
  </tr>
</table>
{% endblock %}
```

## Archiving

Maizzle will only compile templates found in your `build.templates.source` path(s).

However, if you create a lot of emails, your builds can start to slow down, since all templates are rebuilt every time you run the `build` command.

Archive Templates (and their assets) that you no longer need built, by simply moving them to a directory outside that path.

## Plaintext

Maizzle can create plaintext versions of your HTML emails.

Simply enable it in your Template's Front Matter:

```handlebars
---
title: This template will also have a plaintext version
plaintext: true
---

{% extends "src/layouts/default.njk" %}

{% block template %}
  ...
{% endblock %}
```

A `.txt` file will be output at the same location with the compiled Template.

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Using the <a href="/docs/build-paths/#permalink"><code class="shiki-inline">permalink</code></a> Front Matter key in your Template? No worries, your plaintext version will be output at the correct location.</div>
</div>
