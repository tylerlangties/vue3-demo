<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import { provide, ref, readonly } from 'vue'
import { useStore } from 'vuex'

import useGlobalProperties from './composables/use-global-props'

import Layout from './components/layout/Layout.vue'
export default {
  name: 'App',
  components: {
    Layout
  },
  setup() {
    const config = ref(null)
    const { dispatch } = useStore()

    //Vue.$prototype will no longer work since the vue 3 instance doesn't have a global constructor
    //we can attach global properties to the vue instance using:
    //getCurrentInstance().appContext.config.globalProperties.MyGlobalProperty = MyGlobalValue
    //or by using a composable function such as below
    useGlobalProperties().theme = 'dark'

    dispatch('config/getConfig').then(res => {
      config.value = res
    })

    //we can provide reactive mutable && non-mutable state globally using provide/inject at the app entrypoint
    provide('config', readonly(config))
    //then in some deeply nested component | setup() { const appConfig = inject('config') }

    return { config }
  }
}
</script>
