<template>
    <dev-article>
        <Card shadow :padding="0">
            <Row>
                <i-col :sm="24" :md="0" value="option1">
                    <Tabs>
                        <TabPane label="设置 1" name="option1"></TabPane>
                        <TabPane label="设置 2" name="option2"></TabPane>
                        <TabPane label="设置 3" name="option3"></TabPane>
                    </Tabs>
                </i-col>
            </Row>
            <Row >
                <i-col :sm="0" :md="4">
                    <CellGroup>
                        <Cell title="设置 1" to="/manage" selected></Cell>
                        <Cell title="设置 2" to="/manage"></Cell>
                        <Cell title="设置 3" to="/manage"></Cell>
                    </CellGroup>
                </i-col>
                <i-col :sm="24" :md="20">
                    <Row style="padding: 16px" :gutter="64" >
                        <i-col span="12">
                            <Form label-position="top">
                                <FormItem label="邮箱"><Input v-model="form.mail"/> </FormItem>
                                <FormItem label="昵称"><Input v-model="form.name"/> </FormItem>
                                <FormItem label="个人介绍"><Input v-model="form.desc" type="textarea" :rows="4"/> </FormItem>
                                <FormItem label="国家">
                                    <Select v-model="form.country" transfer>
                                        <Option value="中国">中国</Option>
                                        <Option value="美国">美国</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="电话">
                                    <Row gutter="16">
                                        <i-col span="6">
                                            <Input v-model="form.zone"/>
                                        </i-col>
                                        <i-col span="18">
                                            <Input v-model="form.phone"/>
                                        </i-col>
                                    </Row>
                                </FormItem>
                            </Form>
                            <Button type="primary" size="large">更新信息</Button>
                        </i-col>
                        <i-col span="12">
                            <Avatar icon="ios-person" size="large"></Avatar>
                            <Upload action="//jsonplaceholder.typicode.com/posts/">
                                <Button icon="ios-cloud-upload-outline">Upload files</Button>
                            </Upload>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </Card>
    </dev-article>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    mail: '',
                    name: '',
                    desc: '',
                    country: '中国',
                    zone: '101',
                    phone: '10000000000'
                }
            }
        }
    }
</script>

<style scoped>

</style>