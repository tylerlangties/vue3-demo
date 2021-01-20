<template>
  <a
    @click="onClick"
    class="cursor-pointer px-3 py-1 bg-gray-600 text-gray-100 text-sm font-bold rounded hover:bg-gray-500"
    >{{ buttonLabel }}<i class="ml-1" :class="buttonIcon"></i
  ></a>
</template>

<script>
import { computed, onMounted } from 'vue'
import useBookmarks from '../modules/bookmark'
export default {
  name: 'Bookmark',
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()

    const buttonLabel = computed(() => {
      return isBookmarked(props.source) ? 'Bookmarked' : 'Bookmark'
    })
    const buttonIcon = computed(() => {
      return isBookmarked(props.source) ? 'fas fa-check' : 'far fa-bookmark'
    })

    const onClick = () => {
      if (isBookmarked(props.source)) removeBookmark(props.source)
      else addBookmark(props.source)
    }
    return {
      onClick,
      buttonLabel,
      buttonIcon
    }
  }
}
</script>
