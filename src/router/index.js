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
    component: () => import('@/views/events'),
    meta: {
      title: 'events'
    }
  },
  {
    path: '/scheduleEdit',
    name: 'scheduleEdit',
    component: () => import('@/views/forms/scheduleEdit'),
    meta: {
      title: 'scheduleEdit',
      from: 'schedule'
    }
  },
  {
    path: '/memberEdit',
    name: 'memberEdit',
    component: () => import('@/views/forms/memberEdit'),
    meta: {
      title: 'memberEdit',
      from: 'member'
    }
  },
  {
    path: '/securityEdit',
    name: 'securityEdit',
    component: () => import('@/views/forms/securityEdit'),
    meta: {
      title: 'securityEdit',
      from: 'security'
    }
  },
  {
    path: '/carsEdit',
    name: 'carsEdit',
    component: () => import('@/views/forms/carsEdit'),
    meta: {
      title: 'carsEdit',
      from: 'cars'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

export const asyncRouterMap = []

export default router
