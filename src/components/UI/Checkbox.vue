<template>
  <span v-if="label" class="mr-2">{{ label }}</span>
  <input
    v-model="model"
    :value="value"
    type="checkbox"
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  />
</template>

<script>
import { computed } from 'vue'
import { useModelWrapper } from '../../composables/use-model-wrapper'

export default {
  props: {
    modelValue: {
      type: [String, Object, Number, Boolean, Array],
      default: false
    },
    value: {
      type: [String, Object, Number, Boolean],
      default: true
    },
    label: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = useModelWrapper(props, emit)
    return { model }
  }
}
</script>
