<template>
  <div class="container bg-gray-700">
    <div class="bg-gray-200">
      <u-svg class="w-12" name="chevron-down" />
      <u-icon name="chevron-down" />
      <h1 class="title">
        Convertify
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style>

  .container {
    @apply min-h-screen flex justify-center items-center text-center mx-auto;
  }

</style>
