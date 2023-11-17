<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd()">+新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item lable="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>

        </el-form>
    </div>
    <div class="table">
        <el-table :data="list" style="width: 100%" height="360px">
            <el-table-column v-for="item in tableLable" :key="item.prop" :label="item.lable" :prop="item.prop"
                :width="item.width ? item.width : 125" />

            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination small background layout="prev, pager, next" :total="config.total" class="pager mt-4"
            @current-change="changePage" />
    </div>
    <el-dialog v-model="dialogVisible" :title="action === 'add' ? '新增用户' : '编辑用户'" width="55%" :before-close="handleClose">
        <el-form :inline="true" :model="formUser" ref="userForm" :rules="rules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入用户名' }]">
                        <el-input v-model="formUser.name" placeholder="请输入姓名" clearable />
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="formUser.age" placeholder="请输入年龄" clearable />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="formUser.gender" placeholder="请选择" style="width: 195px">
                            <el-option label="男" value='1' />
                            <el-option label="女" value='0' />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth">
                        <!-- <el-input v-model="formUser.age" placeholder="请输入年龄" clearable /> -->
                        <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="请选择出生日期" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="地址" prop="addr">
                <el-input v-model="formUser.addr" placeholder="请输入地址" clearable />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="onSubmit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script >
import { defineComponent, onMounted, getCurrentInstance, reactive, ref } from 'vue';

export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance();
        const list = ref([])
        // 列表项
        const tableLable = reactive([
            {
                prop: "name",
                lable: "姓名",
            },
            {
                prop: "age",
                lable: "年龄",
            },
            {
                prop: "gender",
                lable: "性别",
            },
            {
                prop: "birth",
                lable: "出生日期",
                width: 180,
            },
            {
                prop: "addr",
                lable: "地址",
                width: 300,
            },
        ]);
        onMounted(() => {
            getUserData(config);
        });
        const config = reactive({
            total: 0,
            page: 1,
            name: '',
        });
        const getUserData = async (config) => {
            let res = await proxy.$api.getUserData(config);
            // console.log(res, "getUserData111");
            config.total = res.count;
            list.value = res.list.map((item) => {
                item.gender = item.gender === 0 ? "女" : "男";
                console.log(item.gender, "xb");
                return item;
            })
            console.log(res.list, "getUserData2222");
        };

        // 分页,切换实现 @current-change="changePage" 
        const changePage = (page) => {
            // console.log(page, "page11");
            config.page = page;
            getUserData(config)
        }
        const formInline = reactive({
            keyword: "",
        });
        const handleSearch = () => {
            config.name = formInline.keyword;
            getUserData(config);
        }

        // 控制对话框的显示与隐藏
        const dialogVisible = ref(false);
        const handleClose = (done) => {
            ElMessageBox.confirm('确定关闭吗？')
                .then(() => {
                    proxy.$refs.userForm.resetFields();
                    done()
                })
                .catch(() => {
                    // catch error
                });
        };

        // 添加用户的form数据
        const formUser = reactive({
            name: "",//添加用户的 用户名
            age: "",
            gender: '',
            birth: "",
            addr: " ",
        });
        // 校验规则

        // 日期处理
        const timeFormat = (Time) => {
            var time = new Date(time);
            var month = time.getMonth() + 1;
            var year = time.getFullYear();
            var date = time.getDate();
            function add(m) {
                return m < 10 ? "0" + m : m;
            }
            return year + '-' + add(month) + '-' + add(date);

        }
        //提交（确认按钮）
        const onSubmit = async () => {
            // 校验
            proxy.$refs.userForm.validate(async (valid) => {
                if (valid) {
                    //新增接口
                    if (action.value === 'add') {
                        formUser.birth = timeFormat(formUser.birth);
                        let res = await proxy.$api.addUser(formUser);
                        // console.log(res);
                        // 表单重置
                        if (res) {
                            dialogVisible.value = false;
                            proxy.$refs.userForm.resetFields();
                            getUserData(config);
                        }
                    } else {
                        // 编辑接口
                        // console.log(formUser, "user")
                        formUser.gender === '男' ? (formUser.gender = 1) : (formUser.gender = 0);
                        let res = await proxy.$api.editUser(formUser);
                        // console.log(res);
                        // 表单重置
                        if (res) {
                            dialogVisible.value = false;
                            proxy.$refs.userForm.resetFields();
                            getUserData(config);
                        }
                    }

                } else {
                    // 校验提示错误
                    ElMessage({
                        showClose: true,
                        message: '请输入正确内容',
                        type: 'error'
                    });
                }
            });

        };
        // 取消按钮
        const handleCancel = () => {
            dialogVisible.value = false;
            proxy.$refs.userForm.resetFields();
        }

        // 区分编辑和新增
        const action = ref('add');

        // 编辑
        const handleEdit = (row) => {
            // console.log(row,"row");
            action.value = 'edit';
            dialogVisible.value = true;
            // 浅拷贝写在回调函数中
            proxy.$nextTick(() => {
                Object.assign(formUser, row);
            });
            // Object.assign(formUser,row);
        };
        // 新增用户
        const handleAdd = () => {
            action.value = 'add';
            dialogVisible.value = true;
        };

        // 删除用户
        const handleDelete = (row) => {
            ElMessageBox.confirm('确定删除吗？')
                .then(async () => {
                    await proxy.$api.deleteUser({ id: row.id });
                    ElMessage({
                        showClose: true,
                        message: '删除成功',
                        type: "success",
                    });
                    getUserData(config)
                })
                .catch(() => {
                    // catch error
                });
        }
        return {
            list,
            tableLable,
            config,
            changePage,
            formInline,
            handleSearch,
            dialogVisible,
            handleClose,
            formUser,
            onSubmit,
            handleCancel,
            action,
            handleEdit,
            handleAdd,
            handleDelete,
        }
    },
})
</script>

<style lang="less" scoped>
.table {
    height: 380px;
    position: relative;

    .pager {
        position: absolute;
        right: 0;
        // bottom: -20px;
        bottom: -10px;
    }
}

.user-header {
    display: flex;
    justify-content: space-between;
}
</style>