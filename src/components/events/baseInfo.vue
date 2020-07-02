<template>
    <div class="main">
      <div id="map" style="width: 100%;height: 300px;position: relative;z-index: 1;">
        <div class="draw" v-if="showDraw" @click="showTools=!showTools">
          <span class="draw-icon"></span>
        </div>
        <div class="tools" v-if="showTools">
          <span class="draw-point" @click="drawPoint"></span>
          <span class="draw-line"></span>
          <span class="draw-polygon"></span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'baseInfo',
  data () {
    return {
      showDraw: true,
      showTools: false,
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
    },
    drawPoint () {

    }
  }
}
</script>

<style scoped lang="less">
  .draw{
    position: absolute;
    right: 5px;
    top: 5px;
    background: white;
    z-index: 2;
    .draw-icon{
      display: block;
      width: 24px;
      height: 24px;
      background: url("~@/assets/draw.png") no-repeat;
      background-size: 100% 100%;
    }
  }
.tools{
  /*display: none;*/
  position: absolute;
  right: 5px;
  top: 32px;
  background: white;
  height: 100px;
  /*width: 100px;*/
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*padding: 5px;*/
  span{
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &.draw-point{
      background: url("~@/assets/draw-point.png") no-repeat;
      background-size: 100% 100%;
    }
    &.draw-line{
      background: url("~@/assets/draw-line.png") no-repeat;
      background-size: 100% 100%;
    }
    &.draw-polygon{
      background: url("~@/assets/draw-polygon.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
