<template>
  <Layout class="bg-white antialiased font-sans leading-normal">
    <main>
      <docs-header :links="links" />
      <section class="flex xl:w-auto lg:ml-80">
        <div class="px-6 lg:px-16 xl:px-20 pt-24 lg:pt-32 py-8 w-full md:w-2/3 lg:w-full max-w-3xl">
          <h1 class="text-black font-semibold leading-tight text-4xl pb-6">Maizzle Tutorials</h1>
          <p class="leading-code text-gray-700">Learn how to create HTML emails with Tailwind CSS in Maizzle.</p>
          <hr class="border-0 bg-gray-200">
          <ul>
            <li v-for="edge in $page.tutorials.edges" :key="edge.node.id" class="pb-8">
              <h2 class="text-2xl font-semibold leading-tight mb-4">
                <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
              </h2>
              <p class="leading-code text-gray-700 mb-4">{{ excerpt(edge.node) }}</p>
              <g-link :to="edge.node.path" class="text-ocean no-underline hover:text-ocean-darker">Read more &rarr;</g-link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </Layout>
</template>

<script>
import config from '~/.temp/config.js'
import Layout from '~/layouts/NoTransition'
import scrollToElement from 'scroll-to-element'
import TableOfContents from '@/components/TableOfContents'
import DocsHeader from '@/components/DocsHeader'

import links from '@/data/docs-links.yml'

function addScrollTo(el) {
  el.preventDefault()
  let href = el.target.getAttribute('href')

  scrollToElement(href, {
    offset: -110,
    ease: 'out-expo',
    duration: 400
  })

  history.pushState ? history.pushState(null, null, href) : location.hash = href
}

export default {
  data() {
    return {
      scrollTargets: []
    }
  },
  components: {
    Layout,
    DocsHeader,
    TableOfContents,
  },
  metaInfo () {
    return {
      title: 'Guides',
      meta: [
        { key: 'description', name: "description", content: 'Learn how to code responsive HTML email templates with Maizzle and Tailwind CSS.' },

        { property: "og:type", content: 'website' },
        { property: "og:title", content: 'Guides | Maizzle - Framework for Rapid Email Prototyping' },
        { property: "og:description", content: 'Learn how to code responsive HTML email templates with Maizzle and Tailwind CSS.' },
        { property: "og:url", content: this.$static.metadata.siteUrl },
        { property: "og:image", content: this.ogImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: 'Guides | Maizzle - Framework for Rapid Email Prototyping' },
        { name: "twitter:description", content: 'Learn how to code responsive HTML email templates with Maizzle and Tailwind CSS.' },
        { name: "twitter:site", content: "@maizzlejs" },
        { name: "twitter:creator", content: "@cossssmin" },
        { name: "twitter:image", content: this.ogImageUrl },
      ],
    }
  },
  updated () {
    const vm = this
    this.$nextTick(function () {
      if (vm.$route.hash) {
        vm.scrollTo(this.$route.hash)
      }
      vm.scrollTargets = document.querySelectorAll('h2 a, h3 a')
      vm.scrollTargets.forEach(el => {
        document.addEventListener ? el.addEventListener('click', addScrollTo, false) : el.attachEvent('onclick', addScrollTo)
      })
    })
  },
  mounted () {
    const vm = this
    this.$nextTick(function () {
      vm.scrollTargets = document.querySelectorAll('h2 a, h3 a')
      vm.scrollTargets.forEach(el => {
        document.addEventListener ? el.addEventListener('click', addScrollTo, false) : el.attachEvent('onclick', addScrollTo)
      })
    })
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
    scrollTo (target) {
      this.activeToc = target.href

      target = target.el ? target.el : target

      scrollToElement(target, {
        offset: -110,
        ease: 'out-expo',
        duration: 400
      })
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
query Tutorials ($page: Int) {
  tutorials: allTutorial (page: $page, perPage: 2) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        timeToRead
        datetime: date (format: "YYYY-MM-DD HH:mm:ss")
        content
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
