import { reactive } from 'vue'

const store = reactive({
  user: {},
  stats: {
    0: '已删除',
    1: '待审核中',
    2: '正常收录',
    9: '拒绝收录'
  }
})

export default function (app) {
  app.config.globalProperties.$store = store
}
