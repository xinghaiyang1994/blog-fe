import Vue from 'vue'
import Router from 'vue-router'

import Register from '../views/register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      redirect: '/posts'
    },
    {
      path: '/register',
      component: Register,
      meta: {
        active: '/register'
      }
    },
    {
      path: '/posts',
      meta: {
        active: '/posts'
      }
    },
  ]
})