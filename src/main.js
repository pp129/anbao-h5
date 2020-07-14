import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/common.less'
import disableScale from './utils/disableScale'
import axios from 'axios'
import { getToken } from './utils/auth'
import { setCookie } from '@/utils/cookie'

Vue.config.productionTip = false

Vue.use(Vant)

disableScale()// IOS10+ 阻止放大

axios.interceptors.request.use(request => {
  const userToken = getToken()
  if (userToken) {
    request.headers.UserToken = userToken
  }
  return request
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const flag = response.data.flag
  if (flag !== undefined) {
    const unAuth = response.data.code
    if (unAuth === 1000004 || unAuth === 1000007 || unAuth === 1000006) {
      setCookie('userName', '', -1)
      setCookie('userToken', '', -1)
      router.replace({
        path: '/login'
      }).then(r => {})
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
