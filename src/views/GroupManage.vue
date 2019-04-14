<template>
    <dev-article>
        <div style="padding: 32px 64px;">
            <Button to="/addGroup" type="primary" icon="md-add-circle">
                <span>添加</span>
            </Button>
            <Table border :columns="columns" :data="data"></Table>
            <div style="text-align: center; margin: 16px 0">
                <Page :total="total"
                      :current.sync="current"
                      show-sizer
                      @on-change="getData"
                      @on-page-size-change="handleChangeSize"></Page>
            </div>
        </div>

    </dev-article>
</template>
<script>
    import expandRow from './table-expand.vue';
    import axios from 'axios'
    export default {
        components: { expandRow },
        data () {
            return {
                total:0,
                current:1,
                size:10,
                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
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
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            console.log(params.row)
                            return h('div', [
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
                                                path: '/groupDetail',
                                                query:{
                                                    id:params.row.id
                                                }
                                            })
                                        }
                                    }
                                }, '详情'),
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
                                            this.$router.push({
                                                path: '/updateGroup',
                                                query:{
                                                    id:params.row.id
                                                }
                                            })
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            axios.delete('http://localhost:8888/group/'+params.row.id).then(() => {
                                                this.$Message.success('删除成功');
                                                this.getData();
                                            }).catch( err=>{
                                                this.$Message.error(err.message);
                                            })
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods:{
            getData() {
                axios.get("http://localhost:8888/group").then(res => {
                    this.data = res.data;
                }).catch(err => {
                    this.$Message.error(err.message)
                })
            },
            handleChangeSize(val){
                this.size = val
                this.$nextTick(()=>{
                    this.getData();
                })
            },

        },
        mounted(){
            this.getData();
        }
    }
</script>