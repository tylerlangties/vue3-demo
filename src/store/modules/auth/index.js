import { instance } from '/@/api'

const state = {
  user: null,
  busy: false,
  error: null
}

const actions = {
  async register({ commit }) {},
  async login({ commit }) {
    const form = {
      id: 1,
      name: 'Big Tony',
      username: 'tonytwoshoes',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    }
    try {
      const user = await instance.post('/users', form)
      commit('setUser', user)
      return user
    } catch (e) {
      commit('setError', e)
      console.error(e)
    }
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setError(state, error) {
    state.error = error
  }
}

const getters = {
  useAuth: () => state
}

export default {
  namespaced: true,
  name: 'Auth',
  state,
  actions,
  mutations,
  getters
}
