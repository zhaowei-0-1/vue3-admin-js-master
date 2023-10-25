/**
 * 环境配置文件
 * 一般在企业级项目有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 * **/

// 当前的环境
const env = import.meta.env.MODE || 'prod'
const EnvConfig ={
    development:{
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/20a09826d5238e6ae53926e753bf92df/api',
    },
    test:{
        baseApi:'/test.future.com/api',
        mockApi:'https://www.fastmock.site/mock/20a09826d5238e6ae53926e753bf92df/api',
    },
    pro:{
        baseApi:'//future.com/api',
        mockApi:'https://www.fastmock.site/mock/20a09826d5238e6ae53926e753bf92df/api',
    },
}
export default {
    env,
    // mock总开关
    mock:true,
    ...EnvConfig[env]
}
