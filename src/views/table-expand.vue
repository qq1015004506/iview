<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row" v-for="staff in row.staffs">
            <Col span="6">
                <span class="expand-key">name: </span>
                <span class="expand-value">{{ staff.name }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">job: </span>
                <span class="expand-value">{{ displayJob(staff.job) }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">phone: </span>
                <span class="expand-value">{{ staff.phone }}</span>
            </Col>
            <Col span="6" v-show="staff.id === row.leaderId">
                <span class="expand-value"> 组长 </span>
            </Col>
        </Row>

    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        methods:{
            displayJob(job) {
                if(job === 1)
                    return "产品经理"
                if(job === 2)
                    return "开发人员"
                if(job === 3)
                    return "测试人员"
            }
        }
    };
</script>