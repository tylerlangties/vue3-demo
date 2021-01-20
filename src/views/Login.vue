<template>
  <div v-if="busy" class="loading-box"><Spinner></div>
  <main v-else
    class="Login bg-white w-full max-w-sm rounded-lg shadow-md overflow-hidden mx-auto"
  >
    <div class="py-4 px-6">
      <h2 class="text-center font-bold text-gray-700 text-3xl">Brand</h2>

      <h3 class="mt-1 text-center font-medium text-gray-600 text-xl">
        Welcome Back
      </h3>

      <p class="mt-1 text-center text-gray-500">Login or create account</p>

      <form @submit.prevent="onSubmit">
        <div class="mt-4 w-full">
          <input
            class="w-full mt-2 py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded block placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring"
            type="text"
            placeholder="Username"
            aria-label="Username"
            v-model="username"
          />
        </div>
        <div class="validation" :class="{'error': validationError}">Username is required</div>

        <div class="flex justify-between items-center mt-4">
          <a href="#" class="text-gray-600 text-sm hover:text-gray-500"
            >Forget Password?</a
          >

          <button
            class="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../modules/auth'

import Spinner from '/@/components/Spinner.vue'

export default {
  name: 'Login',
  components: {
    Spinner
  },
  setup() {
    const router = useRouter()
    const { busy, login, isAuthenticated, error } = useAuth()
    
    const username = ref('')
    const validationError = ref(false)

    const onSubmit = async () => {
      if (!username.value) validationError.value = true
      else {
        login(username.value).then(() => {
          if (isAuthenticated.value) router.push('/')
        })
      } 
    }
    return { username, onSubmit, busy, validationError }
  }
}
</script>

<style>
.validation{
  display: none;
  color: red;
}
.error{
  display: block !important;
}
</style>
