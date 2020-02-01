---
title: "Functions"
slug: "functions"
description: "Programatically configure Maizzle or use the output of other Node.js packages as variables in your Templates"
---

# Config Variables and Functions

Since Maizzle is fully configured in JavaScript, you can programatically set config options and make data available to your Templates.

## Variables

Here's a very basic example of using variables in config options:

```js
// config.js

// Define additional paths for PurgeCSS to scan
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
  // ...
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
  }(), // invoke function
}
```

The [dynamic titles](/docs/title/#global-dynamic-titles) example uses a self-invoking function.
