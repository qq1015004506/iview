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
                                <Table highlight-row @on-current-change="rowChange" :columns="tableColumns" :data="tableData"></Table>
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
                        key: 'name',
                        align:'center'
                    },
                ],
                tableData: [],
                staffTaskInfo:[],
                groupTaskInfo:{
                    staffNames:[],
                    groupTaskInfo:[]
                }
            }
        },
        methods: {
            rowChange(currentRow){
                this.staffTaskInfo = []
                var t = currentRow.tasks
                for (let i = 0; i < t.length; i++) {
                    this.staffTaskInfo.push({
                        name:t[i].name,
                        value:t[i].quantity
                    })
                }

                this.initChart();
            },
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
                        data:this.groupTaskInfo.staffNames
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
                            data:this.groupTaskInfo.groupTaskInfo
                        }
                    ]
                };
                let option2 = {
                    title : {
                        text: '个人任务占比情况',
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
                            data:this.staffTaskInfo,
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

                myChart1.setOption(option1,true);
                myChart2.setOption(option2,true);
            },
            getData() {
                let path = 'http://localhost:8888/group/'+this.$route.query.id+'/staffTask'
                axios.get(path).then(res=>{
                    this.tableData = res.data
                    console.log(this.tableData)
                    if(res.data.length === 0)
                        return;
                    this.staffTaskInfo = []
                    this.tableData[0]._highlight = true
                    var t = this.tableData[0].tasks
                    for (let i = 0; i < t.length; i++) {
                        this.staffTaskInfo.push({
                            name:t[i].name,
                            value:t[i].quantity
                        })
                    }

                    this.groupTaskInfo.groupTaskInfo = []
                    this.groupTaskInfo.staffNames = []
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.groupTaskInfo.staffNames.push(this.tableData[i].name)
                        let val = 0;
                        for (let j = 0; j < this.tableData[i].tasks.length; j++) {
                            val += this.tableData[i].tasks[j].quantity
                        }
                        this.groupTaskInfo.groupTaskInfo.push({
                            name:this.tableData[i].name,
                            value:val,
                        })
                    }

                    this.initChart();
                }).catch(err=>{
                    this.$Message.error(err.message())
                })

            },

        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
