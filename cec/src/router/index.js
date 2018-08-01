import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login.vue'
import Profile from '@/components/Profile.vue'
import App from '@/App.vue'
import store from '../store'

Vue.use(Router)

var router = new Router({
  routes: [{
    path: '/hello',
    name: 'HelloWorld',
    component: resolve => require(['@/components/HelloWorld'], resolve),
    meta: {requiresAuth: true}
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    props: (route) => ({redirect: route.query.redirect})
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    props: (route) => ({redirect: route.query.redirect})
  },
  {
    path: '/',
    name: 'Home',
    component: App,
    meta: {requiresAuth: true},
    props: (route) => ({redirect: route.query.redirect})
  }]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    console.log("lietao", store.state)
    // if not, redirect to login page.
    if (!store.state.login.isLogin) {
      console.log("lietao2", store.state.isLogin)
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      console.log("lietao3", store.state.isLogin)
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
