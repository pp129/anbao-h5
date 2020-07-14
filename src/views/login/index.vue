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
// import encrypt from '@/utils/encrypt'
// import { checkAccount } from '@/api/getData'
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
      // const password = encrypt(values.password)
      // console.log(password)
      // const account = await checkAccount()
      // console.log(account)
      // this.$router.push({ name: 'list' })
      this.$store.dispatch('Login', values).then(() => {
        console.log(11111)
        this.$router.push({ name: 'list' })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>

</style>
