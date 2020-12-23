import { createStore } from 'vuex'

import search from './modules/search'
import config from './modules/config'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { search, config }
})
