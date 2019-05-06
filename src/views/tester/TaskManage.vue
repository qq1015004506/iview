<template>
    <tester-article>
        <div style="padding: 32px 64px;">
            <Table :columns="columns" :data="data" :loading="loading" border size="small"></Table>
            <div style="text-align: center; margin: 16px 0">
                <Page :total="total"
                      :current.sync="current"
                      show-sizer
                      @on-change="getData"
                      @on-page-size-change="handleChangeSize"></Page>
            </div>
        </div>
        <Modal v-model="openCreate" title="添加评论">
            <Input v-model="task.evaluation" type="textarea" :rows=5 placeholder="Enter something..." />
            <Button slot="footer" type="primary" @click="passhandleSubmit">通过</Button>
            <Button slot="footer" type="error" @click="errorhandleSubmit" style="margin-left: 8px">存在BUG</Button>
        </Modal>
    </tester-article>
</template>


<script>
    import axios from 'axios'
    export default {
        name: "TaskManage",
        data() {
            return{
                openCreate: false,
                task:{
                    id:0,
                    codeId:0,
                    stage:0,
                    evaluation:'',
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
                        title: '开始时间',
                        key: 'startTime',
                        render: (h, {row, index}) => {
                            return h('Time',{
                                props:{
                                    time: (new Date(row.startTime)).getTime() - 86400 * 3 * 1000,
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
                                    time: (new Date(row.endTime)).getTime() - 86400 * 3 * 1000,
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
                            }
                            return h('div', [edit]);
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            console.log(params)
                            return h('div', [
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
                                            window.open("http://localhost:8888/file/"+params.row.codeId, '_blank');
                                        }
                                    }
                                }, '下载文件'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row)
                                            this.openCreate = true;
                                            this.task.codeId = params.row.codeId;
                                            this.task.id = params.row.id;
                                        }
                                    }
                                }, '进行评测'),
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
                                            this.$router.push({
                                                path: '/coder/diff',
                                                query:{
                                                    id:params.row.codeId,
                                                }
                                            })
                                        }
                                    }
                                }, '查看不同'),
                            ]);
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
                let path = 'http://localhost:8888/task/staff/'+10;

                axios.get(path).then(res=>{
                    this.data = res.data;
                });
                console.log(this.data)
                this.loading = false;
            },
            passhandleSubmit() {
                this.$Modal.confirm({
                    title: 'confirm',
                    content: '确定通过测试吗?',
                    onOk: () => {
                        this.task.stage = 5;
                        axios.put("http://localhost:8888/task/eval",this.task).then(()=>{
                            this.$Message.success("测试完成");
                            this.openCreate = false;
                        }).catch(err=>{
                            this.$Message.error(err.message);
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            errorhandleSubmit() {
                this.$Modal.confirm({
                    title: 'confirm',
                    content: '确定存在BUG吗?',
                    onOk: () => {
                        this.task.stage = 4
                        axios.put("http://localhost:8888/task/eval",this.task).then(()=>{
                            this.$Message.success("测试完成");
                            this.openCreate = false;
                        }).catch(err=>{
                            this.$Message.error(err.message);
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
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
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>

</style>