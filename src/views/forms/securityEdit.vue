<template>
  <div class="main_form">
    <van-form class="content" @submit="onSubmit">
      <van-field
        readonly
        clearable
        clickable
        name="picker"
        :value="type"
        label="证件类型"
        placeholder="点击选择证件类型"
        @click="showPicker.type = true"
      />
      <van-popup v-model="showPicker.type" position="bottom">
        <van-picker
          show-toolbar
          :columns="types"
          @confirm="onConfirm"
          @cancel="showPicker.type = false"
        />
      </van-popup>
      <van-field
        v-model="forms.idNo"
        name="idNo"
        clearable
        label="证件号码"
        placeholder="证件号码"
        :rules="[{ required: true, message: '请填写证件号码' }]"
      />
      <van-field
        v-model="forms.name"
        name="name"
        clearable
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field name="sex" label="单选框" clearable>
        <template #input>
          <van-radio-group v-model="forms.sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="forms.nation"
        name="nation"
        clearable
        label="国籍"
        placeholder="国籍"
        :rules="[{ required: true, message: '请填写国籍' }]"
      />
      <van-field
        v-model="forms.minority"
        name="minority"
        clearable
        label="民族"
        placeholder="民族"
        :rules="[{ required: true, message: '请填写民族' }]"
      />
      <van-field name="isCommittee" label="是否会务人员" clearable>
        <template #input>
          <van-radio-group v-model="forms.isCommittee" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="committeeType" label="会务人员类型">
        <template #input>
          <van-radio-group v-model="forms.committeeType" direction="horizontal">
            <van-radio name="2">安保</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="forms.minority"
        name="minority"
        clearable
        label="会务人员会务证编号"
        placeholder="会务人员会务证编号"
        :rules="[{ required: true, message: '请填写会务人员会务证编号' }]"
      />
      <van-field v-model="forms.tel" type="tel" label="联系电话" clearable :rules="[{ required: true, message: '请填写联系电话' }]" />
      <van-field name="isMarriage" label="婚姻状态" clearable>
        <template #input>
          <van-radio-group v-model="forms.isMarriage" direction="horizontal">
            <van-radio name="1">已婚</van-radio>
            <van-radio name="2">未婚</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="forms.partnerName"
        name="partnerName"
        clearable
        label="配偶姓名"
        :rules="[{ required: true, message: '请填写配偶姓名' }]"
      />
      <van-field
        v-model="forms.idcard"
        name="idcard"
        clearable
        label="身份证号"
        placeholder="身份证号"
        :rules="[{ required: true, message: '请填写身份证号' }]"
      />
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
export default {
  name: 'securityEdit',
  data () {
    return {
      type: '',
      forms: {
        type: '',
        idNo: '',
        sex: '',
        nation: '',
        isCommittee: '',
        committeeType: '2',
        committeeNo: '',
        isAudience: '',
        audienceNo: '',
        seatNo: '',
        tel: '',
        isMarriage: '',
        partnerName: '',
        idcard: ''
      },
      showPicker: {
        type: false
      },
      types: [
        {
          text: '身份证',
          value: '1'
        },
        {
          text: '户口本',
          value: '2'
        },
        {
          text: '驾驶证',
          value: '3'
        },
        {
          text: '居住证',
          value: '4'
        },
        {
          text: '暂住证',
          value: '5'
        },
        {
          text: '护照',
          value: '6'
        }
      ]
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
    onConfirm (data) {
      this.forms.type = data.value
      this.type = data.text
      this.showPicker.type = false
    }
  }
}
</script>

<style scoped>
</style>
