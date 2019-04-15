<template>
    <dev-article>
        <Form>
            <Row :gutter="64">
                <i-col span="12">
                    <FormItem label="原始版本">
                        <br>
                        <Table highlight-row @on-current-change="leftSelectCode" ref="currentRowTable" border :columns="columns" :data="data"></Table>
                    </FormItem>
                </i-col>
                <i-col span="12">
                    <FormItem label="修改版本">
                        <br>
                        <Table highlight-row @on-current-change="rightSelectCode" ref="currentRowTable" border :columns="columns" :data="data"></Table>
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <FormItem label="代码比较结果">
                    <br>
                    <div class="myEditor">
                        <div id="container" ref="container" style="height:600px"></div>
                    </div>
                </FormItem>
            </Row>
        </Form>

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
                allCode:[],
                left:'',
                right:'',
            }
        },
        methods:{
            getData() {
                axios.get("http://localhost:8888/file/task/"+this.$route.query.id).then(res=>{
                    this.data = res.data;
                    for (let i = 0; i < this.data.length; i++) {
                        this.data[i].index = i;
                        this.data[i]._highlight = false;
                    }
                    if(this.data.length)
                        this.data[0]._highlight = true;
                })
                axios.get("http://localhost:8888/file/task/"+this.$route.query.id+"/details").then(res=>{
                    this.allCode = res.data
                    if(this.allCode.length) {
                        this.left = this.allCode[0];
                        this.right = this.allCode[0];
                    }
                    this.initEditor();
                })
            },
            initEditor(){
                let self = this;
                self.$refs.container.innerHTML = '';
                self.monacoEditor = monaco.editor.createDiffEditor(self.$refs.container, {
                    enableSplitViewResizing: false,
                    automaticLayout: true,
                    readOnly: true
                });

                this.monacoEditor.setModel({
                    original:monaco.editor.createModel(this.left, 'java'),
                    modified:monaco.editor.createModel(this.right, 'java'),
                })


            },

            leftSelectCode(row){
                this.left = this.allCode[row.index];
                this.initEditor();
            },
            rightSelectCode(row) {
                this.right = this.allCode[row.index];
                this.initEditor();
            }
        },
        mounted(){
            this.getData()
            this.initEditor();
        },
    }
</script>

<style scoped>

</style>