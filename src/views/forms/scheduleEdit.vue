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
      v-model="forms.title"
      name="title"
      clearable
      label="活动安保单位名称"
      placeholder="活动安保单位名称"
      :rules="[{ required: true, message: '请填写活动安保单位名称' }]"
    />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="负责人姓名"
      placeholder="负责人姓名"
      :rules="[{ required: true, message: '请填写负责人姓名' }]"
    />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="职务"
      placeholder="职务"
      :rules="[{ required: true, message: '请填写职务' }]"
    />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="单位"
      placeholder="单位"
      :rules="[{ required: true, message: '请填写单位' }]"
    />
    <van-field v-model="forms.tel" type="tel" label="联系电话" clearable :rules="[{ required: true, message: '请填写联系电话' }]" />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="现场指挥人姓名"
      placeholder="现场指挥人姓名"
      :rules="[{ required: true, message: '请填写现场指挥人姓名' }]"
    />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="职务"
      placeholder="职务"
      :rules="[{ required: true, message: '请填写职务' }]"
    />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="单位"
      placeholder="单位"
      :rules="[{ required: true, message: '请填写单位' }]"
    />
    <van-field v-model="forms.tel" type="tel" label="联系电话" clearable :rules="[{ required: true, message: '请填写联系电话' }]" />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="联系人姓名"
      placeholder="联系人姓名"
      :rules="[{ required: true, message: '请填写联系人姓名' }]"
    />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="职务"
      placeholder="职务"
      :rules="[{ required: true, message: '请填写职务' }]"
    />
    <van-field
      v-model="forms.title"
      name="title"
      clearable
      label="单位"
      placeholder="单位"
      :rules="[{ required: true, message: '请填写单位' }]"
    />
    <van-field v-model="forms.tel" type="tel" label="联系电话" clearable :rules="[{ required: true, message: '请填写联系电话' }]" />
    <van-field v-model="forms.securityNo" type="digit" label="安保人员" clearable :rules="[{ required: true, message: '请填写安保人员数量' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.securityNo" type="digit" label="安保人员" clearable :rules="[{ required: true, message: '请填写安保人员数量' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.securityNo" type="digit" label="会务人员" clearable :rules="[{ required: true, message: '请填写安保人员数量' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.securityNo" type="digit" label="志愿者" clearable :rules="[{ required: true, message: '请填写安保人员数量' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.securityNo" type="digit" label="观众" clearable :rules="[{ required: true, message: '请填写安保人员数量' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.securityNo" type="digit" label="演职人员" clearable :rules="[{ required: true, message: '请填写安保人员数量' }]">
      <template #extra>
        <span>人</span>
      </template>
    </van-field>
    <van-field v-model="forms.securityNo" type="digit" label="外宾" clearable :rules="[{ required: true, message: '请填写安保人员数量' }]">
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
        schedule: '',
        securityNo: null
      }
    }
  },
  methods: {
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
