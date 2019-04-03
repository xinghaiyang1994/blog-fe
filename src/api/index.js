import ajaxInt from 'sea-axios'
import API from '../service'
import vueInstance from '../main'

let ajax = ajaxInt({
  initCookie: false,
  json: false,
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
function postCommonRegister (data) {
  return ajax({
    type: 'post',
    url: API.COMMON_REGISTER,
    data
  })
}


export {
  postCommonRegister
}