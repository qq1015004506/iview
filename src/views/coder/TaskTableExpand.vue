<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="24">
                <span class="expand-key">评语: </span>
                <span class="expand-value">{{ hasEval(row.evaluation) }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data () {
            return {

            }
        },
        methods:{
            hasEval(item) {
                if(!item)
                    return "暂无"
                return item
            }
        }
    };
</script>