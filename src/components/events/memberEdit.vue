<template>
    <div>
      <van-form @submit="onSubmit">
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
            <van-checkbox-group v-model="forms.committeeType" direction="horizontal">
              <van-checkbox name="1" shape="square">秘书</van-checkbox>
              <van-checkbox name="2" shape="square">安保</van-checkbox>
              <van-checkbox name="3" shape="square">行政</van-checkbox>
              <van-checkbox name="4" shape="square">其他</van-checkbox>
            </van-checkbox-group>
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
        <van-field name="isAudience" label="是否观众" clearable>
          <template #input>
            <van-radio-group v-model="forms.isAudience" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
        v-model="forms.audienceNo"
        name="audienceNo"
        clearable
        label="观众票务编号"
        placeholder="观众票务编号"
        :rules="[{ required: true, message: '请填写观众票务编号' }]"
      />
        <van-field
          v-model="forms.seatNo"
          name="seatNo"
          clearable
          label="座位号"
          placeholder="座位号"
          :rules="[{ required: true, message: '请填写座位号' }]"
        />
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
export default {
  name: 'memberEdit',
  data () {
    return {
      type: '',
      forms: {
        type: '',
        idNo: '',
        sex: '',
        nation: '',
        isCommittee: '',
        committeeType: [],
        committeeNo: '',
        isAudience: '',
        audienceNo: '',
        seatNo: ''
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
      this.$emit('cancelEdit')
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
