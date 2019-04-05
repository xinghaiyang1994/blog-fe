<template>
  <div class="posts">
    <cm-list 
      :list="list" 
      :page="page"
      @chgCurrent="chgCurrent">
    </cm-list>
  </div>
</template>

<script>
  import CmList from '../components/cm-list.vue'
  import {
    getPostListMy
  } from '../api/mock.js'

  const pageSize = 10

  export default {
    data () {
      return {
        list: [],
        page: {
          current: 1,
          pageSize,
          total: 0
        }
      }
    },
    methods: {
      chgCurrent (info) {
        this.page.current = info.current
        this.getList()
      },
      getList () {
        let data = {
          current: this.page.current,
          pageSize
        }
        console.log('列表请求', data)
        getPostListMy(data).then(res => {
          let resData = res.data
          this.list = resData.list
          this.page.total = resData.total
        }).catch(() => {})
      }
    },
    components: {
      CmList
    },
    created () {
      this.getList()
    }
  }
</script>

<style lang="scss" scoped>
  .posts{
  }
</style>
