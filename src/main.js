import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/less/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index.js'
import './api/mock.js'
import api from './api/api'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 全局挂在api
app.config.globalProperties.$api = api
app.use(router).use(store)
app.mount('#app')
