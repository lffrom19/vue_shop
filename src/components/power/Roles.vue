<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showEditDialog">添加角色</el-button>
          <!-- 添加角色对话框 -->
          <el-dialog
            title="添加角色"
            :visible.sync="addEditDialogVisible"
            width="50%"
            @close="addDialogClosed"
          >
            <el-form
              label-width="100px"
              status-icon
              :model="addForm"
              ref="addFormRef"
            >
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addForm.roleName"></el-input
              ></el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input
                  v-model="addForm.roleDesc"
                ></el-input></el-form-item></el-form
            ><span slot="footer" class="dialog-footer">
              <el-button @click="addEditDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </span></el-dialog
          >
        </el-col>
      </el-row>
      <!-- 角色列表区 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand" width="50px"></el-table-column>
        <el-table-column type="index" width="200px" label="#"></el-table-column>
        <el-table-column
          label="角色名称"
          width="200px"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="角色描述"
          width="200px"
          prop="roleDesc"
        ></el-table-column>
        <el-table-column
          label="角色ID"
          width="200px"
          prop="id"
        ></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog2(scope.row.id)"
              >编辑</el-button
            >
            <!-- 编辑对话框 -->
            <el-dialog
              title="编辑角色"
              :visible.sync="editDialogVisible"
              width="50%"
            >
              <!-- 编辑用户的表单 -->
              <el-form ref="editFormRef" :model="editForm" label-width="80px">
                <el-form-item label="角色名称">
                  <el-input
                    v-model="editForm.roleName"
                    prop="roleName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                  <el-input v-model="editForm.roleDesc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >
            <!-- 分配角色按钮 -->
            <el-button type="warning" icon="el-icon-setting" size="mini"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      addEditDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      editForm: {
        roleId: '',
        roleName: '',
        roleDesc: ''
      }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('/roles')
      if (res.meta.status !== 200) {
        return this.$message.error('角色列表获取失败！')
      }
      this.rolesList = res.data
      // console.log(this.rolesList)
    },
    showEditDialog() {
      this.addEditDialogVisible = true
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 监听添加用户事件
    async addUser() {
      const { data: res } = await this.$http.post('/roles', this.addForm)
      // console.log(res)
      if (res.meta.status !== 201) {
        this.$message.error('添加角色失败！')
      }
      this.$message.success('添加角色成功！')
      this.addEditDialogVisible = false
      this.getRolesList()
    },
    // 点击编辑按钮 展开编辑用户对话框
    async showEditDialog2(id) {
      this.editDialogVisible = true
      // console.log(id)
      const { data: res } = await this.$http.get('/roles/' + id)
      if (res.meta.status !== 200) {
        this.$message.error('查询用户失败！')
      }
      // console.log(res.data)
      this.editForm.roleId = res.data.roleId
      this.editForm.roleName = res.data.roleName
      this.editForm.roleDesc = res.data.roleDesc
      // console.log(this.editForm.roleId)
      // console.log(this.editForm.roleName)
      // console.log(this.editForm.roleDesc)
    },
    // 提交编辑角色表单
    async editUserInfo() {
      // const obj1 = this.rolesList.forEach(obj => obj)
      // console.log()
      const { data: res } = await this.$http.put(
        '/roles/' + this.editForm.roleId,
        {
          roleName: this.editForm.roleName,
          roleDesc: this.editForm.roleDesc
        }
      )

      if (res.meta.status !== 200) {
        this.$message.error('修改角色失败！')
      } else {
        this.$message.success('修改角色成功！')
        this.editDialogVisible = false
        this.getRolesList()
      }
    },
    // 监听删除角色事件
    async removeUserById(id) {
      // console.log(id)
      const Removeres = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(e => e)
      // console.log(res)
      if (Removeres !== 'confirm') return
      const { data: res } = await this.$http.delete('/roles/' + id, id)

      // console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('删除用户失败！')
      } else {
        this.$message.success('删除用户成功！')
        this.getRolesList()
      }
    }
  }
}
</script>
