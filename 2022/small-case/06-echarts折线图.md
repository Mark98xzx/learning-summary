### 
```vue
    <template>
    <div class="ui-order-amount">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="ui-title"><i class="el-icon-time"></i> 新增会员数量</div>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                        v-model="selectTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="handleChangeTime"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :clearable="false"
                        :picker-options="pickerOptions" />
                </el-col>
                 <!-- <el-col :span="15" style="text-align: right">
                     <div class="ui-title" style="padding-right:26px">
                         合计金额 / 订单： <span style="color: #666; font-weight: normal;"> ¥23452 / 35</span>
                    </div>
                 </el-col> -->
            </el-row>
            <div class="ui-content">
                <div class="proCharts" ref='charts'></div>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from "echarts";
import * as Apis from "@/api/home";
export default {
    props: {
        provinceCode: { // 省份
            type: [String, Number],
            default: '',
        },
        startOrEndDateArr: { // 初始化时间
            type: Array,
        }
    },
    data() {
        return {
            selectTime: [],
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            option:{
                // type: 'category',
                color:['#69d593', '#ee6666', '#1a73e8'], // 点颜色  '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
                title: {
                    show: false,
                    text: '新增订单金额 / 数量'
                },
                tooltip: { //提示框
                    trigger: 'axis',
                    // axisPointer: {
                    //     type: 'cross',
                    //     label: {
                    //         backgroundColor: '#6a7985'
                    //     }
                    // }
                },
                legend: {//图例的类型
                    // icon:'roundRect',//图例icon图标
                    data: ['v0-未领取试用用户', 'v1-领取试用用户', 'v2-付费用户'],
                    right: 20
                    
                },
                // toolbox: {
                //     feature: {
                //     saveAsImage: {}
                //     }
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    // top:'17%',
                    containLabel: true //grid区域是否包含坐标轴的刻度标签
                },
                xAxis: {
                    type: 'category', //坐标轴类型。
                    boundaryGap: false, //坐标轴两边留白策略
                    // data: ['2022-3-1', '2022-3-2', '2022-3-3', '2022-3-4', '2022-3-5', '2022-3-6', '2022-3-7', '2022-3-8', '2022-3-9', '2022-3-10']
                    data: []
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'v0-未领取试用用户',
                        type: 'line',
                        stack: 'Total',
                        lineStyle: {
                            color: '#69d593' //线的颜色
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: { // 面积颜色
                            color: '#d7f4e2'
                        },
                        data: [],
                        
                    },
                    {
                        name: 'v1-领取试用用户',
                        type: 'line',
                        stack: 'Total',
                        lineStyle: {
                            color: '#ee6666' //线的颜色
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: { // 面积颜色
                            color: '#e7a4a4'
                        },
                        data: [],
                        
                    },
                    {
                        name: 'v2-付费用户',
                        type: 'line',
                        stack: 'Total',
                        lineStyle: {
                            color: '#1a73e8' //线的颜色
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: { // 面积颜色
                            color: '#79a5df'
                        },
                        data: [],
                        
                    }
                ]
            }
        }
    },
    watch: {
        provinceCode: function (newVal, oldVal) {
            // console.log('newVal:'+ newVal, 'oldVal:' + oldVal);
            if (newVal != oldVal) {
                this.getStudentEchartData();
            }
        }
    },
    created () {
        this.selectTime = this.startOrEndDateArr;
        this.getStudentEchartData();
    },
    mounted () {},
    methods: {
        // 选择时间
        handleChangeTime(val) {
            // console.log(val, !val, this.selectTime);
            this.getStudentEchartData();
        },
        // 获取新增或退款订单折线图
        getStudentEchartData () {
            const params = {
                beginDate: Array.isArray(this.selectTime) ? this.selectTime[0] : '',
                endDate: Array.isArray(this.selectTime) ? this.selectTime[1] : '',
                provinceCode: this.provinceCode,
            };
            Apis.getStudentEchartData(params).then((res) => {
                if (res.code == 200) {
                    // x轴
                    this.option.xAxis.data = res.data?.v0.map((v) => {
                        return v.label;
                    });
                    // v0-未领取试用用户
                    this.option.series[0].data = res.data?.v0.map((v) => {
                        return v.count;
                    });
                    // v1-领取试用用户
                    this.option.series[1].data = res.data?.v1.map((v) => {
                        return v.count;
                    });
                    // v2-付费用户
                    this.option.series[2].data = res.data?.v2.map((v) => {
                        return v.count;
                    });
                    // 画图
                    this.mycharts()
                }
            }).finally(() => {
            });
        },
        mycharts(){
            let myChart = echarts.init(this.$refs.charts, "macarons");
            myChart.setOption(this.option)
            //图表自适应
            window.addEventListener("resize", function(){
                myChart.resize()  // myChart 是实例对象
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.ui-order-amount {
    padding-top: 16px;
    .box-card {
        border-radius: 10px;
        .ui-title {
            font-size: 14px;
            font-weight: 600;
            line-height: 36px;
            .el-icon-time {
                font-size: 16px;
                font-weight: bold;
                color: #1890ff;
            }
        }
        .ui-content {
            // padding-top: 20px;
            .proCharts{
                width: 100%;
                height: 250px;
                // background: rgb(14, 51, 129);
            }

        }
    }
}
</style>

```