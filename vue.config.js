module.exports = {
  devServer: {
    hotOnly: true,
    open: true,
    proxy: {
      '/arcgis': {
        target: 'http://172.16.28.49:6080/arcgis/rest/services/XMRoad/NAServer/Route/solve',
        changeOrigin: true
      }
    }
  }
}
