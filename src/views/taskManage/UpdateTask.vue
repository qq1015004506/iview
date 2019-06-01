<template>
    <dev-article>
        <Card shadow :padding="0">
            <Row style="padding: 16px" :gutter="64" >
                <Form>
                <i-col span="6">
                        <FormItem label="任务名称:">
                            <Input v-model="task.name" clearable placeholder="请输入任务名称" />
                        </FormItem>
                        <FormItem label="任务描述:">
                            <Input type="textarea" v-model="task.description" clearable placeholder="请输入任务描述" />
                        </FormItem>
                        <FormItem label="任务起止时间:">
                            <DatePicker v-model="time" type="daterange" split-panels transfer placement="bottom-end" placeholder="Select date" ></DatePicker>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit">Submit</Button>
                        </FormItem>

                </i-col>
                <i-col span="18">

                    <FormItem label="选择小组">
                        <Select @on-change="selectChange" v-model="group" style="width:200px">
                            <Option v-for="(group,index) in data" :value="index">
                                {{group.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="小组成员">
                        <br>
                        <Table highlight-row @on-current-change="selectStaff" ref="currentRowTable" border :columns="columns" :data="staffs"></Table>
                    </FormItem>
                </i-col>
                </Form>
            </Row>
        </Card>
    </dev-article>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                group:0,
                time:[],
                task: {
                    name: '',
                    description:'',
                    startTime:'',
                    endTime:'',
                    quantity:'',
                    filePath:'',
                    stage:0,
                    staffId:null,
                },
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '员工名称',
                        key: 'name'
                    },
                    {
                        title: '职务',
                        key: 'job',
                        render: (h, {row, index}) => {
                            let edit;
                            if (row.job === 1 || row.job === "1") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'processing',
                                        text: '产品经理'
                                    }
                                })
                            } else if (row.job === 2 || row.job === "2") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'success',
                                        text: '开发人员'
                                    }
                                })
                            } else if (row.job === 3 || row.job === "3") {
                                edit = h('Badge', {
                                    props: {
                                        status: 'warning',
                                        text: '测试人员'
                                    }
                                })
                            }


                            return h('div', [edit]);

                        }
                    },
                    {
                        title: '工作量',
                        key: 'count'
                    },
                ],
                data: [],
                staffs:[],
            }
        },
        methods:{
            selectChange(val){
                this.staffs = this.data[val].staffs.filter(s=>s.job === 2);
            },
            getData(){
                axios.get("http://localhost:8888/group").then(res=>{
                    console.log("data",res.data);
                    this.data = res.data
                    this.staffs = this.data[this.group].staffs.filter(s=>s.job === 2);
                })
                console.log(this.$route.query.id)
                axios.get("http://localhost:8888/task/"+this.$route.query.id).then(res=>{
                    this.task = res.data
                    this.time = [new Date(this.task.startTime),new Date(this.task.endTime)]
                    console.log(this.time)
                    console.log(this.task)
                })

            },
            handleSubmit(){
                this.task.startTime = this.time[0].valueOf();
                this.task.endTime = this.time[1].valueOf();
                this.task.quantity = (this.task.endTime - this.task.startTime)/86400000;
                console.log(this.task)
                axios.put('http://localhost:8888/task',this.task).then(() => {
                    this.$Message.success("更新成功");
                    this.$router.push({
                        path: '/taskManage',
                    })
                }).catch(err =>{
                    this.$Message.error(err.message)
                })
            },
            selectStaff(currentRow) {
                this.task.staffId = currentRow.id;
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>

</style>