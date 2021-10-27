import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import Welcome from "../components/Welcome.vue"
import Users from "../components/user/Users.vue"
import Rights from "../components/power/Rights.vue"
import Roles from "../components/power/Roles.vue"
import Cate from "../components/goods/Cate.vue"
import Params from "../components/goods/Params.vue"
import List from "../components/goods/List.vue"
import Add from "../components/goods/Add.vue"
import '../assets/css/gloabl.css'





Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Cate
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/goods',
          component: List
        },
        {
          path: '/goods/add',
          component: Add
        },


      ]

    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取tocken
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})




export default router