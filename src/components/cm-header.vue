<template>
  <div class="cm-header clearfix">
    <div class="clearfix fl">
      <i class="cmh-logo el-icon-document fl"></i>
      <span class="cmh-title fl">Blog</span>
    </div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      class="fr"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/posts">全部文章</el-menu-item>
      <el-menu-item index="/register">注册</el-menu-item>
      <el-menu-item index="/login">登录</el-menu-item>
      <el-submenu index="my">
        <template slot="title">你好, name</template>
        <el-menu-item index="/myPosts">我的文章</el-menu-item>
        <el-menu-item index="/create">发表文章</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: ''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        this.$router.push(key)
      }
    },
    created () {
      this.activeIndex = this.$route.meta.active
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
