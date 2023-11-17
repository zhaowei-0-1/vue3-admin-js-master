// mockjs 模拟数据 实现增删改查
import Mock from 'mockjs'
import config from '../../config';

// get请求从 config.url 获取参数， post 从config.body中获取参数
function param20bj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'

    )
}

let List = [];
const count = 200
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@County(true)'),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            gender: Mock.Random.integer(0, 1)
        })
    )
}

export default {
    /**
     * 获取列表数据
     * 字段 name(选填) ,page、limit （有默认值）
     * @param name, page, limit
     * @return {{ code:number, count:number, data: *[]}}
     */

    getUserList: config => {
        const { name, page = 1, limit = 20 } = param20bj(config.url)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1)return false
                return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))//
    
        return {
            code: 200,
            data: {
                list: pageList,
                count: mockList.length,
            }
        }
    },

    /**
     * 增加用户
     * @param name, addr,age,birth,gender 
     * @return {{ code:number, data: {message:string}}}
     */

    createUser: config => {
        const { name, addr, age, birth, gender } = JSON.parse(config.body)
        console.log(JSON.parse(config.body), "config.body0000")
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            gender: gender
        })
        return {
            code: 200,
            data: {
                message: '添加成功！'
            }
        }
    },
    /**
     * 删除用户
     * @param id
     * @return {*}
     */
    deleteUser: config => {
        const { id } = param20bj(config.url);
        if (!id) {
            return {
                code: -999,
                message: '参数不正确！'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 200,
                message: '删除成功！'

            }
        }
    },

    /**
     * 批量删除
     * @param config
     * @return {{ code:number, data:{message:string}}}
     */

    batchRemove: config => {
        let { ids } = param20bj(config.url);
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 200,
            data: {
                message: '批量删除成功！'
            }
        }
    },

    /**
   * 修改用户
   * @param id,name, addr,age,birth,gender 
   * @return {{ code:number, data:{message:string}}}
   */

    updateUser: config => {
        const { id, name, addr, age, birth, gender } = JSON.parse(config.body)
        const gender_num = parseInt(gender);
        List.some(u => {
            if (u.id === id) {
                u.name = name,
                u.addr = addr,
                u.age = age,
                u.birth = birth,
                u.gender = gender_num
                return true
            }
        })
        return {
            code: 200,
            data: {
                message: '编辑成功！'
            }
        }
    },
}