<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-6 py-3">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <a
              class="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
              href="#"
              @click="$router.push('/')"
              >Brand</a
            >

            <!-- Search input on desktop screen -->
            <div class="mx-10 hidden md:block">
              <input
                type="text"
                class="w-32 lg:w-64 px-4 py-3 leading-tight text-sm text-gray-700 bg-gray-100 rounded-md placeholder-gray-500 border border-transparent focus:outline-none focus:bg-white focus:shadow-outline focus:border-blue-400"
                placeholder="Search"
                aria-label="Search"
                v-model="searchInput.search"
                @keyup.enter="onSearch"
              />
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button
              @click="menuToggle"
              type="button"
              class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div
          class="md:flex items-center"
          :class="menuOpen ? 'block' : 'hidden'"
        >
          <div class="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
            <a
              v-for="(navItem, i) in nav.main"
              :key="i"
              class="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0"
              href="#"
              @click="$router.push(navItem.url)"
              >{{ navItem.label }}</a
            >
          </div>

          <div class="flex items-center py-2 -mx-1 md:mx-0">
            <a
              class="block w-1/2 px-3 py-2 mx-1 rounded text-center text-sm bg-gray-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto"
              href="#"
              @click="signout"
              >{{ isAuthenticated ? 'Logout' : 'Login' }}</a
            >
          </div>

          <!-- Search input on mobile screen -->
          <div class="md:hidden mt-3">
            <input
              type="text"
              class="w-full px-4 py-3 leading-tight text-sm text-gray-700 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../../modules/auth'
const nav = {
  main: [
    {
      name: 'home',
      label: 'Home',
      url: '/',
      requireAuth: true
    },
    {
      name: 'playlists',
      label: 'Playlists',
      url: '/playlists',
      requireAuth: true
    },
    {
      name: 'search',
      label: 'Search',
      url: '/search',
      requireAuth: true
    }
  ],
  aside: [
    {
      name: 'login',
      label: 'Login',
      url: '/login',
      requireAuth: false
    },
    {
      name: 'notifications',
      label: 'Notifications',
      url: '/notifications',
      requireAuth: true
    },
    {
      name: 'profile',
      label: 'Profile',
      url: '/profile',
      requireAuth: true
    }
  ]
}
export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const { isAuthenticated, logout } = useAuth()

    const signout = () => {
      if (isAuthenticated) {
        logout()
      }
    }

    const menuOpen = ref(false)
    const menuToggle = () => {
      menuOpen.value = !menuOpen.value
    }

    const searchInput = reactive({ search: '' })
    const onSearch = () => {
      router.push({ name: 'search', query: { ...searchInput } })
    }

    return {
      searchInput,
      onSearch,
      menuOpen,
      menuToggle,
      nav,
      isAuthenticated,
      signout
    }
  }
}
</script>
