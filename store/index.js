import Vue from 'vue'
import commonCurrency from '@/utils/common-currency'

const defaultConversions = [
  {
    code: 'EUR',
    value: 1
  },
  {
    code: 'USD',
    value: 1
  }
]

export const state = () => ({
  conversions: [],
  lastUpdate: null,
  loading: true,
  data: {}
})

export const mutations = {
  SET_DATA (state, data) {
    state.data = data
  },
  SET_LAST_UPDATE (state, date) {
    state.lastUpdate = date
  },
  SET_LOADING (state, value) {
    state.loading = value
  },
  SET_CONVERSIONS (state, conversions) {
    state.conversions = conversions
  },
  ADD_CONVERSION (state) {
    state.conversions.push({ code: null, value: null })
  },
  REMOVE_CONVERSION (state, index) {
    state.conversions.splice(index, 1)
    localStorage.setItem('userOptions', JSON.stringify(state.conversions))
  },
  UPDATE_CONVERSIONS (state, { index, code }) {
    const obj = Object.assign(state.conversions[index], { code })
    Vue.set(state.conversions, index, obj)
    localStorage.setItem('userOptions', JSON.stringify(state.conversions))
  },
  UPDATE_CONVERSION_VALUE (state, { index, value }) {
    const obj = Object.assign(state.conversions[index], { value })
    Vue.set(state.conversions, index, obj)
    localStorage.setItem('userOptions', JSON.stringify(state.conversions))
  }
}

export const getters = {
  rates (state) {
    if (!state.data) return []
    return state.data.rates
  },
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
  },
  exchangeValues (state, getters) {
    const calculateValue = (code) => {
      if (!getters.rates[code]) return null
      const value = state.conversions[0].value * getters.rates[code]
      return value ? parseFloat(value.toFixed(2)) : null
    }
    return state.conversions.map((conversion, i) => {
      return {
        code: conversion.code,
        value: i !== 0 ? calculateValue(conversion.code) : conversion.value
      }
    })
  }
}

export const actions = {
  async nuxtClientInit ({ commit, dispatch }) {
    const userOptions = localStorage.getItem('userOptions') ? JSON.parse(localStorage.getItem('userOptions')) : false
    const initialOptions = userOptions || defaultConversions
    commit('SET_CONVERSIONS', initialOptions)
    await dispatch('getRates')
  },
  async getRates ({ commit }, code) {
    try {
      const query = code ? { base: code } : {}
      commit('SET_LOADING', true)
      const { data } = await this.$axios.get('latest', {
        params: query
      })
      commit('SET_DATA', data)
      const date = new Date()
      commit('SET_LAST_UPDATE', date)
      // TODO: Api responses seems to be heavily cached
      // this is a fake loader to actually make the user
      // trust that something is loading/happening
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 500)
    } catch (e) {
      console.log(e)
    }
  },
  async getRatesByDate ({ commit }, datepickerDate) {
    try {
      commit('SET_LOADING', true)
      const { data } = await this.$axios.get(datepickerDate)
      commit('SET_DATA', data)
      const date = new Date()
      commit('SET_LAST_UPDATE', date)
      // TODO: Api responses seems to be heavily cached
      // this is a fake loader to actually make the user
      // trust that something is loading/happening
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 500)
    } catch (e) {
      console.log(e)
    }
  }
}
