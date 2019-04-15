<template>
    <dev-article>
        <div style="padding: 32px 64px;">
            <Timeline>
                <TimelineItem v-for="file in data" color="green">{{file.commit}}</TimelineItem>
            </Timeline>
        </div>
    </dev-article>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "CodeVersion",
        data() {
            return {
                data:[],
            }
        },
        methods:{
            getData() {
                axios.get("http://localhost:8888/file/task/2").then(res=>{
                    this.data = res.data
                })
            }
        },
        mounted(){
            this.getData()
        },
    }
</script>

<style scoped>

</style>