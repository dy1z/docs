---
title: "URL Parameters"
slug: "url-parameters"
description: "Easily append custom URL parameters to links in your HTML email template"
---

# URL Parameters

Maizzle can automatically append custom parameters to your URLs.

## Global

To add the same parameters to all URLs in all Templates, use your environment config:

```js
// config.production.js
module.exports = {
  urlParameters: {
    utm_source: 'maizzle',
    utm_campaign: 'Campaign Name',
    utm_medium: 'email',
    custom_parameter: 'foo',
    '1stOfAugust': 'bar',
  }
  // ...
}
```

## Local

Of course, you can define URL parameters at a Template level, through Front Matter:

```handlebars
---
title: "These URL params are unique to this template"
urlParameters:
  utm_source: custom
  utm_campaign: "Pre-launch August"
  # ...
---

{% block template %}
  ...
{% endblock %}
```
