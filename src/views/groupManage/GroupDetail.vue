<template>
    <dev-article>
        <div>
            <Row :gutter="16">
                <i-col span="8">
                    <Card title="工作模块" style="margin-top: 16px;height: 600px">
                        <Tooltip content="分配的任务" slot="extra" placement="top" transfer>
                            <Icon type="ios-alert-outline" size="18" />
                        </Tooltip>
                        <Row>
                            <i-col span="24">
                                <Table :columns="tableColumns" :data="tableData"></Table>
                            </i-col>
                        </Row>

                        <Divider></Divider>
                        <Row>
                            <i-col span="24">
                                <div style="width: 100%;height: 200px;" ref="chart2"></div>
                            </i-col>
                        </Row>
                    </Card>
                </i-col>
                <i-col span="16">
                    <Card title="工作比例" style="margin-top: 16px;height: 600px">

                        <div style="width: 100%;height: 500px;" ref="chart1"></div>
                    </Card>
                </i-col>
            </Row>
        </div>
    </dev-article>
</template>

<script>
    import echarts from 'echarts'
    import axios from 'axios'
    export default {
        data () {
            return {

                tableColumns: [
                    {
                        title: '小组成员',
                        key: 'name'
                    },
                    {
                        title: '工作进度',
                        key: 'process'
                    },
                    {
                        title: '工作总量',
                        key: 'total'
                    },


                ],
                tableData: [
                    {
                        name: '关羽',
                        process: '10',
                        total:'20',
                    },
                    {
                        name: '张飞',
                        process: '15',
                        total:'20',
                    },
                    {
                        name: '刘备',
                        process: '20',
                        total:'20',
                    },
                ]
            }
        },
        methods: {
            initChart () {
                const myChart1 = echarts.init(this.$refs.chart1)
                const myChart2 = echarts.init(this.$refs.chart2)


                let option1 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['关羽已完成','关羽未完成','张飞已完成','张飞未完成','刘备已完成']
                    },
                    series: [
                        {
                            name:'工作情况',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:10, name:'关羽已完成'},
                                {value:10, name:'关羽未完成'},
                                {value:15, name:'张飞已完成'},
                                {value:5, name:'张飞未完成'},
                                {value:20, name:'刘备已完成'}
                            ]
                        }
                    ]
                };
                let option2 = {
                    title : {
                        text: '任务完成情况',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series : [
                        {
                            name: '完成度',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:45, name:'已完成'},
                                {value:15, name:'未完成'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                myChart1.setOption(option1);
                myChart2.setOption(option2);
            },
            getData() {
                let path = 'http://localhost:8888/staff'
                axios.get('')
            },

        },
        mounted () {
            this.initChart();
        }
    }
</script>

<style scoped>

</style>
