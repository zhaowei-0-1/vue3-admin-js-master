<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:5px">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/images/user.jpg" alt="" />
                    <div class="useInfo">
                        <p class="name">Admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div>
                <div class="loginInfo">
                    <p>上次登录时间<span>2023-10-24</span></p>
                    <p>上次登录的地点<span>合肥</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" style="margin-top: 15px" height="450px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />


                </el-table>

            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px"></el-col>

    </el-row>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
import axios from 'axios';
export default defineComponent({
    setup() {
        // let tableData = [
        // {
        //     name: "oppo",
        //     todayBuy: "500",
        //     monthBuy: "3500",
        //     totalBuy: "22000",

        // },
        // {
        //     name: "vivo",
        //     todayBuy: "300",
        //     monthBuy: "2200",
        //     totalBuy: "24000",

        // },
        // {
        //     name: "apple",
        //     todayBuy: "800",
        //     monthBuy: "4500",
        //     totalBuy: "65000",

        // },
        // {
        //     name: "mi",
        //     todayBuy: "1200",
        //     monthBuy: "6500",
        //     totalBuy: "45000",

        // },
        // {
        //     name: "三星",
        //     todayBuy: "300",
        //     monthBuy: "2000",
        //     totalBuy: "34000",

        // },
        // {
        //     name: "魅族",
        //     todayBuy: "350",
        //     monthBuy: "3000",
        //     totalBuy: "22000",

        // },
        // ];
        const { proxy } = getCurrentInstance();
        let tableData = ref([]);
        const tableLabel = {
            name: '课程',
            todayBuy: '今日购买',
            monthBuy: '本月购买',
            totalBuy: '总购买',
        };
        const getTableList = async () => {
            // await axios
            //     .get("https://www.fastmock.site/mock/20a09826d5238e6ae53926e753bf92df/api/home/getTableData")
            //     .then((res) => {
            //         console.log(res);
            //         // tableData.value = res.data.data.tableData;
            //         // 数据处理
            //         if (res.data.code == 200) {
            //             tableData.value = res.data.data;
            //         }
            //     });
            let res = await proxy.$api.getTableData();
            console.log(res);
            tableData.value = res;
        }
        onMounted(() => {
            getTableList();
        });
        return {
            tableData,
            tableLabel,

        }
    },
})
</script>
<style lang="less" scoped>
.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }

    .loginInfo {
        p {
            line-height: 25px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 20px;
            }
        }
    }
}
</style>