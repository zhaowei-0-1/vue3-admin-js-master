// vuex 侧边栏折叠展开
import { createStore } from 'vuex';
export default createStore({
    state: {
        isCollapse: true
    },
    mutations: {
        updateIsCollapse(state, payload) { 
            state.isCollapse = !state.isCollapse 
        }
    }
})