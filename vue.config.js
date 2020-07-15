module.exports = {
  devServer: {
    host: '172.16.28.49',
    hotOnly: false,
    open: true,
    proxy: {
      '/jmxfxt': {
        target: 'http://172.16.28.190:7088/jmxfxt',
        changeOrigin: true,
        pathRewrite: {
          '^/jmxfxt': '/'
        }
      },
      '/arcgis': {
        target: 'http://172.16.28.49:6080/arcgis/rest/services/XMRoad/NAServer/Route/solve',
        changeOrigin: true
      }
    }
  }
}
