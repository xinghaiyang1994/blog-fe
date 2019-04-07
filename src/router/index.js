import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/index'

import Register from '../views/register.vue'
import Login from '../views/login.vue'
import Posts from '../views/posts.vue'
import MyPosts from '../views/my-posts.vue'
import Detail from '../views/detail.vue'
import Create from '../views/create.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      redirect: '/posts'
    },
    // 注册
    {
      path: '/register',
      component: Register,
      meta: {
        active: '/register'
      }
    },
    // 登录
    {
      path: '/login',
      component: Login,
      meta: {
        active: '/login'
      }
    },
    // 我的文章
    {
      path: '/myPosts',
      component: MyPosts,
      meta: {
        active: '/myPosts',
        auth: true
      }
    },
    // 所有文章
    {
      path: '/posts',
      component: Posts,
      meta: {
        active: '/posts'
      }
    },
    // 详情页
    {
      path: '/post/:id',
      component: Detail
    },
    // 发表文章
    {
      path: '/create',
      component: Create,
      meta: {
        active: '/create',
        type: 'add',
        auth: true
      }
    },
    // 编辑文章
    {
      path: '/posts/:id/edit',
      component: Create,
      meta: {
        type: 'edit',
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('未登录跳转')
    return next('/')
  }
  return next()
})

export default router