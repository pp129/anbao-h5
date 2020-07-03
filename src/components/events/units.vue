<template>
    <div>
      <h2 class="_title">承办者情况</h2>
      <van-field v-model="contract" placeholder="公司名称" />
    </div>
</template>

<script>
export default {
  name: 'units',
  data () {
    return {
      contract: 'XXX有限公司'
    }
  }
}
</script>

<style scoped>

</style>
