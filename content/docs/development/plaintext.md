---
title: "Plaintext"
slug: "plaintext"
description: "Automatically create plaintext versions of your HTML emails in Maizzle"
---

# Plaintext

Maizzle can automatically create plaintext versions of your HTML emails.

Simply enable it in your config or the Template's Front Matter:

```html
---
plaintext: true
---

<extends src="layouts/base.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

A `.txt` file will be output at the same location with the compiled Template.

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">Using the <a href="/docs/build-paths/#permalink"><code class="shiki-inline">permalink</code></a> Front Matter key in your Template? No worries, your plaintext version will be output at the correct location.</div>
</div>

## Show content only in plaintext

You can output plaintext-only content with the `<plaintext>` tag:

```html
---
plaintext: true
---

<extends src="layouts/base.html">
  <block name="template">
    This text shows in both the HTML and the plaintext versions.
    <plaintext>This will be available only in the plaintext version</plaintext>
  </block>
</extends>
```
