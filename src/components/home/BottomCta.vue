<template>
  <section>
    <div class="bg-white mx-4">
      <div class="max-w-screen-lg bg-gradient-bl-ocean-dark shadow-2xl rounded-lg mx-auto text-center py-12 px-4 relative z-10 transition-transform duration-150 transform lg:hover:scale-105 sm:px-6 lg:py-32 lg:px-8">
        <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
          Start building awesome emails
        </h2>
        <p class="mt-4 max-w-2xl sm:text-lg leading-7 text-gray-100 lg:mx-auto">
          Install Maizzle and start building your first email in seconds. Read the docs to learn about advanced concepts and features, or checkout the examples.
        </p>
        <div class="mt-8 flex justify-center">
          <div class="inline-flex rounded-md shadow">
            <g-link to="/docs/introduction/" class="w-full flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-white bg-gradient-l-pink-dark focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
              Get started <span class="text-xl leading-5 ml-1">&rarr;</span>
            </g-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BottomCta'
}
</script>
