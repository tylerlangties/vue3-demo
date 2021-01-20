import { readonly, reactive, computed } from 'vue'
import { mockCall } from '../composables/utils'

const state = reactive({
  user: null,
  busy: false,
  error: null
})

export default function useAuth() {
  const login = async username => {
    state.busy = true
    try {
      const user = await mockCall(500, username)
      state.user = user
    } catch (e) {
      state.error = e
      console.error(e)
    } finally {
      state.busy = false
    }
  }
  const logout = () => {
    state.user = null
  }

  const isAuthenticated = computed(() => {
    return !!state.user
  })

  return {
    //attempting to manually mutate readonly state (by not using the provided methods),
    // will result in a warning and the attempt will fail
    ...readonly(state),
    login,
    logout,
    isAuthenticated
  }
}
