<template>
  <Header :searchInput="$store.searchInput" />
  <div class="main-body"><router-view /></div>
  <Footer />
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

export default {
  components: { Header, Footer },

  mounted() {
    var user = localStorage.getItem('user')

    if (user) {
      this.$store.user = JSON.parse(user)
    }
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
  background: var(--color-plain-3);
}
::-webkit-scrollbar-thumb {
  background: var(--color-dark-a);

  &:hover {
    background: var(--color-dark-1);
  }
}
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
