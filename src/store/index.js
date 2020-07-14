import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  modules: {
    app,
    errorLog,
    user,
    permission,
    tagsView
  }
})
export default store
