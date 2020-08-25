<template>
    <div class="LoginBg">
        <div class="LoginGroup">
            <Button-group shape="circle" size="large">
                <i-button color="ghost" @click="LoginBtn" style="background: none; color: white;">登录</i-button>
                <i-button color="ghost" @click="RegisterBtn">注册</i-button>
            </Button-group>
        </div>
    <!-- 登录框 -->
        <div id="LoginForm" v-if="show1">
            <tag class="LoginFormBox" closable @on-close="handleLoginClose">
                <!-- model：表单控件绑定的数据对象，在校验或重置时会访问该数据对象对应数据，类型为Object。 -->
                <!-- rules：表单校验规则，即上面介绍的(async-validator) 所使用的校验规则，类型为Object。 -->
                <!-- prop：对应表单域Form 组件model 里的字段，用于在校验或重置时访问表单组件绑定的数据，类型为String。 -->
                <i-form ref="formInline" :model="formInline" :rules="ruleInline" inline style="margin-left: 40%;">
                    <Form-item prop="name"><!-- user改成name -->
                        <i-input type="text" v-model="formInline.name" placeholder="请输入账号...">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </i-input>
                    </Form-item>
                    <Form-item prop="password">
                        <i-input type="password" v-model="formInline.password" placeholder="请输入密码...">
                            <Icon type="ios-rose-outline" slot="prepend"></Icon>   
                        </i-input>
                    </Form-item>
                    <Form-item>
                        <i-button color="primary" @click="handleSubmit1('formInline')">登录</i-button>
                        <router-view></router-view>
                    </Form-item>
                </i-form>
                <!-- 测试跳转 -->
                <!-- tag,渲染成 -->
                <!-- replace不会留下history记录，所以指定replace的情况下，后退键返回不能返回到上一个界面中 -->
                <!-- <router-link  to="/Approval" tag="button" replace>管理员</router-link>
                <router-view></router-view> -->
                <!-- <router-link :to="{path:'/Approval',query:{usr:'813',pwd:'123'}}">登录</router-link>
                <router-view></router-view> -->
            </tag>
        </div>
        <div id="LoginRegisterForm" v-if="show2">
             <tag class="LoginRegisterFormBox" closable  @on-close="handleRegisterClose">
                <i-form ref="formInline2" :model="formInline2" :rules="ruleInline2" inline style="margin-left: 40%;">
                    <Form-item prop="name"><!-- user改成name -->
                        <i-input type="text" v-model="formInline2.name" placeholder="请输入账号...">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </i-input>
                    </Form-item>
                    <Form-item prop="password">
                        <i-input type="password" v-model="formInline2.password" placeholder="请输入密码...">
                            <Icon type="ios-rose-outline" slot="prepend"></Icon>   
                        </i-input>
                    </Form-item>
                    <Form-item>
                        <i-button color="primary" @click="handleRegister('formInline2')">注册</i-button>
                        <router-view></router-view>
                    </Form-item>
                </i-form>
             </tag>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    props: {
        msg: String
    },
    data(){
        return{
            formInline: {
                    name: '',
                    password: '',
                },
            //Form校验,规则
            /* required表示必填项，message表示校验失败时的提示信息，trigger表示触发校验的条件，它的值有blur和change表示失去焦点和正在输入时进行校验。
                如果第一条满足要求，再进行第二条的验证，type表示校验类型，值为email表示校验输入值为邮箱格式，还支持自定义校验规则。更详细的用法可以参看它的文档。
            */
            ruleInline: {
                name: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6,max:16, message: '密码长度不能小于6位且不能多于16位', trigger: 'blur' }
                ],
            },
            formInline2: {
                    name: '',
                    password: '',
                },
            ruleInline2: {
                name: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6,max:16, message: '密码长度不能小于6位且不能多于16位', trigger: 'blur' }
                ],
            },
            show1:false,
            show2:false,
        }
    },
    methods: {
        LoginBtn:function(){
            this.show1 = !this.show1;
        },
        handleLoginClose(){
            this.show1 = false;
        },
        RegisterBtn:function(){
            this.show2 = !this.show2;
        },
        handleRegisterClose(){
            this.show2 = false;
        },
        
    
        handleSubmit1() {
            console.log('handleSubmit1');
            this.$refs.formInline.validate((valid) => {
                if (valid) {
                    //   开始从 0 显示进度条，并自动加载进度
                    this.$Loading.start();
                    this.$axios.post('/login',{
                        name:this.formInline.name,
                        password:this.formInline.password
                    }).then(res =>{
                        console.info('后台返回的数据',res.data);
                        //结束进度条，自动补全剩余进度
                        this.$Loading.finish();
                        //登录成功后存储用户信息
                        window.sessionStorage.setItem("userToken",res.data.success.token)
                        // console.info('TOKEN',res.data.success.token);
                        //通过代码的方式修改路由 vue-router
                        if(res.data.is_admin == 0)
                        {
                             this.$router.replace({
                                path:'/LeaveNote',
                                query:
                                {
                                    usr:this.formInline.name,
                                }
                            })
                        }else if(res.data.is_admin == 1)
                        {
                             this.$router.replace({
                                path:'/Approval',
                                query:
                                {
                                    usr:this.formInline.name,
                                }
                            })
                        }
                       
                    this.$Message.success('登录成功!');
                    }).catch(err =>{
                        console.info('报错的消息',err);
                        //	以错误的类型结束进度条，自动补全剩余进度
                        this.$Loading.error();
                        this.$Message.error('登录超时，请检查账号和密码是否输入正确!');                    
                    })                 
                } else {
                    this.$Message.error('表单验证失败!');
                    console.log("error");
                }
            })
        },
        //注册提交
        handleRegister() {
            console.log('handleRegister');
            this.$refs.formInline2.validate((valid) => {
                if (valid) {
                    //   开始从 0 显示进度条，并自动加载进度
                    this.$Loading.start();
                    this.$axios.post('/register',{
                        name:this.formInline2.name,
                        password:this.formInline2.password
                    }).then(res =>{
                        console.info('后台返回的数据',res.data);
                        //结束进度条，自动补全剩余进度
                        this.$Loading.finish();
                    this.$Message.success('注册成功!');
                    }).catch(err =>{
                        console.info('报错的消息',err);
                        //	以错误的类型结束进度条，自动补全剩余进度
                        this.$Loading.error();
                        this.$Message.error('用户名被占用!');                    
                    })                
                } else {
                    this.$Message.error('表单验证失败!');
                    console.log("error");
                }
            })
        },
    }
    
}
</script>

<style>
@import "../css/base.css";

</style>