import router from './router'
import store from './store'

import { getToken } from '@/utils/auth' // getToken from cookie

const whiteList = ['/login']// no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 获取token
  const hasToken = getToken()
  /* has no token
  */
  if (hasToken) { // 有token
    if (to.path === '/login') {
      // 如果已经获取了token则进入首页
      next({ path: '/list' })
    } else if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetInfo').then(res => { // 拉取user_info
        store.dispatch('GenerateRoutes', res.data.entity.menuList).then(() => {
          // 生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true })
        })
      }).catch(() => {
        store.dispatch('FedLogOut').then(() => {
          // location.reload()
          next('/login')
        })
      })
    } else { // 有用户信息直接进入
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) { // 没有token在白名单中的直接进入
    next()
  } else {
    // Message.error('请重新登录')
    next('/login')
  }
})
