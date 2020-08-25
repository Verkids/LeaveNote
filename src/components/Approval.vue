<template>
<div id="ApprovalBg">
  <div class="wrap_head">
        <div class="head_con"><h2>{{$route.query.usr}}</h2></div>
    </div>  
    <div class="wrap_content">
        <div class="banner_area">
            <div style="height:110px"></div>
            <Tabs style="z-index:99">
                <Tab-pane label="审批" icon="ios-bookmarks-outline">
                     <div style="margin: 10px; margin-top: 50px">
                        <i-table highlight-row :data="tableData1" :columns="tableColumns1" stripe></i-table>
                    </div>
                </Tab-pane>
                <Tab-pane label="profile" icon="ios-flame-outline">
                    <div style="margin: 10px; margin-top: 50px">
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
                             <i-button type="warning" style="margin-left: 2%;" @click="gotoH" title="前往请假">请假</i-button>
                        </div>

                    </div>
                </Tab-pane>
            </Tabs>
        </div>
    </div>
</div>
</template>         

<script>
// import login from './login';
// import global_ from './Global'

//组件导出，在index.js中对应导入
export default {
  name: 'Approval',
  props: {
    msg: String
  },
  inject:['reload'],
  data(){
      return{
          tableData1: [],
          tableData1Copy:[],
          tableColumns1:[
              {
                title: '#',
                key:'id',
                type:'index',
                width: 60,
                align: 'center',
                sortable: true
              },
              {
                title: '提交日期',
                key: 'date',
                width: 150,
                sortable: true
              },
              {
                title: '申请人',
                key: 'name',
                width: 150,
                align: 'center',
              },
              {
                title: '部门',
                key: 'department',
                width: 220,
                align: 'center',
                filters: [
                    {
                        label: '综合部',
                        value: '综合部'
                    },
                    {
                        label: '技术部-程序',
                        value: '技术部-程序'
                    },
                    {
                        label: '技术部-美工',
                        value: '技术部-美工'
                    },
                    {
                        label: '技术部-闪客',
                        value: '技术部-闪客'
                    },
                    {
                        label: '媒体中心',
                        value: '媒体中心'
                    },
                    {
                        label: '新闻记者部',
                        value: '新闻记者部'
                    },
                    {
                        label: '品牌运营部',
                        value: '品牌运营部'
                    },
                    {
                        label: '摄影小组',
                        value: '摄影小组'
                    },
                    {
                        label: '其他',
                        value: '其他'
                    },
                ],
                filterMethod (value, row) {
                    return row.department.indexOf(value) > -1;
                }
              },
              {
                title: '请假类型',
                key: 'type',
                width: 220,
                align: 'center',
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
                key: 'reason',
                width: 234,
                align: 'center',
              },
              {
                title: '审批补充',
                key: 'refuse',
                width: 230,
                align: 'center',
                render: (h, params) => {
                    if (params.row.edit) {
                    return h("Input", {
                        props: {
                            value: params.row.refuse,
                        },
                        attrs: {
                            id: `refuse_${params.index}`
                        },
                        on: {
                            "on-blur": () => {
                                this.tableData1Copy[params.index].refuse = document.querySelector(`#refuse_${params.index} input`).value;
                            }
                        }
                    });
                    } else {
                        return h("span", params.row.refuse);
                    }  
                }
              },
              {
                title: '状态',
                key: 'auditStatus',
                width: 250,
                // align: 'center',
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
                    let auditStatus = this.tableData1[params.index].auditStatus; 
                    let index = params.index;
                    let text = "";
                    let color = "";
                    if(auditStatus == '1'){
                        text = "审批通过";
                        color = "green";
                        return h('div',[
                            h("Tag",
                            {
                                style:{
                                    marginTop: '5px',
                                    // display: 'inline-block',
                                },
                                props:{
                                    type:"border",
                                    // type:"dot" ,
                                    color:color
                                }
                            },
                            text
                        ),h(
                            "Button",
                            {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style:{
                                    marginLeft: '60px',
                                },
                                
                                on: {
                                    click: () => {
                                        // this.approved(params.row.auditStatus)
                                        this.repeal(index)
                                    }
                                }
                            },
                            '撤销'
                            )
                        ]);
                    }
                    else if(auditStatus == '6666'){
                        text = "审批失败";
                        color = "red";
                    }
                    else if(auditStatus == '2'){
                        text = "审批失败";
                        color = "red";
                        if (params.row.edit) {
                            return h("div", [
                                h("Tag",
                                {
                                    style:{
                                        marginTop: '5px',
                                        // display: 'inline-block',
                                    },
                                    props:{
                                        type:"border",
                                        // type:"dot" ,
                                        color:color
                                    }
                                },
                                text
                                ),
                                h("Button",
                                        {
                                            props:{
                                                type: 'success',
                                                size: 'small',
                                            },
                                            style: {
                                                marginLeft: '28px',
                                            },
                                            on: {
                                                click: () => {
                                                    //保存数据
                                                    for (let key in this.tableData1Copy[params.index]) {
                                                        this.tableData1[params.index][key] = this.tableData1Copy[params.index][key];
                                                    }
                                                    this.tableData1[params.index].edit = false;
                                                    this.save(index)
                                                    this.reload()
                                                }
                                            }
                                        },
                                        "保存"
                                        ),
                                        h(
                                        "Button",
                                        {
                                            props: {
                                                    type: 'warning',
                                                    size: 'small'
                                            },
                                            style: {
                                                "margin-left": "10px"
                                            },
                                            on: {
                                                click: () => {
                                                    this.tableData1[params.index].edit = false;
                                                    this.reload()
                                                }
                                            }
                                        },
                                        "取消"
                                        )
                                    ]);
                        } 
                        else {
                           return h('div',[
                            h("Tag",
                            {
                                style:{
                                    marginTop: '5px',
                                    // display: 'inline-block',
                                },
                                props:{
                                    type:"border",
                                    // type:"dot" ,
                                    color:color
                                }
                            },
                            text
                        ),
                        h(
                            "Button",
                            {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style:{
                                    marginLeft: '25px',
                                },                               
                                on: {
                                    click: () => {
                                        // this.approved(params.row.auditStatus)
                                        this.repeal(index)
                                    }
                                }
                            },
                            '撤销'
                            )
                            ,h(
                            "Button",
                            {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style:{
                                    marginLeft: '5px',
                                },                                
                                on: {
                                    click: () => {
                                        this.tableData1[params.index].edit = true;
                                        this.failed(index)
                                        console.info('444')
                                    }
                                }
                            },
                            '驳回理由'
                            )
                        ]);
                        }
                    }else{
                        text = "待审批";
                        color = "blue";
                        return h('div',[
                            h("Tag",
                            {
                                style:{
                                    marginTop: '5px',
                                    // display: 'inline-block',
                                },
                                props:{
                                    type:"border",
                                    // type:"dot" ,
                                    color:color
                                }
                            },
                            text
                        ),h(
                            "Button",
                            {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style:{
                                    marginLeft: '40px',
                                },
                                
                                on: {
                                    click: () => {
                                        // this.approved(params.row.auditStatus)
                                        this.approved(index)
                                    }
                                }
                            },
                            '通过'
                            ), h(
                            "Poptip",
                            {
                                props: {
                                    title:"填写驳回理由",
                                    transfer: true,
                                },
                                style: {
                                        marginLeft: '10px',
                                },

                            },
                            [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on:{
                                        click:() =>{
                                            this.failed(index)
                                            this.reload()
                                        }
                                    }
                                },'不通过')
                                ])
                         ]);
                    }
                    return h(
                        "Tag",
                        {
                            style:{
                                marginTop: '10px',
                                display: 'inline-block',
                            },
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
          ]
      }
  },
  //注册组件
  components:{
    //   login,
  },
  mounted:function(){
        this.showTableData1();
         //需要执行的方法可以在mounted中进行触发，其获取的数据可以赋到data中后，可以放在前面进行渲染
    },
  
    methods: {
        // auditChange(){
        //     this.auditStatus = auditStatus
        // },
        //审批通过
        approved(index){
            console.log('approved');
            //   开始从 0 显示进度条，并自动加载进度
            this.$Loading.start();
            this.$axios.get('/accept/'+this.tableData1[index].id+'/1',{
                auditStatus:this.auditStatus
            }).then(res =>{
                console.info('后台返回的数据',res.data);
                var msg = res.data.message;
                if(msg == "通过"){
                    this.tableData1[index].auditStatus = res.data.auditStatus
                    console.info('222');
                }
                //结束进度条，自动补全剩余进度
                this.$Loading.finish();
            this.$Message.success('操作成功!');
            }).catch(err =>{
                console.info('报错的消息',err);
                //	以错误的类型结束进度条，自动补全剩余进度
                this.$Loading.error();
                this.$Message.error('操作失败!');                    
            })                
        },
        //审批失败
        failed(index){
               console.log('failed');
            //   开始从 0 显示进度条，并自动加载进度
            this.$Loading.start();
            this.$axios.get('/accept/'+this.tableData1[index].id+'/2',{
                auditStatus:this.auditStatus
            }).then(res =>{
                console.info('后台返回的数据',res.data);
                var msg = res.data.message;
                if(msg == "不通过"){
                    this.tableData1[index].auditStatus = res.data.auditStatus
                    console.info('333');
                }
                //结束进度条，自动补全剩余进度
                this.$Loading.finish();
            this.$Message.success('操作成功!');
            }).catch(err =>{
                console.info('报错的消息',err);
                //	以错误的类型结束进度条，自动补全剩余进度
                this.$Loading.error();
                this.$Message.error('操作失败!');                    
            }) 
        },
        //撤销
          repeal(index){
               console.log('repeal');
            //   开始从 0 显示进度条，并自动加载进度
            this.$Loading.start();
            this.$axios.get('/accept/'+this.tableData1[index].id+'/0',{
                auditStatus:this.auditStatus
            }).then(res =>{
                console.info('后台返回的数据',res.data);
                var msg = res.data.message;
                if(msg == "审批中"){
                    this.tableData1[index].auditStatus = res.data.auditStatus
                    console.info('333');
                }
                //结束进度条，自动补全剩余进度
                this.$Loading.finish();
            this.$Message.success('操作成功!');
            }).catch(err =>{
                console.info('报错的消息',err);
                //	以错误的类型结束进度条，自动补全剩余进度
                this.$Loading.error();
                this.$Message.error('操作失败!');                    
            }) 
        },
           //保存
          save(index){
               console.log('repeal');
            //   开始从 0 显示进度条，并自动加载进度
            this.$Loading.start();
            this.$axios.get('/refuse/'+this.tableData1[index].id + '/' + this.tableData1[index].refuse,{
            }).then(res =>{
                console.info('后台返回的数据',res.data);
                //结束进度条，自动补全剩余进度
                this.$Loading.finish();
            this.$Message.success('操作成功!');
            }).catch(err =>{
                console.info('报错的消息',err);
                //	以错误的类型结束进度条，自动补全剩余进度
                this.$Loading.error();
                this.$Message.error('操作失败!');                    
            }) 
        },
          showTableData1:function(){
                this.$axios.post('/details',{
                    name:this.name,
                    type:this.type,
                    department:this.department,
                    date:this.date,
                    reason:this.reason,
                    auditStatus:this.auditStatus,
                    refuse:this.refuse,
                }).then(res =>{
                    console.info('后台返回的数据',res.data);
                    var code = res.data.state;
                    if(code == "success"){
                        this.tableData1 = res.data.data
                        this.tableData1Copy = res.data.data
                        console.info('111');
                    }
                // this.$Message.success('操作成功!');
                }).catch(err =>{
                    console.info('报错的消息',err);
                    this.$Message.error('超时!');                    
                })                
            },
            gotoH(){
                this.$router.push({
                    path:'/LeaveNote',
                    query:
                    {
                        usr:this.$route.query.usr,
                    }
                })
            },
            HWlogout(){
            this.$router.replace({
                    path:'/Login',
                })
            },
            cancel(){
                //this.$Message.info('点击了取消');
            },
    },
    computed:{
            
        
    },
    
    // created(){
    //     console.log('created');
    //     document.title = '审批'
    // }
}

</script>

<style>
@import "../css/base.css";

</style>