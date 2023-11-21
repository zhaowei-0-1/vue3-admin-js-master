import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'

// 拦截请求
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取列表user的数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
// addUser
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/delete/, 'get', userApi.deleteUser)

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
