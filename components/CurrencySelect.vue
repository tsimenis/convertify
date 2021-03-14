<template>
  <u-dropdown class="currency-select">
    <template #button-content="{ toggle }">
      <button class="currency-select-button" @click="handleButtonToggle($event, toggle)">
        <span v-if="selectedCurrency">
          {{ selectedCurrency.code }} • {{ selectedCurrency.name }}
        </span>
        <span v-else></span>
        <div class="flex items-center">
          <img
            v-if="selectedCurrency"
            :src="require(`~/assets/img/${selectedCurrency.code.toLowerCase()}.svg`)"
            class="w-8 h-8 rounded-full overflow-hidden shadow-lg"
          >
          <span class="flex text-2xl text-gray-400 ml-2">
            <u-icon name="angle-down" />
          </span>
        </div>
      </button>
    </template>
    <template #default="{ toggle }">
      <div class="currencies pt-2">
        <div class="px-6 mb-2">
          <div class="relative">
            <span class="search-icon absolute left-0 top-0 text-gray-400">
              <u-icon name="search" />
            </span>
            <input
              ref="search"
              v-model="searchQuery"
              type="text"
              class="w-full focus:outline-none px-6 py-2 text-sm"
              placeholder="Search currency"
            >
          </div>
        </div>
        <ul class="currencies-list max-h-80 overflow-y-auto">
          <li
            v-for="currency in filteredCurrencies"
            :key="currency.code"
            class="flex justify-between px-6 py-4 hover:bg-gray-100 cursor-pointer"
            @click="handleCurrencySelect($event, toggle, currency.code)"
          >
            <div class="flex items-center">
              <img
                :src="require(`~/assets/img/${currency.code.toLowerCase()}.svg`)"
                class="w-8 h-8 rounded-full overflow-hidden mr-4"
              >
              <span>{{ currency.name }}</span>
            </div>
            <span class="text-gray-400">
              {{ currency.code }}
            </span>
          </li>
        </ul>
      </div>
    </template>
  </u-dropdown>
</template>

<script>

  import UDropdown from '@/components/UDropdown'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      UDropdown
    },
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        searchQuery: ''
      }
    },
    computed: {
      ...mapGetters(['availableCurrencies']),
      filteredCurrencies () {
        const currenciesArray = Object.values(this.availableCurrencies)
        return currenciesArray.filter((currency) => {
          return currency.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            currency.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      },
      selectedCurrency () {
        return this.availableCurrencies[this.code]
      }
    },
    methods: {
      handleButtonToggle (e, toggle) {
        toggle(e)
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      },
      handleCurrencySelect (e, toggle, code) {
        toggle(e)
        this.$emit('update', code)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .currency-select {
    @apply block;

    &.is-expanded {
      .icon-angle-down {
        transform: rotate(180deg);
      }
    }

  }

  .currency-select-button {
    @apply w-full flex items-center justify-between pb-4 border-b border-gray-200;

    &:focus {
      @apply outline-none;
    }

  }

  .search-icon {
    top: 50%;
    transform: translateY(-50%);
  }

</style>
