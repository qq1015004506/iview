<template>
    <dev-article>
        <Row :gutter="64">
            <Form>
            <i-col span="10">
                <FormItem label="代码版本">
                    <br>
                    <Table highlight-row @on-current-change="selectCode" ref="currentRowTable" border :columns="columns" :data="data"></Table>
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
            codes:{
                type:String,
                default:function(){
                    return 'package pers.quzhiyu.graduationproject.controller;\n' +
                        '\n' +
                        'import com.github.pagehelper.PageHelper;\n' +
                        'import com.github.pagehelper.PageInfo;\n' +
                        'import org.springframework.beans.factory.annotation.Autowired;\n' +
                        'import org.springframework.web.bind.annotation.*;\n' +
                        'import pers.quzhiyu.graduationproject.domain.Staff;\n' +
                        'import pers.quzhiyu.graduationproject.service.StaffService;\n' +
                        '\n' +
                        'import java.util.HashMap;\n' +
                        'import java.util.List;\n' +
                        'import java.util.Map;\n' +
                        '\n' +
                        '@RestController\n' +
                        '@RequestMapping("/staff")\n' +
                        '@CrossOrigin\n' +
                        'public class StaffController {\n' +
                        '    @Autowired\n' +
                        '    StaffService staffService;\n' +
                        '\n' +
                        '    @PostMapping\n' +
                        '    public int createStaff(@RequestBody Staff staff) {\n' +
                        '        return staffService.insertStaff(staff);\n' +
                        '    }\n' +
                        '\n' +
                        '    @GetMapping()\n' +
                        '    public Map<String,Object> findAllStaff(@RequestParam(value = "current",defaultValue = "1")int current,\n' +
                        '                                    @RequestParam(value = "size",defaultValue = "10")int size){\n' +
                        '        PageHelper.startPage(current,size);\n' +
                        '        List<Staff> allStaff = staffService.findAllStaff();\n' +
                        '        PageInfo<Staff> pageInfo = new PageInfo<>(allStaff);\n' +
                        '        Map<String,Object> data = new HashMap<>();\n' +
                        '        data.put("total",pageInfo.getTotal());//总条数\n' +
                        '        data.put("current",current);//当前页\n' +
                        '        data.put("data",pageInfo.getList());//数据\n' +
                        '        return data;\n' +
                        '    }\n' +
                        '\n' +
                        '\n' +
                        '    @GetMapping("/query")\n' +
                        '    public Map<String,Object> queryStaff(Long job, String name,\n' +
                        '                                    @RequestParam(value = "current",defaultValue = "1")int current,\n' +
                        '                                    @RequestParam(value = "size",defaultValue = "10")int size) {\n' +
                        '        PageHelper.startPage(current,size);\n' +
                        '        List<Staff> staff = staffService.queryStaff(name, job);\n' +
                        '        PageInfo<Staff> pageInfo = new PageInfo<>(staff);\n' +
                        '        Map<String,Object> data = new HashMap<>();\n' +
                        '        data.put("total",pageInfo.getTotal());//总条数\n' +
                        '        data.put("current",current);//当前页\n' +
                        '        data.put("data",pageInfo.getList());//数据\n' +
                        '        return data;\n' +
                        '    }\n' +
                        '\n' +
                        '    @GetMapping("/group/{group:\\\\d+}")\n' +
                        '    public List<Staff> findAllStaffByGroupId(@PathVariable Long group) {\n' +
                        '        return staffService.findAllStaffByGroupId(group);\n' +
                        '    }\n' +
                        '\n' +
                        '    @GetMapping("/{id:\\\\d+}")\n' +
                        '    public Staff findStaffById(@PathVariable Long id) {\n' +
                        '        return staffService.findStaffById(id);\n' +
                        '    }\n' +
                        '\n' +
                        '    @PutMapping()\n' +
                        '    public int updateStaff(@RequestBody Staff staff) {\n' +
                        '        return staffService.updateStaff(staff);\n' +
                        '    }\n' +
                        '\n' +
                        '    @DeleteMapping("/{id:\\\\d+}")\n' +
                        '    public int deleteStaff(@PathVariable Long id) {\n' +
                        '        return staffService.deleteStaffById(id);\n' +
                        '    }\n' +
                        '}\n'
                }
            },
            language:{
                type:String,
                default:function(){
                    return 'java'
                }
            },
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
                theme:'vs',
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

            }
        },
        methods:{
            getData() {
                axios.get("http://localhost:8888/file/task/2").then(res=>{
                    this.data = res.data
                })
            },
            initEditor(){
                let self = this;
                self.$refs.container.innerHTML = '';
                self.monacoEditor = monaco.editor.create(self.$refs.container, {
                    value:self.codesCopy || self.codes,
                    language: self.language,
                    theme: self.theme,//vs, hc-black, or vs-dark
                    editorOptions:self.editorOptions,
                });
                self.$emit('onMounted',self.monacoEditor);//编辑器创建完成回调
                self.monacoEditor.onDidChangeModelContent(function(event){//编辑器内容changge事件
                    self.codesCopy = self.monacoEditor.getValue();
                    self.$emit('onCodeChange',self.monacoEditor.getValue(),event);
                });
                //编辑器随窗口自适应
                window.addEventListener('resize',function(){
                    initEditor();
                })
            },
            RunResult(){
                console.log(this.monacoEditor.getValue());
            },
            themeChange(val){
                this.initEditor();
            },
            selectCode(row){
                console.log(row)
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