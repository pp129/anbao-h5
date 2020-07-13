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
      <div style="margin-top: 50px;">
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
          <van-swipe-cell v-for="item in list" :key="item" :title="item">
            <van-card
              class="list-item"
              desc="描述信息"
              title="活动名称"
            >
              <template #desc>
                <div>
                  申请：2020-02-02 09:09:09  已提交
                </div>
                <div>
                  审查通过       2020-02-03 09:09:09
                </div>
                <div>
                  审批不通过   2020-02-04 09:09:09
                </div>
              </template>
            </van-card>
            <template #right>
              <van-button class="swipe-cell-button" square type="primary" text="编辑" @click="edit"/>
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
export default {
  name: 'list',
  data () {
    return {
      emptyImg: require('@/assets/custom-empty-image.png'),
      logoutUrl: require('@/assets/logout.png'),
      value: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onSearch (val) {
      Toast(this.value)
    },
    onCancel () {
      Toast('取消')
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onClickRight () {},
    edit () {
      this.$router.push({ name: 'events' })
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
          this.$router.push({ name: 'login' })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
  .swipe-cell-button {
    height: 100%;
  }
</style>
