<template>
    <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" class="loginContainer">
        <h3>系统登录</h3>
        <el-form-item label="用户名" prop="pass">
            <el-input type="input" placeholder="请输入用户" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { reactive, ref, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const loginForm = reactive({
            username: 'admin',
            password: 'admin'
        });
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const router = useRouter();
        const login = async () => {
            const res = await proxy.$api.getMenu(loginForm);
            // console.log(res, 'loginForm')
            store.commit("setMenu", res.menu);
            store.commit("addMenu", router);
            store.commit("setToken", res.token);
            // 路由跳转
            router.push({
                name: 'home',
            })

        };
        return {
            loginForm,
            login,
        }


    },

}
</script>

<style lang="less" scoped>
.loginContainer {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 100px auto;

    h3 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }

    :deep .el-form-item__content {
        justify-content: center;
    }
}
</style>