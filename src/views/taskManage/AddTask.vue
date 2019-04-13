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
                    <FormItem label="分配小组">
                        <br>
                        <Table highlight-row @on-current-change="selectGroup" ref="currentRowTable" border :columns="columns" :data="data"></Table>
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
                time:[],
                task: {
                    name: '',
                    fatherId:-1,
                    description:'',
                    startTime:'',
                    endTime:'',
                    quantity:'',
                    filePath:'',
                    stage:0,
                    staffId:null,
                    groupId:null,
                },
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '小组名称',
                        key: 'name'
                    },
                    {
                        title: '小组信息',
                        key: 'info'
                    },
                    {
                        title: '工作量',
                        key: 'count'
                    },
                ],
                data: [],
            }
        },
        methods:{
            getData(){
                axios.get("http://localhost:8888/group/count").then(res=>{
                    this.data = res.data
                })
            },
            handleSubmit(){
                this.task.startTime = this.time[0].valueOf();
                this.task.endTime = this.time[1].valueOf();
                this.task.fatherId = this.$route.query.id;
                this.task.filePath = this.$route.query.filePath +'/'+this.task.name
                this.task.quantity = (this.task.endTime - this.task.startTime)/86400000;
                console.log(this.task)
                axios.post('http://localhost:8888/task',this.task).then(() => {
                    this.$Message.success("添加成功");
                    this.$router.push({
                        path: '/taskManage',
                    })
                }).catch(err =>{
                    this.$Message.error(err.message)
                })
            },
            selectGroup(currentRow) {
                this.task.groupId = currentRow.id;
                console.log(this.task)
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>

</style>