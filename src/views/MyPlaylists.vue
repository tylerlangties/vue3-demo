<template>
  <div>
    <div class="flex flex-col items-center text-left">
      <div v-if="loading" class="loading-box">
        <div><Spinner /></div>
      </div>
      <div v-if="error">There was an error :/</div>
      <div
        class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
      >
        <Tile v-for="(playlist, i) in allPosts.data" :key="i" :src="playlist" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import usePromiseFn from '/@/composables/use-promise'
import Card from '/@/components/Card.vue'
import Tile from '/@/components/Tile.vue'
import * as api from '/@/api'

import Spinner from '/@/components/Spinner.vue'
export default {
  name: 'MyPlaylists',
  components: {
    Spinner,
    Card,
    Tile
  },
  setup() {
    const allPosts = ref([])
    const { loading, error, use: getAllPosts } = usePromiseFn(() => {
      return api.posts
        .get({
          limit: 20
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

<style>
.loading-box {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
