<template>
  <main class="packages">
    <div class="toolbar">
      <wc-input
        v-model="filter"
        placeholder="请输入开源库的名字"
        @submit="search"
      />
      <wc-switch v-model="onlyShowWaited" @input="search"
        >只显示待审核</wc-switch
      >
      <wc-link type="info" @click="openDialog">
        没找到你想的库?点击申请收录
      </wc-link>
    </div>
    <wc-table class="list" :thead="thead">
      <wc-tr v-for="it of list" :key="it.id">
        <wc-td align="center">{{ it.id }}</wc-td>
        <wc-td align="center">{{ it.author }}</wc-td>
        <wc-td align="center">{{ it.latest || '-' }}</wc-td>
        <wc-td align="center">{{ it.latest ? it.sync_date : '-' }}</wc-td>
        <wc-td align="center">{{ $store.stats[it.stat] }}</wc-td>
        <wc-td>{{ it.remark || '-' }}</wc-td>
        <wc-td align="center">
          <wc-link
            :disabled="loading || it.stat !== 2"
            @click="handlePackgae('sync', it.id)"
            type="info"
            >更新</wc-link
          >
          <wc-link
            v-if="$store.user.admin && it.stat !== 2"
            @click="handlePackgae('accept', it.id)"
            type="info"
            >通过</wc-link
          >
          <wc-link
            v-if="$store.user.admin"
            @click="handlePackgae('reject', it.id)"
            type="warning"
            >拒绝</wc-link
          >
          <wc-link
            v-if="$store.user.admin"
            @click="handlePackgae('delete', it.id)"
            type="danger"
            >删除</wc-link
          >
        </wc-td>
      </wc-tr>
    </wc-table>

    <wc-pager
      class="pager"
      layout="prev,pages,next"
      red
      :total="total"
      :page="page"
    />
  </main>

  <wc-layer ref="form" mask mask-close>
    <div class="request-form">
      <header class="title">申请收录开源库</header>
      <content class="content">
        <section class="field">
          <span class="label">开源库名称:</span>
          <wc-input v-model="lib.name" @input="autoUpdateInfo" />
        </section>
        <section class="field">
          <span class="label">作者:</span>
          <span class="value">{{ lib.author }}</span>
        </section>
        <section class="field">
          <span class="label">简介:</span>
          <span class="value">{{ lib.description }}</span>
        </section>
        <section class="field">
          <span class="label">最新版本:</span>
          <span class="value">{{ lib.latest }}</span>
        </section>
        <section class="field center">
          <wc-button
            type="danger"
            :disabled="disabled"
            :loading="loading"
            @click="submit"
            >提交申请</wc-button
          >
        </section>
      </content>
    </div>
  </wc-layer>
</template>

<script>
import '//jscdn.ink/@bytedo/wcui/1.0.12/table/index.js'
import '//jscdn.ink/@bytedo/wcui/1.0.12/form/switch.js'
import '//jscdn.ink/@bytedo/wcui/1.0.12/pager/index.js'
import fetch from '@/lib/fetch.js'

export default {
  data() {
    return {
      content: '这是关于我们页面',
      list: [],
      thead: JSON.stringify([
        '开源库',
        '作者',
        '最后同步版本',
        '最后同步日期',
        '收录状态',
        '备注',
        '操作'
      ]),
      page: 1,
      total: 0,
      filter: '',
      onlyShowWaited: false,
      loading: false,
      disabled: true,
      lib: {
        name: '',
        author: '-',
        description: '-',
        latest: '-'
      }
    }
  },
  mounted() {
    this.$store.searchShow = false

    this.fetchList()
  },
  methods: {
    fetchList() {
      fetch('/package/list').then(r => {
        this.$list = r.data.map(
          it => ((it.sync_date = new Date(it.sync_date).format('Y/m/d')), it)
        )
        this.list = this.$list.filter(it =>
          this.onlyShowWaited ? it.stat === 1 : true
        )
        this.total = this.list.length
      })
    },

    search() {
      let filter = this.filter.trim()
      let onlyShowWaited = this.onlyShowWaited

      if (filter) {
        this.list = this.$list.filter(
          it =>
            it.id.indexOf(filter) > -1 &&
            (onlyShowWaited ? it.stat === 1 : true)
        )
      } else {
        this.list = this.$list.filter(it =>
          onlyShowWaited ? it.stat === 1 : true
        )
      }
      this.total = this.list.length
    },

    openDialog() {
      if (this.$store.user.id) {
        this.$refs.form.show()
      } else {
        layer.confirm('你还没有登录, 请先登录之后, 再申请').then(_ => {
          localStorage.setItem('login_callback_path', this.$route.path)
          this.$router.push('/login')
        })
      }
    },

    resetForm(force) {
      force && (this.lib.name = '')
      this.lib.author = '-'
      this.lib.description = '-'
      this.lib.latest = '-'
      this.disabled = true
    },

    autoUpdateInfo() {
      let name = this.lib.name.trim()
      clearTimeout(this.$timer)
      if (name) {
        if (name.startsWith('@') && name.indexOf('/') === -1) {
          return
        }

        this.$timer = setTimeout(_ => {
          this.getPackageInfo(name)
        }, 800)
      }
    },

    getPackageInfo(name) {
      return fetch('https://registry.npmmirror.com/' + name)
        .then(r => {
          let author = r.author
            ? r.author.name
            : r.maintainers
            ? r.maintainers[0].name
            : 'unknow'

          this.lib.author = author
          this.lib.description = r.description || r.homepage
          this.lib.latest = r['dist-tags'].latest

          this.disabled = false
          return {
            author,
            description: this.lib.description,
            latest: r['dist-tags'].latest
          }
        })
        .catch(_ => {
          this.resetForm()
          layer.toast(
            `开源库【${name}】在npm上找不到, 请确认名称是否正确`,
            'error'
          )
        })
    },

    uploadPackge(body) {
      fetch('/package/upload', { method: 'post', body })
        .then(r => {
          layer.toast('提交成功,等待审核', 'success')
          this.resetForm(true)
          this.fetchList()
          this.$refs.form.close()
        })
        .catch(e => {
          layer.toast(e.msg, 'error')
        })
    },

    submit() {
      let name = this.lib.name.trim()
      if (name) {
        if (name.startsWith('@') && name.indexOf('/') === -1) {
          return
        }
        this.loading = true
        this.getPackageInfo(name)
          .then(({ author, description, latest }) => {
            //
            this.uploadPackge({ name, author, description, latest })
          })

          .finally(_ => (this.loading = false))
      } else {
        layer.toast(`请填写正确的名称`, 'warning')
      }
    },

    handlePackgae(act, id) {
      if (act !== 'sync' && !this.$store.user.admin) {
        return layer.alert('别闹, 老实等管理员通过~~')
      }
      let req
      if (act === 'reject' || act === 'delete') {
        req = layer.prompt('请输入理由').then(remark => {
          return fetch(`/package/${act}/${encodeURIComponent(id)}`, {
            method: 'PUT',
            body: { remark }
          })
        })
      } else if (act === 'accept') {
        req = layer.prompt('请输入文件目录', 'dist').then(dist => {
          return fetch(`/package/${act}/${encodeURIComponent(id)}`, {
            method: 'PUT',
            body: { dist }
          })
        })
      } else {
        req = fetch(`/package/${act}/${encodeURIComponent(id)}`, {
          method: 'PUT'
        })
      }
      this.loading = true
      req
        .then(r => {
          layer.toast('操作成功', 'success')
          this.fetchList()
        })
        .catch(r => {
          r && layer.toast(r.msg, 'error')
        })
        .finally(_ => (this.loading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
.packages {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;

  .toolbar,
  .list {
    width: 1024px;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;

    wc-input {
      width: 480px;
    }
    wc-link {
      height: 20px;
    }
  }

  .pager {
    margin-top: 16px;
  }
}

.request-form {
  width: 640px;

  .title {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 16px;
    font-size: 20px;
    color: var(--color-grey-3);
  }

  .content {
    padding: 16px 16px 32px;

    .field {
      display: flex;
      align-items: center;
      margin-top: 12px;

      &.center {
        margin-top: 16px;
        justify-content: center;
      }

      .label {
        width: 120px;
      }
      wc-input,
      .value {
        flex: 1;
      }
    }
  }
}
</style>
