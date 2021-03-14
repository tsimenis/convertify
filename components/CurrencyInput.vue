<template>
  <div class="currency-input flex items-center relative text-4xl md:text-6xl">
    <!-- <span class="currency-symbol absolute left-0">
      {{ symbol }}
    </span> -->
    <input
      type="text"
      inputmode="decimal"
      maxlength="9"
      :value="value"
      class="w-full py-4 md:py-8  font-light focus:outline-none"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
  export default {
    props: {
      symbol: {
        type: String,
        default: ''
      },
      value: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>

  .currency-symbol {
    top: 50%;
    transform: translateY(-50%);
  }

</style>
