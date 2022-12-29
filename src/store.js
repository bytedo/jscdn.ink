import { reactive } from 'vue'

const store = reactive({
  foo: 'bar',
  version: '0.0.13',
  searchShow: true
})

export default function (app) {
  app.config.globalProperties.$store = store
}
