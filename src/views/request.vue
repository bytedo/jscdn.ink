<script>
export default {
  data() {
    return {
      content: '这是关于我们页面'
    }
  },
  mounted() {
    this.$store.searchShow = false
  }
}
</script>

<template>
  <main>
    <table>
      <thead>
        <tr>
          <th>开源库</th>
          <th>介绍</th>
          <th>收录状态</th>
        </tr>
      </thead>
    </table>
  </main>
</template>
