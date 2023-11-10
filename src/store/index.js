// vuex 侧边栏折叠展开
import { createStore } from 'vuex';
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                lable: '首页',
                icon: 'home'
            }
        ]
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            // 判断
            val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
        }

    }
})