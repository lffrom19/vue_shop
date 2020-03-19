<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <!-- 侧边栏 -->
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246)"
        class="aside"
      >
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header style="text-align: right; font-size: 12px">
          <el-button type="Info" @click="logout">111</el-button></el-header
        >
        <!-- 主体 -->
        <el-main> </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scope></style>
