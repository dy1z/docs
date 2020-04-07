---
title: "Prevent Widow Words"
slug: "prevent-widows"
description: "Use PostHTML to transform your HTML email templates"
---

import Alert from '~/components/Alert.vue'

# Prevent Widow Words

Maizzle uses [prevent-widows](https://github.com/bashaus/prevent-widows) to help prevent widow words in your email templates. 

Simply add a `prevent-widows` attribute on any HTML tag, and it will replace the last space in every text node with a `&nbsp;`.

```html
<extends src="src/layouts/base.html">
  <block name="template">
    <div prevent-widows>
      <p>Ullamco aliqua labore do proident commodo officia excepteur.</p>
      <p>Reprehenderit dolore deserunt elit reprehenderit cillum nostrud do laborum et.</p>
    </div>
  </block>
</extends>
```

That will output:

```html
<div>
  <p>Ullamco aliqua labore do proident commodo officia&nbsp;excepteur.</p>
  <p>Reprehenderit dolore deserunt elit reprehenderit cillum nostrud do laborum&nbsp;et.</p>
</div>
```

<alert>Enable <code>prevent-widows</code> globally by adding it to your Layout's <code>&lt;body&gt;</code> tag.</alert>
