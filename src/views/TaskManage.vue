<template>
    <dev-article>
        <div style="padding: 32px 64px;">

            <Row>
                <Card style="height: 800px">
                    <i-col span="4">
                        <Badge status="default" text="未分配" />
                        <br />
                        <Badge status="processing" text="正在进行" />
                        <br />
                        <Badge status="warning" text="即将过期" />
                        <br />
                        <Badge status="error" text="过期" />
                        <br />
                        <Badge status="success" text="已完成" />
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
    import axios from 'axios'
    export default {
        name: "TaskManage",
        data() {
            return{
                value:"",
                taskData: [],
            }
        },
        methods:{
            handleRender (node) {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('div', [
                            h('span','请问要对'+node.node.name+'节点进行何种操作'),
                            h('br'),
                            h('span',
                                [
                                    h('Button', {
                                        on:{
                                            'click':()=>{
                                                console.log(node)
                                                this.$Message.success(node.node.name+':' + '添加子节点');
                                                this.$router.push({
                                                    path: '/addTask',
                                                    query:{
                                                        id:node.node.id,
                                                        filePath:node.node.filePath
                                                    }
                                                })
                                                this.$Modal.remove()
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
                                                this.$Message.success(node.node.name+':' + '修改节点信息')
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
                                                this.$Message.success(node.node.name+':' + '删除节点')
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
                                                this.$Message.success(node.node.name+':' + '查看详情')
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
                let type = 'processing';
                switch(data.stage){
                    case 0:
                        type = 'default'; break;
                    case 1:
                        type = 'primary'; break;
                    case 2:
                        type = 'warning'; break;
                    case 3:
                        type = 'error'; break;
                    case 4:
                        type = 'success'; break;
                    default:
                        type = 'error'; break;
                }
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
                        h('span', data.name)
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
            getData(){
                axios.get('http://localhost:8888/task').then(res=>{
                    this.taskData = [res.data]
                }).catch(err =>{
                    this.$Message.error(err.message)
                })
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>

</style>