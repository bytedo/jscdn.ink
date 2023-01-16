<template>
  <main class="login-page">
    <div class="user-card" v-if="$store.user.id">
      <img class="avatar" :src="$store.user.avatar" />
      <h3 class="name">{{ $store.user.name }}</h3>
      <cite class="homepage">
        <wc-icon is="home" />主页:
        <a target="_blank" :href="$store.user.homepage">{{ $store.user.homepage }}</a>
      </cite>
      <wc-button class="logout" @click="logout">注销登录</wc-button>
    </div>
    <div class="login-form" v-else>
      <section class="title">请使用以下方式登录</section>
      <section class="third-part">
        <a class="github" title="github" @click="jumpLogin()">
          <svg class="ico" viewBox="0 0 16 16" width="32" height="32" fill="currentColor">
            <path
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z"
            />
          </svg>
        </a>
        <a title="wait...">...</a>
      </section>
    </div>
  </main>
</template>

<script>
import fetch from '@/lib/fetch'

export default {
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    this.$store.searchShow = false

    if (this.$route.query.code) {
      fetch('/login/github', {
        method: 'post',
        body: {
          code: this.$route.query.code
        }
      })
        .then(r => {
          layer.toast('登录成功', 'success')
          this.$store.user = r.data.user
          localStorage.setItem('user', JSON.stringify(r.data.user))
          localStorage.setItem('token', r.data.token)
          this.$router.replace('/login')
        })
        .catch(r => {
          layer.toast(r.msg, 'error')
        })
    }
  },

  methods: {
    jumpLogin(site = 'github') {
      switch (site) {
        case 'github':
          location.replace(
            'https://github.com/login/oauth/authorize?' +
              `client_id=57d9d247bda6302fd9d1&redirect_uri=https://www.jscdn.ink/login`
          )
          break
      }
    },

    logout() {
      this.$store.user = {}
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
}
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  width: 1024px;
  margin: 0 auto;
  padding: 16px;

  .login-form,
  .user-card {
    display: flex;
    flex-direction: column;
    width: 320px;
    min-height: 160px;
    padding: 32px;
    margin-top: 32px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  }

  .login-form {
    .title {
      margin-bottom: 32px;
      line-height: 2;
      border-bottom: 1px solid var(--color-plain-2);
      font-size: 20px;
      text-align: center;
      color: var(--color-grey-3);
    }

    .third-part {
      display: flex;
    }

    a {
      display: inline-flex;
      width: 32px;
      height: 32px;
      margin: 0 16px;
    }
  }

  .user-card {
    align-items: center;

    .avatar {
      width: 96px;
      height: 96px;
      border: 3px solid var(--color-plain-1);
      border-radius: 50%;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
    }

    .name {
      line-height: 2;
    }
    .homepage {
      display: flex;
      align-items: center;
      --size: 12px;
      font-style: normal;

      a {
        margin-left: 6px;
        text-decoration: underline;
        color: var(--color-blue-1);
      }
    }

    .logout {
      margin-top: 32px;
    }
  }
}
</style>
