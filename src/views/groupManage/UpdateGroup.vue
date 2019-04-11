<template>
    <dev-article>
        <Card shadow :padding="0">
            <Row>
                <i-col span="24">
                    <Row style="padding: 16px" :gutter="64" >
                        <Form label-position="top">
                            <i-col span="6">
                                <FormItem label="组名"><Input v-model="group.name"/> </FormItem>
                                <FormItem label="组长">
                                    <Select v-model="group.leaderId" transfer>
                                        <Option v-for="user in group.staffs" :value="user.id">
                                            {{user.name}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="小组信息"><Input v-model="group.info" type="textarea" :rows="6"/> </FormItem>
                                <Button type="primary" @click="handleSubmit" size="large">更新信息</Button>
                            </i-col>
                            <i-col span="18">
                                <Row>
                                    <FormItem label="组内成员">
                                        <Table @on-selection-change="onSelect" border ref="selection" :columns="columns" :data="staff"></Table>
                                    </FormItem>
                                </Row>
                            </i-col>
                        </Form>
                    </Row>
                </i-col>
            </Row>
        </Card>
    </dev-article>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                group: {
                    name: '',
                    info: '',
                    leaderId:-1,
                    staffs:[],
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '真实姓名',
                        key: 'name'
                    },
                    {
                        title: '职位',
                        key: 'job',
                        render: (h, {row, index}) => {

                            let edit;

                            if (this.editIndex === index) {
                                edit = h('Select', {
                                        props:{
                                            value: row.job
                                        },
                                        on: {
                                            'on-change':(event) => {
                                                this.editJob = event;
                                            }
                                        },
                                    },
                                    [
                                        h('Option',{
                                            props: {
                                                value: 1
                                            }
                                        },'产品经理'),
                                        h('Option',{
                                            props: {
                                                value: 2
                                            }
                                        },'开发人员'),
                                        h('Option',{
                                            props: {
                                                value: 3
                                            }
                                        },'测试人员')
                                    ]
                                );

                            } else {
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
                            }

                            return h('div', [edit]);

                        },
                    },
                    {
                        title: '目前小组',
                        key: 'groupName'
                    }
                ],
                staff: [],
                group:{},
            }
        },
        methods:{
            getData(){

                let url = 'http://localhost:8888/group'
                axios.get(url+'/staff').then(res=>{
                    this.staff = res.data;
                })

                axios.get(url+'/'+this.$route.query.id).then(res=>{
                    this.group = res.data
                })

            },
            onSelect(selection) {
                this.group.staffs = selection
            },
            handleSubmit(){
                console.log(this.group)
                axios.post('http://localhost:8888/group',this.group).then(() => {
                    this.$Message.success("添加成功");
                }).catch(err =>{
                    this.$Message.error(err.message)
                })
            },
        },
        mounted(){

            this.getData();
        }
    }
</script>

<style scoped>

</style>