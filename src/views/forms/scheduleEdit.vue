<template>
<div class="main_form">
  <van-form class="content" @submit="onSubmit">
    <van-field
      readonly
      clickable
      clearable
      name="startTime"
      :value="forms.schedule"
      label="举办起始日期"
      placeholder="点击选择日期"
      @click="showPicker.schedule = true"
      :rules="[{ required: true, message: '请选择举办起始日期' }]"
    />
    <van-calendar v-model="showPicker.schedule" type="range" @confirm="onConfirm" />
    <van-field
      v-model="forms.HDABDWMC"
      name="HDABDWMC"
      clearable
      label="活动安保单位名称"
      placeholder="活动安保单位名称"
      :rules="[{ required: true, message: '请填写活动安保单位名称' }]"
    />
    <van-field
      v-model="forms.FZRXM"
      name="FZRXM"
      clearable
      label="负责人姓名"
      placeholder="负责人姓名"
      :rules="[{ required: true, message: '请填写负责人姓名' }]"
    />
    <van-field
      v-model="forms.FZRZW"
      name="FZRZW"
      clearable
      label="职务"
      placeholder="职务"
      :rules="[{ required: true, message: '请填写职务' }]"
    />
    <van-field
      v-model="forms.FZRDW"
      name="FZRDW"
      clearable
      label="单位"
      placeholder="单位"
      :rules="[{ required: true, message: '请填写单位' }]"
    />
    <van-field v-model="forms.FZRLXDH" type="tel" label="联系电话" clearable :rules="[{ required: true, message: '请填写联系电话' }]" />
    <van-field
      v-model="forms.XCZHRXM"
      name="XCZHRXM"
      clearable
      label="现场指挥人姓名"
      placeholder="现场指挥人姓名"
      :rules="[{ required: true, message: '请填写现场指挥人姓名' }]"
    />
    <van-field
      v-model="forms.XCZHRZW"
      name="XCZHRZW"
      clearable
      label="职务"
      placeholder="职务"
      :rules="[{ required: true, message: '请填写职务' }]"
    />
    <van-field
      v-model="forms.XCZHRDW"
      name="XCZHRDW"
      clearable
      label="单位"
      placeholder="单位"
      :rules="[{ required: true, message: '请填写单位' }]"
    />
    <van-field v-model="forms.XCZHRLXDH" type="tel" label="联系电话" clearable :rules="[{ required: true, message: '请填写联系电话' }]" />
    <van-field
      v-model="forms.LXRXM"
      name="LXRXM"
      clearable
      label="联系人姓名"
      placeholder="联系人姓名"
      :rules="[{ required: true, message: '请填写联系人姓名' }]"
    />
    <van-field
      v-model="forms.LXRZW"
      name="LXRZW"
      clearable
      label="职务"
      placeholder="职务"
      :rules="[{ required: true, message: '请填写职务' }]"
    />
    <van-field
      v-model="forms.LXRDW"
      name="LXRDW"
      clearable
      label="单位"
      placeholder="单位"
      :rules="[{ required: true, message: '请填写单位' }]"
    />
    <van-field v-model="forms.LXRDH" type="LXRDH" label="联系电话" clearable :rules="[{ required: true, message: '请填写联系电话' }]" />
    <van-field v-model="forms.ABRY" type="digit" label="安保人员" clearable :rules="[{ required: true, message: '请填写安保人员人数' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.HWRY" type="digit" label="会务人员" clearable :rules="[{ required: true, message: '请填写会务人员人数' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.ZYZ" type="digit" label="志愿者" clearable :rules="[{ required: true, message: '请填写志愿者人数' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.GZ" type="digit" label="观众" clearable :rules="[{ required: true, message: '请填写观众人数' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.YZRY" type="digit" label="演职人员" clearable :rules="[{ required: true, message: '请填写演职人员人数' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.WB" type="digit" label="外宾" clearable :rules="[{ required: true, message: '请填写外宾数量' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
  </van-form>
  <div class="footer">
    <van-button block type="info" native-type="submit">
      保存
    </van-button>
    <van-button block type="default" native-type="button" @click="onCancel">
      取消
    </van-button>
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'scheduleEdit',
  data () {
    return {
      showPicker: {
        schedule: false
      },
      forms: {
        HDABDWMC: '', // 活动安保单位名称
        FZRXM: '', // 负责人姓名
        FZRZW: '', // 负责人职务
        FZRDW: '', // 负责人单位
        FZRLXDH: '', // 负责人联系电话
        XCZHRXM: '', // 现场指挥人姓名
        XCZHRZW: '', // 现场指挥人职务
        XCZHRDW: '', // 现场指挥人单位
        XCZHRLXDH: '', // 现场指挥人联系电话
        LXRXM: '', // 联系人姓名
        LXRDH: '', // 联系人电话
        LXRDW: '', // 联系人单位
        LXRZW: '', // 联系人职务
        HDNR: '', // 活动内容
        ABRY: '', // 安保人员人数
        HWRY: '', // 会务人员人数
        ZYZ: '', // 志愿者人数
        GZ: '', // 观众人数
        YZRY: '', // 演职人员人数
        WB: ''// 外宾人数
      },
      info: null
    }
  },
  mounted () {
    this.info = this.$route.params.info
    this.init()
  },
  methods: {
    init () {
      Object.assign(this.forms, this.info)
    },
    onSubmit (values) {
      console.log('submit', values)
      console.log(this.forms)
    },
    onCancel () {
      this.$router.back()
    },
    onConfirm (date) {
      const [start, end] = date
      this.showPicker.schedule = false
      // console.log(start, end)
      this.forms.schedule = `${moment(start).format('YYYY-MM-DD')} - ${moment(end).format('YYYY-MM-DD')}`
      // this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    }
  }
}
</script>

<style scoped>

</style>
