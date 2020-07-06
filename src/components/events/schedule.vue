<template>
  <div>
    <div v-if="!showEdit">
      <van-button type="default" block size="normal" icon="plus" round>新增</van-button>
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
        <van-swipe-cell v-for="(item,index) in list" :key="index" :title="item.title">
          <van-card
            class="list-item"
            desc="描述信息"
            :title="item.title"
          >
            <template #desc>
              <van-row>
                <van-col span="12">{{item.duty}}</van-col>
                <van-col span="12">{{item.dutyPhone}}</van-col>
              </van-row>
              <van-row>
                <van-col span="12">{{item.manager}}</van-col>
                <van-col span="12">{{item.managerPhone}}</van-col>
              </van-row>
              <van-row>
                <van-col span="12">{{item.connect}}</van-col>
                <van-col span="12">{{item.connectPhone}}</van-col>
              </van-row>
            </template>
          </van-card>
          <template #right>
            <van-button class="swipe-cell-button" square type="primary" text="编辑" @click="edit"/>
            <van-button class="swipe-cell-button" square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
    <schedule-edit v-if="showEdit" @cancelEdit="cancelEdit"></schedule-edit>
  </div>
</template>

<script>
import scheduleEdit from '@/components/events/scheduleEdit'
export default {
  name: 'schedule',
  components: {
    scheduleEdit: scheduleEdit
  },
  data () {
    return {
      showEdit: false,
      emptyImg: require('@/assets/custom-empty-image.png'),
      list: [{
        title: '活动日程',
        duty: '负责人',
        dutyPhone: ' 联系电话',
        manager: '现场指挥人',
        managerPhone: '联系电话',
        connect: '联系人',
        connectPhone: '联系电话'
      }],
      loading: false,
      finished: false
    }
  },
  methods: {
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
      this.showEdit = true
    },
    cancelEdit () {
      this.showEdit = false
    }
  }
}
</script>

<style scoped>
  .swipe-cell-button {
    height: 100%;
  }
</style>
