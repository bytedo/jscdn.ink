import { createApp } from 'vue'
import App from './app.vue'

import router from './router'
import store from './store'

import '//jscdn.ink/@bytedo/wcui/dist/form/input.js'

const app = createApp(App)

app.use(router).use(store).mount('.app')
