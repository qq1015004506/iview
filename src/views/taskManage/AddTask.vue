<template>
    <dev-article>
        <Card>
            <Row>
                <Form label-position="top">
                    <i-col span="10">
                        <FormItem label="任务名称"><Input v-model="form.name"/></FormItem>
                        <FormItem label="任务父节点"><Input v-model="form.path" readonly/></FormItem>
                        <FormItem label="任务描述"><Input type="textarea" v-model="form.desc"/></FormItem>
                        <Button type="primary" size="large">更新信息</Button>
                    </i-col>
                    <i-col span="10" offset="4">
                        <Tree :data="data1"  @on-select-change="hello" ></Tree>
                    </i-col>
                </Form>
            </Row>
        </Card>
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
                }
            }
        },
        methods:{
            hello (e){
                this.form.path = e[0].title
            },
        }
    }
</script>

<style scoped>

</style>