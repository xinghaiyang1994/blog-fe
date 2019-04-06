<template>
  <div class="detail">
    <div class="cml-list-item">
      <h4 class="cml-title">{{detail.title}}</h4>
      <p class="cml-conetnt" v-html="detail.content"></p>
      <div class="cml-bottom clearfix">
        <div class="fl clearfix">
          <span class="cml-bottom-img fl mr-10">
            <img :src="imgUrl + detail.user.avator" class="wh-all" alt="">
          </span>
          <span class="fl mr-20">作者:{{detail.user.name}}</span>
        </div>
        <div class="fr clearfix">
          <span class="fl mr-20">评论数:{{detail.comments}}</span>
          <span class="fl">浏览量:{{detail.pv}}</span>
        </div>
      </div>
      <div v-if="detail.userId === user.id" class="clearfix">
        <div class="fr">
          <el-button @click="edit" title="修改" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="deletePost" title="删除" type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="mb-20">
      <el-form-item prop="comment">
        <el-input ref="comment" type="textarea" v-model="ruleForm.comment"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validateForm">发表评论</el-button>
      </el-form-item>
    </el-form>
    <template v-if="comments.length > 0">
      <ul class="detail-comment">
        <li v-for="(item, index) in comments" 
          :key="index" 
          class="detail-comment-list clearfix">
          <div class="detail-comment-list-img fl">
            <img :src="imgUrl + item.user.avator" class="wh-all" alt="">
          </div>
          <div class="detail-comment-list-right fl">
            <div class="clearfix">
              <span class="detail-clr-name fl">{{item.user.name}}</span>
              <span class="detail-clr-time fr">{{item.user.gmtModified | dateTime}}</span>
            </div>
            <div class="detail-clr-content markdown-body">{{item.content}}</div>
            <div class="clearfix" v-if="item.userId === user.id">
              <i @click="deleteComment(item.id)" class="detail-clr-delete el-icon-delete fr" title="删除"></i>
            </div>
          </div>
        </li>
      </ul>
      <div class="detail-page">
        <div class="cml-page">
          <el-pagination
            :current-page="page.current"
            :total="page.total"
            :page-size="page.pageSize"
            @current-change="chgCurrent"
            background
            layout="prev, pager, next">
          </el-pagination>
        </div>
      </div>
    </template>
    <div v-else class="detail-comment-no">暂无评论</div>
  </div>
</template>

<script>
  import 'github-markdown-css'
  import API from '../service/index.js'
  import store from '../store/index.js'
  import {
    checkTextMust
  } from '../utils/check.js'
  import {
    postCommentAdd,
    getCommentList,
    postCommentDelete
  } from '../api/mock.js'
  import {
    postPostPv,
    getPostDetail,
    postPostDelete,
  } from '../api/index.js'

  const pageSize = 5

  export default {
    data () {
      return {
        imgUrl: API.IMG_URL,
        id: '',   // 文章id
        detail: {
          userId: '',
          title: '',
          content: '',
          comments: 0,
          pv: 0,
          gmtModified: '',
          user: {
            name: '',
            avator: '',
          }
        },
        comments: [],
        page: {
          current: 1,
          pageSize,
          total: 0
        },
        ruleForm: {
          comment: ''
        },
        rules: {
          comment: [
            { required: true, validator: checkTextMust, trigger: ['blur', 'change'], message: '不能为空!' }
          ]
        }
      }
    },
    computed: {
      user () {
        return store.state.user
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
          id: this.id,
          comment: form.comment
        }
        this.submitService(data)
      },
      submitService (data) {
        console.log('新增评论', data)
        postCommentAdd(data).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.$refs['ruleForm'].resetFields()
          
          // 刷新列表
          this.page.current = 1
          this.getCommentList()
        }).catch(() => {})
      },
      edit () {
        this.$router.push(`/posts/${this.detail.id}/edit`)
      },
      deletePost () {
        this.$confirm('是否要删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postPostDelete({
            id: this.id
          }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            setTimeout(() => {
              this.$router.push('/posts')
            }, 1000)
          }).catch(() => {})
        }).catch(() => {})
      },
      chgCurrent (index) {
        this.page.current = index
        this.getCommentList()
      },
      getCommentList () {
        let data = { 
          id: this.id,
          current: this.page.current,
          pageSize
        }
        console.log('列表请求', data)
        getCommentList(data).then(res => {
          let resData = res.data
          this.comments = resData.list
          this.page.total = resData.total
        }).catch(() => {})
      },
      deleteComment (id) {
        this.$confirm('是否要删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postCommentDelete({
            id
          }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 刷新列表
            this.page.current = 1
            this.getCommentList()
          }).catch(() => {})
        }).catch(() => {})
      }
    },
    created () {
      let id = this.$route.params.id
      this.id = id

      // 增加 pv
      postPostPv({ id }).catch(() => {})

      // 获取文章详情
      getPostDetail({ id }).then(res => {
        this.detail = res.data
      }).catch(() => {})

      // 获取评论列表
      this.getCommentList()
    }
  }
</script>

<style lang="scss">
  @import '../style/variables.scss';
  .detail{
    .cml-title{
      font-size: 22px;
      color: #1f2f3d;
      line-height: 30px;
    }
    .cml-conetnt{
      padding: 5px 0;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .cml-bottom{
      line-height: 30px;
      font-size: 14px;
    }
    .cml-bottom-img{
      width: 28px;
      height: 28px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      overflow: hidden;
    }
    .cml-list-item{
      cursor: pointer;
      padding: 20px;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
    }
    .detail-comment{
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .detail-comment-list{
      padding: 10px 20px;
      border-top: 1px solid #ddd;
      &:first-child{
        border-top: none;
      }
    }
    .detail-comment-list-img{
      width: 38px;
      height: 38px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      overflow: hidden;
      margin-right: 10px;
    }
    .detail-comment-list-right{
      width: 708px;
    }
    .detail-clr-name{
      font-size: 14px;
      line-height: 30px;
      color: #98a3aa;
    }
    .detail-clr-time{
      color: #ccc;
      font-size: 14px;
      line-height: 30px;
    }
    .detail-clr-content{
      font-size: 16px;
      color: #333333;
    }
    .detail-page{
      text-align: center;
    }
    .detail-comment-no{
      text-align: center;
      color: $--color-primary;
    }
    .detail-clr-delete{
      color: #F56C6C;
      cursor: pointer;
      &:hover{
        opacity: .5;
      }
    }


  }
</style>
