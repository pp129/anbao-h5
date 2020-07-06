<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="forms.carNo"
        name="carNo"
        clearable
        label="机动车号牌"
        placeholder="机动车号牌"
        :rules="[{ required: true, message: '请填写机动车号牌' }]"
      />
      <van-field
        v-model="forms.bandZH"
        name="bandZH"
        clearable
        label="中文品牌"
        placeholder="中文品牌"
        :rules="[{ required: true, message: '请填写中文品牌' }]"
      />
      <van-field
        v-model="forms.bandEN"
        name="bandEN"
        clearable
        label="英文品牌"
        placeholder="英文品牌"
        :rules="[{ required: true, message: '请填写英文品牌' }]"
      />
      <van-field
        v-model="forms.color"
        name="color"
        clearable
        label="颜色"
        placeholder="颜色"
        :rules="[{ required: true, message: '请填写颜色' }]"
      />
      <van-field
        v-model="forms.model"
        name="model"
        clearable
        label="型号"
        placeholder="型号"
        :rules="[{ required: true, message: '请填写型号' }]"
      />
      <van-field
        v-model="forms.use"
        name="use"
        clearable
        label="车辆用途"
        placeholder="车辆用途"
        :rules="[{ required: true, message: '请填写车辆用途' }]"
      />
      <van-field
        v-model="forms.owner"
        name="owner"
        clearable
        label="车辆负责人姓名"
        placeholder="车辆负责人姓名"
        :rules="[{ required: true, message: '请填写车辆负责人姓名' }]"
      />
      <van-field
        v-model="forms.ownerId"
        name="ownerId"
        clearable
        label="车辆负责人身份证号"
        placeholder="车辆负责人身份证号"
        :rules="[{ required: true, message: '请填写车辆负责人身份证号' }]"
      />
      <van-field
        v-model="forms.driver"
        name="driver"
        clearable
        label="车辆驾驶人姓名"
        placeholder="车辆驾驶人姓名"
        :rules="[{ required: true, message: '请填写车辆驾驶人姓名' }]"
      />
      <van-field
        v-model="forms.driverId"
        name="driverId"
        clearable
        label="车辆驾驶人身份证号"
        placeholder="车辆驾驶人身份证号"
        :rules="[{ required: true, message: '请填写车辆驾驶人身份证号' }]"
      />
      <van-field
        readonly
        clickable
        name="startTime"
        :value="forms.startTime"
        label="出发时间"
        placeholder="点击选择时间"
        @click="showPicker.startTime = true"
      />
      <van-popup v-model="showPicker.startTime" position="bottom">
        <van-datetime-picker
          type="datetime"
          @confirm="onConfirm"
          @cancel="showPicker.startTime = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="startLocation"
        left-icon="location-o"
        :value="forms.startLocation"
        label="出发地"
        placeholder="出发地"
        @click="pickStartLocation"
      />
      <van-field
        readonly
        clickable
        name="endLocation"
        left-icon="location-o"
        :value="forms.endLocation"
        label="到达地"
        placeholder="到达地"
        @click="pickEndLocation"
      />
      <div id="mapOne" style="width: 100%;height: 300px;position: relative;z-index: 1;"></div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" style="margin-bottom: 10px;">
          保存
        </van-button>
        <van-button round block type="default" native-type="button" @click="onCancel">
          取消
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'carsEdit',
  data () {
    return {
      type: '',
      forms: {
        carNo: '',
        bandZH: '',
        bandEN: '',
        model: '',
        use: '',
        owner: '',
        ownerId: '',
        startTime: '',
        startLocation: '',
        endLocation: ''
      },
      showPicker: {
        startTime: false
      },
      map: null,
      mapOpt: { // 地图参数配置
        zoom: 12, // 放大倍数
        center: [118.183209, 24.489003],
        mapName: 'tiandi',
        mapSource: 'onLine', // 是否离线
        overview: false
      },
      pointType: '',
      startLayer: null,
      endLayer: null,
      startTarget: null,
      endTarget: null,
      targetPoint: null,
      drawConfig: {
        fillColor: 'rgba(221, 79, 95, 0.8)', // rgba(142, 203, 247, 0.8)
        strokeWeight: 2,
        strokeColor: 'red', // #8ECBF7\#009dfd
        pointColor: 'red',
        pointSize: 5,
        pointIcon: require('@/assets/map_images/pointIcon.png'),
        textColor: 'green',
        showGraphic: true
      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
      console.log(this.forms)
    },
    onCancel () {
      this.$emit('cancelEdit')
    },
    onConfirm (value) {
      this.forms.startTime = moment(value).format('YYYY-MM-DD HH:mm:ss')
      this.showPicker.startTime = false
    },
    initMap () {
      this.map = new WMap.Map('mapOne', {
        zoom: this.mapOpt.zoom,
        center: this.mapOpt.center,
        mapName: this.mapOpt.mapName,
        city: 'xiamen',
        mapSource: this.mapOpt.mapSource,
        maxZoom: 18, // 地图放大最大等级
        overview: this.mapOpt.overview // 是否显示小地图
      })
      // 创建图层
      this.startLayer = new WMap.Layer()
      // 设置图层id
      this.startLayer.set('id', 'startLayer')
      // 添加图层
      this.map.addLayer(this.startLayer)
      // 创建图层
      this.endLayer = new WMap.Layer()
      // 设置图层id
      this.endLayer.set('id', 'endLayer')
      // 添加图层
      this.map.addLayer(this.endLayer)

      this.map.on('click', (e) => {
        console.log(e)
        this.targetPoint = e.coordinate
        if (this.pointType) {
          if (this.pointType === '01') {
            this.startLayer.clear()
            // 创建自定义点标记实例：
            const marker = new WMap.Marker({
              position: this.targetPoint, // 标注位置
              icon: require('@/assets/map_images/pointIcon.png')// 标注图标，默认半径为5像素的蓝色圆圈
              // offset:[20,20]  //偏移位置，单位为像素
            })
            // 将创建的点标记添加到已创建的矢量图层：
            this.startLayer.addFeature(marker)
            this.forms.startLocation = `${this.targetPoint[0]},${this.targetPoint[1]}`
            this.pointType = ''
          } else {
            this.endLayer.clear()
            // 创建自定义点标记实例：
            const marker = new WMap.Marker({
              position: this.targetPoint, // 标注位置
              icon: require('@/assets/map_images/enableIcon.png')// 标注图标，默认半径为5像素的蓝色圆圈
              // offset:[20,20]  //偏移位置，单位为像素
            })
            // 将创建的点标记添加到已创建的矢量图层：
            this.endLayer.addFeature(marker)
            this.forms.endLocation = `${this.targetPoint[0]},${this.targetPoint[1]}`
            this.pointType = ''
          }
        }
      })

      this.map.on('dblclick', e => {
        this.pointType = ''
      })
    },
    pickStartLocation () {
      this.pointType = '01'
    },
    pickEndLocation () {
      this.pointType = '02'
    }
  }
}
</script>

<style scoped>

</style>
