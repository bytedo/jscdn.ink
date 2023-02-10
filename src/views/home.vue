<template>
  <main class="home">
    <dl class="card" v-for="it in libs">
      <dt class="title">{{ it.name }} - v{{ it.version }}</dt>
      <dd class="list">
        <section class="link">
          //jscdn.ink/{{ it.name }}/{{ it.version }}/{{ it.file }}
        </section>
      </dd>
    </dl>
  </main>
</template>

<script>
export default {
  data() {
    return {
      libs: [
        { name: 'vue', version: '2.3.2', file: 'vue.esm-browser.js' },
        {
          name: 'vue-router',
          version: '4.1.2',
          file: 'vue-router.esm-browser.js'
        },
        { name: '@bytedo/fetch', version: '2.1.2', file: 'index.js' }
      ]
    }
  },

  mounted() {
    this.$store.searchShow = true
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;

  .card {
    width: 1024px;
    margin-top: 24px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);

    .title {
      padding: 16px;
      font-size: 26px;
      background: var(--color-plain-1);
    }

    .list {
      padding: 16px;
      font-size: 16px;
    }

    .link {
      transition: background 0.1s ease;
      &:hover {
        text-decoration: underline;
      }
      &:active {
        background: var(--color-plain-a);
      }
    }
  }
}
</style>
