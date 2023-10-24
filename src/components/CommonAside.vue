
<template>
    <el-aside width="200px">
        <!-- 折叠:collapse="true" -->
        <el-menu 
            class="el-menu-vertical-demo" 
            background-color="#545c64" 
            text-color="#fff"
            :collapse="!$store.state.isCollapse"
        >
        <!--  -->

            <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>


            <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item-group>
                    <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex">
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>


            </el-sub-menu>

        </el-menu>
    </el-aside>
</template>

<script>
export default {
    setup() {
        const list = [
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                label: '其他',
                path: '/other',
                icon: 'location',
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        label: '页面1',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },

                    {
                        path: '/page2',
                        name: 'page2',
                        label: '页面2',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    }
                ]
            }
        ];
        // 定义方法：判断是否有二级菜单
        const noChildren = () => {
            return list.filter((item) => !item.children);
        };

        const hasChildren = () => {
            return list.filter((item) => item.children)
        };

        return {
            noChildren,
            hasChildren,
        }
    },
};
</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
}

.el-menu {
    border-right: none;
}
</style>