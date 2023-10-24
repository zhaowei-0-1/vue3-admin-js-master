//vue3引入路由配置
import { createRouter,createWebHashHistory } from "vue-router";
const routes = [
    {
        path:'/',
        component:() => import('../views/Main.vue'),
        children: [
            {
                path:'/',
                name:'home',
                component: () => import('../views/home/Home.vue')
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
