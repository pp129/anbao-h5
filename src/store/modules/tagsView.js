const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: [],
    navtagViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (state.visitedViews.length < 2) {
        state.navtagViews = state.visitedViews
      } else {
        state.navtagViews = state.visitedViews.slice(state.visitedViews.length - 1, state.visitedViews.length)
      }
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      if (state.visitedViews.length < 2) {
        state.navtagViews = state.visitedViews
      } else {
        state.navtagViews = state.visitedViews.slice(state.visitedViews.length - 1, state.visitedViews.length)
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const [i, v] of state.navtagViews.entries()) {
        if (v.path === view.path) {
          state.navtagViews = state.navtagViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    ACTIVE_NOW_VIEWS: (state, view) => {
      state.navtagViews = [{
        name: view.name,
        path: view.path,
        title: view.title || 'no-name'
      }]
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
      state.navtagViews = []
    }
  },
  actions: {
    addVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    activeNowViews ({ commit, state }, view) {
      commit('ACTIVE_NOW_VIEWS', view)
    },
    delVisitedViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
        resolve([...state.navtagViews])
      })
    },
    delOthersViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
        resolve([...state.navtagViews])
      })
    },
    delAllViews ({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
        resolve([...state.navtagViews])
      })
    }
  }
}

export default tagsView
