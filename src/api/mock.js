// mock 
function sleep (fn, time) {
  let sTime = time || 200
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(fn())
    }, sTime)
  })
}

function postTest (data) {
  return sleep(() => {
    // console.log(data) 
    const res = {
      code: 0,
      message: '数据请求成功',
      data: {
        id: 123
      }
    }
    return res
  })
}

export {

}