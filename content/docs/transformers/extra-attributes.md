---
title: "Extra Attributes"
slug: "extra-attributes"
description: "Automatically add attributes to your HTML emails. Write less code and easily improve accessibility."
---

import Alert from '~/components/Alert.vue'

# Extra Attributes

Maizzle can automatically add attributes to HTML elements in your email templates.

This can be useful for:

- adding default attributes based on environment or Template
- not having to write required attributes all the time
- automating email accessiblity

The `extraAttributes` key in your config defines which elements in your emails should receive which attributes with what values. 

For example:

```js
// config.js
module.exports = {
  extraAttributes: {
    div: {
      role: 'article'
    }
  },
  // ...
}
```

By default, Maizzle makes your `<table>` accessible, resets its spacing, and ensures that an empty `alt=""` attribute is added to images that don't have it:

<alert>Attributes will be added only if they're not already present on the element.</alert>

## Selectors

Tag, class, id, and attribute selectors are supported:

```js
extraAttributes: {
  div: {
    id: 'new'
  },
  '.test': {
    editable: true
  },
  '#test': {
    'data-foo': 'bar'
  },
  '[role]': {
    'aria-roledescription': 'slide'
  },
  // ...
},
```

## Multiple selectors

Add multiple attributes to multiple elements in one go:

```js
const attributes = {
  'div, p': {
    class: 'test',
  },
  'div[role=alert], section.alert': {
    class: 'alert'
  },
}
```

### Tailwind CSS note

Because Transformers process your HTML _after_ CSS is compiled, **you cannot use any Tailwind CSS classes here**. That means any class from the compiled `main.css`.

You _will_ see them added to the element's `class=""`, but they won't exist in the `<style>` tag, so they won't work. Therefore, adding classes like this can only be useful if you need them at a later stage in your workflow, like in your <abbr title="Email Service Provider">ESP</abbr>.
