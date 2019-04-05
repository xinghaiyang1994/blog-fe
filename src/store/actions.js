import {
  getUserInfo
} from '../api/mock'

export default {
  getUser ({ commit }) {
    getUserInfo().then(res => {
      commit('chgUser', {
        user: res.data
      })
    }).catch(() => {})
  }
}