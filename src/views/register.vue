<template>
  <div class="register">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name" :rules="rules.must">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="rules.must">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="repeatPassword">
        <el-input type="password" v-model="ruleForm.repeatPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上传头像" prop="fileList">
        <el-upload
          :action="commonUpload"
          list-type="picture"
          :file-list="ruleForm.fileList"
          :before-upload="handleBefore"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validateForm()">注册</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import API from '../service/index.js'
  import {
    postCommonRegister
  } from '../api/index.js'

  export default {
    data () {
      // 重复密码校验
      const checkRepeatPassword = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('不能为空'))
        }
        if (value !== this.ruleForm.password) {
          return callback(new Error('两次输入密码不一致'))
        }
        return callback()
      }
      // 文件数量校验
      const checkFileList = (rule, value, callback) => {
        if (value.length === 0) {
          return callback(new Error('不能为空'))
        }
        return callback()
      }

      return {
        commonUpload: API.COMMON_UPLOAD,
        ruleForm: {
          name: '',
          password: '',
          repeatPassword: '',
          fileList: []
        },
        rules: {
          must: [
            { required: true, trigger: ['blur', 'change'], message: '不能为空' },
          ],
          repeatPassword: [
            { required: true, trigger: ['blur', 'change'], message: '不能为空' },
            { validator: checkRepeatPassword, trigger: ['blur', 'change'] }
          ],
          fileList: [
            { required: true, trigger: ['blur', 'change'], message: '不能为空' },
            { validator: checkFileList, trigger: ['blur', 'change'] }
          ]
        },
      }
    },
    methods: {
      checkFileList () {
        this.$refs['ruleForm'].validateField('fileList')
      },
      handleBefore (file) {
        if (!/\.(jpg|jpeg|png|gif)$/.test(file.name.toLowerCase())) {
          this.$message({
            type: 'error',
            message: '只能上传 png、jpeg、jpg、gif 格式的图片！'
          })
          return false
        }
        if (file.size > 2 * 1024 * 1024) {
          this.$message({
            type: 'error',
            message: '不能超过 2M ！'
          })
          return false
        }
      },
      handleRemove(file, fileList) {
        this.ruleForm.fileList = []
        this.checkFileList()
      },
      handleSuccess (res, file, fileList) {
        if (res.code !== 0) {
          // 是否已存在文件
          if (fileList.length > 1) {
            this.ruleForm.fileList = [fileList[0]]
          } else {
            this.ruleForm.fileList = []
          }
          return this.$message({
            type: 'error',
            message: res.message
          })
        } 
        file.fileUrl = res.data.fileUrl
        this.ruleForm.fileList = [file]
        this.checkFileList()
      },
      resetForm () {
        this.$refs['ruleForm'].resetFields()
      },
      validateForm () {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            alert('submit!')
            this.dealData()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      dealData () {
        let form = JSON.parse(JSON.stringify(this.ruleForm))
        let data = {
          name: form.name,
          password: form.password,
          repeatPassword: form.repeatPassword,
          avator: form.fileList[0].fileUrl
        }
        this.submitService(data)
      },
      submitService (data) {
        console.log('注册数据', data)
        postCommonRegister().then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register{
    width: 400px;
  }
</style>
