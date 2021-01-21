<template>
  <Tag
    v-for="item in modelValue"
    dismissable
    @dismissed="removeTag"
    :key="item"
    :label="item"
    class="m-0.5"
  />
</template>

<script>
import { computed, onMounted } from 'vue'
import Tag from './Tag.vue'
export default {
  name: 'Taglist',
  emits: ['update:modelValue'],
  components: {
    Tag
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
      description: 'An array of strings to display'
    }
  },
  setup(props, { emit }) {
    const removeTag = value => {
      const filteredTags = props.modelValue.filter(tag => tag !== value)
      emit('update:modelValue', filteredTags)
    }
    return { removeTag }
  }
}
</script>
