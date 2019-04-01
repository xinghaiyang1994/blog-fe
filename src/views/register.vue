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
      <el-form-item label="上传头像" prop="avator" :rules="rules.must">
        
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture"
          :limit="1"
          :on-preview="handlePictureCardPreview"
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
export default {
  data () {
    // 重复密码校验
    const checkRepeatPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('不能为空'))
      }
      console.log(this)
      if (value !== this.ruleForm.password) {
        return callback(new Error('两次输入密码不一致'))
      }
      return callback()
    }

    return {
      ruleForm: {
        name: '',
        password: '',
        repeatPassword: '',
        avator: '',
      },
      rules: {
        must: [
          { required: true, trigger: ['blur', 'change'], message: '不能为空' },
        ],
        repeatPassword: [
          { required: true, trigger: ['blur', 'change'], message: '不能为空' },
          { validator: checkRepeatPassword, trigger: ['blur', 'change'] }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    validateForm () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .register{
    width: 400px;
  }
</style>
