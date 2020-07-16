
export default {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userCasServer: state => state.user.userCasServer,
  layouttype: state => state.user.layouttype, // 整体布局
  avatar: state => state.user.avatar,
  redirecturl: state => state.user.redirecturl, // 获取即将跳转路径
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  permissionList: state => state.user.permissionList,
  addRouters: state => state.permission.addRouters,
  getMap: state => state.map, // 获取地图
  getInfo: state => state.user.info
}
