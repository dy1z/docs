<template>
  <section>
    <div class="py-12 md:py-20 lg:pb-24 lg:-mt-12">
      <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <svg class="absolute top-36 lg:top-60 right-0 sm:left-0 mx-auto transform -translate-y-1/4 xl:-translate-y-80 opacity-75" width="404" height="404" fill="none" viewBox="0 0 404 404">
          <defs>
            <pattern id="ad119f34-7694-4c31-947f-5c9d249b21f3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-indigo-100" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
        </svg>

        <div class="relative">
          <ul>
            <li
              v-for="(item, index) in testimonials" :key="`testimonial-${index}`"
              v-show="index === show"
            >
              <img class="mx-auto h-16 w-16 rounded-full" :src="item.user.avatar" alt>
              <blockquote class="mt-8">
                <div class="max-w-xl lg:max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
                  <p v-html="item.text" />
                </div>
                <footer class="mt-8">
                  <div class="md:flex md:items-center md:justify-center">
                    <div class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                      <div class="text-base leading-6 font-medium text-gray-900" v-html="item.user.name" />
                      <svg class="hidden md:block mx-1 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 0h3L9 20H6l5-20z" />
                      </svg>
                      <div class="text-base leading-6 font-medium text-gray-500">
                        {{ item.user.role }}
                        @
                        <a
                          :href="item.user.company.url"
                          target="_blank"
                          rel="noopener nofollow"
                          v-html="item.user.company.name"
                          class="hover:text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </li>
          </ul>
          <nav>
            <ul class="flex justify-center mt-6">
              <li
                v-for="(item, index) in testimonials" :key="`testimonial-knob-${index}`"
                @click="show = index"
                class="p-2 hover:text-ocean-dark"
                :class="[show === index ? 'text-ocean-dark' : 'text-gray-700 cursor-pointer']"
              >
                <svg class="w-3 fill-current" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50"/>
                </svg>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="h-12 sm:hidden"></div>
  </section>
</template>

<script>
import testimonials from '@/data/testimonials.yml'

export default {
  name: 'Testimonials',
  data() {
    return {
      show: 0,
    }
  },
  computed: {
    testimonials() {
      return testimonials
    },
  },
}
</script>

</style>
