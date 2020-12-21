import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import MyPlaylists from '../views/MyPlaylists.vue'
import PathNotFound from '../views/PathNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/playlists',
    name: 'playlists',
    props: true,
    component: MyPlaylists
  },
  //New way of handling wild routes | path: '*' no longer works in Vue 3
  { path: '/:pathMatch(.*)*', name: 'PathNotFound', component: PathNotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
