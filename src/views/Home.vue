<template>
  <div v-if="loading" class="loading-box"><Spinner /></div>
  <main class="Home">
    <div v-if="!loading">
      <h1 class="text-3xl pb-10">Good afternoon, {{ user }}</h1>
      <h1 class="text-3xl font-bold">What to learn next</h1>
      <section id="recommended" class="Home__Recommended">
        <h3 class="text-2xl pt-2">Recommended for you</h3>
        <Carousel :src="allPosts.data" />
      </section>
      <section id="related" class="Home__Related">
        <h3 class="text-2xl pt-2">Students are viewing</h3>
        <Carousel :src="allPosts.data" />
      </section>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { posts } from '/@/api'
import usePromiseFn from '/@/composables/use-promise'
import useAuth from '../modules/auth'

import Carousel from '/@/components/Carousel.vue'
import Spinner from '/@/components/Spinner.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Spinner
  },
  setup() {
    const { user } = useAuth()
    //example of API calls using dedicated service files and composables (no VUEX)
    const allPosts = ref([])
    const { loading, error, use: getAllPosts } = usePromiseFn(() => {
      return posts
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
      loading,
      user
    }
  }
}
</script>
