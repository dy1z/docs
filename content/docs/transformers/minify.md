---
title: "Email Code Minification"
slug: "minify"
description: "Minify your HTML email code so that your production emails weigh even less and you avoid Gmail clipping."
---

import Alert from '~/components/Alert.vue'

# Minify Email Code

Use the `minify` option to trim down the HTML size of your production emails. 

Minified email code weighs less in KB, resulting in faster sendouts, faster opens, and bandwidth savings on limited mobile data plans. Every little bit helps 🙂

Additionally, it reduces the risk of [Gmail clipping](https://github.com/hteumeuleu/email-bugs/issues/41).

---

Maizzle uses [html-crush](https://www.npmjs.com/package/html-crush) and exposes its options to your config. 

Simply enabling it is enough to get you started with email-safe code minification:

```js
// config.production.js
module.exports = {
  minify: {
    enabled: true,
  },
}
```

Of course, you can customize the `html-crush` options:

```js
// config.production.js
module.exports = {
  minify: {
    enabled: true,
    lineLengthLimit: 500,
    removeIndentations: true,
    breakToTheLeftOf: [],
  },
}
```

Checkout the full list of [html-crush options](https://codsen.com/os/html-crush/#optional-options-object).

<alert type="warning">Minifying email code can lead to unexpected results if not done properly. Make sure you know what you're doing, and always test your emails!</alert>
