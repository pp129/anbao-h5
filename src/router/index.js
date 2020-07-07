import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'list',
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
  routes
})

export default router
