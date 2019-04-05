const DOMAIN = '//local.xinghaiyang.com:3100'

const API = {
  IMG_URL: DOMAIN + '/',   // 图片路径

  // 公共
  COMMON_UPLOAD: DOMAIN + '/common/upload',   // 上传图片
  COMMON_CAPTCHA: DOMAIN + '/common/captcha',   // 获取验证码
  
  // 用户
  USER_INFO: DOMAIN + '',   // 当前登录人信息
  USER_REGISTER: DOMAIN + '',   // 注册
  USER_LOGIN: DOMAIN + '',   // 登录
  USER_LOGOUT: DOMAIN + '',   // 退出

  // 文章
  POST_ADD: DOMAIN + '',   // 新增文章
  POST_MODIFY: DOMAIN + '',   // 修改文章
  POST_DELETE: DOMAIN + '',   // 删除文章
  POST_LIST: DOMAIN + '',   // 文章列表
  POST_LIST_MY: DOMAIN + '',   // 我的文章列表
  POST_DETAIL: DOMAIN + '',   // 文章详情
  POST_PV: DOMAIN + '',   // 增加浏览量

  // 评论
  COMMENT_ADD: DOMAIN + '',   // 新增评论
  COMMENT_MODIFY: DOMAIN + '',   // 修改评论
  COMMENT_DELETE: DOMAIN + '',   // 删除评论
  COMMENT_LIST: DOMAIN + '',   // 评论列表

  TEST_URL: '//xinghaiyang.com/test/b.php'
}

export default API