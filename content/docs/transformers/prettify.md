---
title: "Prettify Email Code"
slug: "prettify"
description: "Pretty print your HTML email template code before sending it to a colleague or a client"
---

# Prettify Code

Maizzle can pretty print your HTML email code.

Need to send HTML to a human? Enable `prettify` in your config:

```js
// config.production.js
module.exports = {
  prettify: true
}
```

By default, code will be indented with 2 spaces.

## JS Beautify

[pretty](https://www.npmjs.com/package/pretty) is used to format your code.

Under the hood, `pretty` uses [js-beautify](https://www.npmjs.com/package/js-beautify), which means that you can use any of its CSS and HTML Beautifier options in your Maizzle `pretty {}` config object.

Maybe you prefer tabs for indentation?

```js
module.exports = {
  prettify: {
    indent_with_tabs: true
  }
}
```

Checkout the full [list of HTML & CSS beautifier options &nearr;](https://www.npmjs.com/package/js-beautify#css--html)

## OCD

This option applies several formatting actions and is enabled by default in the Starter. 

Specifically, it:

- condenses multiple newlines to a single newline
- trims leading and trailing whitespace
- ensures that a trailing newline is inserted
- normalizes whitespace before code comments
