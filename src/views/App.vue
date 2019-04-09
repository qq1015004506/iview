<template>
    <dev-article>
        <Row :gutter="16">
            <i-col span="6">
                <Card shadow title="访问量">
                    <Tag color="green" slot="extra">周</Tag>
                    <div class="count">123,000</div>
                    <Divider></Divider>
                    日访问量 1,230
                </Card>
            </i-col>
            <i-col span="6">
                <Card shadow title="总销售额">
                    <Tooltip content="这里是指标说明" slot="extra" placement="top" transfer>
                        <Icon type="ios-alert-outline" size="18" />
                    </Tooltip>
                    <div class="count">
                        ¥ 880,000
                    </div>
                    <Divider></Divider>
                    周同比 12% <Icon type="md-arrow-dropup" size="22" color="#ed4014" />
                    日环比 10% <Icon type="md-arrow-dropdown" size="22" color="#19be6b" />
                </Card>
            </i-col>
            <i-col span="6">
                <Card shadow title="运营活动效果">
                    <Tooltip content="这里是指标说明" slot="extra" placement="top" transfer>
                        <Icon type="ios-alert-outline" size="18" />
                    </Tooltip>
                    <div class="count">75%</div>
                    <Divider></Divider>
                    <Progress :percent="75" status="success" hide-info />
                </Card>
            </i-col>
            <i-col span="6">
                <Card shadow title="快捷操作">
                    <Row>
                        <i-col v-for="item in shortcuts" :key="item.title" span="6">
                            <Button :to="item.action">{{ item.title }}</Button>
                        </i-col>
                    </Row>
                    <Divider></Divider>
                    <Button type="primary" long icon="md-add" @click="newShortcut.status = true">添加</Button>
                </Card>
            </i-col>
        </Row>

        <Card shadow style="margin-top: 16px">
            <Tabs value="sell">
                <template slot="extra">
                    <RadioGroup v-model="dateType" @on-change="handleSetDate">
                        <Radio label="day">今日</Radio>
                        <Radio label="week">本周</Radio>
                        <Radio label="month">本月</Radio>
                        <Radio label="year">全年</Radio>
                    </RadioGroup>
                    <DatePicker type="daterange" v-model="countDate" style="width: 250px" transfer></DatePicker>
                </template>
                <TabPane label="销售额" name="sell">
                    <Row>
                        <i-col span="18">
                            <div style="width: 100%;height: 400px;" ref="chart"></div>
                        </i-col>
                        <i-col span="6">
                            <Table :columns="tableColumns" :data="tableData"></Table>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane label="访问量" name="visit"></TabPane>
            </Tabs>
        </Card>


        <Modal title="添加快捷操作" v-model="newShortcut.status" @on-ok="handleAddNewShortcut">
            <Input v-model="newShortcut.title" placeholder="快捷操作标题..." />
            <Input v-model="newShortcut.action" placeholder="快捷操作链接..." />
        </Modal>
    </dev-article>
</template>
<script>
    import echarts from 'echarts'
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '销售额',
                        key: 'sell'
                    }
                ],
                tableData: [
                    {
                        name: '门店 1',
                        sell: '123,000'
                    },
                    {
                        name: '门店 2',
                        sell: '123,000'
                    },
                    {
                        name: '门店 3',
                        sell: '123,000'
                    },
                    {
                        name: '门店 4',
                        sell: '123,000'
                    },
                    {
                        name: '门店 5',
                        sell: '123,000'
                    }
                ]
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
                        text: '销售额'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };

                myChart.setOption(option);
            }
        },
        mounted () {
            this.initChart();
        }
    };
</script>

<style>
    .count{
        font-size: 30px;
    }
</style>