<template>
  <Header />
  <router-view class="main-body" />
  <Footer />
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

export default {
  components: { Header, Footer }
}
</script>

<style lang="scss">
body {
  line-height: 1.5;
  font-size: 14px;
  color: var(--color-dark-1);
}
a {
  color: inherit;
  text-decoration: none;
}
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.main-body {
  flex: 1;
}
</style>
