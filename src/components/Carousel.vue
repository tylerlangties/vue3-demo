<template>
  <div :class="'glide' + uid">
    <div class="glide__arrows" data-glide-el="controls">
      <Button data-glide-dir="<">Prev</Button>
      <Button data-glide-dir=">">Next</Button>
    </div>
    <div data-glide-el="track" class="glide__track">
      <ul class="glide__slides">
        <li class="glide__slide" v-for="card in src" :key="card.id">
          <Card :src="card" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'

import Button from './UI/Button.vue'
import Card from './Card.vue'
export default {
  name: 'Carousel',
  components: { Button, Card },
  props: {
    src: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const uid = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000

    function createCarouselInstance(id) {
      let uniqueClass = '.glide' + id
      new Glide(uniqueClass, {
        breakpoints: {
          600: { perView: 1 },
          900: { perView: 2 },
          1200: { perView: 3 },
          1500: { perView: 4 },
          2000: { perView: 4 }
        }
      }).mount()
    }

    onMounted(() => {
      createCarouselInstance(uid)
    })
    return { uid }
  }
}
</script>

<style>
.glide__arrows {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
