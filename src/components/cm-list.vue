<template>
  <div class="cm-list">
    <el-timeline>
      <el-timeline-item 
        v-for="(item, index) in list" 
        :key="index"
        :timestamp="item.gmtModified | dateTime" 
        placement="top">
        <el-card>
          <div @click="toDetail(item.id)" class="cml-list-item">
            <h4 class="cml-title">{{item.title}}</h4>
            <p class="cml-conetnt" v-html="item.content"></p>
            <div class="cml-bottom clearfix">
              <div class="fl clearfix">
                <span class="cml-bottom-img fl mr-10">
                  <img :src="imgUrl + item.user.avator" class="wh-all" alt="">
                </span>
                <span class="fl mr-20">作者:{{item.user.name}}</span>
              </div>
              <div class="fr clearfix">
                <span class="fl mr-20">评论数:{{item.comments}}</span>
                <span class="fl">浏览量:{{item.pv}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div class="cml-page">
      <el-pagination
        v-if="list.length > 0"
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

<script>
  import API from '../service/index.js'

  export default {
    data () {
      return {
        imgUrl: API.IMG_URL
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      page: {
        type: Object,
        default: {}
      }
    },
    methods: {
      chgCurrent (index) {
        this.$emit('chgCurrent', {
          current: index
        })
      },
      toDetail (index) {
        this.$router.push(`/post/${index}`)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .cm-list{

    .cml-page{
      text-align: center;
    }
    .cml-title{
      font-size: 22px;
      color: #1f2f3d;
      line-height: 30px;
    }
    .cml-conetnt{
      padding: 5px 0;
      font-size: 16px;
      margin-bottom: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
      &:hover{
        background: #f5f7fa;
      }
    }

  }
</style>
<style lang="scss">
  .cm-list{
    .el-card__body {
      padding: 0;
    }
  }
</style>
