---
title: "Email Code Minification"
slug: "minify"
description: "Minify your HTML email code so that your production emails weigh less and you avoid Gmail clipping"
---

# Minify Email Code

Use the `minify` option to trim down the HTML size of your production emails. 

Minified email code weighs less in KB, resulting in faster sendouts, faster opens, and bandwidth savings on limited mobile plans. Every little bit helps 🙂

Additionally, it reduces the risk of [Gmail clipping](https://github.com/hteumeuleu/email-bugs/issues/41).

---

Maizzle uses [html-minifier](https://www.npmjs.com/package/html-minifier) and exposes its options to your config - simply enable it and define any other library options in the `minify` config key:

```js
// config.production.js
module.exports = {
  minify: {
    enabled: true,
    minifyCSS: true,
    maxLineLength: 500,
    collapseWhitespace: true,
    processConditionalComments: true,
    // ...
  },
  // ...
}
```

Checkout the full [list of html-minifier options &nearr;](https://www.npmjs.com/package/html-minifier#options-quick-reference)

<div class="bg-gray-100 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">Minifying email code can lead to unexpected results if not done properly. Make sure you know what you're doing, and always test!</div>
</div>
