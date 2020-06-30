<template>
    <div>
      <van-nav-bar title="活动列表" fixed left-arrow @click-left="onClickLeft">
      </van-nav-bar>
      <div style="margin-top: 46px;">
        <van-tabs>
          <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
            内容 {{ index }}
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
export default {
  name: 'events',
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
