module.exports = {
  devServer: {
    hotOnly: true,
    open: true,
    proxy: {
      '/webapp': {
        target: 'http://172.16.28.190:7088/jmxfxt/',
        changeOrigin: true,
        pathRewrite: {
          '^/webapp': '/'
        }
      },
      '/arcgis': {
        target: 'http://172.16.28.49:6080/arcgis/rest/services/XMRoad/NAServer/Route/solve',
        changeOrigin: true
      }
    }
  }
}
