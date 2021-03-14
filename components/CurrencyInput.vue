<template>
  <div class="currency-input flex items-center relative text-4xl md:text-6xl">
    <!-- <span class="currency-symbol absolute left-0">
      {{ symbol }}
    </span> -->
    <input
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="9"
      :value="value"
      class="w-full py-4 md:py-8  font-light focus:outline-none"
      @keydown="inputMask"
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
    },
    methods: {
      inputMask (e) {
        // TODO: this prevents copying and selecting all
        // a regex would be a better validation(?)
        const charCode = (e.which) ? e.which : e.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          e.preventDefault()
        }
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
