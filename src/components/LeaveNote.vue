<template>
<div>
  <div class="wrap_head1">
        <div class="head_con" style="width:100%">
          
        </div>
    </div>
            <div class="wrap_content">
                <div class="banner_area">
                        <video width="100%" id="video" autoplay="" loop="" preload="" muted="" x-webkit-airplay="true" airplay="allow"
                            webkit-playsinline="true" playsinline="true" src="./video/star1.mp4" class="video1 video"></video>
                    <Tabs style="z-index:99;height: 780px;padding-top: 85px;margin-top: -785px;">
                        <Tab-pane label="请假条" icon="ios-medkit">
                            <div class="head_con1" style="width:100%">
                                <div class="H-head-btnGroup">
                                    <i-button type="info" style="margin-left: 70%;" title="用户名">{{$route.query.usr}}</i-button>
                                    <!-- <i-button type="error" @click="HWlogout" style="margin-left: 2%;">退出登录</i-button> -->
                                    <Poptip
                                        confirm
                                        title="您确认退出登录吗？"
                                        style="margin-left: 2%;"
                                        @on-ok="HWlogout"
                                        @on-cancel="cancel">
                                        <i-button>退出登录</i-button>
                                    </Poptip>
                                </div>
                            </div>
                             <div class="function">
                                <div class="leave">
                                    <!-- 表单，width改 -->
                                    <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="0">
                                        <Form-item label="" prop="name" class="contentname">
                                            <span class="contentname"><Icon type="ios-person-outline"></Icon>姓名&nbsp;</span>
                                            <i-input v-model="formValidate.name" placeholder="请输入姓名" style="width:200px"></i-input>
                                        </Form-item>
                                        <Form-item label="" prop="type">
                                            <span class="contentname" style="margin-left:-30px"><Icon type="ios-checkbox-outline"></Icon>请假类型&nbsp;</span>
                                            <i-select v-model="formValidate.type" style="width:200px">
                                                <i-option value="值班请假（病假）">值班请假（病假）</i-option>
                                                <i-option value="其他">其他</i-option>
                                            </i-select>
                                        </Form-item>
                                        <Form-item label="" prop="department">
                                            <span class="contentname" style="margin-left:5px"><Icon type="ios-people-outline"></Icon>部门&nbsp;</span>                            
                                            <i-select v-model="formValidate.department" style="width:200px">
                                                <i-option value="综合部">综合部</i-option>
                                                <i-option value="技术部-程序">技术部-程序</i-option>
                                                <i-option value="技术部-美工">技术部-美工</i-option>
                                                <i-option value="技术部-闪客">技术部-闪客</i-option>
                                                <i-option value="媒体中心">媒体中心</i-option>
                                                <i-option value="新闻记者部">新闻记者部</i-option>
                                                <i-option value="品牌运营部">品牌运营部</i-option>
                                                <i-option value="摄影小组">摄影小组</i-option>
                                                <i-option value="其他">其他</i-option>
                                            </i-select>
                                        </Form-item>
                                        <Form-item label="" prop="date">
                                            <span class="contentname" style="margin-left:-25px"><Icon type="ios-calendar-outline"></Icon>请假时间&nbsp;</span>
                                            <!-- <Date-picker
                                                type="datetimerange" 
                                                format="yyyy-MM-dd HH:mm" 
                                                value-format="yyyy-MM-dd HH:mm" 
                                                placeholder="选择日期和时间" 
                                                style="width: 260px"
                                                v-model="formValidate.date"
                                                :options="options">
                                            </Date-picker> -->
                                             <Date-picker
                                                type="date" 
                                                format="yyyy-MM-dd" 
                                                value-format="yyyy-MM-dd"
                                                @on-change="formValidate.date = $event" 
                                                placeholder="选择日期" 
                                                style="width: 200px;"
                                                v-model="formValidate.date"
                                                :options="options">
                                            </Date-picker>
                                        </Form-item>
                                        <Form-item label="" prop="reason">
                                            <span class="contentname"><Icon type="ios-paper-outline"></Icon>请假事由&nbsp;</span>
                                            <i-input type="textarea" placeholder="请输入准确的请假事由" v-model="formValidate.reason" style="width: 260px"></i-input>
                                        </Form-item>
                                        <Form-item>
                                            <i-button color="primary" @click="handleSubmit2('formValidate')">提交</i-button>
                                            <i-button color="ghost" @click="handleReset('formValidate')" style="margin-left: 45px">重置</i-button>
                                        </Form-item>
                                        <!-- <div class="leavelist"><span class="contentname">说明附件（选填）</span>
                                            <Upload
                                                multiple action="">
                                                <i-button color="ghost" icon="ios-cloud-upload-outline">
                                                    <span class="contentname">上传文件</span>
                                                </i-button>
                                            </Upload>
                                        </div> -->
                                    </i-form>
                                </div>
                                <!-- <div class="stepscontainer">
                                    <div class="steps">
                                        <Steps :current="0" status="wait">
                                            <Step title="已完成" content="填写信息"></Step>
                                            <Step title="进行中" content="发送完成"></Step>
                                            <Step title="待进行" content="审批中"></Step>
                                            <Step title="待进行" content="审批结果"></Step>
                                        </Steps>
                                    </div>
                                </div> -->
                            </div>

                        </Tab-pane>
                        <Tab-pane label="请假记录" icon="ios-paper">
                            <div class="H-head-btnGroup">
                                <i-button type="info" style="margin-left: 70%;" title="用户名">{{$route.query.usr}}</i-button>
                                <!-- <i-button type="error" @click="HWlogout" style="margin-left: 2%;">退出登录</i-button> -->
                                <Poptip
                                    confirm
                                    title="您确认退出登录吗？"
                                    style="margin-left: 2%;"
                                    @on-ok="HWlogout"
                                    @on-cancel="cancel">
                                    <i-button>退出登录</i-button>
                                </Poptip>
                            </div>
                            <!-- height="200" -->
                            <i-table highlight-row :data="tableData" :columns="tableColumns" stripe style="margin-top:50px"></i-table>   
                        </Tab-pane>
                    </Tabs>
        
                    
                </div>
            
            </div>  
                
     

</div>
</template>

<script>
// import login from './login';

export default {
  name: 'LeaveNote',
  props: {
    msg: String
  },
  data(){
      return{
          formValidate:{
              username :'',
              name :'',
              type :'',
              department :'',
              date :'',
              reason :''
          },
          ruleValidate:{
              name :[
                  {required:true,message:'姓名不能为空',trigger:'blur'}
              ],
              type :[
                  {required:true,message:'请选择类型',trigger:'change'}
              ],
              department :[
                  {required:true,message:'请选择所在部门',trigger:'change'}
              ],
            //   date :[
            //       {type:'array',required:true,message:'请选择请假区间',trigger:'change',
            //         fields: {
            //             0: {type: "date", required: true, message: "请选择请假区间"},
            //             1: {type: "date", required: true, message: "请选择请假区间"}
            //         }
            //     }
            //   ],
              date :[
                  {required:true,message:'请选择请假日期',trigger:'blur',pattern: /.+/ }
              ],
              reason :[
                  {required:true,message:'请输入请假事由',trigger:'blur'}
              ]
          },
          //过去时间禁用
          options:{
            disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
            }
          },
        //   tableData:this.mockTableData(),
          tableData:[],
          tableColumns:[
              {
                type:'index',
                width: 60,
                align: 'center',
                sortable: true
              },
              {
                title: '提交日期',
                key: 'date',
                sortable: true
              },
              {
                title: '申请人',
                key: 'name'
              },
              {
                title: '部门',
                key: 'department',
                filterMethod (value, row) {
                    return row.department.indexOf(value) > -1;
                }
              },
              {
                title: '请假类型',
                key: 'type',
                filters: [
                    {
                        label: '值班请假（病假）',
                        value: '值班请假（病假）'
                    },
                    {
                        label: '其他',
                        value: '其他'
                    },
                ],
                filterMethod (value, row) {
                    return row.type.indexOf(value) > -1;
                }
              },
              {
                title: '请假事由',
                key: 'reason'
              },
              {
                title: '审批补充',
                key: 'refuse',
                align: 'center',
              },
              {
                title: '状态',
                key: 'auditStatus',
                filters: [
                    {
                        label: '待审批',
                        value: 0
                    },
                    {
                        label: '审批通过',
                        value: 1
                    },
                    {
                        label: '审批失败',
                        value: 2
                    },
                ],
                render:(h, params) => {
                    let auditStatus = params.row.auditStatus; 
                    let text = "";
                    let color = "";
                    if(auditStatus == '0'){
                        text = "待审批";
                        color = "blue";
                    }else if(auditStatus == '1'){
                        text = "审批通过";
                        color = "green";
                    }else if(auditStatus == '2'){
                        text = "审批失败";
                        color = "red";
                    }
                    return h(
                        "Tag",
                        {
                            props:{
                                type:"border",
                                // type:"dot" ,
                                color:color
                            }
                        },
                        text
                    );
                },
                
                filterMethod (value, row) {
                    return row.auditStatus == value;
                }
              }
          ],
        // name:'Echo',
        username:this.$route.query.usr,
        // userId:'bbb'
      }
  },
  //注册组件
  components:{
    //   login,
  },
  computed:{

    },
    mounted:function(){
        this.showTableData();
         //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
  
    methods: {
        handleSubmit2() {
            console.log('handleSubmit2');
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                        this.$Loading.start();
                        this.$axios.post('/submit',{
                        username:this.$route.query.usr,
                        refuse:'无',
                        name:this.formValidate.name,
                        type:this.formValidate.type,
                        department:this.formValidate.department,
                        date:this.formValidate.date,
                        reason:this.formValidate.reason
                    }).then(res =>{
                        console.info('后台返回的数据',res.data);
                    this.$Loading.finish();
                    this.$Message.success('提交成功!');
                    }).catch(err =>{
                        console.info('报错的消息',err);
                        this.$Loading.error();
                        this.$Message.error('提交失败');                    
                    })  
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(){
            this.$refs.formValidate.resetFields();
        },
        //加一个确定
        HWlogout(){
            this.$router.replace({
                    path:'/Login',
                })
        },
         cancel(){
            //this.$Message.info('点击了取消');
        },
        mockTableData(){
            let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        date:'',  
                        name:'',
                        department: '',   
                        type:'',      
                        reason:'',         
                        auditStatus:'',      
                    })
                }
                return data;
        },
        showTableData:function(){
                this.$axios.get('/look/'+this.username,{
                    // usrname:this.usrname,
                    name:this.name,
                    type:this.type,
                    department:this.department,
                    date:this.date,
                    reason:this.reason,
                    auditStatus:this.auditStatus
                }).then(res =>{
                    console.info('后台返回的数据',res.data);
                    var code = res.data.state;
                    if(code == "success"){
                        this.tableData = res.data.data
                        console.info('111');
                    }
                // this.$Message.success('操作成功!');
                }).catch(err =>{
                    console.info('报错的消息',err);
                    this.$Message.error('超时!');                    
                })                
            },
        
    },
    // created(){
    //     console.log('created');
    //     document.title = '请假'
    // }
}

</script>

<style>
@import "../css/base.css";

</style>
