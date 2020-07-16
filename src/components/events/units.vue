<template>
    <div>
      <h2 class="_title">承办者情况</h2>
      <van-cell-group>
        <van-field v-model="forms.CBDW" placeholder="公司名称" />
        <p class="sub_title">安全责任人</p>
        <van-field v-model="forms.CBDWAQFZR" label="姓名" placeholder="请输入姓名" />
        <van-field
          readonly
          clickable
          name="CBDWZJLX"
          :value="ZJLX"
          label="证件类型"
          placeholder="点击选择证件类型"
          @click="showPicker.ZJLX = true"
          :rules="[{ required: true, message: '请选择证件类型' }]"
        />
        <van-popup v-model="showPicker.ZJLX" position="bottom">
          <van-picker
            show-toolbar
            :columns="CBDWZJLX"
            @confirm="onConfirmZJLX"
            @cancel="showPicker.ZJLX = false"
          />
        </van-popup>
        <van-field v-model="forms.CBDWZJHM" label="证件号码" placeholder="请输入证件号码" />
        <van-field v-model="forms.CBDWAQFZRZW" label="职务" placeholder="请输入职务" />
        <van-field v-model="forms.CBDWAQFZRDH" label="联系电话" placeholder="请输入联系电话" />
        <p class="sub_title">联系人</p>
        <van-field v-model="forms.CBDWLXR" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="forms.CBDWLXRZW" label="职务" placeholder="请输入职务" />
        <van-field v-model="forms.CBDWLXRDH" label="联系电话" placeholder="请输入联系电话" />
      </van-cell-group>
      <h2 class="_title">场馆管理者情况</h2>
      <van-cell-group>
        <van-field v-model="forms.CSGLZMC" placeholder="公司名称" />
        <p class="sub_title">主要责任人</p>
        <van-field v-model="forms.CSGLZYFZR" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="forms.CSGLZYFZRZW" label="职务" placeholder="请输入职务" />
        <van-field v-model="forms.CSGLZYFZRDH" label="联系电话" placeholder="请输入联系电话" />
        <p class="sub_title">联系人</p>
        <van-field v-model="forms.CSGLLXR" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="forms.CSGLLXRZW" label="职务" placeholder="请输入职务" />
        <van-field v-model="forms.CSGLLXRDH" label="联系电话" placeholder="请输入联系电话" />
      </van-cell-group>
      <h2 class="_title">现场临时设施建筑物搭建单位情况</h2>
      <van-cell-group>
        <van-field v-model="forms.JZDJDWMC" placeholder="公司名称" />
        <van-field v-model="forms.JZDJQYLX" label="点击选择企业类型" placeholder="请输入点击选择企业类型" />
       <!-- <van-field
          readonly
          clickable
          name="picker"
          :value="companyType"
          label="企业类型"
          placeholder="点击选择企业类型"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="types"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>-->
        <van-field v-model="forms.JZDJQYZCH" label="企业注册号" placeholder="请输入企业注册号" />
        <van-field v-model="forms.JZDJZYFZR" label="主要负责人" placeholder="请输入主要负责人" />
        <van-field v-model="forms.JZDJLXDH" label="联系电话" placeholder="请输入联系电话" />
      </van-cell-group>
      <h2 class="_title">安保情况</h2>
      <van-cell-group>
        <van-field v-model="forms.ABGSMC" placeholder="公司名称" />
        <p class="sub_title">主要责任人</p>
        <van-field v-model="forms.ABGSZYFZR" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="forms.ABGSZW" label="职务" placeholder="请输入职务" />
        <van-field v-model="forms.ABGSLXDH" label="联系电话" placeholder="请输入联系电话" />
        <van-field v-model="forms.ABGSBAYSL" type="digit" label="受雇保安员数量" />
        <van-field
          v-model="forms.ABGSBZ"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="140"
          placeholder="请输入备注"
          show-word-limit
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" style="margin-bottom: 10px;" @click="onSubmit">
          保存
        </van-button>
      </div>
    </div>
</template>

<script>
import { getByCode } from '@/api/getData'
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'units',
  data () {
    return {
      showPicker: {
        ZJLX: false
      },
      contract: 'XXX有限公司',
      contractName: '张某',
      idcard: '',
      duty: '法人',
      contractPhone: '',
      connectName: '李某',
      connectDuty: '经理',
      connectPhone: '',
      companyType: '',
      ZJLX: '',
      CBDWZJLX: [],
      types: [
        {
          text: 'A型',
          value: '1'
        },
        {
          text: 'B型',
          value: '2'
        }
      ],
      registerNo: '',
      securityNo: '',
      remark: '',
      forms: {
        CBDW: '', // 承办单位
        CBDWAQFZR: '', // 承办单位安全负责人
        CBDWAQFZRDH: '', // 承办单位安全负责人电话
        CBDWAQFZRZW: '', // 承办单位安全负责人职务
        CBDWZJLX: '', // 承办单位安全负责人证件类型
        CBDWZJHM: '', // 承办单位安全负责人证件号码
        CBDWLXR: '', // 承办单位联系人
        CBDWLXRDH: '', // 承办单位联系人电话
        CBDWLXRZW: '', // 承办单位联系人职务
        CSGLZMC: '', // 场所管理者名称：公司
        CSGLZYFZR: '', // 场所管理主要负责人
        CSGLZYFZRDH: '', // 场所管理主要负责人电话
        CSGLZYFZRZW: '', // 场所管理主要负责人职务
        CSGLLXR: '', // 场所管理联系人
        CSGLLXRZW: '', // 场所管理联系人职务
        CSGLLXRDH: '', // 场所管理联系人电话
        JZDJDWMC: '', // 建筑搭建单位名称
        JZDJQYLX: '', // 建筑搭建企业类型
        JZDJQYZCH: '', // 建筑搭建企业注册号
        JZDJZYFZR: '', // 建筑搭建主要负责人
        JZDJLXDH: '', // 建筑搭建联系电话
        ABGSMC: '', // 安保公司名称
        ABGSBAYSL: '', // 安保公司保安员数量
        ABGSBZ: '', // 安保公司备注
        ABGSZYFZR: '', // 安保公司主要负责人
        ABGSLXDH: '', // 安保公司联系电话
        ABGSZW: ''// 安保公司主要负责人职务
      }
    }
  },
  props: {
    info: {
      default: undefined
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this.getCode()
      await Object.assign(this.forms, this.info)
      const CBDWZJLX = _.find(this.CBDWZJLX, { value: this.info.CBDWZJLX })
      if (CBDWZJLX) {
        this.ZJLX = CBDWZJLX.text
      }
    },
    async getCode () {
      const data = await getByCode('ZJLX')
      _.each(data, e => {
        this.CBDWZJLX.push({
          value: e.codeValue,
          text: e.codeName
        })
      })
    },
    onConfirm (data) {
      this.companyType = data.text
      this.showPicker = false
    },
    onConfirmZJLX (value) {
      this.forms.CBDWZJLX = value.value
      this.ZJLX = value.text
      this.showPicker.ZJLX = false
    },
    onSubmit (values) {
      console.log('submit', values)
      console.log(this.forms)
      axios.post('/jmxfxt/dxabHdxx/updateHdxx', this.forms).then(res => {

      })
    }
  }
}
</script>

<style scoped>

</style>
