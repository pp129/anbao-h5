import axios from 'axios'
import store from '../../store'
import router from '../../router'
import { getToken, removeToken } from '@/utils/auth'
import { setCookie, getCookie } from '@/utils/cookie'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    redirecturl: '',
    layouttype: '1',
    // themeColor: '#14889A',  // 主题颜色
    // oldThemeColor: '#14889A',   // 上一次主题颜色
    roles: [],
    app: {},
    usedCasServer: '',
    permissionList: []

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USEDCASSERVER: (state, usedCasServer) => {
      state.usedCasServer = usedCasServer
    },
    SET_LAYOUTTYPE: (state, layouttype) => {
      state.layouttype = layouttype
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // setThemeColor (state, themeColor) {  // 改变主题颜色
    //   state.oldThemeColor = state.themeColor
    //   state.themeColor = themeColor
    // },
    SET_REDIRECTURL: (state, redirecturl) => {
      state.redirecturl = redirecturl
    },
    SET_APP: (state, app) => {
      state.app = app
    },
    SET_PERMISSION: (state, permissionList) => {
      state.permissionList = permissionList
    }
  },

  actions: {
    // 登录
    Login ({ commit }, user) {
      return axios.get('/jmxfxt/login/checkAccount?loginUser=' + user.username + '&loginPass=' + user.password)
        .then((response) => {
          if (response.data.flag) {
            setCookie('userToken', `${response.data.entity.token}`, 1)
            setCookie('userName', `${response.data.entity.name}`, 1)
            commit('SET_TOKEN', response.data.entity.token)
            commit('SET_NAME', response.data.entity.name)
          } else {
            return Promise.reject(response.data)
          }
        }
        )
    },

    certificateLogin ({ commit }, user) {
      return axios.get('/qwksh/login/certificateLogin')
        .then((response) => {
          if (response.data.flag) {
            setCookie('userToken', `${response.data.entity.token}`, 1)
            setCookie('userName', `${response.data.entity.name}`, 1)
            commit('SET_TOKEN', response.data.entity.token)
            commit('SET_NAME', response.data.entity.name)
          } else {
            return Promise.reject(response.data)
          }
        }
        )
    },

    async getUsedCasServer ({ commit }, usedCasServer) {
      axios.get('/dutystatic/config.json').then((res) => {
        commit('SET_USEDCASSERVER', res.data.usedCasServer)
      })
    },

    ChangeLayout ({ commit }, layoutvalue) {
      commit('SET_LAYOUTTYPE', layoutvalue)
    },

    // 获取用户信息以及加载平台管理路由
    GetInfo ({ commit, state }) {
      commit('SET_LAYOUTTYPE', '2')
      // commit('setThemeColor', '#121f37')
      if (store.getters.redirecturl === null || store.getters.redirecturl === undefined || store.getters.redirecturl === '') {
        // store.getters.toredirect = router.history.pending.path
        // commit('SET_TOREDIRECT', router.default.history.pending.path)
        commit('SET_REDIRECTURL', router.history.pending.path)
      }
      return new Promise((resolve, reject) => {
        axios.post('/jmxfxt/login/getPermission?systemName=ptglxt&toredirect=' + store.getters.redirecturl).then((response) => {
          if (response.data.flag) {
            commit('SET_NAME', response.data.entity.USER_NAME)
            var loginuser = getCookie('userName')
            if (loginuser === '' || loginuser === undefined) {
              setCookie('userName', response.data.entity.USER_NAME, 1 / 12)
            }
            commit('SET_ROLES', response.data.entity.menuList)
            commit('SET_PERMISSION', response.data.entity.permissionList)
            resolve(response)
          } else {
            setCookie('userName', '', -1)
            setCookie('userToken', '', -1)
          }
        })
        commit('SET_ROLES', store.getters.addRouters)
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      setCookie('userName', '', -1)
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_REDIRECTURL', '')
      removeToken()
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_REDIRECTURL', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
