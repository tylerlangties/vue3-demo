<template>
  <div class="px-8 py-4 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600 text-sm">Mar 10, 2019</span>
      <Bookmark :source="src" />
    </div>

    <div class="mt-2">
      <a
        href="#"
        class="text-2xl text-gray-700 font-bold hover:text-gray-600 hover:underline"
        >{{ src.title }}</a
      >
      <p class="mt-2 text-gray-600">
        {{ src.body }}
      </p>
    </div>

    <div class="flex justify-between items-center mt-4">
      <a href="#" class="text-blue-600 hover:underline">Read more</a>

      <div class="flex items-center">
        <img
          class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
          src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
          alt="avatar"
        />
        <a class="text-gray-700 font-bold cursor-pointer">Khatab wedaa</a>
      </div>
    </div>
  </div>
</template>

<script>
import Bookmark from './Bookmark.vue'

export default {
  name: 'Tile',
  components: {
    Bookmark
  },
  props: {
    src: {
      type: Object,
      required: true
    }
  }
}
</script>
