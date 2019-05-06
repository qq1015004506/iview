<template>
    <Layout>
        <Header class="header">
            <Row>
                <i-col span="4" offset="1">
                    <img src="../assets/logo.png" alt="logo" class="logo">
                </i-col>
                <i-col span="14">
                    <div style="height: 1px; width: 100%;"></div>
                </i-col>
                <i-col span="4">
                    <Row>
                        <i-col span="8">
                            <Dropdown>
                                <Avatar src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"></Avatar>
                                <DropdownMenu slot="list">
                                    <DropdownItem >
                                        <span @click="goHome">我的主页</span></DropdownItem>
                                    <DropdownItem  divided>
                                        <span @click="exit">退出登录</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </Header>
        <Layout>
            <Sider class="sider" width="240">
                <Menu class="sider-menu" theme="dark" active-name="option1">
                    <MenuItem name="app" to="/tester/app">
                        <Icon type="ios-home" />
                        <span>我的首页</span>
                    </MenuItem>
                    <MenuItem name="task" to="/tester/task">
                        <Icon type="md-clipboard" />
                        <span>查看任务</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Content class="content" :class="{ 'content-expand': isCollapsed }">
                <slot></slot>
            </Content>
        </Layout>

    </Layout>
</template>
<script>
    export default {
        props: {},
        data () {
            return {
                activeName: this.$route.path,
                count: 0,
                openTheme: false,
                isCollapsed: false
            };
        },
        methods:{
            goHome() {
                this.$router.push("/tester/app")
            },
            exit() {
                window.localStorage.removeItem("admin");
                window.localStorage.removeItem("coder");
                window.localStorage.removeItem("tester");
                window.localStorage.removeItem("login");
                this.$router.push("/login")
            }
        },
        created () {
            this.activeName = this.$route.path
        }
    };
</script>

<style>
    .header{
        width: 100%;
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .logo{
        height: 50px;
        margin-top: 5px;
    }
    .notification{
        text-align: center;
        height: 200px;
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
        display: none;
    }
    .sider{
        position: fixed;
        height: 100%;
        left: 0;
        overflow: auto;
        z-index: 1;
    }
    .sider-menu{
        margin-top: 60px;
    }
    .sider-hide .ivu-menu-item span{
        display: none;
    }
    .content{
        margin-left: 240px;
        margin-top: 60px;
        padding: 16px;
        transition: all .2s ease-in-out;
    }
    .content-expand{
        margin-left: 64px;
    }
</style>