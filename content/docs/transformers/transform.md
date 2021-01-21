---
title: "Transform Content"
slug: "transform"
description: "Use PostHTML to apply transformations to content inside tags from your HTML email templates"
---

# Transform Content

You can use [posthtml-content](https://github.com/posthtml/posthtml-content) to transform your HTML emails.
Use it to do anything you want to content inside elements that you mark with custom attributes.

First, add a `transform` object to your Maizzle config:

```js
//config.js
module.exports = {
  transform: {}
}
```

Each entry in this object is made up of a `key: value` pair.

- `key` represents a custom HTML attribute name
- `value` is a function that accepts a `parameter`, and must return a string. `parameter` is the contents of the tag on which the key attribute was used.

Example:

```js
module.exports = {
  transform: {
    uppercase: str => str.toUpperCase()
  }
}
```

Template:

```html
<p uppercase>Here is some foo.</p>
```

Result:

```html
<p>HERE IS SOME FOO BAR.</p>
```

Of course, this is just a dumb example - you could imagine more complex scenarios where you pull in packages and do stuff like:

- compile CSS in some `<style>` tag with Sass or others
- normalize html whitespace in parts of your code
- create various content filters
- ...
