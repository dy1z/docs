<template>
  <Layout class="bg-white leading-normal font-inter">
    <main>
      <hero />
      <highlights />
      <features />
      <tutorials />
      <testimonials />
      <bottom-cta />
      <site-footer />
    </main>
  </Layout>
</template>

<script>
import config from '~/.temp/config.js'

import Hero from '~/components/home/Hero.vue'
import Highlights from '~/components/home/Highlights.vue'
import Features from '~/components/home/Features.vue'
import Tutorials from '~/components/home/Tutorials.vue'
import Testimonials from '~/components/home/Testimonials.vue'
import BottomCta from '~/components/home/BottomCta.vue'
import SiteFooter from '~/components/home/Footer.vue'

export default {
  components: {
    Hero,
    Highlights,
    Features,
    Tutorials,
    Testimonials,
    BottomCta,
    SiteFooter,
  },
  metaInfo () {
    return {
      title: 'Home',
      meta: [
        { property: "og:type", content: 'website' },
        { property: "og:title", content: 'Maizzle - Framework for Rapid Email Prototyping' },
        { property: "og:description", content: this.$static.metadata.siteDescription },
        { property: "og:url", content: this.$static.metadata.siteUrl },
        { property: "og:image", content: this.ogImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: 'Maizzle - Framework for Rapid Email Prototyping' },
        { name: "twitter:description", content: this.$static.metadata.siteDescription },
        { name: "twitter:site", content: "@maizzlejs" },
        { name: "twitter:creator", content: "@cossssmin" },
        { name: "twitter:image", content: this.ogImageUrl },
      ],
    }
  },
  computed: {
    config () {
      return config
    },
    ogImageUrl () {
      return `${this.config.siteUrl}/images/maizzle-card.jpg`
    }
  },
}
</script>

<static-query>
query {
  metadata {
    siteName
    siteUrl
    siteDescription
  }
}
</static-query>

