---
title: "Language"
slug: "language"
description: "Define a global language attribute value for your HTML emails, to improve accessibility"
---

# Language

The `language` config key defines a global language attribute value for your emails:

```js
// config.js
module.exports = {
  language: 'en',
  // ...
}
```

You can use this in the `lang=""` attribute on your Layout's `<html>` tag:

```html
<html lang="{{ page.language or 'en' }}">
```

## Front Matter

Use Front Matter to define it in a Template:

```handlebars
---
language: ro
title: "Verificare adresă de email"
preheader: "Te rugăm să ne confirmi adresa de email"
---

{% block template %}
  <!-- ... -->
{% endblock %}
```

See a [list of HTML ISO Language codes &nearr;](https://www.w3schools.com/tags/ref_language_codes.asp)

## Accessibility

You should make sure to always specify a `language` attribute value. This helps screen reader software use the correct pronunciation.
