<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/img/avatar.jpg">
      </div>
      <el-form label-width="0px" class="login_form" :model="form">
        <el-form-item>
          <el-input prefix-icon="iconfont icon-people_fill" v-model="form.username"></el-input>
        </el-form-item>
         <el-form-item>
          <el-input prefix-icon="iconfont icon-lock_fill" v-model="form.password" type="password"></el-input>
        </el-form-item>
         <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgb(233, 232, 227);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 2px solid #000;
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end
}
.login_form {
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
