<template>
    <div>
      <h2 class="_title">承办者情况</h2>
      <van-cell-group>
        <van-field v-model="contract" placeholder="公司名称" />
        <p class="sub_title">安全责任人</p>
        <van-field v-model="contractName" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="idcard" label="证件号码" placeholder="请输入证件号码" />
        <van-field v-model="duty" label="职务" placeholder="请输入职务" />
        <van-field v-model="contractPhone" label="联系电话" placeholder="请输入联系电话" />
        <p class="sub_title">联系人</p>
        <van-field v-model="connectName" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="connectDuty" label="职务" placeholder="请输入职务" />
        <van-field v-model="connectPhone" label="联系电话" placeholder="请输入联系电话" />
      </van-cell-group>
      <h2 class="_title">场馆管理者情况</h2>
      <van-cell-group>
        <van-field v-model="contract" placeholder="公司名称" />
        <p class="sub_title">主要责任人</p>
        <van-field v-model="contractName" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="duty" label="职务" placeholder="请输入职务" />
        <van-field v-model="contractPhone" label="联系电话" placeholder="请输入联系电话" />
        <p class="sub_title">联系人</p>
        <van-field v-model="connectName" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="connectDuty" label="职务" placeholder="请输入职务" />
        <van-field v-model="connectPhone" label="联系电话" placeholder="请输入联系电话" />
      </van-cell-group>
      <h2 class="_title">现场临时设施建筑物搭建单位情况</h2>
      <van-cell-group>
        <van-field v-model="contract" placeholder="公司名称" />
        <van-field
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
        </van-popup>
        <van-field v-model="registerNo" label="企业注册号" placeholder="请输入企业注册号" />
        <van-field v-model="connectDuty" label="主要负责人" placeholder="请输入主要负责人" />
        <van-field v-model="connectPhone" label="联系电话" placeholder="请输入联系电话" />
      </van-cell-group>
      <h2 class="_title">安保情况</h2>
      <van-cell-group>
        <van-field v-model="contract" placeholder="公司名称" />
        <p class="sub_title">主要责任人</p>
        <van-field v-model="connectName" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="connectDuty" label="职务" placeholder="请输入职务" />
        <van-field v-model="connectPhone" label="联系电话" placeholder="请输入联系电话" />
        <van-field v-model="securityNo" type="digit" label="受雇保安员数量" />
        <van-field
          v-model="remark"
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
        <van-button round block type="info" native-type="submit" style="margin-bottom: 10px;">
          保存
        </van-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'units',
  data () {
    return {
      showPicker: false,
      contract: 'XXX有限公司',
      contractName: '张某',
      idcard: '',
      duty: '法人',
      contractPhone: '',
      connectName: '李某',
      connectDuty: '经理',
      connectPhone: '',
      companyType: '',
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
      remark: ''
    }
  },
  methods: {
    onConfirm (data) {
      this.companyType = data.text
      this.showPicker = false
    }
  }
}
</script>

<style scoped>

</style>
