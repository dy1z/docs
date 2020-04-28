<template>
  <aside class="toc hidden md:block lg:hidden xl:block md:w-1/3 xl:w-1/6 lg:pt-24" v-show="title && page.headings.length > 2">
    <div class="pl-6 fixed sticky top-24 w-full">
      <div class="overflow-y-auto h-quickies py-8 md:mx-12 xl:mx-0">
        <h4 class="font-normal text-cool-gray-700 mb-4 mt-2 p-0">{{ title || 'On this page:'}}</h4>
        <ul class="text-sm">
          <template v-for="item in page.headings">
            <li v-if="item.depth > 1 && item.depth < 6" :key="item.anchor" class="mb-2 truncate">
              <a
                :href="`${item.anchor}`"
                @click.prevent="scrollTo(item.anchor)"
                :class="{'ml-4': item.depth > 2, 'active': item.anchor == activeToc}"
                class="bg-cool-gray-500 text-gradient hover:bg-gradient-l-ocean-dark scroll-to"
              >
                {{ item.value }}
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import scrollToElement from 'scroll-to-element'

export default {
  name: 'TableOfContents',
  props: ['page', 'title'],
  data () {
    return {
      links: [],
      activeToc: ''
    }
  },
  mounted () {
    if (this.$route.hash) {
      this.scrollTo(this.$route.hash)
      this.activeToc = this.$route.hash
    }
  },
  methods: {
    scrollTo (anchor) {
      this.activeToc = anchor

      scrollToElement(anchor, {
        offset: -110,
        ease: 'out-expo',
        duration: 400
      })

      history.pushState ? history.pushState(null, null, anchor) : location.hash = anchor
    },
  },
}
</script>
