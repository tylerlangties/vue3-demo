<template>
  <main class="Search grid grid-cols-4 gap-x-2.5">
    <div class="Search__Filterbar flex justify-between w-full col-span-4 my-4">
      <div>
        <button class="bg-blue-500 px-2 py-1 rounded text-white text-xl">
          <i class="fas fa-sort"></i> Filters
        </button>
        <span class="text-xl ml-2" v-if="activeFilters.length"
          >({{ activeFilters.length }})</span
        ><span @click="activeFilters = []">( clear filters )</span>
      </div>
      <span>{{ search.hits }} results</span>
    </div>
    <div class="Search__Filters md:col-span-1 hidden md:block">
      <div v-if="busy.filters" class="loading-box">
        <Spinner />
      </div>
      <div v-else class="accordion box shadow-md">
        <Collapse openDefault v-for="filter in allFilters" :key="filter.id">
          <template #title>
            <h4 class="text-xl">{{ filter.label }}</h4>
          </template>
          <template #body>
            <form class="block">
              <span class="mt-2">
                <span
                  class="pr-4"
                  v-for="subFilter in filter.filters"
                  :key="subFilter.id"
                >
                  <label class="flex justify-between">
                    <span class="mr-2">{{ subFilter.label }}</span>
                    <input
                      v-model="activeFilters"
                      :value="subFilter.label"
                      type="checkbox"
                      class="form-checkbox"
                    />
                  </label>
                </span>
              </span></form
          ></template>
        </Collapse>
      </div>
    </div>
    <div class="Search__Content md:col-span-3 col-span-4">
      <div v-if="busy.search || busy.filters" class="loading-box">
        <Spinner />
      </div>
      <Tile
        v-else
        class="mb-2"
        v-for="item in search.results"
        :key="item.id"
        :src="item"
      />
    </div>
  </main>
</template>

<script>
import { watch, reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import Tile from '../components/Tile.vue'
import Spinner from '../components/Spinner.vue'
import Collapse from '../components/UI/Collapse.vue'
export default {
  name: 'Search',
  components: {
    Collapse,
    Tile,
    Spinner
  },
  setup() {
    const route = useRoute()
    const { dispatch, getters } = useStore()

    const search = reactive({
      hits: [],
      results: []
    })
    const useSearch = query =>
      dispatch('search/useSearch', query).then(res => {
        const { results, hits } = res
        search.results = results
        search.hits = hits
      })

    const allFilters = ref([])
    const activeFilters = ref([])

    const getFilters = () => {
      dispatch('search/getFilters').then(res => {
        allFilters.value = res
      })
    }
    getFilters()

    watch(
      () => [route.query.search, activeFilters.value],
      () => useSearch({ term: route.query.search, activeFilters }),
      { immediate: true }
    )

    return {
      search,
      allFilters,
      activeFilters,
      busy: computed(() => getters['search/useBusy'])
    }
  }
}
</script>
