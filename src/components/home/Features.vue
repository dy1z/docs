<template>
  <section>
    <div class="py-12 bg-gradient-l-code">
      <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
        <div class="lg:text-center">
          <p class="text-base leading-6 text-gradient bg-gradient-l-ocean-dark font-semibold tracking-wide uppercase">Toolkit</p>
          <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Maizzle Features
          </h3>
          <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
            Customizable tools, crafted for email development
          </p>
        </div>
        <div class="lg:grid lg:grid-cols-3 lg:gap-8 mt-10 lg:mt-24 justify-center">
          <div
            class="bg-white transition-all duration-150 transform hover:scale-105 rounded hover:shadow-xl-cards"
            v-for="(feature, index) in features"
            :key="index"
            :class="[index > 0 ? 'mt-6 lg:mt-0' : '']"
          >
            <g-link :to="feature.path">
              <div class="p-6">
                <h5 class="text-lg leading-6 font-medium text-gray-900">{{ feature.title }}</h5>
                <p class="mt-2 text-sm leading-6 text-gray-500" v-html="feature.description" />
              </div>
            </g-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import features from '@/data/features.yml'

export default {
  name: 'Features',
  data() {
    return {
      features: features
    }
  },
}
</script>
