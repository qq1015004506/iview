<template>
    <dev-article>
        <Card shadow :padding="0">
            <Row>
                <i-col span="24">
                    <Row style="padding: 16px" :gutter="64" >
                        <Form label-position="top">
                            <i-col span="6">
                                <FormItem label="组名"><Input v-model="form.username"/> </FormItem>
                                <FormItem label="组长">
                                    <Select v-model="form.position" transfer>
                                        <Option v-for="user in data1" value="user.name">
                                            {{user.name}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="小组信息"><Input v-model="form.desc" type="textarea" :rows="6"/> </FormItem>
                            </i-col>
                            <i-col span="18">
                                <Row>
                                    <FormItem label="组内成员">
                                        <Table @on-select="onSelect" border ref="selection" :columns="columns" :data="data"></Table>
                                    </FormItem>
                                </Row>
                                <Row>
                                    <i-col span="18"></i-col>
                                    <i-col span="6">
                                        <Button type="primary" size="large">更新信息</Button>
                                    </i-col>
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
                form: {
                    username:'',
                    password:'',
                    mail: '',
                    name: '',
                    desc: '',
                    position: '产品经理',
                    zone: '+86',
                    phone: '10000000000'
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
                        key: 'job'
                    },
                    {
                        title: '目前小组',
                        key: 'groupName'
                    }
                ],
                data: [],
                data1:[],
            }
        },
        methods:{
            getData(){
              let url = 'http://localhost:8888/group/staff'
              axios.get(url).then(res=>{
                  this.data = res.data;
              })
            },
            onSelect(selection,row) {
                this.data1 = selection
                console.log(selection,row,this.data1);

            }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>

</style>