<template>
    <div class="main">
      <div id="map" style="width: 100%;height: 300px;"></div>
    </div>
</template>

<script>
export default {
  name: 'baseInfo',
  data () {
    return {
      map: null,
      mapOpt: { // 地图参数配置
        zoom: 12, // 放大倍数
        center: [118.183209, 24.489003],
        mapName: 'tiandi',
        mapSource: 'onLine', // 是否离线
        overview: false
      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.map = new WMap.Map('map', {
        zoom: this.mapOpt.zoom,
        center: this.mapOpt.center,
        mapName: this.mapOpt.mapName,
        city: 'xiamen',
        mapSource: this.mapOpt.mapSource,
        maxZoom: 18, // 地图放大最大等级
        overview: this.mapOpt.overview // 是否显示小地图
      })
    }
  }
}
</script>

<style scoped>

</style>
