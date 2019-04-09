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
                                        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
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
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
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
    }
</script>

<style scoped>

</style>