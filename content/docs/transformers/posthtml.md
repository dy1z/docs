---
title: "PostHTML"
slug: "posthtml"
description: "Use PostHTML to transform your email templates"
---

# PostHTML

Maizzle uses [PostHTML](https://github.com/posthtml/posthtml) to transform your HTML.

## posthtml-content

[posthtml-content](https://github.com/posthtml/posthtml-content) is used to compile `<style>` blocks in your Templates with PostCSS.

Use the `tailwind` attribute on a `<style>` tag inside a Template:

```handlebars
---
title: Using Tailwind CSS inside a Template
---

{% block head %}
<style tailwind>
  a {
    @apply text-blue-500;
  }

  @screen sm {
    .button {
      padding: 10px 20px;
    }
  }
</style>
{% endblock %}
```

Both regular CSS and Tailwind directives are supported.

## prevent-widows

[prevent-widows](https://github.com/bashaus/prevent-widows) is used to prevent widow words in your email templates. 

Simply add a `prevent-widows` attribute on any HTML tag, and it will replace the last space in every text node with a `&nbsp;`.

```handlebars
---
title: Preventing widow words
---

{% block template %}
<div prevent-widows>
  <p>Ullamco aliqua labore do proident commodo officia excepteur.</p>
  <p>Reprehenderit dolore deserunt elit reprehenderit cillum nostrud do laborum et.</p>
</div>
{% endblock %}
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Enable it globally by adding it to your Layout's <code class="shiki-inline">&lt;body&gt;</code> tag.</div>
</div>
