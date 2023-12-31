/**
 * 整个项目的api管理
 * 
 */
import request from "./request"
export default {
    // home组件 左侧表格数据处理 单个mock接口的控制
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: true
        })
    },

    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        })
    },
    getEchartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    //  本地获取列表数据
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            // mock: true调用的是线上api
            mock: false,
            data: params
        })
    },

    // 新增用户
    addUser(params) {
        return request({
            url: '/user/add',
            method: 'post',
            // mock: true调用的是线上api
            mock: false,
            data: params
            // data:{ total: 0,page: 1,}
        })
    },

    // 编辑用户
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'post',
            mock: false,
            data: params
        })
    },
    // 删除用户
    deleteUser(params) {
        return request({
            url: '/user/delete',
            method: 'get',
            mock: false,
            data: params
        })
    },
    // 根据用户的用户名不同返回不同菜单列表
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            mock: false,
            data: params
        })
    },


}