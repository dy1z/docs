---
title: "Prevent Widow Words"
slug: "prevent-widows"
description: "Use PostHTML to transform your HTML email templates"
---

# Prevent Widow Words

Maizzle uses [prevent-widows](https://github.com/bashaus/prevent-widows) to help prevent widow words in your email templates. 

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

That will output:

```html
<div>
  <p>Ullamco aliqua labore do proident commodo officia&ampnbsp;excepteur.</p>
  <p>Reprehenderit dolore deserunt elit reprehenderit cillum nostrud do laborum&ampnbsp;et.</p>
</div>
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Enable <code class="shiki-inline">prevent-widows</code> globally by adding it to your Layout's <code class="shiki-inline">&lt;body&gt;</code> tag.</div>
</div>
