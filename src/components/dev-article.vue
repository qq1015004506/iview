<template>
    <Layout>
        <Header class="header">
            <Row>
                <i-col span="4" offset="1">
                    <img src="../assets/logo.png" alt="logo" class="logo">
                </i-col>
                <i-col span="14">
                    <Menu mode="horizontal" :active-name="activeName">
                        <MenuItem name="/app" to="/app">应用分析</MenuItem>
                        <MenuItem name="/push" to="/push">推送营销</MenuItem>
                        <MenuItem name="/dev" to="/dev">开发助手</MenuItem>
                        <MenuItem name="/manage" to="/manage">应用管理</MenuItem>
                    </Menu>
                </i-col>
                <i-col span="4">
                    <Row>
                        <i-col span="8">
                            <Dropdown>
                                <Avatar src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"></Avatar>
                                <DropdownMenu slot="list">
                                    <DropdownItem>我的主页</DropdownItem>
                                    <DropdownItem>我的收藏</DropdownItem>
                                    <DropdownItem>
                                        设置
                                        <Badge status="error" />
                                    </DropdownItem>
                                    <DropdownItem divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                        <i-col span="8">
                            <Dropdown>
                                <Badge :count="count" :offset="[20,4]">
                                    <Icon type="md-notifications-outline" size="24" />
                                </Badge>
                                <DropdownMenu slot="list">
                                    <Tabs value="notification">
                                        <TabPane label="通知" name="notification">
                                            <div class="notification">通知内容</div>
                                        </TabPane>
                                        <TabPane label="关注" name="follow">
                                            <div class="notification">关注内容</div>
                                        </TabPane>
                                        <TabPane label="系统" name="system">
                                            <div class="notification">系统内容</div>
                                        </TabPane>
                                    </Tabs>
                                </DropdownMenu>
                            </Dropdown>
                        </i-col>
                        <i-col span="8">
                            <Icon type="md-color-palette" size="24" @click="openTheme = true" />
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </Header>
        <Layout>
            <Sider class="sider" width="240">
                <Menu class="sider-menu" theme="dark" active-name="option1">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-person"></Icon>
                            人员管理
                        </template>
                        <MenuItem name="addStaff" to="/addStaff">
                            <Icon type="md-person-add" />
                            <span>添加员工</span>
                        </MenuItem>
                        <MenuItem name="updateStaff">
                            <Icon type="ios-construct" />
                            <span>修改员工信息</span>
                        </MenuItem>
                        <MenuItem name="staffList" to="/staffList">
                            <Icon type="ios-eye" />
                            <span>查看员工</span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people" />
                            分组管理
                        </template>
                        <MenuItem name="addGroup" to="/addGroup">
                            <Icon type="ios-add" />
                            <span>添加分组</span>
                        </MenuItem>
                        <MenuItem name="2-2">
                            <Icon type="ios-eye" />
                            <span>查看分组</span>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Content class="content" :class="{ 'content-expand': isCollapsed }">
                <slot></slot>
            </Content>
        </Layout>

        <Drawer title="选择配色" v-model="openTheme" :closable="false">

        </Drawer>
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