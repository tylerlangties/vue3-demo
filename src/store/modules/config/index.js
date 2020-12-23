import { mockCall } from '../../../composables/utils'

const config = {
  vendor: 'someVendor',
  searchPage: {
    filters: true,
    showSuggest: true
  },
  theme: 'light'
}

const state = {
  busy: false,
  config: null
}

const actions = {
  async getConfig({ commit }) {
    commit('busy', true)
    const data = await mockCall(1500, config)
    commit('busy', false)
    return data
  }
}

const mutations = {
  busy(state, busy) {
    state.busy = busy
  },
  setConfig(state, config) {
    state.config = config
  }
}

export default {
  namespaced: true,
  name: 'Config',
  state,
  actions,
  mutations
}
