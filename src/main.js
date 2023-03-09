import { createApp } from 'vue'

import '//jscdn.ink/es.shim/2.1.0/index.js'
import '//jscdn.ink/@bytedo/wcui/1.0.12/form/input.js'
import '//jscdn.ink/@bytedo/wcui/1.0.12/form/dropdown.js'
import '//jscdn.ink/@bytedo/wcui/1.0.12/form/button.js'
import '//jscdn.ink/@bytedo/wcui/1.0.12/form/link.js'
import '//jscdn.ink/@bytedo/wcui/1.0.12/layer/index.js'

import App from './app.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(router).use(store).mount('.app')
