<template>
    <div class="main">
      <div id="map" style="width: 100%;height: 300px;position: relative;z-index: 1;">
        <div class="draw" v-if="showDraw" @click="showTools=!showTools">
          <span class="draw-icon"></span>
        </div>
        <div class="tools" v-if="showTools">
          <span class="draw-point" @click="drawFn('01')"></span>
          <span class="draw-line" @click="drawFn('02')"></span>
          <span class="draw-polygon" @click="drawFn('03')"></span>
        </div>
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="forms.HDMC"
          name="HDMC"
          label="活动名称"
          placeholder="活动名称"
          :rules="[{ required: true, message: '请填写活动名称' }]"
        />
        <van-field
          readonly
          clickable
          name="type"
          :value="type"
          label="活动类型"
          placeholder="点击选择活动类型"
          @click="showPicker.type = true"
          :rules="[{ required: true, message: '请选择活动类型' }]"
        />
        <van-popup v-model="showPicker.type" position="bottom">
          <van-picker
            show-toolbar
            :columns="RWHDLX"
            @confirm="onConfirmType"
            @cancel="showPicker.type = false"
          />
        </van-popup>
        <van-field v-model="forms.EDRLRS" name="EDRLRS" type="digit" label="额定容量人数" :rules="[{ required: true, message: '请选择额定容量人数' }]"/>
        <van-field
          readonly
          clickable
          name="HDCG"
          :value="venue"
          label="活动场馆"
          placeholder="点击选择活动场馆"
          @click="showPicker.venue = true"
          :rules="[{ required: true, message: '请选择活动场馆' }]"
        />
        <van-popup v-model="showPicker.venue" position="bottom">
          <van-picker
            show-toolbar
            :columns="venues"
            @confirm="onConfirmVenue"
            @cancel="showPicker.venue = false"
          />
        </van-popup>
        <van-field v-model="forms.CDMJ" name="CDMJ" type="digit" label="场地面积/里程" :rules="[{ required: true, message: '请选择场地面积/里程' }]"/>
        <van-field v-model="forms.NFSPS" name="NFSPS" type="digit" label="拟发售票数" :rules="[{ required: true, message: '请选择拟发售票数' }]"/>
        <van-field
          readonly
          clickable
          name="JBSJ"
          :value="forms.JBSJ"
          label="举办起始日期"
          placeholder="点击选择日期"
          @click="showPicker.startTime = true"
          :rules="[{ required: true, message: '请选择举办起始日期' }]"
        />
        <van-popup v-model="showPicker.startTime" position="bottom">
          <van-datetime-picker
            v-model="startTime"
            @confirm="onConfirmStart"
            type="datetime"
            title="选择完整时间"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="JBSJJS"
          :value="forms.JBSJJS"
          label="举办结束日期"
          placeholder="点击选择日期"
          @click="showPicker.endTime = true"
          :rules="[{ required: true, message: '请选择举办结束日期' }]"
        />
        <van-popup v-model="showPicker.endTime" position="bottom">
          <van-datetime-picker
            v-model="endTime"
            name="endTime"
            @confirm="onConfirmEnd"
            type="datetime"
            title="选择完整时间"
          />
        </van-popup>
        <van-field
          v-model="forms.JBDD"
          name="JBDD"
          label="举办地点"
          placeholder="举办地点"
          :rules="[{ required: true, message: '请填写举办地点' }]"
        />
        <van-field
          v-model="forms.SQRXM"
          name="SQRXM"
          label="申请人姓名"
          placeholder="申请人姓名"
          :rules="[{ required: true, message: '请填写申请人姓名' }]"
        />
        <van-field
          v-model="forms.HDNR"
          name="HDNR"
          rows="2"
          autosize
          label="活动内容"
          type="textarea"
          maxlength="50"
          placeholder="请输入活动内容"
          show-word-limit
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" style="margin-bottom: 10px;">
            保存
          </van-button>
<!--          <van-button round block type="default" native-type="button">-->
<!--            取消-->
<!--          </van-button>-->
        </div>
      </van-form>
    </div>
</template>

<script>
import moment from 'moment'
import { getByCode, getCgxxInfos } from '@/api/getData'
import _ from 'lodash'
import axios from 'axios'
import enableIcon from '@/assets/map_images/enableIcon.png'
export default {
  name: 'baseInfo',
  data () {
    return {
      showDraw: true,
      showTools: false,
      map: null,
      GPSLayer: null,
      mapOpt: { // 地图参数配置
        zoom: 12, // 放大倍数
        center: [118.183209, 24.489003],
        mapName: 'tiandi',
        mapSource: 'onLine', // 是否离线
        overview: false
      },
      type: '',
      venue: '',
      startTime: '',
      endTime: '',
      forms: {
        POINTTYPE: '', // 点dian,线xian,区域quyu
        DTXDS: [], // 经纬度集合
        HDMC: '', // 活动名称
        HDLX: '', // 活动类型
        EDRLRS: '', // 额定容量人数
        HDCG: '', // 场馆
        CDMJ: '', // 场地面积/里程
        NFSPS: '', // 拟发售票数
        JBSJ: '', // 举办开始时间
        JBSJJS: '', // 举办结束时间
        JBDD: '', // 举办地点
        SQRXM: '', // 申请人姓名
        HDNR: ''// 活动内容
      },
      types: [],
      venues: [
        {
          text: '场馆1',
          value: '1'
        }
      ],
      showPicker: {
        type: false,
        venue: false,
        startTime: false,
        endTime: false
      },
      RWHDLX: []
    }
  },
  props: {
    info: {
      default: undefined
    }
  },
  mounted () {
    this.init()
    this.initMap()
  },
  methods: {
    async init () {
      await this.getCode()
      await this.getVenue()
      await Object.assign(this.forms, this.info)
      const HDLX = _.find(this.RWHDLX, { value: this.info.HDLX })
      if (HDLX) {
        this.type = HDLX.text
      }
      const HDCG = _.find(this.venues, { value: this.info.HDCG })
      if (HDCG) {
        this.venue = HDCG.text
      }
      this.showArea()
    },
    showArea () {
      const DTXDS = this.forms.DTXDS
      if (DTXDS) {
        const coors = JSON.parse(DTXDS)
        if (this.forms.POINTTYPE === 'dian') {
          this.DrawPoint(coors)
        } else if (this.forms.POINTTYPE === 'xian') {
          this.DrawPolyline(coors)
        } else {
          this.DrawPolygon(coors)
        }
      }
    },
    /**
     * 创建自定义点
     */
    DrawPoint (coors) {
      // 状态图标-默认在线图标
      const icon = enableIcon
      const marker = new WMap.Marker({
        position: coors[0], // 标注位置
        icon: icon // 标注图标,默认半径为 5 像素的蓝色圆圈
      })
      // 将创建的点标记添加到已创建的矢量图层：
      this.GPSLayer.addFeature(marker)
    },
    /**
     * 创建自定义折线
     */
    DrawPolyline (coors) {
      const strokeColor = 'rgba(3,156,253,1)' // 线条颜色,默认是blue
      // 创建自定义折线
      const polyline = new WMap.Polyline({
        path: coors, // 折线路径
        strokeColor: strokeColor, // 线条颜色，默认是blue
        strokeWeight: 2, // 线条宽度，默认是1，单位是像素
        strokeDashed: false// 线条类型，true代表虚线；false代表实线，默认false
      })
      // 将折线添加到指定的矢量图层：
      this.GPSLayer.addFeature(polyline)
    },
    /**
     * 创建自定义多边形
     */
    DrawPolygon (coors) {
      const strokeColor = 'rgba(3,156,253,1)' // 线条颜色,默认是blue
      const fillColor = 'rgba(3,156,253,0.15)'// 填充色颜色,默认是blue
      // 创建自定义多边形
      const polygon = new WMap.Polygon({
        path: coors, // 折线路径
        strokeColor: strokeColor, // 线条颜色,默认是blue
        fillColor: fillColor, // 填充色颜色,默认是blue
        strokeWeight: 2, // 线条宽度,默认是1,单位是像素
        strokeDashed: true, // 线条类型，true代表虚线；false代表实线
        // name: '多边形名称' + item.pointCode, // 在多边形中心处显示名称
        nameColor: 'bule' // 多边形名称的颜色
      })
      // 将多边形添加到指定的矢量图层：
      this.GPSLayer.addFeature(polygon)
    },
    async getCode () {
      const data = await getByCode('RWHDLX')
      _.each(data, e => {
        this.RWHDLX.push({
          value: e.codeValue,
          text: e.codeName
        })
      })
    },
    async getVenue () {
      const data = await getCgxxInfos()
      _.each(data, e => {
        this.venues.push({
          value: e.CGID,
          text: e.CGMC
        })
      })
    },
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
      // 创建图层
      this.GPSLayer = new WMap.Layer()
      // 设置图层 id
      this.GPSLayer.set('id', 'gpsLayer')
      // 添加图层
      this.map.addLayer(this.GPSLayer)
    },
    onConfirmType (value) {
      console.log(value)
      this.forms.HDLX = value.value
      this.type = value.text
      this.showPicker.type = false
    },
    onConfirmVenue (value) {
      this.forms.HDCG = value.value
      this.venue = value.text
      this.showPicker.venue = false
    },
    onConfirmStart (value) {
      this.forms.JBSJ = moment(value).format('YYYY-MM-DD HH:mm:ss')
      this.showPicker.startTime = false
    },
    onConfirmEnd (value) {
      this.forms.JBSJJS = moment(value).format('YYYY-MM-DD HH:mm:ss')
      this.showPicker.endTime = false
    },
    onSubmit (values) {
      console.log('submit', values)
      console.log(this.forms)
      axios.post('/jmxfxt/dxabHdxx/saveHdxx', this.forms).then(res => {

      })
    },
    drawFn (value) {
      // this.frameSelectionFlag = false
      // this.forms.pointType = value
      let type = ''
      if (value === '01') {
        this.forms.POINTTYPE = 'dian'
        type = 'point'
      } else if (value === '02') {
        type = 'polyline'
        this.forms.POINTTYPE = 'xian'
      } else if (value === '03') {
        type = 'polygon'
        this.forms.POINTTYPE = 'quyu'
      } else {
        return
      }
      const config = {
        fillColor: 'rgba(221, 79, 95, 0.8)', // rgba(142, 203, 247, 0.8)
        strokeWeight: 2,
        strokeColor: 'red', // #8ECBF7\#009dfd
        pointColor: 'red',
        pointSize: 5,
        pointIcon: require('@/assets/map_images/pointIcon.png'),
        textColor: 'green',
        showGraphic: true
      }
      WMap.Draw(this.map, type, config, (e) => {
        if (type === 'point') {
          this.forms.DTXDS = [e.coordinates]
        } else if (type === 'polyline') {
          this.forms.DTXDS = e.coordinates
        } else if (type === 'circle' || type === 'polygon' || type === 'square' || type === 'rectangle') {
          // let feature = e.target
          this.forms.DTXDS = e.coordinates
        }
        // this.frameSelectionFlag = true
        // 画完清除绘图对象
        WMap.Clear(this.map)
      })
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
