---
title: "Node.js"
slug: "transformers"
description: "Import Transformers into your Node application and transform your emails even without using Maizzle"
---

import Alert from '~/components/Alert.vue'

# Transformers in Node.js

You can import Transformers into your Node app and transform your HTML emails, even without using Maizzle to build them 🤯

To get started, simply import Maizzle:

```js
const Maizzle = require('@maizzle/framework')
```

You now have access to all Transformers:

```js
const html = Maizzle.inlineCSS('html string', {/*Juice inliner options*/}).then(html => html)
```

It's recommended that you only import the Transformers that you need:

```js
const {inlineCSS) = require('@maizzle/framework')
const html = inlineCSS('html string', {}).then(html => html)
```

<alert>All Transformers are <code>async</code>, so you should use <code>async/await</code> or Promises.</alert>

## Available Transformers

All Maizzle Transformers are available, and you can configure them as you'd expect.

### attributeToStyle

By default, this does nothing to your HTML.

You'll need to pass an array of attributes as the second parameter:

```js
const {attributeToStyle) = require('@maizzle/framework')

const html = attributeToStyle('html string', ['width'])
```

See [supported attributes](/docs/css-inlining/#attributetostyle).

### applyBaseImageUrl

```js
const {applyBaseImageUrl} = require('@maizzle/framework')

const html = applyBaseImageUrl('<img src="image.jpg">', 'https://example.com/').then(html => html)

// https://example.com/image.jpg
```

### applyExtraAttributes

```js
const {applyExtraAttributes} = require('@maizzle/framework')

const html = applyExtraAttributes('<div></div>', {div: {role: 'article'}}).then(html => html)

// <div role="article"></div>
```

### inlineCSS

You can pass your own CSS with the `customCSS` option, and `inlineCSS` will use it.

If you don't specify `customCSS`, your HTML will need to have a `<style>` with CSS tag in the `<head>`.

```js
const {inlineCSS} = require('@maizzle/framework')

const html = inlineCSS('html string', {customCSS?, ...juiceOptions?}).then(html => html)
```

### minify

```js
const {minify} = require('@maizzle/framework')
const options = {/* html-crush options */}

const html = minify('html string', options).then(html => html)
```

### markdown

```js
const {markdown} = require('@maizzle/framework')
const options = {/* markdown-it options */}

const html = markdown('<md>### Heading 3</md>', options).then(html => html)
```

### prettify

```js
const {prettify} = require('@maizzle/framework')
const options = {/* prettify options */}

const html = prettify('html string', options).then(html => html)
```

### preventWidows

```js
const {preventWidows} = require('@maizzle/framework')

const html = preventWidows('lorem ipsum').then(html => html)

// lorem&nbsp;ipsum
```

### removeAttributes

```js
const {removeAttributes} = require('@maizzle/framework')
const options = [
  {name: 'role', value: 'article'}
]

const html = removeAttributes(`<div style="" role="article"></div>`, options).then(html => html)

// <div></div>
```

### removeInlineBgColor

```js
const {removeInlineBgColor} = require('@maizzle/framework')

const html = removeInlineBgColor(`<td style="background-color: red" bgcolor="red">test</td>`).then(html => html)

// <td style="" bgcolor="red">test</td>
```

### removeInlineSizes

```js
const {removeInlineSizes} = require('@maizzle/framework')
const options = {
  width: ['TD'],
  height: ['TD']
}

const html = removeInlineSizes(`<td style="width:100%;height:10px;">test</td>`).then(html => html)

// <td style="">test</td>
```

### removeUnusedCSS

```js
const {removeUnusedCSS} = require('@maizzle/framework')
const options = {/* email-comb options */}

const html = removeUnusedCSS(`<div class="unused">test</div>`, options).then(html => html)

// <div>test</div>
```

### replaceStrings

```js
const {replaceStrings} = require('@maizzle/framework')

const html = replaceStrings('initial text', {initial: 'updated'}).then(html => html)

// updated text
```

### safeClassNames

```js
const {safeClassNames} = require('@maizzle/framework')

const html = safeClassNames('<div class="sm:text-left w-1.5">foo</div>', {'.': '_dot_'}).then(html => html)

// <div class="sm-text-left w-1_dot_5">foo</div>
```

### ensureSixHEX

```js
const {ensureSixHEX} = require('@maizzle/framework')

const html = ensureSixHEX('<td style="color: #ffc" bgcolor="#000"></td>').then(html => html)

// <td style="color: #ffffcc" bgcolor="#000000"></td>
```

### transformContents

```js
const {transformContents} = require('@maizzle/framework')

const html = transformContents('<div uppercase>test</div>', {uppercase: string => string.toUpperCase()}).then(html => html)

// <div>TEST</div>
```

### addURLParams

```js
const {addURLParams} = require('@maizzle/framework')

const html = addURLParams('<a href="https://example.com">test</a>', {bar: 'baz', qix: 'qux'}).then(html => html)

// <a href="https://example.com?bar=baz&qix=qux">test</a>
```
