module.exports = {
  siteName: 'Maizzle',
  siteDescription: "Maizzle is an email framework that helps you quickly build HTML emails with Tailwind CSS.",
  siteUrl: 'https://maizzle.com',
  titleTemplate: `%s | Maizzle - Framework for Rapid Email Prototyping`,
  icon: 'src/favicon.png',

  transformers: {
    remark: {
      autolinkClassName: 'anchor-icon',
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        ['gridsome-plugin-remark-shiki', {
          theme: 'quietlight'
        }]
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/docs/**/*.md',
        typeName: 'Doc',
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-123145832-1'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
  ],

  templates: {
    Doc: '/docs/:slug',
  },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(...[
            require('@fullhuman/postcss-purgecss')({
              content: [
                'src/assets/**/*.css',
                'content/**/*.md',
                'src/**/*.vue',
                'src/**/*.js'
              ],
              defaultExtractor: content => content.match(/[\w-/:%]+(?<!:)/g) || [],
              whitelistPatterns: [/shiki/, /a(lgoli)?a/]
            }),
          ])
        }

        return options
      })
  },
}





