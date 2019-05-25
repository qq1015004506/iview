<template>
    <dev-article>
        <Row :gutter="16">
            <i-col span="12">
                <Card shadow style="margin-top: 16px">
                    <div style="width: 100%;height: 400px;" ref="chart1"></div>
                </Card>
            </i-col>
            <i-col span="12">
                <Card shadow style="margin-top: 16px">
                    <div style="width: 100%;height: 400px;" ref="chart3"></div>
                </Card>
            </i-col>
        </Row>

        <Card shadow style="margin-top: 16px">
            <Row>
                <i-col span="18">
                    <div style="width: 100%;height: 350px;" ref="chart2"></div>
                </i-col>
                <i-col span="6">
                    <Table :columns="tableColumns" :data="tableData"></Table>
                </i-col>
            </Row>
        </Card>

    </dev-article>
</template>
<script>
    import echarts from 'echarts'
    import axios from 'axios'
    export default {
        props: {},
        data () {
            return {
                dateList: [],
                taskRatioList:[

                ],
                tableColumns: [
                    {
                        type: 'index'
                    },
                    {
                        title: '小组名称',
                        key: 'name'
                    },
                    {
                        title: '任务量',
                        key: 'count'
                    }
                ],
                tableData: [],
                info:[],
                value:[],
            };
        },
        computed: {},
        methods: {
            initChart3() {


                const myChart = echarts.init(this.$refs.chart3)
                const option = {
                    title: {
                        text: '任务状态比例'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            name:'类别',
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
                            data:this.taskRatioList
                        }
                    ]
                };
                myChart.setOption(option);
            },
            initChart2 () {
                const myChart = echarts.init(this.$refs.chart2)
                const option = {
                    title: {
                        text: '工作量'
                    },
                    tooltip: {},
                    legend: {
                        data:['工作量']
                    },
                    xAxis: {
                        data: this.info
                    },
                    yAxis: {},
                    series: [{
                        name: '工作量',
                        type: 'bar',
                        data: this.value
                    }]
                };

                myChart.setOption(option);
            },
            initChart1() {
                const myChart = echarts.init(this.$refs.chart1)
                var heatmapData = [];
                var lunarData = [];
                for (var i = 0; i < this.dateList.length; i++) {
                    heatmapData.push([
                        this.dateList[i][0],
                        this.dateList[i][3] * 1,
                    ]);
                    lunarData.push([
                        this.dateList[i][0],
                        1,
                        this.dateList[i][1],
                        this.dateList[i][2]
                    ]);
                }
                const option = {
                    title: {
                        text: '本月计划'
                    },
                    tooltip: {
                        formatter: function (params) {
                            return '工作量: ' + params.value[1];
                        }
                    },

                    visualMap: {
                        show: false,
                        min: 0,
                        max: 300,
                        calculable: true,
                        seriesIndex: [2],
                        orient: 'horizontal',
                        left: 'center',
                        bottom: 20,
                        inRange: {
                            color: ['#ffffff', '#ff0000'],
                            opacity: 0.3
                        },
                        controller: {
                            inRange: {
                                opacity: 0.5
                            }
                        }
                    },

                    calendar: [{
                        left: 'center',
                        top: 'middle',
                        cellSize: [70, 70],
                        yearLabel: {show: false},
                        orient: 'vertical',
                        dayLabel: {
                            firstDay: 1,
                            nameMap: 'cn'
                        },
                        monthLabel: {
                            show: false
                        },
                        range: '2019-05'
                    }],

                    series: [{
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    var d = echarts.number.parseDate(params.value[0]);
                                    return d.getDate() + '\n\n' + params.value[2] + '\n\n';
                                },
                                textStyle: {
                                    color: '#000'
                                }
                            }
                        },
                        data: lunarData
                    }, {
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 1,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return '\n\n\n' + (params.value[3] || '');
                                },
                                textStyle: {
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: '#a00'
                                }
                            }
                        },
                        data: lunarData
                    }, {
                        name: '降雨量',
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: heatmapData
                    }]
                };

                myChart.setOption(option);
            },
            getData: function () {
                axios.get("http://localhost:8888/group/count").then(res => {
                    var data = res.data;
                    console.log(data)
                    this.tableData = data
                    this.info = data.map(x => x.name);
                    this.value = data.map(x => x.count);
                    this.initChart2();
                })
                var date = new Date()
                axios.get("http://localhost:8888/task/date/" + date.getFullYear() +"/" + (date.getMonth()+1)).then(res => {
                    this.dateList = res.data
                    var count = [
                        {value:0, name:'未分配'},
                        {value:0, name:'开发中'},
                        {value:0, name:'测试中'},
                        {value:0, name:'未通过测试'},
                        {value:0, name:'完成任务'},
                        {value:0, name:'超时任务'}]
                    for (let i = 0; i < this.dateList.length; i++) {
                        var staff = this.dateList[i];
                        console.log("loop",staff)
                        count[staff[4]-1].value += parseInt(staff[3]);
                    }
                    this.taskRatioList = count
                    console.log(count)
                    this.initChart1();
                    this.initChart3();

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
        },
        mounted () {
            this.getData();
        }
    };
</script>
