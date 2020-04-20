<template>
  <section>
    <div class="bg-gradient-r-code pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="relative max-w-lg mx-auto lg:max-w-7xl">
        <div class="items-center flex flex-wrap justify-between">
          <div>
            <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10 ">
              Tutorials
            </h2>
            <div class="mt-3 sm:mt-4">
              <p class="text-xl leading-7 text-gray-500">
                Learn how to create HTML emails with Tailwind CSS in Maizzle.
              </p>
            </div>
          </div>
          <div class="mt-6 lg:mt-0">
            <g-link to="/guides/" class="group text-base leading-6 font-semibold text-gradient bg-gradient-l-ocean-dark">
              View all <span class="group-hover:ml-1 transition-all duration-150">&rarr;</span>
            </g-link>
          </div>
        </div>
        <div class="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-2 lg:col-gap-5 lg:row-gap-12">
          <div v-for="edge in $static.guides.edges" :key="edge.node.id">
            <p class="text-sm leading-5 text-gray-500">
              <time :datetime="edge.node.datetime">{{ formatDate(edge.node.datetime, 'MMMM D, YYYY') }}</time>
            </p>
            <g-link :to="edge.node.path" class="block">
              <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                {{ edge.node.title }}
              </h3>
              <p class="mt-3 text-base leading-6 text-gray-500">
                {{ edge.node.description }}
              </p>
            </g-link>
            <div class="mt-3">
              <g-link :to="edge.node.path" class="group text-base leading-6 font-semibold text-gradient bg-gradient-l-ocean-dark">
                Read more <span class="group-hover:ml-1 transition-all duration-150">&rarr;</span>
              </g-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Guides',
  methods: {
    formatDate(from, to) {
      return moment(from).format(to)
    },
  },
}
</script>

<static-query>
query Guides ($page: Int) {
  guides: allGuide (page: $page, perPage: 6) @paginate {
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
        content
        description
        path
      }
    }
  }
}
</static-query>
