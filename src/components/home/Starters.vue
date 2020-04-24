<template>
  <section>
    <div class="relative bg-code pt-16 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8">
      <div class="absolute inset-0">
        <div class="bg-code h-1/3 sm:h-2/3"></div>
      </div>
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center">
          <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Starters
          </h2>
          <p class="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Get up and running quickly with ready-made Maizzle projects
            <br>
            Simply install one and start building your emails
          </p>
        </div>
        <ul class="mt-24 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <li
            v-for="edge in $static.starters.edges" :key="edge.node.id"
            class="relative group flex flex-col rounded-lg shadow-lg mb-4 lg:mb-0"
          >
            <img :src="edge.node.image" :alt="edge.node.title" class="rounded-lg">
            <g-link :to="edge.node.path" class="absolute flex items-center justify-center w-full h-full rounded-lg p-8 xl:bg-gradient-l-ocean-dark opacity-0 group-hover:opacity-90 transition-opacity duration-150">
              <h3 class="text-3xl text-white font-bold">{{ edge.node.title }}</h3>
            </g-link>
          </li>
        </ul>
        <div class="mt-10 max-w-md mx-auto flex justify-center md:mt-32">
          <g-link to="/starters/" class="group rounded-md shadow lg:flex justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-white hover:text-blue-50 bg-gradient-l-ocean-light focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
            View all Starters <span class="text-xl ml-1 group-hover:ml-3 transition-all duration-150">&rarr;</span>
          </g-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Starters',
  methods: {
    formatDate(from, to) {
      return moment(from).format(to)
    },
  },
}
</script>

<static-query>
query Starters ($page: Int) {
  starters: allStarter (page: $page, perPage: 3) {
    edges {
      node {
        id
        image
        title
        path
      }
    }
  }
}
</static-query>
