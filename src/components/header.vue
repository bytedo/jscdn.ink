<template>
  <div class="common-header" :class="{ 'search-show': $store.searchShow }">
    <header class="navibar">
      <div class="wrapper">
        <a class="logo"><img src="/assets/logo.svg" /></a>

        <nav class="navi">
          <router-link to="/">首 页</router-link>
          <router-link to="/request">收 录</router-link>
          <router-link to="/about">关 于</router-link>
        </nav>
      </div>
    </header>

    <cite class="banner">
      <p>
        我们的目标是提供这样一个仓库，让它尽可能全面收录优秀的支持ESM访问的开源库，并免费为之提供
        CDN加速服务，使之有更好的访问速度和稳定的环境。
      </p>
      <p>同时我们也提供自主提交开源库的收录(前提是在npm上发布的)</p>
    </cite>

    <wc-input class="search" no-border placeholder="请输入开源库的名字~~" />
  </div>
</template>

<script>
export default {
  props: {}
}
</script>

<style lang="scss">
.common-header {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 240px;
  background: var(--color-red-1);
  color: #fff;

  .wrapper {
    display: flex;
    width: 1024px;
    justify-content: space-between;
    align-items: center;
  }

  .navibar {
    height: 36px;
    margin-top: 24px;

    .logo {
      font-weight: bold;
      font-size: 26px;

      img {
        display: block;
        height: 36px;
      }
    }

    .navi {
      display: flex;
      align-items: center;
      font-size: 16px;

      a {
        margin: 0 16px;
        padding: 3px 6px;
        border-radius: 4px;
        transition: background 0.2s ease-in-out;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        &.router-link-active {
          text-decoration: underline;
        }
      }
    }
  }

  .banner {
    width: 640px;
    text-align: center;
  }

  .search {
    display: none;
    width: 520px;
    color: #fff;
    --bg-color: rgba(0, 0, 0, 0.3);
  }

  &.search-show {
    height: 320px;
    .search {
      display: inline-block;
    }
  }

  &::after {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.1);
    content: '免费、快速、开放的 CDN 服务';
  }
}
@media screen and (max-width: 1024px) {
  .common-header {
    .navibar {
      width: 100%;
      padding: 0 32px;
    }
    .wrapper {
      width: 100%;
    }
  }
}
</style>
