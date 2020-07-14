import { asyncRouterMap, constantRouterMap } from '../../router'
// import Layout from '../../views/layout/Layout'
// import $ from 'jquery'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  var rolestr = ''
  for (var i = 0; i < roles.length; i++) {
    rolestr += roles[i].MENU_URL
  }
  if (route.menu) {
    return rolestr.indexOf(route.menu) > -1
    // return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  // 过滤筛选出符合权限的路由放入 accessedRouters中 最后return filter中返回true的数据保留 false剔除
  const accessedRouters = asyncRouterMap.filter(route => {
    // console.log(route)
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        // 如果这个路由下面还有下一级的话,就递归调用
        route.children = filterAsyncRouter(route.children, roles)
        // 如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
/* eslint-disable */
function deepClone (data) {
  const type = judgeType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {    // 不再具有下一层次
    return data;
  } 
  if (type === 'array') {        // eslint-disable-next-line
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {        // 对原型上的方法也拷贝了....
    // eslint-disable-next-line
    for (const key in data) {
      obj[key] = deepClone(data[key])
    }
  } 
  return obj
}
function judgeType (obj) {  // tostring会返回对应不同的标签的构造函数
  const toString = Object.prototype.toString; 
  const map = {
    '[object Boolean]': 'boolean', '[object Number]': 'number', '[object String]': 'string', '[object Function]': 'function', '[object Array]': 'array', '[object Date]': 'date', '[object RegExp]': 'regExp', '[object Undefined]': 'undefined', '[object Null]': 'null', '[object Object]': 'object',
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, {routers, addRoutes}) => {
      state.addRouters = addRoutes
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const menus = data
        let asyncRouterMap1 = deepClone(asyncRouterMap)
        let accessedRouters
        accessedRouters = filterAsyncRouter(asyncRouterMap1[0].children, menus)
        asyncRouterMap1[0].children = accessedRouters
        let routers = JSON.parse(JSON.stringify(asyncRouterMap1))
        let addRoutes = []
        accessedRouters.forEach(item => {
          if (item.children && item.children.length > 0) {
            addRoutes = addRoutes.concat(item.children)
          }
        })
        asyncRouterMap1[0].children = addRoutes
        
        // if (roles.roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        commit('SET_ROUTERS', {routers, addRoutes:asyncRouterMap1})
        resolve()
      })
    }
  }
}

export default permission
