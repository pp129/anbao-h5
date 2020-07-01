<template>
    <div class="main">
      <van-nav-bar title="活动列表" fixed left-arrow @click-left="onClickLeft">
      </van-nav-bar>
      <div class="content">
        <van-tabs>
          <van-tab v-for="(item,index) in tabs" :title="item.name" :key="index">
            <component :is="item.component"></component>
          </van-tab>
        </van-tabs>
      </div>
      <div class="footer">
        <van-divider />
        <van-button type="info">提交</van-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'events',
  data () {
    return {
      tabs: [
        {
          name: '基本信息',
          component: () => import('@/components/events/baseInfo')
        },
        {
          name: '相关单位',
          component: () => import('@/components/events/units')
        },
        {
          name: '申报材料',
          component: () => import('@/components/events/docs')
        },
        {
          name: '活动日程',
          component: () => import('@/components/events/schedule')
        },
        {
          name: '参会人员',
          component: () => import('@/components/events/member')
        },
        {
          name: '安保人员',
          component: () => import('@/components/events/security')
        },
        {
          name: '涉会车辆',
          component: () => import('@/components/events/cars')
        }
      ]
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.main{
  height: 100%;
  width: 100%;
}
.content{
  height: calc(~'100% - 110px');
  margin-top: 46px;
  overflow-y: scroll;
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 90px;
  width: 100%;
}
</style>
