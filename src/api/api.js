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
    }
}