---
title: "Transform Content"
slug: "transform-content"
description: "Use PostHTML to transform your HTML email templates"
---

# Transform Content

Maizzle can use [posthtml-content](https://github.com/posthtml/posthtml-content) to transform your HTML emails.
Use it to do anything you want to content inside elements that you mark with custom attributes.

First, add a `transformContents` object to your Maizzle config:

```js
//config.js
module.exports = {
  transformContents: {},
  // ...
}
```

Each entry in this object is made up of a `key: value` pair.

- `key` represents a custom HTML attribute name
- `value` is a function that accepts a `parameter`, and must return a string. `parameter` is the contents of the tag on which the key attribute was used.

Example:

```js
//config.js
module.exports = {
  transformContents: {
    fooreplace: str => str.replace(/foo/g, 'foo bar'),
  }
}
```

Template:

```html
<p fooreplace>Here is some foo.</p>
```

Result:

```html
<p>Here is some foo bar.</p>
```

Of course, this is just a dumb example - you could imagine more complex scenarios where you pull in packages and do stuff like:

- compile CSS in some `<style>` tag with Sass or others
- minify only parts of your code
- highlight code syntax
- ...
