import { reactive, readonly } from 'vue'
import { instance } from '/@/api'
import { randomNumber, mockCall } from '/@/composables/utils'
import searchFilters from '/@/static/filters'

const POSTS_URL = 'posts'

// Global state -- Anything declared OUTSIDE of the exported function
// will persist and is accessible globally (e.g vuex state) || must be returned in composable function
// ---------------------------
// const state = reactive({
//   busy: {
//     search: false,
//     filters: false
//   },
//   error: null
// })

export default function useSearch() {
  //Component/Local state -- Anything declared INSIDE of the exported function
  //will only persist through the life of the component it's imported into (e.g components 'data' property)
  const state = reactive({
    busy: {
      search: false,
      filters: false
    },
    error: null
  })

  const search = async searchTerm => {
    setBusy({ service: 'search', busy: true })
    console.info('Fetching results for:', searchTerm)
    try {
      const params = {
        _start: randomNumber(1, 49),
        _limit: randomNumber(50, 100)
      }

      const { data } = await instance.get(POSTS_URL, { params })

      return { items: data, hits: data.length }
    } catch (e) {
      setError(e)
    } finally {
      setBusy({ service: 'search', busy: false })
    }
  }
  const filters = async () => {
    setBusy({ service: 'filters', busy: true })
    try {
      return await mockCall(750, searchFilters)
    } catch (e) {
      setError(e)
    } finally {
      setBusy({ service: 'filters', busy: false })
    }
  }

  const setBusy = ({ service, busy }) => {
    state.busy[service] = busy
  }
  const setError = e => {
    state.error = e
    console.error(e)
  }
  return {
    ...readonly(state),
    search,
    filters
  }
}
