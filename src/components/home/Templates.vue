<template>
  <section>
    <div class="relative bg-code pt-16 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8">
      <div class="absolute inset-0">
        <div class="bg-code h-1/3 sm:h-2/3"></div>
      </div>
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Premium Templates
          </h2>
          <p class="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Kickstart your project with premium email templates
            <br>
            Built with Tailwind CSS in Maizzle 👌
          </p>
        </div>
        <ul class="mt-24 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <li
            v-for="edge in $static.templates.edges" :key="edge.node.id"
            class="relative group flex flex-col rounded-lg shadow-lg mb-4 lg:mb-0"
          >
            <img :src="edge.node.image" :alt="edge.node.title" class="rounded-lg">
            <g-link :to="edge.node.path" class="absolute flex flex-col items-center justify-center w-full h-full rounded-lg p-8 xl:bg-gradient-l-ocean-dark opacity-0 xl:group-hover:opacity-90 transition-opacity duration-150">
              <h3 class="text-3xl leading-9 font-bold text-white">{{ edge.node.name }}</h3>
              <span class="block text-sm italic font-thin text-white">by {{ edge.node.author }}</span>
            </g-link>
          </li>
        </ul>
        <div class="flex justify-center max-w-md mx-auto mt-10 md:mt-24">
          <g-link to="/templates/" class="group shadow lg:flex justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-white hover:text-blue-50 bg-gradient-l-ocean-light focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
            Browse Templates <span class="text-xl ml-1 group-hover:ml-3 transition-all duration-150">&rarr;</span>
          </g-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Templates',
  methods: {
    formatDate(from, to) {
      return moment(from).format(to)
    },
  },
}
</script>

<static-query>
query Templates ($page: Int) {
  templates: allTemplate (page: $page, perPage: 3, order: DESC) {
    edges {
      node {
        id
        image
        name
        author
        path
      }
    }
  }
}
</static-query>
