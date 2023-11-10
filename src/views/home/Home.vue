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
        <el-col :span="16" style="margin-top: 5px">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
                    <div class="details">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <!-- 折线图 -->
            <el-card style="height: 200px">
                <div ref="echart" style="height: 200px"></div>
            </el-card>
            <div class="graph">
                <el-card style="height: 200px">
                    <div ref="userEchart" style="height: 180px"></div>
                </el-card>

                <el-card style="height: 200px">
                    <div ref="videoEchart" style="height: 160px"></div>
                </el-card>

            </div>
        </el-col>
    </el-row>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
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
        let countData = ref([])
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
            // console.log(res);
            tableData.value = res;
        };
        // 获取首页count数据
        const getCountData = async () => {
            let res = await proxy.$api.getCountData()
            countData.value = res;
        }

        onMounted(() => {
            getTableList();
            // 获取count 数据
            getCountData();
            // 获取echarts 表格数据
            getEchartData();
        });

        // echarts 表格的渲染
        let xOptions = reactive({
            // 图例文字颜色
            textStyle: {
                color: "#333",
            },
            grid: {
                // left: "20%",
                right:"0%"
            },
            // 提示框
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                // 类目轴
                type: "category",
                data: [],
                axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                },
                axisLable: {
                    interval: 0,
                    color: "#333",
                },
            },

            yAxis: [
                {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3"
                        },
                    },
                },
            ],
            color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
            series: [],
        });
        // 饼状图
        let pieOptions = reactive({
            tooltip: {
                trigger: "item",
            },
            color: [
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3edecf",
            ],
            series: [],
        })

        let orderData = reactive({
            xData: [],
            series: [],
        })

        let userData = reactive({
            xData: [],
            series: [],
        });

        let videoData = reactive({
            series: [],
        });
        // 获取数据
        const getEchartData = async () => {
            let result = await proxy.$api.getEchartData();
            // console.log(result);
            let res = result.orderData
            let userRes = result.userData
            let videoRes = result.videoData
            orderData.xData = res.date
            const keyArray = Object.keys(res.data[0])
            const series = []
            keyArray.forEach((key) => {
                series.push({
                    name: key,
                    data: res.data.map(item => item[key]),
                    type: "line",
                });
            });
            orderData.series = series;
            xOptions.xAxis.data = orderData.xData;
            xOptions.series = orderData.series;
            //userData 渲染数据
            let hEcharts = echarts.init(proxy.$refs['echart']);
            hEcharts.setOption(xOptions);

            // 柱状图渲染数据
            userData.xData = userRes.map((item) => item.date);
            userData.series = [
                {
                    name: ['新增用户'],
                    data: userRes.map(item => item.new),
                    type: "bar"
                },
                {
                    name: ['活跃用户'],
                    data: userRes.map(item => item.active),
                    type: "bar"
                },
            ];
            // 折线图
            xOptions.xAxis.data = userData.xData;
            xOptions.series = userData.series;

            // 柱状图
            let uEcharts = echarts.init(proxy.$refs['userEchart']);
            uEcharts.setOption(xOptions);

            // 饼状图
            videoData.series = [
                {
                    data: videoRes,
                    type: "pie",

                },
            ];
            pieOptions.series = videoData.series
            let vEcharts = echarts.init(proxy.$refs['videoEchart']);
            vEcharts.setOption(pieOptions);
        };

        return {
            tableData,
            tableLabel,
            countData,

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

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 8px;
        }

        .icons {
            width: 50px;
            height: 50px;
            font-size: 14px;
            text-align: center;
            line-height: 50px;
            color: #fff;

        }

        .details {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .price {
                font-size: 20px;
                // margin-bottom: 2px;
            }

            .txt {
                font-size: 13px;
                text-align: center;
                color: #999;
            }
        }
    }

    .graph {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;

        .el-card {
            width: 48%;
        }
    }
}
</style>