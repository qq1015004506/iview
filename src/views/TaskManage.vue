<template>
    <dev-article>
        <div style="padding: 32px 64px;">
            <Form inline :label-width="80">
                <FormItem label="任务名称：">
                    <Input clearable  v-model="query.name" placeholder="请输入" style="width: 200px;" />
                </FormItem>
                <FormItem label="员工名称：">
                    <Input clearable v-model="query.staffName" placeholder="请输入" style="width: 200px;" />
                </FormItem>
                <FormItem label="任务分组：">
                    <Select clearable v-model="query.group" placeholder="请选择" style="width: 200px;">
                        <Option v-for="group in queryGroup" :value="group.id">{{group.name}}</Option>
                    </Select>
                </FormItem>
                <Button type="primary" @click="queryData" style="margin-right: 8px">查询</Button>
                <Button @click="handleQueryReset">重置</Button>
            </Form>

            <Button type="primary" icon="md-add" to="/addDevTask">新建开发任务</Button>


            <Table :columns="columns" :data="data" :loading="loading" border size="small"></Table>
            <div style="text-align: center; margin: 16px 0">
                <Page :total="total"
                      :current.sync="current"
                      show-sizer
                      @on-change="getData"
                      @on-page-size-change="handleChangeSize"></Page>
            </div>

        </div>
    </dev-article>
</template>


<script>
    import axios from 'axios'
    export default {
        name: "TaskManage",
        data() {
            return{
                queryGroup:[],
                query:{
                    name:null,
                    group:null,
                    staffName:null,
                },
                data:[],
                columns: [
                    {
                        title: '任务名称',
                        key: 'name'
                    },
                    {
                        title: '任务信息',
                        key: 'description'
                    },
                    {
                        title: '员工名称',
                        key: 'staffName'
                    },
                    {
                        title: '小组名称',
                        key: 'groupName'
                    },
                    {
                        title: '开始时间',
                        key: 'startTime',
                        render: (h, {row, index}) => {
                            return h('Time',{
                                props:{
                                    time: (new Date(row.startTime)).getTime(),
                                    type:'date'
                                }
                            })
                        }
                    },
                    {
                        title: '结束时间',
                        key: 'endTime',
                        render: (h, {row, index}) => {
                            return h('Time',{
                                props:{
                                    time: (new Date(row.endTime)).getTime(),
                                    type:'date'
                                }
                            })
                        }
                    },
                    {
                        title: '状态',
                        key: 'stage',
                        render: (h, {row, index}) => {

                            let edit;

                            if (row.stage === 1 || row.stage === "1") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'default',
                                        text: '未分配'
                                    }
                                })
                            } else if (row.stage === 2 || row.stage === "2") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'processing',
                                        text: '开发中'
                                    }
                                })
                            } else if (row.stage === 3 || row.stage === "3") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'warning',
                                        text: '测试中'
                                    }
                                })
                            }else if (row.stage === 4 || row.stage === "4") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'error',
                                        text: '未通过测试'
                                    }
                                })
                            }else if (row.stage === 5 || row.stage === "5") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'success',
                                        text: '任务完成'
                                    }
                                })
                            }else if (row.stage === 6 || row.stage === "6") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'error',
                                        text: '任务超时'
                                    }
                                })
                            }

                            return h('div', [edit]);

                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            let sub = [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            if(params.row.isTest) {
                                                var t = this.data.filter(x=> x.id === params.row.codeId)[0];

                                                this.$router.push({
                                                    path: '/updateTestTask',
                                                    query:{
                                                        id:params.row.id,
                                                        start:(new Date(t.startTime)).getTime(),
                                                        end:(new Date(t.endTime)).getTime(),
                                                    }
                                                })
                                            }
                                            else {
                                                this.$router.push({
                                                    path: '/updateTask',
                                                    query: {
                                                        id: params.row.id,
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let path ='';
                                            if(params.row.isTest)
                                                path = 'http://localhost:8888/task/test/'+params.row.id+'/'+params.row.codeId;
                                            else
                                                path = 'http://localhost:8888/task/'+params.row.id;
                                            axios.delete(path).then(() => {
                                                this.$Message.success('删除成功');
                                                this.getData();
                                            }).catch( err=>{
                                                this.$Message.error(err.message);
                                            })
                                        }
                                    }
                                }, '删除')
                            ];

                            if(params.row.stage === 1 ||params.row.stage === "1" )
                                sub.push(
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    path: '/addTestTask',
                                                    query:{
                                                        id:params.row.id,
                                                        start:(new Date(params.row.startTime)).getTime(),
                                                        end:(new Date(params.row.endTime)).getTime(),
                                                    }
                                                })
                                            }
                                        }
                                    }, '分配')
                                )
                            console.log(params.row)
                            return h('div', sub);
                        }
                    }
                ],

                loading: false,
                current: 1,
                size:10,
                total:0,
        }
        },
        methods:{

            getData(){

                if(this.loading) return;
                this.loading = true;
                let path = 'http://localhost:8888/task/query?current='+this.current+'&size='+this.size;
                if(this.query.name)
                    path += '&name=' + this.query.name;
                if(this.query.staffName)
                    path += '&staffName=' + this.query.staffName;
                if(this.query.group)
                    path += '&group=' + this.query.group;
                axios.get(path).then(res=>{
                    this.data = res.data.data;
                    this.total = res.data.total;
                });
                this.loading = false;
            },
            handleChangeSize(val) {
                this.size = val;
                this.$nextTick(()=>{
                    this.getData();
                })
            },
            queryData(){
                this.getData()
            },
            handleQueryReset(){
                this.query.group = null;
                this.query.name = null;
                this.query.staffName = null;
                this.getData();
            }
        },
        mounted(){

            axios.get('http://localhost:8888/group').then(res=>{
                this.queryGroup = res.data;
            }).catch(err=>{
                this.$Message.error(err.message())
            });

            this.getData();
        }
    }
</script>

<style scoped>

</style>