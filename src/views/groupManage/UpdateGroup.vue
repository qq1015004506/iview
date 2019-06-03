<template>
    <dev-article>
        <Card shadow :padding="0">
            <Row>
                <i-col span="24">
                    <Row style="padding: 16px" :gutter="64" >
                        <Form label-position="top">
                            <i-col span="6">
                                <FormItem label="组名"><Input v-model="updateGroup.name"/> </FormItem>
                                <FormItem label="组长">
                                    <Select v-model="updateGroup.leaderId" transfer>
                                        <Option v-for="user in updateGroup.staffs" :value="user.id">
                                            {{user.name}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="小组信息"><Input v-model="updateGroup.info" type="textarea" :rows="6"/> </FormItem>
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
                updateGroup: {
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
                                        },'管理人员'),
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
                                            text: '管理人员'
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
                groupStaff:[],
                group:{},
            }
        },
        methods:{
            getData(){

                let url = 'http://localhost:8888'
                let wait1 = false;
                let wait2 = false;
                axios.get(url+'/group/staff').then(res=>{
                    this.staff = res.data;
                    console.log("staff :" ,this.staff)
                    wait1 = true;
                    if(wait2) {
                        for (let i = 0; i < this.updateGroup.staffs.length; i++) {
                            for (let j = 0; j < this.staff.length; j++) {

                                console.log("staffs[i]:", this.updateGroup.staffs[i])
                                console.log("staff[j]:", this.staff[j])
                                if (this.updateGroup.staffs[i].id + '' === this.staff[j].id + '') {
                                    console.log("staff[j]:", this.staff[j])
                                    this.staff[j]._checked = true;
                                    break;
                                }
                            }
                        }
                    }
                })

                axios.get(url+'/group/'+this.$route.query.id).then(res=>{
                    this.updateGroup = res.data;
                    console.log("updateGroup :" , this.updateGroup)
                    wait2 = true
                    if(wait1) {
                        for (let i = 0; i < this.updateGroup.staffs.length; i++) {
                            for (let j = 0; j < this.staff.length; j++) {
                                console.log("staffs[i]:", this.updateGroup.staffs[i])
                                console.log("staff[j]:", this.staff[j])
                                if (this.updateGroup.staffs[i].id + '' === this.staff[j].id + '') {
                                    this.staff[j]._checked = true;
                                    break;
                                }
                            }
                        }
                    }
                })

            },
            onSelect(selection) {
                this.updateGroup.leaderId = -1
                this.updateGroup.staffs = selection
            },
            handleSubmit(){
                axios.put('http://localhost:8888/group',this.updateGroup).then(() => {
                    this.$Message.success("修改成功");
                    this.getData();
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