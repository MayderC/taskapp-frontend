import { createRouter, createWebHashHistory } from 'vue-router'
import TaskMain from '../views/TaskMain'
import TLoginForm from '../components/t-login-form/TLoginForm'
import TRegisterForm from '../components/t-register-form/TRegisterForm'
import TaskHome from '../views/TaskHome'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: TaskMain,
    children : [
      {
        path : "login",
        component: TLoginForm
      },
      {
        path : "register",
        component : TRegisterForm
      },
      {
        path : "/",
        component : TaskHome
      }
    ]
  },/*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  }
  */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
