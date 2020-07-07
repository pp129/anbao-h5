import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/common.less'
import disableScale from '@utils/disableScale'

Vue.config.productionTip = false

Vue.use(Vant)

disableScale()// IOS10+ 阻止放大

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
