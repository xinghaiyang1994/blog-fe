<template>
  <div class="create">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="md">
        <el-input type="textarea" v-model="ruleForm.md" :rows="15" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validateForm">{{type === 'add' ? '发表' : '修改'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import API from '../service/index.js'
  import {
    checkTextMust
  } from '../utils/check.js'
  import {
    postPostAdd,
    postPostModify,
    getPostDetail
  } from '../api/index.js'

  export default {
    data () {
      return {
        captchaUrl: '',
        id: '',
        type: 'add',
        ruleForm: {
          title: '',
          md: ''
        },
        rules: {
          title: [
            { required: true, validator: checkTextMust, trigger: ['blur', 'change'], message: '不能为空!' },
            { max: 40, trigger: ['blur', 'change'], message: '最多 40 个字符!' },
          ],
          md: [
            { required: true, validator: checkTextMust, trigger: ['blur', 'change'], message: '不能为空!' },
          ]
        },
      }
    },
    methods: {
      validateForm () {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
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
          title: form.title,
          md: form.md
        }
        if (this.type === 'add') {
          this.addService(data)
        } else {
          data.id = this.id
          this.modifyService(data)
        }
      },
      addService (data) {
        console.log('新增数据', data)
        postPostAdd(data).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          setTimeout(() => {
            this.$router.push('/posts')
          }, 1000)
        }).catch(() => {})
      },
      modifyService (data) {
        console.log('修改数据', data)
        postPostModify(data).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          setTimeout(() => {
            this.$router.push('/posts')
          }, 1000)
        }).catch(() => {})
      }
    },
    created () {
      this.type = this.$route.meta.type
      if (this.type === 'edit') {
        this.id = this.$route.params.id
        getPostDetail({
          id: this.$route.params.id
        }).then(res => {
          let resData = res.data
          this.ruleForm = {
            title: resData.title,
            md: resData.md
          }
        }).catch(() => {})
      }
    }
  }
</script>