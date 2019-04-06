<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <div class="clearfix">
          <el-input v-model="ruleForm.captcha" class="login-captcha-input fl" autocomplete="off"></el-input>
          <div @click="refresh" class="login-captcha-img-wrap fl">
            <img :src="captchaUrl" class="wh-all" alt="">
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validateForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import API from '../service/index.js'
  import store from '../store/index.js'
  import {
    checkTextMust,
    checkCaptcha
  } from '../utils/check.js'
  import {
    postUserLogin
  } from '../api/index.js'

  export default {
    data () {
      return {
        captchaUrl: '',
        ruleForm: {
          name: '',
          password: '',
          captcha: ''
        },
        rules: {
          name: [
            { required: true, validator: checkTextMust, trigger: ['blur', 'change'], message: '不能为空!' },
            { max: 20, trigger: ['blur', 'change'], message: '最多 20 个字符!' },
          ],
          password: [
            { required: true, trigger: ['blur', 'change'], message: '不能为空!' },
            { max: 20, trigger: ['blur', 'change'], message: '最多 20 个字符!' },
          ],
          captcha: [
            { required: true, trigger: ['blur', 'change'], message: '不能为空!' },
            { validator: checkCaptcha, trigger: ['blur', 'change'] }
          ]
        },
      }
    },
    methods: {
      refresh () {
        this.captchaUrl = `${API.COMMON_CAPTCHA}?t=${Date.now()}`
      },
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
          name: form.name,
          password: form.password,
          captcha: form.captcha
        }
        this.submitService(data)
      },
      submitService (data) {
        console.log('登录数据', data)
        postUserLogin(data).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          store.dispatch('getUser')
          setTimeout(() => {
            this.$router.push('/myPosts')
          }, 1000)
        }).catch(() => {})
      }
    },
    created () {
      this.refresh()
    }
  }
</script>

<style lang="scss" scoped>
  .login{
    width: 400px;
    .login-captcha-input{
      width: 170px;
    }
    .login-captcha-img-wrap{
      width: 118px;
      margin-left: 10px;
      height: 38px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
    }
  }
</style>
