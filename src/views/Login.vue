<template>
<div style="background-color: #337899;height: 800px" >
    <Row>
        <div style="width: 100%;height: 200px"></div>
    </Row>
    <Row>
        <i-col span="8">
            <div style="width: 100%;height: 1px"></div>
        </i-col>
        <i-col span="8">

            <Card>
                <p slot="title">
                    基于MVC的在线代码管理系统
                </p>
                <h1></h1>
                <Form ref="staff" :model="staff" :rules="ruleInline" >
                    <FormItem prop="username">
                        <Input type="text" v-model="staff.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="staff.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('staff')">Signin</Button>
                    </FormItem>
                </Form>
            </Card>
        </i-col>
        <i-col span="8">
            <div style="width: 100%;height: 1px"></div>
        </i-col>

    </Row>
</div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                staff: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { type: 'string', min: 6, message: '用户名长度不小于6', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不小于6', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post("http://localhost:8888/login",this.staff).then(res => {
                            console.log(res.data);
                            var job = res.data.job;
                            window.localStorage.setItem("login",res.data.job)
                            window.localStorage.setItem("id",res.data.id)
                            window.localStorage.setItem("name",res.data.name)

                            window.localStorage.removeItem("admin");
                            window.localStorage.removeItem("coder");
                            window.localStorage.removeItem("tester");
                            if(job === 1) {
                                window.localStorage.setItem("admin", res.data.job)
                                this.$router.push("/app")
                            }
                            if(job === 2) {
                                window.localStorage.setItem("coder",res.data.job)
                                this.$router.push("/coder/app")
                            }
                            if(job === 3) {
                                window.localStorage.setItem("tester",res.data.job)
                                this.$router.push("/tester/app")
                            }
                            if(!res.data.username) {
                                this.$Message.error("用户名或密码错误")
                            }
                        }).catch(err => {
                            this.$Message.error("登录失败!" + err.message);
                        })
                    } else {
                        this.$Message.error('请正确输入用户名或密码!');
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>