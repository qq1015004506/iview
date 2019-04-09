<template>
    <dev-article>
        <Row :gutter="16">
            <i-col span="8">
                <Card style="height: 800px">
                    <Table :row-class-name="rowClassName"
                           :columns="columns"
                           @on-row-click="onRowClick"
                           :data="data" :loading="loading" border size="small"></Table>
                </Card>
            </i-col>
            <i-col span="8">
                <Card style="height: 800px">
                <Tree :data="data1" show-checkbox @on-select-change="hello" ></Tree>
                </Card>
            </i-col>
            <i-col span="8">
                <Card style="height: 800px"></Card>
            </i-col>
        </Row>
    </dev-article>
</template>

<script>
    export default {
        name: "AddTask",
        data () {
            return {
                data1: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-2'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                form:{
                    name:"",
                    path:"",
                    desc:""
                },
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                    },
                    {
                        title: '年龄',
                        key: 'age',
                    },
                ],
                data:[
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods:{
            hello (e){
                this.form.path = e[0].title
            },

        }
    }
</script>

<style>
    .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>