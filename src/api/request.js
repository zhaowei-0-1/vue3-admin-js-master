// 二次封装axios
import axios from "axios";
import config from "../config";
import { ElMessage } from "element-plus";


const NETWORK_ERROR = '网络请求异常，请稍后重试......'

// 创建一个axios实例对象
const service = axios.create({
    baseURL: config.baseApi
})
// 在请求之前做一些事情

service.interceptors.request.use((req) => {
    // 可以自定义header
    // jwt-token 认证的时候
    return req
})

// 请求之后统一处理
service.interceptors.response.use((res) => {
    console.log(res.data,'=====');
    const { code, data, msg } = res.data
    // 根据后端视情况而定
    if (code == 200) {
        return data
    } else {
        // 网络请求错误
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

// 封装的核心函数
function request(options) {
    // {}
    // {
    // method:'get',
    // data:{

    // }

    // }
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    // 对 mock 处理 总开关为true 单个开关是否自定义
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }
    // 对线上环境做处理
    if (config.env == 'prod') {
        // 线上环境不使用mock
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}
export default request