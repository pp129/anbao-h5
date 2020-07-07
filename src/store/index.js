import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showRight: false
  },
  mutations: {
    set_show_right: (flag) => {
      this.state.showRight = flag
    }
  },
  actions: {
    setShowRight ({ commit }) {
      commit('set_show_right')
    }
  },
  modules: {
  }
})
