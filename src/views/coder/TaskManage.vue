<template>
    <coder-article>
        <div style="padding: 32px 64px;">
            <Table :columns="columns" :data="data" :loading="loading" border size="small"></Table>
            <div style="text-align: center; margin: 16px 0">
                <Page :total="total"
                      :current.sync="current"
                      show-sizer
                      @on-change="getData"
                      @on-page-size-change="handleChangeSize"></Page>
            </div>
            <Modal v-model="openUpload" title="上传文件">
                <Form>
                    <FormItem label="提交信息">
                        <Input v-model="fileInfo.commit" type="textarea" :rows="row"/>
                    </FormItem>
                    <FormItem label="上传文件">
                        <br>
                        <Upload
                                ref="upload"
                                :data="fileInfo"
                                :before-upload="handleBeforeUpload"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                type="drag"
                                action="http://localhost:8888/file">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>Click or drag files here to upload</p>
                            </div>
                        </Upload>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </coder-article>
</template>


<script>
    import axios from 'axios'
    import expandRow from './TaskTableExpand';
    export default {
        name: "TaskManage",
        components: { expandRow },
        data() {
            return{
                row:4,
                fileInfo:{
                    staffId:0,
                    taskId:0,
                    commit:'',
                },
                openUpload:false,
                queryGroup:[],

                query:{
                    name:null,
                    group:null,
                    staffName:null,
                },
                data:[],
                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            console.log("123",params.row)
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
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
                                            this.fileInfo.taskId = params.row.id;
                                            this.fileInfo.staffId = params.row.staffId;
                                            this.fileInfo.commit = '';
                                            this.$refs.upload.clearFiles();
                                            this.openUpload = true;
                                        }
                                    }
                                }, '提交任务'),
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
                                            this.$router.push({
                                                path: '/coder/version',
                                                query:{
                                                    id:params.row.id,
                                                }
                                            })
                                        }
                                    }
                                }, '查看详情'),
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
                                                    id:params.row.id,
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
            handleError(error){
                this.$Message.success("上传失败:" + error)
                this.openUpload = false;
            },
            handleSuccess() {
                this.$Message.success("上传成功")
                this.openUpload = false;
                this.getData();
            },
            getData(){

                if(this.loading) return;
                this.loading = true;
                let path = 'http://localhost:8888/task/staff/'+window.localStorage.getItem("id");

                axios.get(path).then(res=>{
                    this.data = res.data;
                });
                console.log(this.data)
                this.loading = false;
            },
            handleChangeSize(val) {
                this.size = val;
                this.$nextTick(()=>{
                    this.getData();
                })
            },
            handleBeforeUpload() {
                if (this.fileInfo.commit.length === 0) {
                    this.$Notice.warning({title:"请输入提交信息"});
                    return false;
                }
                return true;
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
            this.getData();
        }
    }
</script>

<style scoped>

</style>