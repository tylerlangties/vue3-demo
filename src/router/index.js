import { createRouter, createWebHistory } from 'vue-router'
import store from '/@/store'

import Home from '../views/Home.vue'
import MyPlaylists from '../views/MyPlaylists.vue'
import PathNotFound from '../views/PathNotFound.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requireAuth: true }
  },
  {
    path: '/playlists',
    name: 'playlists',
    props: true,
    component: MyPlaylists,
    meta: { requireAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: true,
    meta: { requireAuth: true }
  },
  //New way of handling wild routes | path: '*' no longer works in Vue 3
  { path: '/:pathMatch(.*)*', name: 'PathNotFound', component: PathNotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  //basic route guard
  const { user } = store.getters['auth/useAuth']
  if (to.meta.requireAuth && !user) next('/login')
  else next()
})

export default router
