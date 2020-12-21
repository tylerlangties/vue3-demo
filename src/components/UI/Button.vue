<template>
  <button
    @click="$emit('click')"
    class="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button'
}
</script>
