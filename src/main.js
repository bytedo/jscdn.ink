import { createApp } from 'vue'

import '//a.jscdn.ink/es.shim/dist/index.js'
import '//a.jscdn.ink/@bytedo/wcui/dist/form/input.js'
import '//a.jscdn.ink/@bytedo/wcui/dist/form/button.js'
import '//a.jscdn.ink/@bytedo/wcui/dist/form/link.js'
import '//a.jscdn.ink/@bytedo/wcui/dist/layer/index.js'

import App from './app.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(router).use(store).mount('.app')
