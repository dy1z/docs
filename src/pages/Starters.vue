<template>
  <Layout class="bg-white antialiased font-sans leading-normal">
    <main>
      <docs-header :links="links" />
      <section class="flex xl:w-auto lg:ml-80">
        <div class="px-4 lg:px-16 xl:px-20 pt-24 lg:pt-32 py-8 w-full md:w-2/3 lg:w-full max-w-3xl">
          <h1 class="text-black font-semibold leading-tight text-4xl pb-6 font-inter">Maizzle Starters</h1>
          <p class="leading-code text-gray-700">Get started quickly with ready-made projects. Simply install one with the <code>maizzle new</code> command and start building your emails.</p>
          <hr class="mb-16 border-0 bg-gray-200">
          <ul>
            <li v-for="edge in $page.starters.edges" :key="edge.node.id" class="flex pb-8 mb-8 border-b border-gray-100 -mx-4">
              <figure class="w-3/12 mx-4">
                <g-link :to="edge.node.path">
                  <img :src="edge.node.image" :alt="edge.node.title">
                </g-link>
              </figure>
              <div class="w-9/12 mx-4">
                <header class="mb-4">
                  <h2 class="text-2xl font-semibold font-inter leading-tight mb-0 text-black hover:text-gray-700">
                    <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
                  </h2>
                  <time :datetime="edge.node.datetime" class="text-sm text-gray-500">Released {{ formatDate(edge.node.datetime, 'MMMM D, YYYY') }}</time>
                </header>
                <p class="leading-code text-gray-700 mb-4">{{ excerpt(edge.node) }}</p>
                <g-link :to="edge.node.path" class="text-ocean no-underline hover:text-ocean-darker">View Starter &rarr;</g-link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </Layout>
</template>

<script>
import moment from "moment"
import config from '~/.temp/config.js'
import Layout from '~/layouts/NoTransition'
import DocsHeader from '@/components/DocsHeader'
import links from '@/data/docs-links.yml'

export default {
  components: {
    Layout,
    DocsHeader,
  },
  metaInfo () {
    return {
      title: 'Starters',
      meta: [
        { key: 'description', name: "description", content: 'Learn how to code responsive HTML email templates with Maizzle and Tailwind CSS.' },

        { property: "og:type", content: 'website' },
        { property: "og:title", content: 'Starters | Maizzle - Framework for Rapid Email Prototyping' },
        { property: "og:description", content: 'Learn how to code responsive HTML email templates with Maizzle and Tailwind CSS.' },
        { property: "og:url", content: this.$static.metadata.siteUrl },
        { property: "og:image", content: this.ogImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: 'Starters | Maizzle - Framework for Rapid Email Prototyping' },
        { name: "twitter:description", content: 'Learn how to code responsive HTML email templates with Maizzle and Tailwind CSS.' },
        { name: "twitter:site", content: "@maizzlejs" },
        { name: "twitter:creator", content: "@cossssmin" },
        { name: "twitter:image", content: this.ogImageUrl },
      ],
    }
  },
  methods: {
    excerpt(post, length, clamp) {
      if (post.description) {
        return post.description
      }

      length = length || 280
      clamp = clamp || ' ...'
      let text = post.content.replace(/<pre(.|\n)*?<\/pre>/gm, '').replace(/<[^>]+>/gm, '')

      return text.length > length ? `${ text.slice(0, length)}${clamp}` : text
    },
    formatDate(from, to) {
      return moment(from).format(to)
    },
  },
  computed: {
    config () {
      return config
    },
    links () {
      return links
    },
    ogImageUrl () {
      return `${this.config.siteUrl}/images/maizzle-card.jpg`
    },
  },
}
</script>

<page-query>
query Starters ($page: Int) {
  starters: allStarter (page: $page, perPage: 6) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        datetime: date (format: "YYYY-MM-DD HH:mm:ss")
        image
        description
        path
      }
    }
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteName
    siteUrl
    siteDescription
  }
}
</static-query>
