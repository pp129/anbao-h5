<template>
  <div>
    <van-empty
      v-if="list.length <= 0"
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
      <van-swipe-cell v-for="(item,index) in list" :key="index" :title="item.HDRCID">
        <van-card
          class="list-item"
          desc="描述信息"
          :title="setTitle(item)"
        >
          <template #desc>
            <van-row>
              <van-col span="12">{{item.FZRXM}}</van-col>
              <van-col span="12">{{item.FZRLXDH}}</van-col>
            </van-row>
            <van-row>
              <van-col span="12">{{item.XCZHRXM}}</van-col>
              <van-col span="12">{{item.XCZHRLXDH}}</van-col>
            </van-row>
            <van-row>
              <van-col span="12">{{item.LXRXM}}</van-col>
              <van-col span="12">{{item.LXRDH}}</van-col>
            </van-row>
          </template>
        </van-card>
        <template #right>
          <van-button class="swipe-cell-button" square type="primary" text="编辑" @click="edit(item)"/>
          <van-button class="swipe-cell-button" square type="danger" text="删除" @click="del" />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'schedule',
  data () {
    return {
      emptyImg: require('@/assets/custom-empty-image.png'),
      list: [],
      loading: false,
      finished: false,
      page: 0
    }
  },
  props: {
    info: {
      default: undefined
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.page++
      const data = await this.getList()
      this.list = this.list.concat(data.list)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (this.list.length >= data.total) {
        this.finished = true
      }
    },
    async getList () {
      return axios.post('/jmxfxt/dxabHdrc/list', {
        HDXXID: this.info.HDXXID,
        page: this.page,
        limit: 10
      }).then(res => {
        if (res.data.flag) {
          return res.data.entity
        }
      })
    },
    setTitle (item) {
      const formatter = 'YYYY-MM-DD HH:mm'
      let start = ''
      if (item.KSSJ) {
        start = moment(item.KSSJ).format(formatter)
      }
      let end = ''
      if (item.JSSJ) {
        end = moment(item.JSSJ).format(formatter)
      }
      return `${start} - ${end}`
    },
    edit (row) {
      this.$router.push({ name: 'scheduleEdit', params: { info: row } })
    },
    del () {
      Dialog.confirm({
        title: '确认删除',
        message: '是否确认删除此日程'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped>
  .swipe-cell-button {
    height: 100%;
  }
</style>
