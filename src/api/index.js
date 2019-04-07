import ajaxInt from 'sea-axios'
import API from '../service'
import vueInstance from '../main'

let ajax = ajaxInt({
  // 响应统一处理
  initTransformResponseFn(res) {
    if (res.status === 200 && res.data.code !== 0) {
      vueInstance.$message({
        type: 'error',
        message: res.data.message,
        showClose: true
      })
      throw new Error()
    }
    return res
  }
})

// 注册
function postUserRegister (data) {
  return ajax({
    type: 'post',
    url: API.USER_REGISTER,
    data
  })
}

// 登录
function postUserLogin (data) {
  return ajax({
    type: 'post',
    url: API.USER_LOGIN,
    data
  })
}

// 当前登录人信息
function getUserInfo () {
  return ajax({
    type: 'get',
    url: API.USER_INFO,
  })
}

// 退出
function postUserLogout () {
  return ajax({
    type: 'post',
    url: API.USER_LOGOUT
  })
}

// 新增文章
function postPostAdd (data) {
  return ajax({
    type: 'post',
    url: API.POST_ADD,
    data
  })
}

// 修改文章
function postPostModify (data) {
  return ajax({
    type: 'post',
    url: API.POST_MODIFY,
    data
  })
}

// 删除文章
function postPostDelete (data) {
  return ajax({
    type: 'post',
    url: API.POST_DELETE,
    data
  })
}

// 文章列表
function getPostList (data) {
  return ajax({
    type: 'get',
    url: API.POST_LIST,
    data
  })
}

// 我的文章列表
function getPostListMy (data) {
  return ajax({
    type: 'get',
    url: API.POST_LIST_MY,
    data
  })
}

// 文章详情
function getPostDetail (data) {
  return ajax({
    type: 'get',
    url: API.POST_DETAIL,
    data
  })
}

// 增加浏览量
function postPostPv (data) {
  return ajax({
    type: 'post',
    url: API.POST_PV,
    data
  })
}

// 新增评论
function postCommentAdd (data) {
  return ajax({
    type: 'post',
    url: API.COMMENT_ADD,
    data
  })
}

// 删除评论
function postCommentDelete (data) {
  return ajax({
    type: 'post',
    url: API.COMMENT_DELETE,
    data
  })
}

// 评论列表
function getCommentList (data) {
  return ajax({
    type: 'get',
    url: API.COMMENT_LIST,
    data
  })
}

export {
  // 用户
  getUserInfo,
  postUserRegister,
  postUserLogin,
  postUserLogout,
  // 文章
  postPostAdd,
  postPostModify,
  postPostDelete,
  getPostList,
  getPostListMy,
  getPostDetail,
  postPostPv,
  // 评论
  postCommentAdd,
  postCommentDelete,
  getCommentList
}