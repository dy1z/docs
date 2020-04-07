---
title: "Functions"
slug: "functions"
description: "Programatically configure Maizzle or use the output of other Node.js packages as variables in your email templates"
---

# Config Variables and Functions

Maizzle is fully configured in JavaScript, so you can programatically set config options or process and make data available to your Templates.

## Variables

You can define variables and then use them in the config.

Here's a very basic example:

```js
// config.js

// We define an array of additional paths for PurgeCSS to scan
let extraPurgePaths = [
  './src/2019/clients/**/*.*',
  '../up/a/level/**/*.*'
]

module.exports = {
  purgeCSS: {
    content: [
      'src/layouts/**/*.*',
      'src/partials/**/*.*',
      'src/components/**/*.*',
      ...extraPurgePaths, // spread the array variable
    ],
    // ...
  },
}
```

## Functions

When using a function, you need to make sure that:

1. it returns something
2. you invoke it

```js
// config.js
const foo = function() {
  return 'manchu'
}

module.exports = {
  foo: foo(), // invoke function defined above
  bar: function() {
    // do stuff and return
    return 'baz'
  }(), // invoke function
  wha: () => imaginaryLib.render('implicit return 👌'),
}
```

You would access those variables under the `page` object:

```html
<extends src="src/layouts/base.html">
  <block name="template">
    <p>{{ page.foo }}</p>
    <p>{{ page.bar }}</p>
    <p>{{ page.wha }}</p>
  </block>
</extends>
```

Result:

```html
<p>manchu</p>
<p>baz</p>
<p>implicit return 👌</p>
```
