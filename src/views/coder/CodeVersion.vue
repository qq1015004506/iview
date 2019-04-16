<template>
    <dev-article>
        <Row :gutter="64">
            <Form>
            <i-col span="10">
                <FormItem label="代码版本">
                    <br>
                    <Table highlight-row @on-current-change="selectCode" ref="currentRowTable" border :columns="columns" :data="data"></Table>
                </FormItem>

                <FormItem>
                    <Button @click="changeTaskCodeInfo">修改版本</Button>
                </FormItem>
            </i-col>
            <i-col span="13" >
                <FormItem label="代码">
                    <br>
                    <div class="myEditor">
                        <div id="container" ref="container" style="height:600px"></div>
                    </div>
                </FormItem>
            </i-col>
            </Form>
        </Row>

    </dev-article>
</template>

<script>
    import axios from 'axios'
    import * as monaco from 'monaco-editor';
    export default {
        name: "CodeVersion",
        props:{
            editorOptions:{
                type:Object,
                default:function(){
                    return {
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: false,        // 只读
                        cursorStyle: 'line',        //光标样式
                        automaticLayout: false, //自动布局
                        glyphMargin: true,  //字形边缘
                        useTabStops: false,
                        fontSize: 28,       //字体大小
                        autoIndent:true,//自动布局
                    }
                }
            }
        },
        data() {
            return {
                data:[],
                codesCopy:null,//内容备份
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '文件描述',
                        key: 'commit'
                    },
                ],
                code:'',
                allCode:[],
                codeInfo:{},


            }
        },
        methods:{
            changeTaskCodeInfo(){
                axios.put("http://localhost:8888/task/"+this.codeInfo.taskId + "/codeId/"+this.codeInfo.id).then(()=>{
                    this.$Message.success("修改成功")
                }).catch(err=>{
                    this.$Message.error(err.message)
                })
            },
            getData() {
                axios.get("http://localhost:8888/file/task/"+this.$route.query.id).then(res=>{
                    this.data = res.data

                    console.log(this.data)
                    for (let i = 0; i < this.data.length; i++) {
                        this.data[i].index = i;
                        this.data[i]._highlight = false;
                    }
                    if(this.data.length) {
                        this.data[0]._highlight = true;
                        this.code = this.data[0].codeDetail;
                    }

                    this.initEditor();
                })
            },
            initEditor(){
                let self = this;
                self.$refs.container.innerHTML = '';
                self.monacoEditor = monaco.editor.create(self.$refs.container, {
                    value:self.code,
                    language: 'java',
                    theme: 'vs',
                    editorOptions:self.editorOptions,
                });
            },

            selectCode(row){
                this.code = row.codeDetail;
                this.initEditor();
            }
        },
        mounted(){
            this.code = this.allCode[0];
            this.getData();
        },
    }
</script>

<style scoped>

</style>