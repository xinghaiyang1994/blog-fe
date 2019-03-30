import ajaxInt from 'sea-axios'
import API from '../service'

let ajax = ajaxInt({
  initCookie: false,
  json: false
})

function getOne (data) {
  return ajax({
    type: 'get',
    url: API.one,
    data
  })
}


export {
  getOne
}