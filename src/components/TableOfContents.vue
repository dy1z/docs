<template>
  <aside class="toc hidden md:block lg:hidden xl:block md:w-1/3 xl:w-1/6 lg:pt-24" v-if="links.length > 1">
    <div class="pl-6 fixed sticky top-24 w-full">
      <div class="overflow-y-auto h-quickies py-8 md:mx-12 xl:mx-0">
        <h4 class="font-normal text-gray-700 mb-4 mt-2 p-0" v-if="title && links.length > 0">On this page:</h4>
        <ul class="text-sm">
          <li v-for="link in links" :key="link.href" class="mb-2">
            <a :href="`#${link.href}`" @click="scrollTo(link)" :class="{'ml-4': link.isChild, 'active': link.href == activeToc}" class="text-gray-600 hover:text-black scroll-to">
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import scrollToElement from 'scroll-to-element'

function getHeadingText(el) {
  let text = ''
  for (var i = 0; i < el.childNodes.length; ++i) {
    if (el.childNodes[i].nodeType === 3) {
      text += el.childNodes[i].textContent;
    }
  }
  return text
}

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
    this.activeToc = ''
    if (this.$route.hash) {
      this.scrollTo(this.$route.hash)
      this.activeToc = this.$route.hash.substring(1)
    }
    this.showToc()
  },
  methods: {
    showToc () {
      const headings = [...document.querySelectorAll(".markdown h2, .markdown h3")]

      this.links = headings.map(el => {
        return {
          el: el,
          text: getHeadingText(el),
          href: el.getAttribute('id'),
          isChild: ['H3'].includes(el.tagName)
        }
      })
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
  watch: {
    page () {
      this.showToc()
    }
  }
}
</script>
