---
title: "Browsersync"
slug: "browsersync"
description: "Develop emails locally with Browsersync and have the browser automatically refresh the page when you update an email template"
---

# Browsersync

When running the `maizzle serve` command, Maizzle uses [Browsersync](https://browsersync.io/) to start a local server and open a directory listing of your emails in your default browser.

You can then make changes to your emails, save them, and watch the browser automatically refresh the page for you.

Here is the default Browsersync config in Maizzle:

```js
// config.js
module.exports = {
  browsersync: {
    directory: true,
    notify: false,
    open: false,
    port: 3000,
    tunnel: false,
    watch: [
      'src/layouts/**/*.*',
      'src/partials/**/*.*',
      'src/components/**/*.*',
    ],
  },
  // ...
}
```

## directory

When running `maizzle serve` with this setting enabled, Browsersync will open a file explorer in your browser, starting at the root of the build directory.

If you set this to `false`, the page opened by Browsersync will be blank, and you'll need to manually navigate to your emails directory.

<div class="bg-cool-gray-50 border-l-4 border-gradient-b-orange-dark p-4 mb-4 text-md" role="alert">
  <div class="text-cool-gray-500">If using the <code>tunnel</code> option for a client demo, use <code>directory: false</code>, so they can't freely browse all your emails by going to the root URL.</div>
</div>

## notify

Toggle Browsersync's annoying pop-over notifications. Off by default ✌

## open

Decide which URL to open automatically when Browsersync starts. 

Can be `true`, `local`, `external`, `ui`, `ui-external`, `tunnel` or `false`

See [Browsersync docs](https://browsersync.io/docs/options#option-open) for details.

## port

Set the server port number - by default, your local development server will be available at <code>http&zwnj;://localhost:<strong>3000</strong></code>.

## tunnel

When set to `true`, Maizzle will enable localhost tunneling in Browsersync, so you can live-share a URL to an email that you're working on right now, with a colleague or a client. Under the hood, [localtunnel.me](https://localtunnel.me) will be used.

Both parties see the same thing, and scrolling is synced, too.

You can also use a string instead of a boolean - for example `tunnel: 'mybrand'`. In this case, Browsersync will attempt to use a custom subdomain for the URL, i.e. `https://mybrand.localtunnel.me`.
If that subdomain is unavailable, you will be allocated a random name as usual.

## watch

Array of extra paths for Browsersync to watch.

By default, the following paths are watched: 

- All your Template files, as defined in `build.templates.source`
- All your Asset files, as defined in `build.assets.source`
- `tailwind.config.js`

You can use this option to configure additional watch paths when developing locally:

```js
// config.js
module.exports = {
  browsersync: {
    watch: [
      // ...default paths,
      './src/some-dir',
      'some-file.js',
    ],
  },
  // ...
}
```

When a file in these custom watch paths is updated, Browsersync will trigger a rebuild and will also refresh the browser page.


