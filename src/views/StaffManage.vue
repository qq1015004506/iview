<template>
    <dev-article>
        <div style="padding: 32px 64px;">
            <Form inline :label-width="80">
                <FormItem label="员工名称：">
                    <Input v-model="query.name" placeholder="请输入" style="width: 200px;" />
                </FormItem>
                <FormItem label="员工职位：">
                    <Select v-model="query.job" placeholder="请选择" style="width: 200px;">
                        <Option :value="1">管理人员</Option>
                        <Option :value="2">开发人员</Option>
                        <Option :value="3">测试人员</Option>
                    </Select>
                </FormItem>
                <Button type="primary" @click="queryData" style="margin-right: 8px">查询</Button>
                <Button @click="handleQueryReset">重置</Button>
            </Form>
            <Button type="primary" icon="md-add" @click="openCreate = true">新建</Button>
            <Table :columns="columns" :data="data" :loading="loading" border size="small"></Table>
            <div style="text-align: center; margin: 16px 0">
                <Page :total="total"
                      :current.sync="current"
                      show-sizer
                      @on-change="getData"
                      @on-page-size-change="handleChangeSize"></Page>
            </div>
            <Modal v-model="openCreate" title="添加成员">
                <Form ref="create" :model="create" :rules="ruleValidate" :label-width="80">
                    <FormItem label="用户名:" prop="username">
                        <Input v-model="create.username" clearable placeholder="请输入用户名" />
                    </FormItem>
                    <FormItem label="密码:" prop="password">
                        <Input  v-model="create.password" clearable placeholder="请输入密码" />
                    </FormItem>
                    <FormItem label="真实姓名:" prop="name">
                        <Input v-model="create.name" clearable placeholder="请输入真实姓名" />
                    </FormItem>
                    <FormItem label="E-mail:" prop="email">
                        <Input  v-model="create.email" clearable placeholder="请输入 e-mail" />
                    </FormItem>
                    <FormItem label="联系方式:" prop="phone">
                        <Input  v-model="create.phone" clearable placeholder="请输入电话号码" />
                    </FormItem>
                    <FormItem label="职务" prop="job">
                        <Select v-model="create.job" placeholder="选择职务" >
                            <Option value=1>管理人员</Option>
                            <Option value=2>开发人员</Option>
                            <Option value=3>测试人员</Option>
                        </Select>
                    </FormItem>

                </Form>

                <Button slot="footer" type="primary" @click="handleSubmit('create')">Submit</Button>
                <Button slot="footer" @click="handleReset('create')" style="margin-left: 8px">Reset</Button>
            </Modal>
        </div>
    </dev-article>
</template>


<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                query:{
                    name: '',
                    job:'',
                },
                openCreate: false,
                create: {
                    username: '',
                    password: '',
                    name: '',
                    email: '',
                    job: -1,
                    phone: ''
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '长度不能超过 20', trigger: 'blur' },
                        { type: 'string', min: 6, message: '长度不能小于 6', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '长度不能超过 20', trigger: 'blur' },
                        { type: 'string', min: 6, message: '长度不能小于 6', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '长度不能超过 20', trigger: 'blur' },
                    ],
                    email: [
                        { type: 'email', message: '错误的邮箱格式', trigger: 'blur' },
                        { type: 'string', max: 20, message: '长度不能超过 20', trigger: 'blur' },
                    ],
                    job: [
                        { required: true, message: '请选择一个职务', trigger: 'change' }
                    ],
                    phone: [
                        {type: 'string', required: true, len: 11, message: '请输入正确的手机号', trigger: 'blur' },
                    ],
                },
                isCreate: false,
                editIndex: -1,
                editName:"",
                editEmail:"",
                editPhone:"",
                editJob:-1,
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        indexMethod: (row) => {
                            return (row._index + 1) + (this.size * this.current) - this.size;
                        }
                    },
                    {
                        title: '真实姓名',
                        key: 'name',
                        render: (h, {row, index}) => {
                            let edit;

                            if (this.editIndex === index) {
                                edit = [h('Input', {
                                    props: {
                                        value: row.name
                                    },
                                    on: {
                                        input: (val) => {
                                            this.editName = val;
                                        }
                                    }
                                })]
                            } else {
                                edit = row.name;
                            }

                            return h('div', [edit]);
                        }
                    },
                    {
                        title: 'email',
                        key: 'email',
                        render: (h, {row, index}) => {
                            let edit;

                            if (this.editIndex === index) {
                                edit = [h('Input', {
                                    props: {
                                        value: row.email
                                    },
                                    on: {
                                        input: (val) => {
                                            this.editEmail = val;
                                        }
                                    }
                                })]
                            } else {
                                edit = row.email;
                            }

                            return h('div', [edit]);
                        }
                    },
                    {
                        title: '电话号码',
                        key: 'phone',
                        render: (h, {row, index}) => {
                            let edit;

                            if (this.editIndex === index) {
                                edit = [h('Input', {
                                    props: {
                                        value: row.phone
                                    },
                                    on: {
                                        input: (val) => {
                                            this.editPhone = val;
                                        }
                                    }
                                })]
                            } else {
                                edit = row.phone;
                            }

                            return h('div', [edit]);
                        }
                    },
                    {
                        title: '职务',
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

                        }
                    },
                    {
                        title: '操作',
                        render: (h, {row, index}) => {
                            if (this.editIndex === index) {
                                return [
                                    h('Button', {
                                        props: {
                                            type: 'success'
                                        },
                                        on: {
                                            click: () => {
                                                this.data[index].name = this.editName;
                                                this.data[index].email = this.editEmail;
                                                this.data[index].phone = this.editPhone;
                                                this.data[index].job = this.editJob;

                                                let staff = this.data[index];

                                                axios.put("http://localhost:8888/staff",staff).then((res) => {
                                                    console.log(res);
                                                    this.$Message.success("更新成功");
                                                }).catch((error) => {
                                                    this.$Message.error(error.message);
                                                })

                                                this.editIndex = -1;
                                            }
                                        }
                                    }, '保存'),

                                    h('Button', {
                                        props: {
                                            type: 'error'
                                        },
                                        style: {
                                            marginLeft: '6px'
                                        },
                                        on: {
                                            click: () => {
                                                this.editIndex = -1;
                                            }
                                        }
                                    }, '取消')
                                ]
                            } else {
                                return h('div',[
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
                                            this.editName = row.name;
                                            this.editEmail = row.email;
                                            this.editPhone = row.phone;
                                            this.editJob = row.job;
                                            this.editIndex = index;
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
                                            axios.delete('http://localhost:8888/staff/'+row.id).then(() => {
                                                this.$Message.success('删除成功');
                                                this.getData();
                                            }).catch( err=>{
                                                this.$Message.error(err.message);
                                            })
                                        }
                                    }
                                }, '删除'),

                                ])
                            }
                        }
                    }
                ],
                data: [],
                loading: false,
                current: 1,
                size:10,
                total:0,
            }
        },
        methods:{
            getData () {
                if(this.loading) return;
                this.loading = true;
                let url = 'http://localhost:8888/staff/query?current='+this.current+'&size=' + this.size;
                if(this.query.job)
                    url += '&job='+this.query.job;
                if(this.query.name)
                    url += '&name='+this.query.name;
                axios.get(url).then(res =>{
                    this.data = res.data.data;
                    this.total = res.data.total;
                }).catch(err => {
                    this.$Message.error(err.message);
                });
                this.loading = false;
            },
            handleChangeSize (val) {
                this.size = val
                this.$nextTick(()=>{
                    this.getData();
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post("http://localhost:8888/staff",this.create).then(res => {
                            if(res.data == 0) {
                                this.$Message.error('用户已存在');
                            }else {
                                this.data = [this.create].concat(this.data);
                                this.$Message.success('添加成功!');
                                this.openCreate = false;
                            }
                        }).catch(err => {
                            this.$Message.error('添加失败!'+err.message);
                        })
                    } else {
                        this.$Message.error('请完善信息后再次提交!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            queryData() {
                if (this.loading) return;
                this.loading = true;
                let url = 'http://localhost:8888/staff/query?current='+this.current+'&size=' + this.size;
                if(this.query.job)
                    url += '&job='+this.query.job;
                if(this.query.name)
                    url += '&name='+this.query.name;
                axios.get(url).then((res) => {
                    this.data = res.data.data;
                    this.total = res.data.total;
                }).catch((err) => {
                    this.$Message.error(err.message);
                })
                this.loading = false;
            },
            handleQueryReset() {
                this.query.name = '';
                this.query.job = '';
                this.getData();
            }

        },
        mounted () {
            this.getData();
        }
    }
</script>

<style scoped>

</style>