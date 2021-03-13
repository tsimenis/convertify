<template>
  <div class="currency-converter relative -mt-32 z-10">
    <div class="container px-8">
      <div class="w-8/12 bg-white p-8 mx-auto h-64 shadow-lg">
        <currency-select />
      </div>
    </div>
  </div>
</template>

<script>

  import CurrencySelect from '@/components/CurrencySelect'

  export default {
    components: {
      CurrencySelect
    }
  }
</script>

<style lang="scss" scoped>
</style>
