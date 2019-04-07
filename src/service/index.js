const ENV = process.env.VUE_APP_ENV

const URL = {
  DEV: '//local.xinghaiyang.com:3100',    // 本地测试
  PRO: '//xinghaiyang:8999'   // 线上
}

const DOMAIN = URL[ENV]

console.log('ENV: %s, DOMAIN: %s', process.env.VUE_APP_ENV, DOMAIN)

const API = {
  IMG_URL: DOMAIN + '/',   // 图片路径

  // 公共
  COMMON_UPLOAD: DOMAIN + '/common/upload',   // 上传图片
  COMMON_CAPTCHA: DOMAIN + '/common/captcha',   // 获取验证码
  
  // 用户
  USER_INFO: DOMAIN + '/user/info',   // 当前登录人信息
  USER_REGISTER: DOMAIN + '/user/register',   // 注册
  USER_LOGIN: DOMAIN + '/user/login',   // 登录
  USER_LOGOUT: DOMAIN + '/user/logout',   // 退出

  // 文章
  POST_ADD: DOMAIN + '/post/add',   // 新增文章
  POST_MODIFY: DOMAIN + '/post/modify',   // 修改文章
  POST_DELETE: DOMAIN + '/post/delete',   // 删除文章
  POST_LIST: DOMAIN + '/post/list',   // 文章列表
  POST_LIST_MY: DOMAIN + '/post/listMy',   // 我的文章列表
  POST_DETAIL: DOMAIN + '/post/detail',   // 文章详情
  POST_PV: DOMAIN + '/post/pv',   // 增加浏览量

  // 评论
  COMMENT_ADD: DOMAIN + '/comment/add',   // 新增评论
  COMMENT_DELETE: DOMAIN + '/comment/delete',   // 删除评论
  COMMENT_LIST: DOMAIN + '/comment/list',   // 评论列表
}

export default API