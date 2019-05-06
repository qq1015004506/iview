<template>
    <dev-article>

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

    </dev-article>
</template>
<script>
    import echarts from 'echarts'
    import axios from 'axios'
    export default {
        props: {},
        data () {
            return {
                shortcuts: [
                    {
                        title: '操作一',
                        action: '/app'
                    },
                    {
                        title: '操作二',
                        action: '/push'
                    }
                ],
                newShortcut: {
                    status: false,
                    title: '',
                    action: ''
                },
                dateType: 'day',  // day, week, month, year
                countDate: [new Date(), new Date()],
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
            handleAddNewShortcut () {
                this.shortcuts.push({
                    title: this.newShortcut.title,
                    action: this.newShortcut.action
                });
            },
            handleSetDate (type) {
                const today = (new Date()).getTime();
                let date;

                switch (type) {
                    case 'day': date = today;break;
                    case 'week': date = today - 86400000 * 7;break;
                    case 'month': date = today - 86400000 * 30;break;
                    case 'year': date = today - 86400000 * 365;break;
                }

                this.countDate = [(new Date(date)), (new Date(today))];
            },
            initChart () {
                const myChart = echarts.init(this.$refs.chart)

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
            getData: function () {
                axios.get("http://localhost:8888/group/count").then(res => {
                    var data = res.data;
                    console.log(data)
                    this.tableData = data
                    this.info = data.map(x => x.name);
                    this.value = data.map(x => x.count)
                    this.initChart();
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
        height: 150px;
    }
</style>