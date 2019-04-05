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

function getUserInfo (data) {
  return sleep(() => {
    // console.log(data) 
    const res = {
      code: 0,
      message: '数据请求成功',
      data: {
        id: 1,
        name: '张三'
      }
    }
    return res
  })
}

function getPostDetail (data) {
  return sleep(() => {
    // console.log(data) 
    const res = {
      code: 0,
      message: '数据请求成功',
      data: {
        userId: 1,
        id: 1,
        title: '标题',
        content: 'adsadsad',
        md: '111',
        comments: 10,
        pv: 10,
        gmtModified: 1554430879376,
        user: {
          name: '张三',
          avator: 'http://localhost:3000/images/6509ym2ysr1532075657682.png',
        },
      }
    }
    return res
  })
}

function getPostList (data) {
  return sleep(() => {
    // console.log(data) 
    const res = {
      code: 0,
      message: '数据请求成功',
      data: {
        list: [
          {
            id: 1,
            title: '标题',
            content: '标题标题标题标题标题标题标题标题标题标题111',
            comments: 10,
            pv: 10,
            gmtModified: 1554430879376,
            user: {
              name: '张三',
              avator: 'http://localhost:3000/images/6509ym2ysr1532075657682.png',
            }
          },
          {
            id: 2,
            title: '标题',
            content: 'adsadsad',
            comments: 10,
            pv: 10,
            gmtModified: 1554430879376,
            user: {
              name: '张三',
              avator: 'http://localhost:3000/images/6509ym2ysr1532075657682.png',
            }
          },
        ],
        total: 23
      }
    }
    return res
  })
}

let postUserRegister = postTest
let postUserLogin = postTest
let postPostAdd = postTest
let postPostModify = postTest
let postPostDelete = postTest
let postPostPv = postTest

let postCommentAdd = postTest
let postCommentModify = postTest
let postCommentDelete = postTest

function getCommentList (data) {
  return sleep(() => {
    // console.log(data) 
    const res = {
      code: 0,
      message: '数据请求成功',
      data: {
        list: [
          {
            id: 1,
            userId: 1,
            content: '评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1',
            user: {
              name: '张飒',
              avator: 'http://localhost:3000/images/6509ym2ysr1532075657682.png',
              gmtModified: 1554430879376,
            },
          },
          {
            content: '评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1评论1',
            user: {
              name: '张飒',
              avator: 'http://localhost:3000/images/6509ym2ysr1532075657682.png',
              gmtModified: 1554430879376,
            },
          },
        ],
        total: 23
      }
    }
    return res
  })
}

let getPostListMy = getPostList
let postUserLogout = getPostList

export {
  postUserRegister,
  postUserLogin,
  getUserInfo,
  postUserLogout,
  postPostAdd,
  postPostModify,
  postPostDelete,
  getPostDetail,
  getPostList,
  getPostListMy,
  postPostPv,
  postCommentAdd,
  postCommentModify,
  postCommentDelete,
  getCommentList
}