<template>
    <div class="main">
      <van-nav-bar title="活动列表" left-arrow @click-left="onClickLeft">
        <template #right v-if="showRight">
          <van-icon name="weapp-nav" size="18" @click="showActions=true" />
          <van-action-sheet cancel-text="取消" description="选择操作" v-model="showActions" :actions="actions" @select="onSelect" />
        </template>
      </van-nav-bar>
      <div class="content">
        <van-tabs @click="onClickTab" v-model="active">
          <van-tab v-for="(item,index) in tabs" :title="item.title" :name="item.name" :key="index">
            <component :is="item.component" :ref="item.name" :info="info"></component>
          </van-tab>
        </van-tabs>
      </div>
      <div class="footer">
        <van-button style="margin: 16px;" type="primary" block>提交</van-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'events',
  data () {
    return {
      showRight: false,
      showActions: false,
      actions: [],
      active: 'baseInfo',
      tabs: [
        {
          name: 'baseInfo',
          title: '基本信息',
          component: () => import('@/components/events/baseInfo')
        },
        {
          name: 'units',
          title: '相关单位',
          component: () => import('@/components/events/units')
        },
        {
          name: 'docs',
          title: '申报材料',
          component: () => import('@/components/events/docs')
        },
        {
          name: 'schedule',
          title: '活动日程',
          component: () => import('@/components/events/schedule')
        },
        {
          name: 'member',
          title: '参会人员',
          component: () => import('@/components/events/member')
        },
        {
          name: 'security',
          title: '安保人员',
          component: () => import('@/components/events/security')
        },
        {
          name: 'cars',
          title: '涉会车辆',
          component: () => import('@/components/events/cars')
        }
      ],
      info: null
    }
  },
  mounted () {
    this.info = this.$route.params.info
    this.setSubMenu(this.active)
  },
  methods: {
    onClickLeft () {
      this.$router.push({ name: 'home' })
    },
    onClickTab (name, title) {
      this.setSubMenu(name)
    },
    onSelect (data) {
      console.log(data)
      this.showActions = false
      this.$nextTick(() => {
        this.$refs[data.comp][0][data.fn]()
      })
    },
    setSubMenu (name) {
      console.log(name)
      let menus = []
      let showMenu = false
      switch (name) {
        case 'baseInfo':
          menus = []
          showMenu = false
          break
        case 'units':
          menus = []
          showMenu = false
          break
        case 'docs':
          menus = []
          showMenu = false
          break
        case 'schedule':
          menus = [
            {
              comp: 'schedule',
              name: '新增',
              fn: 'edit'
            }
          ]
          showMenu = true
          break
        case 'member':
          menus = [
            {
              comp: 'member',
              name: '新增',
              fn: 'edit'
            },
            {
              comp: 'member',
              name: '导入',
              fn: 'imports'
            },
            {
              comp: 'member',
              name: '模板下载',
              fn: 'download'
            }
          ]
          showMenu = true
          break
        case 'security':
          menus = [
            {
              comp: 'security',
              name: '新增',
              fn: 'edit'
            },
            {
              comp: 'security',
              name: '导入',
              fn: 'imports'
            },
            {
              comp: 'security',
              name: '模板下载',
              fn: 'download'
            }
          ]
          showMenu = true
          break
        case 'cars':
          menus = [
            {
              comp: 'cars',
              name: '新增',
              fn: 'edit'
            },
            {
              comp: 'cars',
              name: '导入',
              fn: 'imports'
            },
            {
              comp: 'cars',
              name: '模板下载',
              fn: 'download'
            }
          ]
          showMenu = true
          break
      }
      this.actions = menus
      this.showRight = showMenu
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
  height: calc(~'100% - 106px');
  /*margin-top: 46px;*/
  overflow-y: scroll;
}
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: #ffffff;
}
</style>
