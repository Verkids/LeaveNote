<!--标签在app.vue里渲染-->
<template>
  <div id="app">
    <!-- <LeaveNote></LeaveNote> -->
    <!--决定被渲染组件的位置-->
    <router-view v-if="isRouterAlive"></router-view>
    <!--注册过的全局组件-->
    <!-- <router-link to="/LeaveNote">主页</router-link>  -->
    <!-- <router-link to="/Approval">审批界面</router-link> -->
    <!-- <router-link to="/Login">登录</router-link> -->
  </div>
</template>

<script>
// import LeaveNote from './components/LeaveNote.vue'

export default {
  name: 'App',
    provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },

  components: {
    // 'LeaveNote' : LeaveNote
  }
}
</script>

<style>
/* @import "../css/base.css"; */

</style>
