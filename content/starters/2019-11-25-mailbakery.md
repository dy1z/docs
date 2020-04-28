---
title: "MailBakery"
slug: "mailbakery"
repository: https://github.com/maizzle/starter-mailbakery.git
description: "Free email templates designed by MailBakery."
image: https://res.cloudinary.com/maizzle/image/upload/v1586366332/starters/mailbakery.jpg
date: 2019-11-25
---

## Templates

MailBakery offers [over 50 free HTML email templates](https://mailbakery.com/template-store/free-html-email-templates/) 🤯

This Starter currently includes the following:

- [Be Shoppy](https://mailbakery.com/template-store/product/be-shoppy-free/)
- [Luxury Estates](https://mailbakery.com/template-store/product/luxury-estates/)

## Versions

Each template includes:

- HTML version
- MailChimp version
- Campaign Monitor version

## Building

Templates are organized into folders by Version. 

Each one has its own config and enables its own build command:

- `config.html.js` => `maizzle build html`
- `config.mailchimp.js` => `maizzle build mailchimp`
- `config.campaign-monitor.js` => `maizzle build campaign-monitor`

There's also a `config.all.js` that will build all Versions.
