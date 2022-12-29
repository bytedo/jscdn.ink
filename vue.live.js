import { resolve } from 'path'

export default {
  devServer: {
    port: 8080,
    domain: '',
    https: false,
    ssl: {
      key: '',
      cert: ''
      // ca: ''
    }
  },
  pages: {
    // 如果多页应用, 则这里写传入多个值即可(注意不是数组格式)
    // 这里的key值, 将是最终的页面的名称
    index: {
      // 这里的resolve可将相对路径转为绝对路径
      // 如果传入的路径已经是绝对路径的, 可不需要resolve
      entry: resolve('./src/main.js'),
      title: '免费、快速、开放的 CDN 服务'
    }
  },
  // 以下cdn地址, 可自行修改为适合的
  // 有用到其他的库, 可以手动添加,
  // 也可以在页面中直接引入完整的路径, 而不必须在这里声明
  imports: {
    vue: '//jscdn.ink/vue/dist/vue.esm-browser.prod.js',
    'vue-router': '//jscdn.ink/vue-router/dist/vue-router.esm-browser.js',
    // 这个库被vue-router依赖, 可以注释掉vue-router代码中的 @vue/devtools-api 的引入
    // 以达到减少不必须的体积的效果
    '@vue/devtools-api': '//jscdn.ink/@vue/devtools-api@6.4.4/lib/esm/index.js',
    fetch: '//jscdn.ink/@bytedo/fetch/dist/next.js'
  }
}
