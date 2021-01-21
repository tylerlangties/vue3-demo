<template>
  <div
    class="text-sm inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
  >
    {{ label }}
    <i
      v-if="dismissable"
      @click="dismiss"
      class="fas fa-times ml-1 cursor-pointer"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  emits: ['dismissed'],
  props: {
    label: {
      type: String,
      required: true
    },
    dismissable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const dismiss = () => emit('dismissed', props.label)
    return { dismiss }
  }
}
</script>
