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
          v-model="forms.title"
          name="title"
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
            :columns="types"
            @confirm="onConfirmType"
            @cancel="showPicker.type = false"
          />
        </van-popup>
        <van-field v-model="forms.maxNumber" name="maxNumber" type="digit" label="额定容量人数" :rules="[{ required: true, message: '请选择额定容量人数' }]"/>
        <van-field
          readonly
          clickable
          name="venue"
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
        <van-field v-model="forms.venueArea" name="venueArea" type="digit" label="场地面积/里程" :rules="[{ required: true, message: '请选择场地面积/里程' }]"/>
        <van-field v-model="forms.planTickets" name="planTickets" type="digit" label="拟发售票数" :rules="[{ required: true, message: '请选择拟发售票数' }]"/>
        <van-field
          readonly
          clickable
          name="startTime"
          :value="forms.startTime"
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
          name="endTime"
          :value="forms.endTime"
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
          v-model="forms.location"
          name="location"
          label="举办地点"
          placeholder="举办地点"
          :rules="[{ required: true, message: '请填写举办地点' }]"
        />
        <van-field
          v-model="forms.applyName"
          name="applyName"
          label="申请人姓名"
          placeholder="申请人姓名"
          :rules="[{ required: true, message: '请填写申请人姓名' }]"
        />
        <van-field
          v-model="forms.desc"
          name="desc"
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
      },
      type: '',
      venue: '',
      startTime: '',
      endTime: '',
      forms: {
        title: '',
        type: '',
        maxNumber: '',
        venue: '',
        venueArea: '',
        planTickets: '',
        startTime: '',
        endTime: '',
        location: '',
        applyName: '',
        desc: '',
        pointType: '',
        pointList: []
      },
      types: [
        {
          text: '体育比赛',
          value: '1'
        }
      ],
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
    onConfirmType (value) {
      console.log(value)
      this.forms.type = value.value
      this.type = value.text
      this.showPicker.type = false
    },
    onConfirmVenue (value) {
      this.forms.venue = value.value
      this.venue = value.text
      this.showPicker.venue = false
    },
    onConfirmStart (value) {
      this.forms.startTime = moment(value).format('YYYY-MM-DD HH:mm:ss')
      this.showPicker.startTime = false
    },
    onConfirmEnd (value) {
      this.forms.endTime = moment(value).format('YYYY-MM-DD HH:mm:ss')
      this.showPicker.endTime = false
    },
    onSubmit (values) {
      console.log('submit', values)
      console.log(this.forms)
    },
    drawPoint () {

    },
    drawFn (value) {
      // this.frameSelectionFlag = false
      this.forms.pointType = value
      let type = ''
      if (this.forms.pointType === '01') {
        type = 'point'
      } else if (this.forms.pointType === '02') {
        type = 'polyline'
      } else if (this.forms.pointType === '03') {
        type = 'polygon'
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
          this.forms.pointList = [e.coordinates]
        } else if (type === 'polyline') {
          this.forms.pointList = e.coordinates
        } else if (type === 'circle' || type === 'polygon' || type === 'square' || type === 'rectangle') {
          // let feature = e.target
          this.forms.pointList = e.coordinates
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
