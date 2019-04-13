<template>
    <dev-article>
        <div style="padding: 32px 64px;">

            <Row>
                <Card style="height: 800px">
                    <i-col span="4">
                        <Badge status="success" text="已完成" />
                        <br />
                        <Badge status="error" text="过期" />
                        <br />
                        <Badge status="default" text="未分配" />
                        <br />
                        <Badge status="processing" text="正在进行" />
                        <br />
                        <Badge status="warning" text="即将过期" />
                    </i-col>
                    <i-col span="20">
                        <Tree :data="taskData" :render="renderContent"></Tree>
                    </i-col>
                </Card>
            </Row>

        </div>
    </dev-article>
</template>

<script>
    export default {
        name: "TaskManage",
        data() {
            return{
                value:"",
                taskData: [
                    {
                        title: 'parent 1',
                        expand: true,
                        finished: false,
                        desc:'/app',
                        children: [
                            {
                                title: 'child 1-1',
                                expand: true,
                                finished: true,
                                desc:'/app',
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        finished: true,
                                        desc:'/app',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        finished: true,
                                        desc:'/app',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: 'child 1-2',
                                expand: true,
                                finished: false,
                                desc:'/app',
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        finished: false,
                                        desc:'/app',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        finished: true,
                                        desc:'/app',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        },
        methods:{
            handleRender (node) {

                console.log(node)
                this.$Modal.confirm({
                    render: (h) => {
                        return h('div', [
                            h('span','请问要对'+node.node.title+'节点进行何种操作'),
                            h('br'),
                            h('span',
                                [
                                    h('Button', {
                                        on:{
                                            'click':()=>{
                                                this.$Message.success(node.node.title+':' + '添加子节点')
                                            }
                                        },
                                        style: {
                                            size:'small',
                                            display: 'inline-block',
                                        },
                                    },'添加子节点'),
                                    h('Button', {
                                        on: {
                                            'click': () => {
                                                this.$Message.success(node.node.title+':' + '修改节点信息')
                                            }
                                        },
                                        style: {
                                            size: 'small',
                                            display: 'inline-block',
                                        }
                                    },'修改节点信息'),
                                    h('Button',{
                                        on: {
                                            'click': () => {
                                                this.$Message.success(node.node.title+':' + '删除节点')
                                            }
                                        },
                                        style: {
                                            size: 'small',
                                            display: 'inline-block',
                                        }
                                    },'删除节点'),
                                    h('Button',{
                                        on: {
                                            'click': () => {
                                                this.$Message.success(node.node.title+':' + '查看详情')
                                            }
                                        },
                                        style: {
                                            size: 'small',
                                            display: 'inline-block',
                                        }
                                    },'查看详情')])
                        ])
                    }
                })
            },
            renderContent (h, { root, node, data }) {
                let type = 'error';
                if(data.finished)
                    type = 'success';
                console.log(data.desc)
                return h('Button', {
                    props: {
                        type:type,
                        size:'small',
                    },
                    on:{
                        'click':()=>{
                            this.handleRender(node);
                        }
                    },
                    style: {
                        size:'small',
                        display: 'inline-block',
                    },
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    })
                ]);
            },
        },
    }
</script>

<style scoped>

</style>