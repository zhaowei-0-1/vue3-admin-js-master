// vuex 侧边栏折叠展开
import { createStore } from 'vuex';
import router from '../router';
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
        ],
        menu: []
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            // 判断
            // val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
            if (val.name == 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        closeTab(state, val) {
            let res = state.tabsList.findIndex(item => item.name === val.name);
            state.tabsList.splice(res, 1)
        },
        // 权限 设置一个菜单状态并将其存储在本地存储localStorage
        setMenu(state, val) {
            state.menu = val;
            localStorage.setItem('menu', JSON.stringify(val));

        },
        // 数据持久化
        addMenu(state, router) {
            if (!localStorage.getItem('menu')) {
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'));
            state.menu = menu;

            // 动态路由
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        item.component = () => import(/* @vite-ignore */ url)

                        return item;
                    })
                    menuArray.push(...item.children);
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = () => import(/* @vite-ignore */ url)
                    menuArray.push(item);
                }
            })
            menuArray.forEach(item => {
                router.addRoute('home1', item)
            })
        }

    }
})