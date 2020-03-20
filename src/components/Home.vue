<template>
  <el-container class="home-container">
    <!-- 头部区域-->
    <el-header>
      <div>
        <span>后台管理系统</span>
      </div>
      <el-button type="Info" @click="logout">退出</el-button></el-header
    >
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="isCollaspe?'64px':'200px'">
        <el-menu
          background-color="#fff"
          text-color="#212121"
          active-text-color="#73c9e5"
          unique-opened
          :collapse="this.isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <div class="toggle-button" @click="toggleCollapse">&lt;</div>
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="savaNavtate('/' + subItem.path)"
            >
              <!-- 二级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu></el-aside
      >
      <!-- 右下主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    savaNavtate(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scope>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #373d41;
  height: 200px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #73c9e5;
  font-size: 35px;
}
.el-aside {
  background-color: #fff;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100vh;
}
.toggle-button {
  background-color: #73c9e5;
  font-size: 30px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
