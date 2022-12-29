<template>
  <main class="about-page">
    <dl>
      <dt>一、背景和目标</dt>
      <dd>
        <p>国内免费的几个js cdn加速站, 要么收录太少, 要么已经不维护。</p>
        <p>
          我们的目标是提供这样一个仓库，让它尽可能全面收录优秀的支持ESM访问的开源库，并免费为之提供
          CDN加速服务，使之有更好的访问速度和稳定的环境。
        </p>
        <p>同时我们也提供自主提交开源库的收录(前提是在npm上发布的)</p>
      </dd>

      <dt>二、更新开源库</dt>
      <dd>
        <p>
          理论上, 程序会自动更新开源库, 目前更新周期为1个星期, 如果你有需要使用新版而我们还未更新,
          可以来手动同步。
        </p>
        <p>
          原则上我们不会删除旧版本(如发现该开源库包含无用的大文件如图片, 音视频及其他附件时,
          则会清除所有的旧版本, 只保留最新的一份, 严重时直接下架该库)。
        </p>
      </dd>

      <dt>三、收录事项</dt>
      <dd>
        <p>
          开源库未发布到npm上时, 我们原则上不会收录(如有特殊且合理原因未提交到npm又想收录的,
          可在意见反馈处提交相关信息)。
        </p>
        <p>原则上我们只收录支持esm方式访问的开源库。</p>
      </dd>

      <dt>四、维护者</dt>
      <dd>
        <p><a href="//github.com/yutent" target="_blank">yutent</a></p>
        <p><a target="_blank" href="//github.com/bytedo/jscdn.ink/issues">建议和反馈</a></p>
        <p>项目托管于阿里云oss。</p>
      </dd>
    </dl>
  </main>
</template>

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

<style lang="scss">
.about-page {
  width: 1024px;
  margin: 0 auto;
  padding: 16px;

  dl {
    font-size: 16px;

    dt {
      margin-top: 32px;
      font-size: 22px;
      font-weight: bold;
      color: var(--color-grey-3);
    }
    dd {
      margin-top: 16px;
    }
  }

  p {
    margin-top: 8px;
  }

  a {
    color: var(--color-red-1);
    text-decoration: underline;
  }
}
</style>
