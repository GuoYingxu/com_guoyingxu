<style lang="scss">
@import './login.scss'
</style>
<template lang="pug">
  .login(@keydown.enter = 'handleSumit')
    .login-con
      Card(:bordered='false')
        p(slot='title')
          Icon(type='log-in')
          |欢迎登陆
        .form-con
          Form(ref='loginForm', :model = 'form', :rules='rules')
            FormItem(prop='userName')
              Input(v-model='form.userName', placeholder="请输入用户名")
                span(slot='prepend')
                  Icon(:size="16",type='person')
            FormItem(prop='passwrod')
              Input(type='password', v-model='form.password',placeholder ='请输入密码')
                span(slot='prepend')
                  Icon(:size='16',type='locked')
            FormItem
              Button(type='primary', long, @click='handlerSubmit') 登录
          p.login-tip 暂时不提供注册
</template>
<script>
export default {
  data () {
    return {
      form: {
          userName: 'iview_admin',
          password: ''
      },
      rules: {
          userName: [
              { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
      }
    };
  },
  methods:{
    handlerSubmit(){

    }
  }
}
</script>
