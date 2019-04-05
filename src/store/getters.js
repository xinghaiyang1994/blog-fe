export default {
  isLogin (state) {
    return typeof state.user.id === 'undefined'
  }
}