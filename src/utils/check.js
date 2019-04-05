// 所有校验
// 文本必填（多个空格也不通过）
function checkTextMust (rule, value, callback) {
  let sValue = value + ''
  if (sValue.trim() === '') {
    return callback(new Error('不能为空!'))
  }
  return callback()
}

// 文件数量
function checkFileList (rule, value, callback) {
  if (value.length === 0) {
    return callback(new Error('不能为空'))
  }
  return callback()
}

// 验证码格式
function checkCaptcha (rule, value, callback) {
  let sValue = value + ''
  if (sValue.trim() === '') {
    return callback(new Error('不能为空!'))
  }
  if (!/[a-zA-Z0-9]{4}/.test(sValue)) {
    return callback(new Error('只能输入 4 位验证码!'))
  }
  return callback()
}

export {
  checkTextMust,
  checkFileList,
  checkCaptcha
}