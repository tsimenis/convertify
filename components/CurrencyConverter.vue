<template>
  <div class="currency-converter relative -mt-16 lg:-mt-32 mb-32 z-10">
    <div class="container px-6 md:px-8">
      <div class="w-full md:w-10/12 w-8/12 bg-white p-8 mx-auto shadow-lg">
        <div class="controls md:flex md:items-center md:justify-between text-gray-700 pb-4">
          <div class="flex mb-4">
            <p class="text-sm mr-4">
              Last Update: {{ formattedDate }}
            </p>
            <button
              class="text-green-500 hover:text-green-600 focus:outline-none"
              @click="refreshRates"
            >
              <u-icon name="redo" :class="{'is-loading': loading}" />
            </button>
          </div>
          <div class="relative mb-4">
            <datepicker
              v-model="selectedDate"
              :disabled-dates="disabledDates"
            />
            <button
              v-show="showClearDateButton"
              class="button-reset-date flex text-green-500 hover:green-600 focus:outline-none"
              @click="selectedDate = today"
            >
              <u-icon name="times-circle" />
            </button>
          </div>
        </div>
        <div class="currency-controls relative">
          <transition name="fade">
            <span v-if="loading" class="loading-overlay absolute top-0 left-0 w-full h-full z-20"></span>
          </transition>
          <currency-control
            v-for="(conversion, i) in conversions"
            :key="`${conversion}-${i}`"
            :conversion="conversion"
            :component-index="i"
            :base="i === 0"
          />
          <button
            class="button"
            @click="$store.commit('ADD_CONVERSION')"
          >
            Add another currency
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Datepicker from 'vuejs-datepicker'
  import CurrencyControl from '@/components/CurrencyControl'
  import { mapState } from 'vuex'

  export default {
    components: {
      Datepicker,
      CurrencyControl
    },
    data () {
      return {
        today: new Date(),
        selectedDate: new Date(),
        disabledDates: {
          to: new Date(1999, 1, 1),
          from: new Date()
        }
      }
    },
    computed: {
      ...mapState([
        'base',
        'conversions',
        'lastUpdate',
        'loading'
      ]),
      formattedDate () {
        return this.$dateFns.format(this.lastUpdate, 'HH:mm:ss')
      },
      showClearDateButton () {
        return !this.$dateFns.isSameDay(this.selectedDate, this.today)
      }
    },
    watch: {
      selectedDate (val) {
        const date = this.$dateFns.format(val, 'yyyy-MM-dd')
        this.$store.dispatch('getRatesByDate', date)
      }
    },
    methods: {
      async refreshRates () {
        await this.$store.dispatch('getRates')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .icon-redo {
    transition: tranform .25s ease-out;
    transform: rotate(0);
  }

  .is-loading {
    animation: rotate .45s cubic-bezier(0.56,-0.01, 0.68, 0.53) infinite;
  }

  .loading-overlay {
    background-color: rgba(#fff, .7);
    backdrop-filter: blur(1px);
  }

  .button-reset-date {
    @apply absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  @keyframes rotate {
    to { transform: rotate(360deg) }
  }

</style>
