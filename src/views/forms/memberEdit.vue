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
      <van-field
        name="committeeType"
        label="会务人员类型"
        readonly
        clearable
        clickable
        v-model="selectedCommitteeType"
        @click="showPicker.committeeType = true"
      >
      </van-field>
      <van-popup v-model="showPicker.committeeType" position="bottom">
        <van-checkbox-group v-model="forms.committeeType" @change="onCheckChange">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in committeeTypes"
              clickable
              :key="index"
              :title="item.name"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-popup>
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
    </van-form>
    <div class="footer">
      <van-button block type="info" native-type="submit" @click="onSubmit">
        保存
      </van-button>
      <van-button block type="default" native-type="button" @click="onCancel">
        取消
      </van-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'memberEdit',
  data () {
    return {
      showActions: false,
      actions: [
        {
          name: '新增',
          fn: 'edit'
        },
        {
          name: '导入',
          fn: 'imports'
        },
        {
          name: '模板下载',
          fn: 'download'
        }
      ],
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
        type: false,
        committeeType: false
      },
      selectedCommitteeType: '',
      committeeTypes: [
        {
          name: '秘书',
          value: '1'
        },
        {
          name: '安保',
          value: '2'
        },
        {
          name: '行政',
          value: '3'
        },
        {
          name: '其他',
          value: '4'
        }
      ],
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
      // this.$emit('cancelEdit')
      this.$router.back()
    },
    onConfirm (data) {
      this.forms.type = data.value
      this.type = data.text
      this.showPicker.type = false
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    onCheckChange (value) {
      const arr = []
      _.each(value, e => {
        arr.push(e.name)
      })
      this.selectedCommitteeType = arr.join(',')
    }
  }
}
</script>

<style scoped>

</style>
