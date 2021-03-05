<template>
  <section>
    <div class="relative bg-mailviews-dark overflow-hidden">
      <div class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <img src="https://mailviews.com/img/logo.png" alt="Mailviews" width="219" class="mb-12 sm:mb-24 mx-auto lg:ml-0">
          <p class="mt-3 max-w-md mx-auto text-lg text-mailviews sm:text-xl md:mt-5 md:max-w-3xl">
            100s of responsive HTML email components and templates, from the creators of Maizzle.
          </p>
          <p class="mt-3 max-w-md mx-auto text-lg text-mailviews sm:text-xl md:mt-5 md:max-w-3xl">
            Coming later this year.
          </p>
          <div class="mt-12 sm:mt-24 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md">
              <a href="https://mailviews.com/" class="group shadow lg:flex justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-white hover:text-blue-50 bg-gradient-l-ocean-light focus:outline-none focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                Get notified <span class="text-xl ml-1 group-hover:ml-3 transition-all duration-150">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="relative w-full h-96 lg:absolute z-10 lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <img class="absolute inset-0 w-full h-full object-cover" src="https://mailviews.com/img/preview.jpg" alt="">
      </div>
      <img src="https://mailviews.com/img/backdrop.svg" alt="" class="absolute bottom-0 transform xl:scale-150 select-none pointer-events-none opacity-50">
    </div>
  </section>
</template>

<script>
export default {
  name: 'Mailviews',
}
</script>
