<template>
  <Layout class="bg-white antialiased font-sans leading-normal">
    <main>
      <docs-header :links="links" />
      <section class="flex xl:w-auto lg:ml-80">
        <article class="markdown w-full lg:max-w-3xl px-4 lg:px-16 xl:px-20 py-24 lg:pt-32">
          <header class="flex flex-col">
            <h1 v-html="$page.template.name" class="tracking-tight -mb-6 sm:w-8/12" />
            <p class="italic text-gray-500">by {{ $page.template.author }}</p>
          </header>
          <p>{{ $page.template.description }}</p>
          <VueRemarkContent />
        </article>
      </section>
    </main>
  </Layout>
</template>

<script>
import moment from 'moment'
import config from '~/.temp/config.js'
import Layout from '~/layouts/NoTransition'
import scrollToElement from 'scroll-to-element'
import DocsHeader from '@/components/DocsHeader'
import CarbonSidebar from '@/components/CarbonSidebar'

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
    CarbonSidebar,
  },
  metaInfo () {
    return {
      title: `${this.$page.template.title} Starter`,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.description(this.$page.template)
        },
        { property: "og:title", content: `${this.$page.template.title} Starter` },
        { property: "og:type", content: 'article' },
        { property: "og:description", content: this.description(this.$page.template) },
        { property: "og:image", content: this.ogImageUrl },
        { property: "og:url", content: `${this.config.siteUrl}${this.$page.template.path}/` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${this.$page.template.title} Starter` },
        { name: "twitter:description", content: this.description(this.$page.template) },
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
    description(post, length, clamp) {
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
query Template ($path: String) {
  template (path: $path) {
    datetime: date (format: "YYYY-MM-DD HH:mm:ss")
    path
    title
    name
    author
    content
    description
    image
    headings {
      depth
      value
      anchor
    }
  }
}
</page-query>
