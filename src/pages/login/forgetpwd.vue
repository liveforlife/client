<template>
  <div class="page-login-content">
    <div class="loginDiv">
      <div class="content forget_Pwd">
        <div class="logo logo-title">
          <div class="title center">忘记密码</div>
        </div>
       <div class="line"><span>客&nbsp;&nbsp;户</span></div>
        <el-form :model="forgetpwd" :rules="rules" ref="forgetpwd">
          <el-form-item prop="mobile">
            <el-input placeholder="手机号码" v-model="forgetpwd.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="sms">
            <el-input  placeholder="请输入验证码" type="text" v-model="forgetpwd.sms" class="short">
              <template slot="append"><span class="sms" @click="getSms" :class="getSmsContentFlag==true?'':'getAssaCon'" >{{getSmsContent}}</span></template>
            </el-input>
          </el-form-item>
          <div class="confirm form-group" @click="submitForm('forgetpwd')">确&emsp;定</div>
        </el-form>
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple left"><router-link class="span" to="/">&lt;&nbsp;&nbsp;返回密码登录</router-link></div></el-col>
          <!--<el-col :span="12"><div class="grid-content bg-purple-light right"><router-link class="span" to="/register">新用户注册</router-link></div></el-col>-->
        </el-row>
      </div>
    </div>
    <div class="copy-right">Copyright 2007-2017 华药共享网络科技有限公司</div>
  </div>
</template>

<script>
import './login.css'
import request from '@/utils/request'
import { setSSession } from '@/utils/session'

export default {
  data () {
    var checkMobile = (rule, value, callback) => {
      console.log(this.isok)
      if (!value) {
        callback(new Error('请输入手机号!'))
      } else if (!(/^1\d{10}$/.test(value))) {
        callback(new Error('请输入正确的手机号!'))
      } else if (this.isok === false) {
        request.checkMobile({
          mobile: this.forgetpwd.mobile
        }).then(({ data }) => {
          console.log(data)
          if (data.success === true) {
            callback(new Error('手机号未注册!'))
          } else {
            this.openWarning(data.message)
            this.isok = true
          }
        })
      }
    }
    var validMobile = (rule, value, callback) => {
      this.isok = false
      console.log(this.isok)
    }
    var sms = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码!'))
      } else if (value.length !== 6) {
        callback(new Error('验证码为6位数!'))
      }
    }
    return {
      isok: false,
      issms: false,
      getSmsContent:'获取验证码',
      getSmsContentFlag:true,
      forgetpwd: {
        mobile: '',
        sms: ''
      },
      rules: {
        mobile: [
          { required: true, validator: checkMobile, trigger: 'blur' },
          { validator: validMobile, trigger: 'change' }
        ],
        sms: [
          { required: true, validator: sms, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getSms () {
    	if(this.getSmsContentFlag){
	      if (!this.forgetpwd.mobile) {
	        this.$message.error('请输入手机号码！')
	      } else {
	        request.sendSms({
	          mobile: this.forgetpwd.mobile,
	          module: 'forgetPwd'
	        }).then(({ data }) => {
	          console.log(data)
	          if (data.success === true) {
	            this.issms = true
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
    submitForm (formName) {
      if (this.isok === true && this.issms === true) {
        let formData = new FormData()
        formData.append('mobile', this.forgetpwd.mobile)
        formData.append('module', 'forgetPwd')
        formData.append('code', this.forgetpwd.sms)
        request.checkSms({
          mobile: this.forgetpwd.mobile,
          module: 'forgetPwd',
          code: this.forgetpwd.sms
        }).then(({ data }) => {
          console.log(data)
          if (data.success === true) {
            let hygorget = {
              token: data.data.token,
              mobile: this.forgetpwd.mobile
            }
            setSSession('hygorgetToken', hygorget)
            this.openSuccees('手机号码验证成功！')
            this.$nextTick(() => {
              this.$router.push({ path: '/setpwd' })
            })
          } else {
            this.openFalse('手机号码验证失败！')
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
    },
    openWarning (info) {
      this.$message.warning(info)
    }
  }
}
</script>
<style>
	.getAssaCon{
		background-color: #BCBCBC;
	}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
