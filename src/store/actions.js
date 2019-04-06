import {
  getUserInfo
} from '../api/index'

export default {
  getUser ({ commit }) {
    getUserInfo().then(res => {
      commit('chgUser', {
        user: res.data
      })
    }).catch(() => {})
  }
}