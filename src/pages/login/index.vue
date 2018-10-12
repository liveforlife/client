<template>
  <div class="page-login-content">
   <div class="wrap">
    <div class="loginDiv">
     <div class="content">
      <div class="logo">
       <img src="../../assets/login/logo.png"/>
       <div class="title center">客户登录</div>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
       <el-form-item prop="mobile">
        <el-input placeholder="用户名" v-model="loginForm.mobile"></el-input>
       </el-form-item>
       <el-form-item prop="password">
        <el-input  placeholder="请输入密码" type="password" v-model="loginForm.password" @keyup.enter.native="submitForm"></el-input>
       </el-form-item>
       <el-button class="confirm form-group" type="submit" @click="submitForm" @keyup.enter.native="submitForm" style="border: 0px;">登&nbsp;录</el-button><!---->
      </el-form>
      <el-row>
       <el-col :span="12"><div class="grid-content bg-purple left"><router-link class="span" to="/forgetPwd">忘记密码</router-link></div></el-col>
       <el-col :span="12"><div class="grid-content bg-purple-light right"><router-link class="span" to="/register">新用户注册</router-link></div></el-col>
      </el-row>
     </div>
    </div>
   </div>
    <div class="copy-right"><div class="text">Copyright 2007-2017 华药共享网络科技有限公司</div></div>
  </div>
</template>

<script>
  // import md5 from 'md5'
  import './login.css'
  import request from '@/utils/request'
  import { setAuthToken, setLSession } from '@/utils/session'

  export default {
    data () {
      return {
        loginForm: {
          loginType: 1,
          mobile: '',
          password: ''
        },
        rules: {
          mobile: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        isLogin: true
      }
    },
    methods: {
      submitForm () {
      	console.log(2222)
      	this.$router.push({ path: '/Home' })
//      this.$refs.loginForm.validate((valid) => {
//        if (valid) {
//        	console.log()
//          request.login(this.loginForm).then(({ data }) => {
//            if (data.success) {
//             setAuthToken(data.data.token)
//             setLSession(data)
//              this.openSuccees()
//              this.$nextTick(() => {
//              })
//            } else {
//              this.$message.error(data.message)
//            }
//          })
//        }
//      })
      },
      enterSubmit (event) {
        if (event.keyCode === 13) this.submitForm()
      },
      openSuccees () {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


