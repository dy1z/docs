---
title: "How to use the WordPress API to create a newsletter from your posts"
slug: "wordpress-api-posts-email-newsletter"
description: "Learn how to use the WordPress API and Maizzle to create a newsletter with your latest posts."
date: 2020-03-02
---

In this tutorial, we'll learn how to use [Events](/docs/events/) in Maizzle to fetch content from an API and display it in an HTML email newsletter.

You can [preview the final result](https://codepen.io/maizzle/pen/wvaeOVM?editors=1000) on CodePen.

## Initial setup

As always, make sure you have [Maizzle installed](/docs/installation/).

Next, open a CLI and run the `new` command to scaffold a new project:

```sh
maizzle new example-wordpress
```

This will create an `example-wordpress` folder at your current location, and will also automatically install NPM dependencies for you.

Once it finishes, open the project folder in your favourite editor.

### axios

We'll be using the [axios](https://github.com/axios/axios) library to make requests to the API, so let's install it:

```sh
npm install axios
```

## WordPress API

Instead of imagining abstract APIs and how you'd interact with them, let's work with a real one so you can actually follow along and test things out yourself.

Given its popularity, we'll be using the [WordPress REST API](https://developer.wordpress.org/rest-api/) in our example.
We'll also need to fetch data from a real blog, so let's use the wonderful [CSS-Tricks](https://css-tricks.com).

The WordPress API on CSS-Tricks is available at:

```
https://css-tricks.com/wp-json/wp/v2/
```

Load that in the browser and you'll see the various routes you can access.

### `/posts` route

We can fetch posts from the `/posts` route:

```
https://css-tricks.com/wp-json/wp/v2/posts/
```

We can also use [query string parameters](https://developer.wordpress.org/rest-api/reference/posts/#arguments) in order to refine our API call.

For example, this only asks for the 3 latest posts:

```
https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=3&_embed=1
```

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600"><code class="shiki-inline">_embed=1</code> is a request scope that adds a few more fields to the response. In our case, <code class="shiki-inline">_embedded["wp:featuredmedia"]</code> is what we're after.</div>
</div>

## Define Endpoint

Let's add the endpoint for the 6 latest posts inside the `build` object in `config.js`:

```js
// config.js
module.exports = {
  build: {
    endpoint: 'https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1',
    // ...
  },
}
```

## Add Event

We can use [Events](/docs/events/) in Maizzle to fetch data with axios from the WordPress API.

First, edit `config.js` and `require('axios)`:

```js
const axios = require('axios').default

module.exports = {
  // ...
}
```

Next, inside `module.exports`, add an `events: {}` object:

```js
const axios = require('axios').default

module.exports = {
  // ...
  events: {}
}
```

### beforeCreate

We only need to fetch posts and save them in the config once, so let's do that inside the [`beforeCreate`](/docs/events/#beforecreate) event:

```js
const axios = require('axios').default

module.exports = {
  // ...
  events: {
    beforeCreate(config) {
      // we can now get/set stuff in the config
    }
  }
}
```

## Fetch posts

Let's use axios to fetch posts from the CSS-Tricks WordPress API. 

Notice how we also define `beforeCreate` as an `async` function, so that inside it we can `await` for axios to fetch data from the endpoint:

```js
const axios = require('axios').default

module.exports = {
  // ...
  events: {
    async beforeCreate(config) {
      try {
        // fetch data from endpoint
        const { data } = await axios.get(config.build.endpoint)
        // create the posts object
        config.posts = {}
        // create a collection of 'all' posts that we fetched
        config.posts.all = data
        console.log(config.posts)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
```

Dry run: use the `maizzle build` command and you'll see data about all 6 latest posts from CSS-Tricks logged to your console 🤯

We now have the data to work with, so let's use it in our template.

<div class="bg-gray-100 border-l-4 border-gradient-b-ocean-light p-4 mb-4 text-md" role="alert">
  <div class="text-gray-600">First time you run the command, it might take a few seconds for it to complete. However, <code class="shiki-inline">axios</code> will cache subsequent requests, so compilation will be fast enough to even use this while developing with the <code class="shiki-inline">maizzle serve</code> command.</div>
</div>

## Use in Template

The `promotional.njk` template in Maizzle displays 6 articles in four different layouts.

We're also fetching the latest 6 articles from CSS-Tricks, so it's a perfect fit.

![Tribore from Final Space](https://res.cloudinary.com/maizzle/image/upload/v1583155347/guides/wp2email/tribore-coincidence.png)

### Featured Post

Let's update the Hero with background image to show the first post.

First, we need to make sure we show _some_ background image if the post doesn't come with one. 
We use `set` in Nunjucks to set a variable right after we extend the default Layout:

```handlebars
---
bodyClass: bg-gray-200
title: "Latest posts on CSS-Tricks"
preheader: "👀 Lorem, ipsum, and much dolor in this week's edition"
---

{% extends "src/layouts/default.njk" %}
{% set featured_post_image = allPosts[0]._embedded["wp:featuredmedia"][0]["source_url"] or 'https://via.placeholder.com/600x400' %}
```

We can now use `featured_post_image` to show either the post's featured image, or a fallback that we choose.

While we're at it, let's also `set` a `posts` variable, so we don't always have to write `page.posts.all[...]`:

```handlebars
{% set allPosts = page.posts.all %}
```

With this setup, we can modify the featured post in our template to display the first post we fetched from the API:

```handlebars
<tr>
  <td class="bg-top bg-no-repeat bg-cover rounded text-left" style="background-image: url('{{ featured_post_image }}');">
    {% component "src/components/vmlbg.njk", {width: 600, height: 400, src: featured_post_image} %}
      <div class="leading-32">&zwnj;</div>
      <table class="w-full">
        <tr>
          <td class="w-48 sm:w-16"></td>
          <td>
            <h1 class="m-0 mb-16 text-4xl text-white sm:leading-40">{{ allPosts[0].title.rendered }}</h1>
            <div class="m-0 text-white text-lg leading-24">{{ allPosts[0].excerpt.rendered | truncate(160) }}</div>
            <div class="leading-32">&zwnj;</div>
            <table>
              <tr>
                <th class="bg-indigo-800 hover:bg-indigo-700 rounded" style="mso-padding-alt: 16px 24px;">
                  <a href="{{ allPosts[0].link }}" class="block font-semibold text-white text-base leading-full py-16 px-24 no-underline">Read more &rarr;</a>
                </th>
              </tr>
            </table>
          </td>
          <td class="w-48 sm:w-16"></td>
        </tr>
      </table>
      <div class="leading-32">&zwnj;</div>
    {% endcomponent %}
  </td>
</tr>
```

### Post dates

We can add a function to `config.js` and use it to format the post's date according to our audience's locale:

```js
// config.js
module.exports = {
  // ...
  formattedDate: (str) => {
    const date = new Date(str)
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
  }
}
```

We can then display it in the template with Nunjucks, like so:

```handlebars
{{ page.formattedDate(allPosts[1].date) }}
```

### Looping

Using `allPosts[index]` we can manually add each post to our email template. 

However, what if we just wanted to loop over all templates in one go, instead?

We can do that with Nunjucks!

For our example, let's imagine we only want to loop over the last 2 posts and display them in a list format at the end of the template.

First, let's place these two posts in their own object, so we can loop over it. 
Update your `beforeCreate` event to look like this:

```js
async beforeCreate(config) {
  try {
    // fetch data from endpoint
    const { data } = await axios.get(config.build.endpoint)
    // create the posts object
    config.posts = {}
    // create a collection of 'all' posts that we fetched
    config.posts.all = data
    // create an object with the last two posts
    config.posts.lasttwo = data.slice(-2)
  } catch (error) {
    console.error(error)
  }
}
```

Next, edit the template and loop over `page.posts.lasttwo` in the table under the "From the archives" heading:

```handlebars
<h3 class="m-0 text-base font-semibold text-gray-500 uppercase">From the archives</h3>
  <div class="leading-24">&zwnj;</div>
  <table class="w-full">
    {% for post in page.posts.lasttwo %}
    <tr>
      <td>
        <p class="text-xs text-gray-500 mb-2">{{ page.formattedDate(post.date) }}</p>
        <h4 class="m-0 mb-4 text-xl font-semibold">
          <a href="{{ post.link }}" class="text-blue-500 hover:text-blue-400 no-underline">{{ post.title.rendered }}</a>
        </h4>
        <div class="m-0 text-gray-500">{{ post.excerpt.rendered | truncate(60) }}</div>
        {% if loop.last === false %}
        <table class="w-full">
          <tr>
            <td class="py-24">
              <div class="bg-gray-300 h-px leading-px">&zwnj;</div>
            </td>
          </tr>
        </table>
        {% endif %}
      </td>
    </tr>
    {% endfor %}
  </table>
```

Notes:

-  we also added the post date in a paragraph above the title
- we're using the `loop` variable in a Nunjucks `for` loop to output the divider only _between_ list items

## Conclusion

All that we've done in this tutorial is to:

1. Use `axios` to fetch JSON data from an API endpoint
2. Use that data in a Nunjucks template

So this isn't tied to WordPress: it was used as an example because of its convenient API, but you're free to implement it with any other APIs.

Some ideas:

- use your CMS as an authoring system for your newsletter's content
- send subscribers the latest products from your store
- include data from [public APIs](https://github.com/public-apis/public-apis)

## Resources

- [CSS-Tricks](https://css-tricks.com)
- [Maizzle Events](/docs/events/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [GitHub repo](https://github.com/maizzle/example-wordpress) for this tutorial
