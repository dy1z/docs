module.exports = {
  siteName: 'Maizzle',
  siteDescription: "Maizzle is a framework that helps you quickly build HTML emails with Tailwind CSS and advanced, email-specific post-processing.",
  siteUrl: 'https://maizzle.com',
  titleTemplate: `%s | Maizzle - Framework for Rapid Email Prototyping`,
  icon: 'src/favicon.png',

  transformers: {
    remark: {
      autolinkClassName: 'anchor-icon',
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        baseDir: './content/docs',
        route: '/docs/:slug',
        typeName: 'Doc',
        template: './src/templates/Doc.vue',
        plugins: [
          '@gridsome/remark-prismjs'
        ],
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        baseDir: './content/guides',
        route: '/guides/:slug',
        typeName: 'Guide',
        template: './src/templates/Guide.vue',
        plugins: [
          '@gridsome/remark-prismjs'
        ],
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
              defaultExtractor: content => content.match(/[\w-/:.%]+(?<!:)/g) || [],
              whitelistPatterns: [/a(lgoli)?a/]
            }),
          ])
        }

        return options
      })
  },
}





