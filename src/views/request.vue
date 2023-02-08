<script>
import fetch from '@/lib/fetch.js'

export default {
  data() {
    return {
      content: '这是关于我们页面',
      list: []
    }
  },
  mounted() {
    this.$store.searchShow = false

    fetch('/package/list').then(r => {
      console.log(r)
      this.list = r.data
    })
  }
}
</script>

<template>
  <main>
    <table>
      <thead>
        <tr>
          <th>开源库</th>
          <th>作者</th>
          <th>介绍</th>
          <th>最后同步日期</th>
          <th>收录状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="it of list" :key="it.id">
          <td>{{ it.id }}</td>
          <td>{{ it.author }}</td>
          <td>{{ it.description }}</td>
          <td>{{ it.sync_date }}</td>
          <td>{{ $store.stats[it.stat] }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
