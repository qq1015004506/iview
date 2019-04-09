<template>
    <dev-article>
        <Row :gutter="16">
            <i-col span="24">
                <Card title="人员信息"  shadow style="margin-top: 16px;">

                </Card>
            </i-col>
            <i-col span="12">
                <Card title="人员分配"  shadow style="margin-top: 16px;">
                </Card>
            </i-col>
            <i-col span="12">
                <Card title="人员分配"  shadow style="margin-top: 16px;">
                </Card>
            </i-col>
        </Row>
        <Button @click="getInfo()">123</Button>
    </dev-article>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "TaskPublish",
        methods:{
            getInfo() {
                alert(123)
                console.log(123)
                var t = [1,2,3,4,5]
                axios.post('http://localhost:8888/group/member',{
                    ids:t
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                        console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>