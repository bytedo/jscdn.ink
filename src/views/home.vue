<template>
  <main class="home">
    <dl class="card" v-for="it in libs" :key="it.name">
      <dt class="title">{{ it.name }} - v{{ it.version }}</dt>
      <dd class="list">
        <section class="link" v-for="f in it.files">
          //jscdn.ink/{{ it.name }}/{{ it.version }}/{{ f }}
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
        {
          name: 'vue',
          version: '3.2.47',
          files: [
            'vue.cjs.js',
            'vue.cjs.prod.js',
            'vue.esm-browser.js',
            'vue.esm-browser.prod.js',
            'vue.esm-bundler.js',
            'vue.global.js',
            'vue.global.prod.js',
            'vue.runtime.esm-browser.js',
            'vue.runtime.esm-browser.prod.js',
            'vue.runtime.esm-bundler.js',
            'vue.runtime.global.js',
            'vue.runtime.global.prod.js'
          ]
        },
        {
          name: 'vue-router',
          version: '4.1.6',
          files: [
            'vue-router.cjs',
            'vue-router.cjs.js',
            'vue-router.cjs.prod.js',
            'vue-router.esm-browser.js',
            'vue-router.esm-bundler.js',
            'vue-router.global.js',
            'vue-router.global.prod.js',
            'vue-router.mjs',
            'vue-router.node.mjs',
            'vue-router.prod.cjs'
          ]
        },
        {
          name: '@bytedo/fetch',
          version: '2.1.1',
          files: ['index.js', 'next.js']
        }
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
