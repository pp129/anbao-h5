import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      title: 'login'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/list/index'),
    meta: {
      title: 'list'
    }
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/events')
  },
  {
    path: '/scheduleEdit',
    name: 'scheduleEdit',
    component: () => import('@/views/forms/scheduleEdit')
  },
  {
    path: '/memberEdit',
    name: 'memberEdit',
    component: () => import('@/views/forms/memberEdit')
  },
  {
    path: '/securityEdit',
    name: 'securityEdit',
    component: () => import('@/views/forms/securityEdit')
  },
  {
    path: '/carsEdit',
    name: 'carsEdit',
    component: () => import('@/views/forms/carsEdit')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

export const asyncRouterMap = []

export default router
