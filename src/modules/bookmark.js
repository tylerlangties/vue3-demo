import { ref, readonly } from 'vue'

const bookmarks = ref([])

export default function useBookmarks() {
  const addBookmark = item => {
    if (item && !isBookmarked(item)) bookmarks.value.push(item)
  }

  const removeBookmark = item => {
    if (isBookmarked(item))
      bookmarks.value = bookmarks.value.filter(
        bookmark => bookmark.id !== item.id
      )
  }

  const isBookmarked = item => {
    return bookmarks.value.find(bookmark => bookmark.id === item.id)
  }

  return {
    ...readonly(bookmarks),
    addBookmark,
    removeBookmark,
    isBookmarked
  }
}
