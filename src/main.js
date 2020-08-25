import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueRouter from 'vue-router'

import router from './router' // /index可以省略


Vue.config.productionTip = false
Vue.use(iView)
Vue.prototype.$axios = axios
Vue.use(VueRouter)

axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'https://temp.fmujie.cn/api'
axios.defaults.baseURL = '/api/'


// const router = new VueRouter({
//   mode:'history',
//   routers:routers
// })


new Vue({
  el:'#app',
  router:router,
  render: h => h(App),
})

//封装request模块
// import {request} from "./network/requst";

// request({
//   url:'/'
// }).then(res => {
//   console.log(res);
// }).catch(err =>{
//   console.log(err);
// })













// request({
//   url: '/'
// },res => {
//   console.log(res);
// },err => {
//   console.log(err);
// })

// request({
//   baseConfig:{

//   },
//   success: function (res) {

//   },
//   failure: function (err) {

//   }
// })