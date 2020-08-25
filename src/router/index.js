//配置路由相关的信息
import Vue from 'vue'
import Router from 'vue-router'//导包，陆游   导入路由

//导入
import LeaveNote from '@/components/LeaveNote'//引入的组件，并且自定义了一个名称

import Approval from '@/components/Approval'

import Login from '@/components/Login'
// import { from } from 'core-js/fn/array'

//懒加载
// import Approval = () =>import('../components/Approval')

//1.通过vue.use(插件), 安装插件
Vue.use(Router)//告诉Vue使用Router  

//2.创建Router对象
const routes = [
        {
            //默认路径
            path:'',//缺省
            //redirect重定向
            redirect:'/Login'
        },
        {
            path:'/LeaveNote',//当出现/LeaveNote时，显示component内的组件
            component:LeaveNote,
            //meta:元数据(描述数据的数据)
            meta:{
                title:'请假',
                //添加字段判断该页面是否需要登录
                requireAuth:true,
            }
        },
        {
            path:'/Approval',
            // path:'/Approval',
            component:Approval,
            meta:{
                title:'审批',
                //添加字段判断该页面是否需要登录
                requireAuth:true,
            }
        },
        {
            path:'/Login',
            component:Login,
            meta:{
                title:'登录',
                requireAuth:false,
            }
        }
]
const router = new Router({
    //配置路由和组件之间的映射关系
    routes,
    mode:'history'//哈希值(hash)改为 /XXX(HTML5的history模式)
})

//导航守卫,动态修改标题
/*导航钩子的三个函数解析：
    to:即将要进入的目标的路由对象
    from:当前导航即将要离开的路由对象
    next:调用该方法后,才能进入下一钩子
*/
//前置守卫(guard)-beforeEach
//全局导航钩子
//next必须调用
router.beforeEach((to,from,next)=>{
    // to要跳转到的路径
    // from从哪个路径来
    // next往下执行的回调
     //从from跳转到to
    //matched,防止路由嵌套导致无法找到
    document.title = to.matched[0].meta.title
    console.log(to);
    // 在sessionStorage中获取token
    const token = window.sessionStorage.getItem('userToken')
    // 判断该页面是否需要登录
    if(to.meta.requireAuth){
        // 如果token存在直接跳转
        if(token){
            next()
        }else{
            // 否则跳转到login登录页面
            next({
                path:'/Login',
                // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
                query:{
                    redirect:to.fullPath
                }
            })
        }
    }else{
        // 如果不需要登录，则直接跳转到对应页面
        // 确保一定要有next()被调用
        next()
    }
})


//后置钩子(hook)-afterEach,不需要主动调用next()函数
// router.afterEach((to,from) => {
//     console.log('----');
// })

//3.将router对象传入到Vue实例(挂载)
export default router





