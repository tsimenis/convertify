<template>
  <div class="view view-home min-h-screen">
    <home-hero />
    <currency-converter />
  </div>
</template>

<script>

  import HomeHero from '@/components/HomeHero'
  import CurrencyConverter from '@/components/CurrencyConverter'

  export default {
    components: {
      HomeHero,
      CurrencyConverter
    }
  }

</script>

<style>

</style>
