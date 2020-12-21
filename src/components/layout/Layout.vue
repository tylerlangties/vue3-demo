<template>
  <main class="content">
    <Navbar />
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div>
          <!-- View content here -->
          <slot></slot>
        </div>
      </div>
    </div>
  </main>
  <Footer class="footer" />
</template>

<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}

* {
  box-sizing: border-box;
}

footer {
  background: #42a5f5;
  color: white;
}
</style>
