<template>
  <div
    class="alert"
    :class="classes"
    role="alert"
  >
    <div class="text-cool-gray-500">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['type'],
  computed: {
    classes() {
      switch (this.type) {
        case 'success':
          return 'border-gradient-b-green-dark'
          break
        case 'info':
          return 'border-gradient-b-ocean-light'
          break
        case 'warning':
          return 'border-gradient-b-orange-dark'
          break
        case 'danger':
          return 'border-gradient-b-red-dark'
          break

        default:
          return 'border-gradient-b-ocean-light'
          break
      }
    }
  },
}
</script>

<style>
  .alert {
    @apply bg-cool-gray-50 border-l-4 p-4 mb-4 text-base;

    p:last-child {
      @apply mb-0 !important;
    }
  }
</style>
