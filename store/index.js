import commonCurrency from '@/utils/common-currency'

export const state = () => ({
  data: {}
})

export const mutations = {
  SET_DATA (state, data) {
    state.data = data
  }
}

export const getters = {
  currencyCodes (state) {
    if (!state.data) return []
    const baseCode = state.data.base
    return [baseCode, ...Object.keys(state.data.rates)]
  },
  availableCurrencies (state, getters) {
    const allCurrencies = commonCurrency
    const filtered = Object.keys(allCurrencies)
      .filter(key => getters.currencyCodes.includes(key))
      .reduce((curr, acc) => {
        curr[acc] = allCurrencies[acc]
        return curr
      }, {})
    return filtered
  }
}

export const actions = {
  async nuxtClientInit ({ dispatch }) {
    await dispatch('getRates')
  },
  async getRates ({ commit }) {
    const { data } = await this.$axios.get('latest')
    commit('SET_DATA', data)
  }
}
