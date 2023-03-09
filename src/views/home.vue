<template>
  <main class="home" @click="copy">
    <dl class="card" v-if="version">
      <dt class="title">
        {{ $store.result.id }} -
        <wc-dropdown v-model="version">
          <wc-option
            v-for="v in $store.result.versions"
            :key="v"
            :value="v"
            :label="v"
          />
        </wc-dropdown>
      </dt>
      <dd class="list">
        <section class="link" v-for="f in $store.result[version]">
          //jscdn.ink/{{ $store.result.id }}/{{ f }}
        </section>
      </dd>
    </dl>
    <dl class="card" v-else v-for="it in libs" :key="it.name">
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
          name: '@bytedo/fetch',
          version: '2.1.1',
          files: ['index.js', 'next.js']
        }
      ],
      version: ''
    }
  },

  watch: {
    '$store.result'(val) {
      if (val) {
        this.version = val.versions[val.versions.length - 1]
      } else {
        this.version = ''
      }
    }
  },

  mounted() {
    this.$store.searchShow = true
    if (this.$route.query.name) {
      this.$store.searchInput = this.$route.query.name
    }
  },

  methods: {
    copy(ev) {
      if (ev.target.tagName === 'SECTION') {
        navigator.clipboard.writeText(ev.target.textContent.trim())
        layer.toast('复制成功', 'success')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 32px;

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
