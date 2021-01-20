<template>
  <div :class="'glide' + id">
    <div class="glide__arrows" data-glide-el="controls">
      <Button data-glide-dir="<">Prev</Button>
      <Button data-glide-dir=">">Next</Button>
    </div>
    <div data-glide-el="track" class="glide__track">
      <ul class="glide__slides">
        <li class="glide__slide" v-for="card in src" :key="card.id">
          <Card style="height: 500px; margin-bottom: 1rem" :src="card" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
import Glide from '@glidejs/glide'

import Button from './UI/Button.vue'
import Card from './Card.vue'
import '@glidejs/glide/dist/css/glide.core.min.css'

export default {
  name: 'Carousel',
  components: { Button, Card },
  props: {
    src: {
      type: Array,
      required: true
    }
  },
  setup() {
    //we can access the component UID and other instance properties here
    const id = getCurrentInstance().uid

    const createCarouselInstance = id => {
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
    //lifecycle hooks must be manually imported
    onMounted(() => {
      createCarouselInstance(id)
    })
    //props are automatically exposed to the template, but
    //anything declared in set up must be manually returned
    return { id }
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
