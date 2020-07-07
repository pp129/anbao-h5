<template>
  <div>
    <van-search
      v-model="query"
      show-action
      shape="round"
      placeholder="姓名/证件号码"
      @cancel="onCancel"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
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
      <van-swipe-cell v-for="(item,index) in list" :key="index" :title="item.idcard">
        <van-card
          class="list-item"
          desc="描述信息"
          :title="item.color+' '+item.band+' '+item.model+' '+item.carNo"
        >
          <template #desc>
            <van-row>
              <van-col span="12">{{item.owner}}</van-col>
              <van-col span="12">{{item.idcard}}</van-col>
            </van-row>
            <van-row>
              <van-col span="12">{{item.driver}}</van-col>
              <van-col span="12">{{item.driverId}}</van-col>
            </van-row>
          </template>
        </van-card>
        <template #right>
          <van-button class="swipe-cell-button" square type="primary" text="编辑" @click="edit"/>
          <van-button class="swipe-cell-button" square type="danger" text="删除"  @click="del"/>
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import Toast from 'vant/lib/toast'
import { Dialog } from 'vant'
export default {
  name: 'cars',
  data () {
    return {
      query: '',
      emptyImg: require('@/assets/custom-empty-image.png'),
      list: [
        {
          color: '颜色',
          band: '品牌',
          model: '车型',
          carNo: '号牌',
          owner: '车辆负责人姓名',
          idcard: '身份证号',
          driver: '车辆驾驶人姓名',
          driverId: '身份证号'
        }
      ],
      loading: false,
      finished: false
    }
  },
  methods: {
    onSearch (val) {
      Toast(this.query)
    },
    onCancel () {
      Toast('取消')
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list[0])
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    edit () {
      this.$router.push({ name: 'carsEdit' })
    },
    imports () {},
    download () {},
    del () {
      Dialog.confirm({
        title: '确认删除',
        message: '是否确认删除此车辆'
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
