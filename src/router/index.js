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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
