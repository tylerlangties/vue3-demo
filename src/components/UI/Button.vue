<template>
  <button @click="$emit('click')" :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { buttonClassMap, buttonSizeMap } from '../../static/componentMaps'

export default defineComponent({
  name: 'Button',
  props: {
    size: {
      type: String,
      default: () => 'default',
      validator: (size: string) => !!buttonSizeMap[size]
    }
  },
  setup(props) {
    const buttonClasses = computed(() => buttonClassMap[props.size])
    return { buttonClasses }
  }
})

const modifiers = { block: 'w-full' }
</script>
