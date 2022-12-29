<script>
export default {
  data() {
    return {
      content: '欢迎访问~~ 这是首页'
    }
  },

  mounted() {
    this.$store.searchShow = true
  }
}
</script>

<template>
  <main>
    <h1>{{ content }}</h1>
  </main>
</template>
