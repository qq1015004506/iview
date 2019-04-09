<template>
    <dev-article>
        <Card shadow :padding="0">
            <Row style="padding: 16px" :gutter="64" >
                <i-col span="12">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="用户名:" prop="username">
                            <Input v-model="formValidate.username" clearable placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem label="密码:" prop="password">
                            <Input type="password" v-model="formValidate.password" clearable placeholder="请输入密码" />
                        </FormItem>
                        <FormItem label="真实姓名:" prop="name">
                            <Input v-model="formValidate.name" clearable placeholder="请输入真实姓名" />
                        </FormItem>
                        <FormItem label="E-mail:" prop="email">
                            <Input type="email" v-model="formValidate.email" clearable placeholder="请输入 e-mail" />
                        </FormItem>
                        <FormItem label="联系方式:" prop="phone">
                            <Input type="number" v-model="formValidate.phone" clearable placeholder="请输入电话号码" />
                        </FormItem>
                        <FormItem label="职务" prop="job">
                            <Select v-model="formValidate.job" placeholder="选择职务" >
                                <Option value="1">产品经理</Option>
                                <Option value="2">开发人员</Option>
                                <Option value="3">测试人员</Option>
                            </Select>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                        </FormItem>
                    </Form>
                </i-col>
            </Row>
        </Card>
    </dev-article>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {

            return {
                formValidate: {
                    username: '',
                    password: '',
                    name: '',
                    email: '',
                    job: '',
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
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post("http://localhost:8888/staff",this.formValidate).then((res) => {
                            this.$Message.success('添加成功!');
                        }).catch((err) => {
                            this.$Message.error('添加失败!');
                        })

                    } else {
                        this.$Message.error('请完善信息后再次提交!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>