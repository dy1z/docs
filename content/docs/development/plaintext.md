---
title: "Plaintext"
slug: "plaintext"
description: "Automatically create plaintext versions of your HTML emails in Maizzle"
---

import Alert from '~/components/Alert.vue'

# Plaintext

Maizzle can automatically create plaintext versions of your HTML emails.

## Front Matter

Simply enable it in your config or the Template's Front Matter:

```html
---
plaintext: true
---

<extends src="src/layouts/base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

A `.txt` file will be output at the same location with the compiled Template.

<alert>Using the <a href="/docs/build-paths/#permalink"><code>permalink</code></a> Front Matter key in your Template? No worries, your plaintext version will be output at the correct location.</alert>

## Show content only in plaintext

You can output plaintext-only content with the `<plaintext>` tag:

```html
---
plaintext: true
---

<extends src="src/layouts/base.html">
  <block name="template">
    This text shows in both the HTML and the plaintext versions.
    <plaintext>This will be output only in the plaintext version</plaintext>
  </block>
</extends>
```
