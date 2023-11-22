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
store.commit("addMenu", router)
// 页面跳转-检查一个给定的路径是否存在于路由列表中
function checkRouter(path) {
  // 获取路由
  let hasCheck = router.getRoutes().filter(route => route.path == path).length
  if (hasCheck) {
    return true
  } else {
    return false
  }
  // console.log(router.getRoutes(), 'router.getRoutes');
}
checkRouter()
// 路由守卫 它是在每个路由导航之前执行的一个钩子函数
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  // 检查token是否存在，如果不存在且用户尝试访问的不是登录页面，就会重定向到登录页面。
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (!checkRouter(to.path)) {
    next({ name: 'home' })
  } else {
    next()
  }
})
app.use(router).use(store)
app.mount('#app')
