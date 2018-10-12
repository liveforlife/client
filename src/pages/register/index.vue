<template>
  <div class="page-login-content">
    <div class="loginDiv">
      <div class="content forget_Pwd">
        <div class="logo logo-title">
          <div class="title center">新用户注册</div>
        </div>
       <div class="line"><span>客&nbsp;&nbsp;户</span></div>
        <el-form :model="registerForm" :rules="rules" ref="registerForm">
          <el-form-item prop="mobile">
            <el-input placeholder="手机号码" v-model="registerForm.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="sms">
            <el-input  placeholder="验证码" type="text" v-model="registerForm.sms" class="short">
              <template slot="append"><span class="sms" @click="getSms" :class="getSmsContentFlag==true?'':'getAssaCon'" >{{getSmsContent}}</span></template>
            </el-input>
          </el-form-item>
          <div class="confirm form-group" @click="gotoNext">下一步</div>
        </el-form>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple left"><router-link class="span" to="/login">&lt;&nbsp;&nbsp;返回密码登录</router-link></div></el-col>
        </el-row>
      </div>
    </div>
    <div class="copy-right">Copyright 2007-2017 华药共享网络科技有限公司</div>
  </div>
</template>

<script>
  import '../login/login.css'
  import request from '@/utils/request'
  import { setAuthToken, setSSession } from '@/utils/session'

  export default {
    data () {
      var validMobile = (rule, value, callback) => {
        this.isok = false
      }
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号!'))
        } else {
          if (!(/^1\d{10}$/.test(value))) {
            return callback(new Error('请输入正确的手机号!'))
          } else if (this.isok === false) {
            request.checkMobile({
              mobile: this.registerForm.mobile
            }).then(({ data }) => {
              if (data.success) {
                this.isok = true
              } else {
                return callback(new Error('手机号已被注册!'))
              }
            })
          }
        }
      }
      var sms = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码!'))
        } else if (value.length !== 6) {
          return callback(new Error('验证码为6位数!'))
        } else {
          this.issms = true
        }
      }
      return {
        isok: false,
        issms: false,
        getSmsContent:'获取验证码',
        getSmsContentFlag:true,
        registerForm: {
          mobile: '',
          sms: ''
        },
        rules: {
          mobile: [
            { required: true, validator: checkMobile, trigger: 'blur' },
            { required: true, validator: validMobile, trigger: 'change' }
          ],
          sms: [
            { required: true, validator: sms, trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      document.addEventListener('keydown', this.enterSubmit, false)
    },
    destroyed () {
      document.removeEventListener('keydown', this.enterSubmit, false)
    },
    
    methods: {
      getSms () {
	      		    	
     	if(this.getSmsContentFlag){
	      		if (!this.registerForm.mobile) {
	      		  this.$message.error('请输入手机号码！')
	      		} else if (this.isok !== true) {
	      		  this.$message.error('手机号码验证不通过！')
	      		} else {
	      		  request.sendSms({
	      		    mobile: this.registerForm.mobile,
	      		    module: 'userRegist'
	      		  }).then(({ data }) => {
	      		    if (data.success) {
	      		      this.openSuccees('验证码获取成功！')
	      		      this.getSmsContentFlag=false
	      		    	let count=120
	      		    	var timer=window.setInterval(() =>{
	      		    		count--
	      		    		if(count>0){
	      		    			this.getSmsContent="剩余时间"+count+"s"
	      		    		}else{
	      		    			this.getSmsContent="重新获取验证码"
	      		    			this.getSmsContentFlag=true
	      		    			window.clearInterval(timer);
	      		    		}
	      		    	},1000)
	      		    } else {
	      		      this.openFalse('验证码获取失败！')
	      		    }
	      		  })
	      		}
      	}else{
      		this.openFalse('距离上次验证时间未到两分钟')
    	}
      },
      gotoNext () {
        if (this.isok === true && this.issms === true) {
          request.checkSms({
            mobile: this.registerForm.mobile,
            module: 'userRegist',
            code: this.registerForm.sms
          }).then(({ data }) => {
            if (data.success) {
              setAuthToken(data)
              setSSession('hymobile', this.registerForm.mobile)
              this.openSuccees('手机号码验证成功！')
              this.$nextTick(() => {
                this.$router.push({ path: '/companyInfo' })
              })
            } else {
              this.openFalse(data.message)
            }
          })
        }
      },
      openSuccees (info) {
        this.$message({
          message: info,
          type: 'success'
        })
      },
      openFalse (info) {
        this.$message.error(info)
      }
    }
  }
</script>
<style>
	.getAssaCon{
		background-color: #BCBCBC;
	}
</style>