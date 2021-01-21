<template>
  <div v-if="$route.query.search" class="ResultsFor">
    <h2 class="text-3xl">
      Showing {{ result.hits }} results for "{{ $route.query.search }}"
    </h2>
  </div>

  <main class="Search grid grid-cols-4 gap-x-2.5">
    <div class="Search__Filterbar flex justify-between w-full col-span-4 my-4">
      <div />
      <span>{{ result.hits || 0 }} results</span>
    </div>
    <div class="Search__Filters md:col-span-1 hidden md:block">
      <div v-if="busy.filters" class="loading-box">
        <Spinner />
      </div>
      <div v-else>
        <Collapse :disabled="!activeFilters.length" class="ActiveFilters">
          <template #title>
            <Button
              :disabled="!activeFilters.length"
              class="w-full bg-blue-500 px-2 py-1 rounded text-white text-xl"
            >
              <i class="fas fa-sort"></i> Filters
              <span v-if="activeFilters.length">{{
                activeFilters.length
              }}</span>
            </Button>
          </template>
          <template v-if="activeFilters.length" #body>
            <!-- <Button @click="activeFilters = []">clear filters</Button> -->
            <Taglist v-model="activeFilters" />
          </template>
        </Collapse>
        <div class="accordion box shadow-md">
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
                      <Checkbox
                        v-model="activeFilters"
                        :value="subFilter.label"
                        :label="subFilter.label"
                      />
                    </label>
                  </span>
                </span></form
            ></template>
          </Collapse>
        </div>
      </div>
    </div>
    <div class="Search__Content md:col-span-3 col-span-4">
      <div v-if="busy.search || busy.filters" class="loading-box">
        <Spinner />
      </div>
      <Tile
        v-else
        class="mb-2"
        v-for="item in result.items"
        :key="item.id"
        :src="item"
      />
    </div>
  </main>
</template>

<script>
import { watch, reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import useSearch from '/@/modules/search'

import Taglist from '/@/components/UI/Taglist.vue'
import Button from '/@/components/UI/Button.vue'
import Checkbox from '/@/components/UI/Checkbox.vue'
import Tile from '/@/components/Tile.vue'
import Spinner from '/@/components/Spinner.vue'
import Collapse from '/@/components/UI/Collapse.vue'
export default {
  name: 'Search',
  components: {
    Button,
    Checkbox,
    Collapse,
    Taglist,
    Tile,
    Spinner
  },
  setup() {
    const route = useRoute()
    const { search, filters, busy, error } = useSearch()

    const result = reactive({
      items: [],
      hits: []
    })

    const doSearch = async query => {
      const { items, hits } = await search(query)
      result.items = items
      result.hits = hits
    }

    const allFilters = ref([])
    const activeFilters = ref([])

    const getFilters = async () => {
      allFilters.value = await filters()
    }
    getFilters()

    watch(
      () => [route.query.search, activeFilters.value],
      () => doSearch({ term: route.query.search, activeFilters }),
      { immediate: false }
    )

    return {
      result,
      allFilters,
      activeFilters,
      busy
    }
  }
}
</script>

<style>
.ActiveFilters > .accordion-item-title > .accordion-item-trigger {
  padding: 0;
}
.ActiveFilters {
  padding-bottom: 0.75rem;
}
.ActiveFilters > .accordion-item-title > .accordion-item-trigger > i {
  display: none;
}
.ActiveFilters
  > .accordion-item-title
  > .accordion-item-trigger
  > .accordion-item-title-text {
  width: 100%;
}
</style>
