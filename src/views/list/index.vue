<template>
    <div>
      <van-nav-bar title="活动列表" fixed  @click-right="onClickRight">
        <template #left>
          <van-icon :name="logoutUrl" size="20" @click="logout" />
        </template>
        <template #right>
          <van-icon name="plus" size="20" @click="edit" />
        </template>
      </van-nav-bar>
      <div style="margin-top: 50px;background: #f7f8fa">
        <van-search
          v-model="value"
          show-action
          shape="round"
          placeholder="活动名称"
          @cancel="onCancel"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
        <van-empty
          v-if="list.length<=0"
          class="custom-image"
          :image="emptyImg"
          description=""
        />
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-swipe-cell v-for="(item,index) in list" :key="index" :title="item.HDMC">
            <van-card
              class="list-item"
              desc="描述信息"
              :title="item.HDMC"
            >
              <template #desc>
                <van-row>
                  <van-col span="14">申请：{{dateFormat(item.LRSJ)}}</van-col>
                  <van-col span="8" :class="setClass('TJZT',item.TJZT)">{{setStatus('TJZT',item.TJZT)}}</van-col>
                </van-row>
                <van-row>
                  <van-col span="8" :class="setClass('SCJG',item.SCJG)">{{setStatus('SCJG',item.SCJG)}}</van-col>
                  <van-col span="14">{{dateFormat(item.SCSJ)}}</van-col>
                </van-row>
                <van-row>
                  <van-col span="8" :class="setClass('SPJG',item.SPJG)">{{setStatus('SPJG',item.SPJG)}}</van-col>
                  <van-col span="14">{{dateFormat(item.SPSJ)}}</van-col>
                </van-row>
              </template>
            </van-card>
            <template #right>
              <van-button class="swipe-cell-button" square type="primary" text="编辑" @click="edit(item.HDXXID)"/>
              <van-button class="swipe-cell-button" square type="danger" text="删除" @click="del" />
            </template>
          </van-swipe-cell>
        </van-list>
      </div>
    </div>
</template>

<script>
import Toast from 'vant/lib/toast'
import { Dialog } from 'vant'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'home',
  data () {
    return {
      emptyImg: require('@/assets/custom-empty-image.png'),
      logoutUrl: require('@/assets/logout.png'),
      value: '',
      list: [],
      loading: false,
      finished: false,
      page: 0
    }
  },
  methods: {
    dateFormat (date) {
      if (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return ''
      }
    },
    setClass (type, value) {
      if (value) {
        if (type === 'TJZT') { // 提交状态 0 已提交 1 未提交 2 已审
          switch (value) {
            case '0':
              return 'color_green'
            case '1':
              return 'color_red'
            case '2':
              return 'color_green'
          }
        } else if (type === 'SCJG') { // 审查状态 0通过 1不通过
          switch (value) {
            case '0':
              return 'color_green'
            case '1':
              return 'color_red'
          }
        } else if (type === 'SPJG') { // 审批状态 0 通过 1不通过
          switch (value) {
            case '0':
              return 'color_green'
            case '1':
              return 'color_red'
          }
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    setStatus (type, value) {
      if (value) {
        if (type === 'TJZT') { // 提交状态 0 已提交 1 未提交 2 已审
          switch (value) {
            case '0':
              return '已提交'
            case '1':
              return '未提交'
            case '2':
              return '已审'
          }
        } else if (type === 'SCJG') { // 审查状态 0通过 1不通过
          switch (value) {
            case '0':
              return '通过'
            case '1':
              return '不通过'
          }
        } else if (type === 'SPJG') { // 审批状态 0 通过 1不通过
          switch (value) {
            case '0':
              return '通过'
            case '1':
              return '不通过'
          }
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    async onSearch () {
      // Toast(this.value)
      this.page = 1
      this.list = []
      // this.value = val
      const data = await this.listHdxx()
      this.list = data.list
    },
    onCancel () {
      Toast('取消')
    },
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.page++
      const data = await this.listHdxx()
      this.list = this.list.concat(data.list)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (this.list.length >= data.total) {
        this.finished = true
      }
    },
    onClickRight () {},
    edit (id) {
      this.$router.push({ name: 'events', params: { id: id } })
    },
    del () {
      Dialog.confirm({
        title: '确认删除',
        message: '是否确认删除此活动'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    logout () {
      Dialog.confirm({
        title: '退出',
        message: '是否确认退出系统'
      })
        .then(() => {
          // on confirm、
          this.$store.dispatch('LogOut').then(() => {
            this.$router.push({ name: 'login' })
          }).catch(() => {

          })
        })
        .catch(() => {
          // on cancel
        })
    },
    async listHdxx () {
      return axios.post('/jmxfxt/dxabHdxx/listHdxx', {
        KEYWORDS: this.value,
        page: this.page,
        limit: 10
      }).then(res => {
        if (res.data.flag) {
          return res.data.entity
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .swipe-cell-button {
    height: 100%;
  }
  .van-swipe-cell{
    margin-bottom: 10px;
  }
</style>
