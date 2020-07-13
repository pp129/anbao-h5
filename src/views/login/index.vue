<template>
   <div>
     <van-form @submit="onSubmit">
       <van-field
         v-model="username"
         name="username"
         label="用户名"
         placeholder="用户名"
         :rules="[{ required: true, message: '请填写用户名' }]"
       />
       <van-field
         v-model="password"
         type="password"
         name="password"
         label="密码"
         placeholder="密码"
         :rules="[{ required: true, message: '请填写密码' }]"
       />
       <div style="margin: 16px;">
         <van-button round block type="info" native-type="submit">
           提交
         </van-button>
       </div>
     </van-form>
   </div>
</template>

<script>
import encrypt from '@/utils/encrypt'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
      const password = encrypt(values.password)
      console.log(password)
      this.$router.push({ name: 'list' })
    }
  }
}
</script>

<style scoped>

</style>
