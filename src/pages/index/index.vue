<template>
  <div class="index">
    <el-container class="page">
      <el-aside width="200px">
        <!-- 侧边导航 -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
        >
          <el-menu-item index="home">
            <i class="el-icon-setting" ></i>
            <span slot="title">首页</span>
          </el-menu-item>

        <!-- <el-submenu v-show='hasChildren' v-for='(item,index) in user.menus' :key='index' :index="item.id+''">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item v-for='(i) in item.children' :key='i.id' :index="i.url+''">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
    
              <el-menu-item v-show="!hasChildren" v-for="i in user.menus" :key='i.id' :index="i.url" >{{i.title}}</el-menu-item> -->

        <!--  混合时 -->
        <template v-for="(item,index) in user.menus">
             <el-submenu v-show='item.children'  :key='index' :index="item.id+''">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for='(i) in item.children' :key='i.id' :index="i.url+''">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        <el-menu-item v-if="!item.children"  :key='item.id' :index="item.url" >{{item.title}}</el-menu-item>
        </template>



        </el-menu> 

        <!-- 侧边导航 -->
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header>
          <i class="el-icon-moon-night" @click = exit></i>
          <span>{{user.username}}</span>
        </el-header>
        <!-- 中心 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
 computed:{
   ...mapGetters({
     user:'user'
   }),
   //用来判断是否有目录
    hasChildren(){
      return this.user.menus[0].children?true:false
    }
 },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      changeUser:'changeUser',
    }),
    exit(){
      this.changeUser(null)
      this.$router.push('/login')
    }
  },
  mounted(){
    
  }
};
</script>
<style scoped>
.page {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
 .el-header {
  background: #b3c0d1;
  line-height: 60px;
}
.el-header span,.el-header
i {
  float: right;
  margin-right: 10px;
  line-height: 60px;
}
.con{
  margin-top: 20px;
}
</style>