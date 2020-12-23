import { instance } from '../../../api'
import { randomNumber } from '../../../composables/utils'
import { mockCall } from '../../../composables/utils'

const POSTS_URL = 'posts'

const filters = [
  {
    label: 'Topic',
    id: 'topic',
    filters: [
      {
        label: 'Ethical Hacking',
        id: 'ethical-hacking'
      },
      {
        label: 'Penetration Testing',
        id: 'penetration-testing'
      },
      {
        label: 'Cyber Security',
        id: 'cyber-security'
      },
      {
        label: 'Kali Linux',
        id: 'kali-linux'
      },
      {
        label: 'Security Hacking',
        id: 'security-hacking'
      },
      {
        label: 'Metasploit',
        id: 'metasploit'
      },
      {
        label: 'Network Security',
        id: 'network-security'
      },
      {
        label: 'Python',
        id: 'python'
      },
      {
        label: 'Bug Bounty',
        id: 'bug-bounty'
      }
    ]
  },
  {
    label: 'Levels',
    id: 'levels',
    filters: [
      {
        label: 'All Levels',
        id: 'all-levels'
      },
      {
        label: 'Beginner',
        id: 'beginner'
      },
      {
        label: 'Intermediate',
        id: 'intermediate'
      },
      {
        label: 'Expert',
        id: 'expert'
      }
    ]
  },
  {
    label: 'Language',
    id: 'language',
    filters: [
      {
        label: 'English',
        id: 'en-us'
      },
      {
        label: 'Español',
        id: 'es-es'
      },
      {
        label: 'Português',
        id: 'pg-es'
      },
      {
        label: 'Türkçe',
        id: 'tk-es'
      },
      {
        label: 'Français',
        id: 'fs-fe'
      },
      {
        label: 'Deutsch',
        id: 'de-de'
      },
      {
        label: 'हिन्दी',
        id: 'ie-es'
      },
      {
        label: 'Italiano',
        id: 'ia-es'
      }
    ]
  }
]

const state = {
  busy: {
    search: false,
    filters: false
  },
  error: null
}

const actions = {
  async useSearch({ commit }) {
    try {
      commit('busy', { service: 'search', busy: true })

      const params = {
        _start: randomNumber(1, 49),
        _limit: randomNumber(50, 100)
      }

      const { data } = await instance.get(POSTS_URL, { params })

      return { results: data, hits: data.length }
    } catch (e) {
      commit('error', e)
      console.error(e)
    } finally {
      commit('busy', { service: 'search', busy: false })
    }
  },
  async getFilters({ commit }) {
    commit('busy', { service: 'filters', busy: true })
    const data = await mockCall(750, filters)
    commit('busy', { service: 'filters', busy: false })
    return data
  }
}

const mutations = {
  busy(state, { service, busy }) {
    state.busy[service] = busy
  },
  error(state, error) {
    state.error = error
  }
}

const getters = {
  useBusy(state) {
    return state.busy
  },
  useError(state) {
    return state.error
  }
}

export default {
  namespaced: true,
  name: 'Search',
  state,
  actions,
  mutations,
  getters
}
