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
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="menu">菜单管理</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
              <el-menu-item index="manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="sort">商品分类</el-menu-item>
              <el-menu-item index="spec">商品规格</el-menu-item>
              <el-menu-item index="goods">商品管理</el-menu-item>
              <el-menu-item index="member">会员管理</el-menu-item>
              <el-menu-item index="banner">轮播图管理</el-menu-item>
              <el-menu-item index="seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <!-- 侧边导航 -->
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header>
          <i class="el-icon-share"></i>
          <span>admin</span>
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
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
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
.el-header span,
i {
  float: right;
  margin-right: 10px;
  line-height: 60px;
}
.con{
  margin-top: 20px;
}
</style>