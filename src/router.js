import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/users/Users.vue'




Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login',
      meta: {
        title: '登录-后台管理系统'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录-后台管理系统'
      }
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      meta: {
        title: '首页-后台管理系统'
      },
      children: [{
        path: '/welcome',
        component: Welcome
      }, {
        path: '/users',
        component: Users
      }]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 为页面添加routermeta的标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')

  next()
})
export default router
