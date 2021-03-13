export const state = () => ({
  data: {}
})

export const mutations = {
  SET_DATA (state, data) {
    state.data = data
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
