---
title: "Tags"
slug: "tags"
description: "See what special tags you can use in Maizzle"
---

import Alert from '~/components/Alert.vue'

# Tags

Maizzle includes some special tags designed to help you with templating logic.

## Conditionals

You can use if/elseif/else conditionals in your email templates.

For example, the Starter uses it to output a preheader in its Layout:

```html
<if condition="page.preheader">
  <div class="hidden">{{ page.preheader }}</div>
</if>
```

Of course, you can create more complex conditions:

```html
<if condition="page.env === 'node'">
  <p>Using Maizzle programmatically</p>
</if>
<elseif condition="page.env === 'production'">
  <p>We are in production!</p>
</elseif>
<else>
  <p>We are probably developing locally.</p>
</else>
```

###### Custom conditionals tag

You can customize the tag names:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        conditionalTags: ['when', 'ifnotthen', 'otherwise']
      }
    }
    // ...
  }
}
```

Example:

```html
<when condition="page.env === 'node'">
  <p>Using Maizzle programmatically</p>
</when>
<ifnotthen condition="page.env === 'production'">
  <p>We are in production!</p>
</ifnotthen>
<otherwise>
  <p>We are probably developing locally.</p>
</otherwise>
```

## Outlook

You can have content that will only show up in Outlook on Windows:

```html
<outlook>
  <div>Show this in all Outlook versions</div>
</outlook>
```

That will output:

```html
<!--[if mso|ie]>
  <div>Show this in all Outlook versions</div>
<![endif]-->
```

Of course, there's also a tag for showing content everywhere _but_ in Outlook:

```html
<not-outlook>
  <div>All Outlooks will ignore this</div>
</not-outlook>
```

Result:

```html
<!--[if !mso]><!-->
  <div>All Outlooks will ignore this</div>
<!--<![endif]-->
```

You can do many more things with it (like targeting or excluding specific Outlook versions) - see the [`posthtml-mso`](https://www.npmjs.com/package/posthtml-mso) plugin documentation.

###### Custom Outlook tag

Of course, you can customize the `<outlook>` tag name:

```js
module.exports = {
  build: {
    posthtml: {
      outlook: {
        tag: 'mso'
      }
    }
    // ...
  }
}
```

You'd then use it like this:

```html
<mso only="2013">Show only in Outlook 2013</mso>
<not-mso>Hide from all Outlooks</not-mso>
```

## Switch

Need to use a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)?

```html
<switch expression="page.user.subscription">
  <case n="'monthly'">
    <p>Your monthly subscription is about to renew.</p>
  </case>
  <case n="'yearly'">
    <p>Heads up! Yearly renewal coming soon, make sure you have enough money in your account.</p>
  </case>
  <default>
    <p>Your subscription will soon renew.</p>
  </default>
</switch>
```

###### Custom switch tag

You can define custom tags for the switch statement:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        switchTags: ['clause', 'when', 'fallback']
      }
    }
    // ...
  }
}
```

Example:

```html
<clause expression="page.env">
  <when n="'production'">
    production
  </when>
  <fallback>
    fallback
  </fallback>
</clause>
```

## Loops

You can iterate over arrays and objects with the `<each>` tag.

For arrays:

```html
<each loop="item, index in someArray">
  <p>{{ index }}: {{ item }}</p>
</each>
```

For objects:

```html
<each loop="value, key in anObject">
  <p>{{ key }}: {{ value }}</p>
</each>
```

In both cases, you will have access to a `{{ loop }}` object that contains information about the loop currently being executed:

- `loop.index` - the current iteration of the loop (0 indexed)
- `loop.remaining` - number of iterations until the end (0 indexed)
- `loop.first` - boolean indicating if it's the first iteration
- `loop.last` - boolean indicating if it's the last iteration
- `loop.length` - total number of items

Example:

```html
<each loop="item, index in [1,2,3]">
  <p>Number of iterations until the end: {{ loop.remaining }}</p>
</each>
```

###### Custom loop tag

You can customize the name of the loop tag:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        loopTags: ['for']
      }
    }
    // ...
  }
}
```

You can now use a `<for>` tag instead:

```html
<for loop="item, index in [1,2,3]">
  <p>{{ item }}</p>
</for>
```

## Scope

Use `<scope>` tags to provide a data context to the content inside.

Imagine we had this data on the `page` object:

```js
roles {
  author: { name: 'John'},
  editor: { name: 'Jane'},
}
```

We could provide each object as a scope, so we can then access it from the context, instead of going up to the parent:

```html
<!-- Will output 'John' -->
<scope with="page.roles.author">
  {{ name }} <!-- no need to write {{ page.roles.author.name }} -->
</scope>

<!-- Will output 'Jane' -->
<scope with="page.roles.editor">
  {{ name }}
</scope>
```

###### Custom scope tag

You can customize the `<scope>` tag name:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        scopeTags: ['context']
      }
    }
    // ...
  }
}
```

Example:

```html
<!-- Will output 'Jane' -->
<context with="page.roles.editor">
  {{ name }}
</context>
```

## Fetch

You can fetch and display remote content in your email templates:

```html
<fetch url="https://jsonplaceholder.typicode.com/users">
  <each loop="user in response">
    {{ user.name }}
  </each>
</fetch>
```

Inside the tag, you have access to a `{{ response }}` variable.

[`posthtml-fetch`](https://github.com/posthtml/posthtml-fetch) is used, and you can pass options to it.

For example, let's use custom tag and attribute names:

```js
module.exports = {
  build: {
    posthtml: {
      fetch: {
        tags: ['get'],
        attribute: 'resource'
      }
    }
  }
}
```

We can now use this syntax:

```html
<get resource="https://jsonplaceholder.typicode.com/users/1">
  User name is: {{ response.name }}
</get>
```

## Raw

Need to skip tag and expressions parsing in a whole block?

```html
<raw>
  This will not be parsed:
  <if condition="page.env">
    {{ page.env }}
  </if>
  Neither will this expression: {{ page.env }}
</raw>
```

This will output:

```html
This will not be parsed:
<if condition="page.env">
  {{ page.env }}
</if>
Neither will this expression: {{ page.env }}
```

###### Custom raw tag

The `<raw>` tag name can be customized:

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        ignoredTag: 'verbatim'
      }
    }
    // ...
  }
}
```

Example: 

```html
<verbatim>
  This will not be parsed: {{ page.env }}
</verbatim>
```
