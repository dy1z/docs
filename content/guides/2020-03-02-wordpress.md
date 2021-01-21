---
title: "Using the WordPress API to create a newsletter from your posts"
slug: "wordpress-api-posts-email-newsletter"
description: "Learn how to use the WordPress API and Maizzle to create an HTML email newsletter with your latest posts."
date: 2020-03-02
---

import Alert from '~/components/Alert.vue'

<alert>This tutorial was updated on April 8, 2020 to use PostHTML syntax.</alert>

In this tutorial, we'll learn how to fetch content from an API, process it, and display it in an HTML email newsletter with Maizzle.

You can [preview the final result](https://codepen.io/maizzle/pen/wvaeOVM?editors=1000) on CodePen.

## Initial setup

As always, make sure you have [Maizzle CLI](/docs/installation/#install-the-cli-globally) installed.

Next, open a CLI and run the `new` command to scaffold a new project:

```sh
maizzle new
```

Follow the steps, using `example-wordpress` as the folder name.

Once it finishes installing dependencies, open the project in your favorite editor.

## WordPress API

Instead of imagining abstract APIs and how you'd interact with them, let's work with a real one so you can actually follow along and test things out yourself.

Given its popularity, we'll be using the [WordPress REST API](https://developer.wordpress.org/rest-api/) in our example.
We'll also need to fetch data from a real blog, so let's use the wonderful [CSS-Tricks](https://css-tricks.com).

The WordPress API on CSS-Tricks is available at https://css-tricks.com/wp-json/wp/v2/

Click that link and you'll see the various routes you can access.

### `/posts` route

We can fetch posts from the `/posts` route:

https://css-tricks.com/wp-json/wp/v2/posts/

We can also use [query string parameters](https://developer.wordpress.org/rest-api/reference/posts/#arguments) in order to refine our API call.

For example, this only asks for the 3 latest posts:

https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=3&_embed=1

<alert><code>_embed=1</code> is a request scope that adds a few more fields to the response. We use it to include <code>_embedded["wp:featuredmedia"]</code>.</alert>

## Fetch posts

Let's use the `<fetch>` tag to fetch posts from the CSS-Tricks WordPress API. 

```html
<fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
  <!-- Posts are now available in {{ response }} -->
</fetch>
```

## Use in Template

`promotional.html` in Maizzle displays 6 articles in four different layouts. Above, we're also fetching the latest 6 articles from CSS-Tricks, so it's a perfect fit 🙄

### Featured Post

Let's update the Hero with background image to show the first post.

Our code becomes:

```html
---
bodyClass: bg-gray-200
title: "Latest posts on CSS-Tricks"
preheader: "👀 Lorem, ipsum, and much dolor in this week's edition"
---

<fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
  <!-- ... existing template markup before the HERO <tr> -->
  <tr>
    <td class="bg-top bg-no-repeat bg-cover rounded text-left" style="background-image: url('{{ response[0]._embedded['wp:featuredmedia'][0]['source_url'] || 'https://via.placeholder.com/600x400' }}');">
      <!--[if mso]>
      <v:image src="{{ response[0]._embedded['wp:featuredmedia'][0]['source_url'] || 'https://via.placeholder.com/600x400' }}" xmlns:v="urn:schemas-microsoft-com:vml" style="width:600px;height:400px;" />
      <v:rect fill="false" stroke="false" style="position:absolute;width:600px;height:400px;">
      <v:textbox inset="0,0,0,0"><div><![endif]-->
      <div class="leading-32">&zwnj;</div>
      <table class="w-full">
        <tr>
          <td class="w-48 sm:w-16"></td>
          <td>
            <h1 class="m-0 mb-16 text-4xl text-white sm:leading-40">{{ response[0].title.rendered }}</h1>
            <div class="m-0 text-white text-lg leading-24">{{ response[0].excerpt.rendered }}</div>
            <div class="leading-32">&zwnj;</div>
            <table>
              <tr>
                <th class="bg-indigo-800 hover:bg-indigo-700 rounded" style="mso-padding-alt: 16px 24px;">
                  <a href="{{ response[0].link }}" class="block font-semibold text-white text-base leading-full py-16 px-24 no-underline">Read more &rarr;</a>
                </th>
              </tr>
            </table>
          </td>
          <td class="w-48 sm:w-16"></td>
        </tr>
      </table>
      <div class="leading-32">&zwnj;</div>
      <!--[if mso]></div></v:textbox></v:rect><![endif]-->
    </td>
  </tr>
</fetch>
```

We can use `response[index]` to output data for each post, manually. For example, we would use `response[1].title.rendered` to show the title of the second post.

### Post dates

We can add a function to `config.js` and use it to format the post's date according to our audience's locale:

```js
// config.js
module.exports = {
  formattedDate: (str) => {
    const date = new Date(str)
    return date.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})
  }
}
```

We can then display it in the template with Nunjucks, like so:

```handlebars
{{ page.formattedDate(response[1].date) }}
```

### Looping

We can use the `<each>` tag in Maizzle to loop over each item in the `response`:

```html
<fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
  <each loop="post in response">
    {{ post.title.rendered }}
  </each>
</fetch>
```

Want to loop over a specific subset only? You can use expressions when creating the loop.

For example, let's show the last 2 posts in a list format at the end of the template:

```html
<fetch url="https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=6&_embed=1">
  <h3 class="m-0 text-base font-semibold text-gray-500 uppercase">From the archives</h3>
  <div class="leading-24">&zwnj;</div>
  <table class="w-full">
    <each loop="post in response.slice(-2)">
      <tr>
        <td>
          <p class="text-xs text-gray-500 mb-2">{{ page.formattedDate(post.date) }}</p>
          <h4 class="m-0 mb-4 text-xl font-semibold">
            <a href="{{ post.link }}" class="text-blue-500 hover:text-blue-400 no-underline">{{ post.title.rendered }}</a>
          </h4>
          <div class="m-0 text-gray-500">{{ post.excerpt.rendered }}</div>
          <if condition="loop.last">
            <table class="w-full">
              <tr>
                <td class="py-24">
                  <div class="bg-gray-300 h-px leading-px">&zwnj;</div>
                </td>
              </tr>
            </table>            
          </if>
        </td>
      </tr>
    </each>
  </table>
</fetch>
```

Notes:

- we also added the post date in a paragraph above the title
- we're using the [`loop` metadata](/docs/templates/#loops) to output the divider only _between_ list items

## Conclusion

All that we've done in this tutorial is to:

1. Use the `<fetch>` tag to fetch JSON data from an API endpoint
2. Use that data in a Maizzle template

So this isn't tied to WordPress: it was used as an example because of its convenient API, but you're free to implement it with any other APIs.

Some ideas:

- use your CMS as an authoring system for your newsletter's content
- show the latest products from your store
- include data from [public APIs](https://github.com/public-apis/public-apis)

## Resources

- [CSS-Tricks](https://css-tricks.com)
- [Maizzle Events](/docs/events/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [GitHub repo](https://github.com/maizzle/example-wordpress) for this tutorial
