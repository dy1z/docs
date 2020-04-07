---
title: "Environments"
slug: "environments"
description: "Define distinct build scenarios for your HTML email workflow, each with their own settings"
---

import Alert from '~/components/Alert.vue'

# Environments

When developing HTML emails, you might want to use different data and automations in your local and production environments. 

For example, you don't need CSS inlining or purging when developing on your machine, but you'll want _both_ enabled for the final, production-ready emails.

Inspired by [Jigsaw](https://jigsaw.tighten.co/)'s approach, Maizzle makes this easy by allowing you to create custom build environments through additional `config.[env].js` files.

## Creating environments

Think of environments as 'build scenarios':

> When I run `maizzle build [environment]`, should X happen? Should CSS be inlined? Should my HTML be minified? Do I need some data to be available for the templates?

For example, let's define a _production_ environment, by creating a new file named `config.production.js`, in the project root:

```js
// config.production.js
module.exports = {
  doctype: `html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"`,
  language: 'ro',
  // ...
}
```

### Merging

Any new environment you create will be merged _on top_ of the base `config.js` when you build for that environment.
So in the case above, you only need to specify the config values that you are _changing_ in the `production` environment.

## Environment builds

To build your emails for a specific environment, pass the environment name as an argument to the `maizzle build` command:

```bash
maizzle build production
```

<alert>If a <code>config.[env].js</code> is not found, Maizzle will fallback to <code>config.js</code></alert>

By default, running `maizzle build production` will output production-ready emails in a `build_production` folder at the root of the project.

This output path is, of course, [configurable](/docs/build-paths/#path).

## Starter environments

Maizzle comes with two Environment configs:

1. `local`
3. `production`

### Local

The base [`config.js`](https://github.com/maizzle/maizzle/blob/master/config.js) is tailored to local development.

CSS purging, inlining, and most other Transformers are disabled, so you can quickly prototype your emails with all of Tailwind's classes at your disposal.

Build command: 

```bash
maizzle build
```

This has the fastest build time, since there is almost no post-processing going on.

<alert>To get fast development builds, don't enable inlining or cleanup options here.</alert>

<alert>This file can also be named <code>config.local.js</code>, if you prefer - Maizzle will pick it up and use it when developing locally.</alert>

### Production

[`config.production.js`](https://github.com/maizzle/maizzle/blob/master/config.production.js) is configured to output production-ready email code, formatted with humans in mind. 

CSS purging and inlining are enabled, but code is prettified so that you can share nicely-formatted, more readable code with other people.

Build command: 

```bash
maizzle build production
```

## Custom environments

You can create as many build environments as you need, and name them as you like.

For example, create a config file named `config.shopify.js`, that you would use to build only the templates from the `src/clients/shopify` folder.

The build command for it would be:

```bash
maizzle build shopify
```

## Template conditionals

You can output content in your emails based on the environment you're building for.

The environment name is globally available under the `page.env` variable:

```html
<if condition="page.env === 'production'">
  This will show only when running `maizzle build production` 
</if>
```

