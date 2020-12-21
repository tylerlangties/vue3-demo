<template>
  <h1 class="text-3xl font-bold">What to learn next</h1>
  <Spinner v-if="loading" />
  <div v-if="!loading">
    <h3 class="text-2xl pt-2">Recommended for you</h3>
    <Carousel :src="allPosts.data" />
    <h3 class="text-2xl pt-2">Students are viewing</h3>
    <Carousel :src="allPosts.data" />
  </div>
</template>

<script>
import { ref } from 'vue'
import usePromiseFn from '../composables/use-promise'
import * as api from '../api'

import Carousel from '../components/Carousel.vue'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Spinner
  },
  setup() {
    const allPosts = ref([])
    const { loading, error, use: getAllPosts } = usePromiseFn(() => {
      return api.posts
        .get({
          limit: 10
        })
        .then(result => {
          allPosts.value = result
        })
    })
    getAllPosts()

    return {
      allPosts,
      error,
      loading
    }
  }
}
</script>
