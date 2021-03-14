<template>
  <div>
    <div class="flex justify-between pb-2">
      <p class="text-sm text-gray-400">
        {{ base ? 'From' : 'To' }}
      </p>
      <button
        v-if="!base"
        class="text-gray-400 mr-1 hover:text-gray-500 focus:outline-none"
        @click="removeControl"
      >
        <u-icon name="trash-alt" />
      </button>
    </div>
    <currency-select :code="conversion.code" @update="handleCurrencyUpdate" />
    <currency-input v-model="value" :symbol="symbol" :delete-button="!base" />
  </div>
</template>

<script>

  import CurrencySelect from '@/components/CurrencySelect'
  import CurrencyInput from '@/components/CurrencyInput'
  import { mapState, mapGetters } from 'vuex'

  export default {
    components: {
      CurrencySelect,
      CurrencyInput
    },
    props: {
      base: {
        type: Boolean,
        default: false
      },
      conversion: {
        type: Object,
        default: () => {},
        required: true
      },
      componentIndex: {
        type: Number,
        default: 0,
        required: true
      }
    },
    computed: {
      ...mapState(['conversions']),
      ...mapGetters(['availableCurrencies', 'rates', 'exchangeValues']),
      currentCurrency () {
        return this.availableCurrencies[this.conversion.code]
      },
      symbol () {
        return this.currentCurrency ? this.currentCurrency.symbol : ''
      },
      rate () {
        if (this.base) return 1
        return this.rates[this.conversion.code]
      },
      value: {
        get () {
          return this.exchangeValues[this.componentIndex].value
        },
        set (val) {
          const value = val && !isNaN(val) ? parseFloat(val) : null
          this.$store.commit('UPDATE_CONVERSION_VALUE', { index: this.componentIndex, value })
        }
      }
    },
    methods: {
      handleCurrencyUpdate (code) {
        this.$store.commit('UPDATE_CONVERSIONS', { index: this.componentIndex, code })
        if (this.componentIndex === 0) {
          this.$store.dispatch('getRates', code)
        }
      },
      removeControl () {
        this.$store.commit('REMOVE_CONVERSION', this.componentIndex)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
