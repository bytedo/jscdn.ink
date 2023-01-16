import { reactive } from 'vue'

const store = reactive({
  user: {}
})

export default function (app) {
  app.config.globalProperties.$store = store
}
