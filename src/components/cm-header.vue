<template>
  <div class="cm-header clearfix">
    <div @click="$router.push('/posts')" class="clearfix fl">
      <i class="cmh-logo el-icon-document fl"></i>
      <span class="cmh-title fl">Blog</span>
    </div>
    <el-menu
      :default-active="$route.meta.active"
      mode="horizontal"
      :router="true"
      class="fr"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/posts">全部文章</el-menu-item>
      <template v-if="user.id">
        <el-submenu index="my">
          <template slot="title">你好, {{user.name}}</template>
          <el-menu-item index="/myPosts">我的文章</el-menu-item>
          <el-menu-item index="/create">发表文章</el-menu-item>
          <el-menu-item @click="logout">退出</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item index="/register">注册</el-menu-item>
        <el-menu-item index="/login">登录</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import store from '../store/index.js'
  import {
    postUserLogout
  } from '../api/index.js'

  export default {
    data() {
      return {
        activeIndex: ''
      };
    },
    computed: {
      user () {
        return store.state.user
      }
    },
    methods: {
      logout () {
        postUserLogout().then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          store.commit('chgUser', {
            user: {}
          })
          setTimeout(() => {
            this.$router.push('/posts')
          }, 1000);
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cm-header{
    background: #545c64;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .cmh-logo{
      font-size: 30px;
      line-height: 61px;
      margin-left: 20px;
      color: #fff;
    }
    .cmh-title{
      font-size: 30px;
      line-height: 61px;
      color: #fff;
      margin-left: 10px;
    }

  }
</style>
