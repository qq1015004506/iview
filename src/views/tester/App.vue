<template>
    <tester-article>
        <Card shadow style="margin-top: 16px">
            <Row>
                <i-col span="18">
                    <div style="width: 100%;height: 400px;" ref="chart"></div>
                </i-col>
                <i-col span="6">
                    <Table :columns="tableColumns" :data="tableData"></Table>
                </i-col>
            </Row>
        </Card>
    </tester-article>
</template>
<script>
    import echarts from 'echarts'
    import CoderArticle from "../../components/coder-article";
    import axios from 'axios'
    export default {
        components: {CoderArticle},
        props: {},
        data () {
            return {

                tableColumns: [
                    {
                        type: 'index'
                    },
                    {
                        title: '任务名称',
                        key: 'name'
                    },
                    {
                        title: '工作量',
                        key: 'value'
                    }
                ],
                tableData: [],
                name:[],
                quantity:[],
            };
        },
        computed: {},
        methods: {

            initChart () {
                const myChart = echarts.init(this.$refs.chart)

                const option = {
                    title : {
                        text: '任务量',
                        subtext: '测试人员',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.name
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:this.tableData,
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
                myChart.setOption(option);
            },
            getData() {
                axios.get("http://localhost:8888/task/staff/"+window.localStorage.getItem("id"))
                    .then(res => {
                        var data = res.data
                        this.name = data.map(x => x.name)
                        this.tableData = data.map(x => {
                            return {
                                name:x.name,
                                value:x.quantity,
                            }
                        })

                        this.initChart();
                    }).catch(err => {
                    this.$Message.error(err.message)
                })

            },
        },
        mounted () {
            this.getData();
        }
    };
</script>

<style>
    .count{
        font-size: 30px;
    }
</style>