<template>
  <div class="page-login-content">
   <div class="wrap">
    <div class="loginDiv">
     <div class="content">
      <div class="logo">
       <!--<img src="../../assets/login/logo.png"/>-->
       <div class="title center">登录</div>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
	       <el-form-item >
	        <el-select  v-model="loginForm.type" placeholder="请选择类型" style='width: 310px;'>
	        	<el-option v-for="item in loginTypeList" :label="item.label" :value="item.value"></el-option>
	        </el-select>
	       </el-form-item>
	       <el-form-item>
	        <el-input placeholder="电话号码" v-model="loginForm.phone"></el-input>
	       </el-form-item>
	       <el-form-item >
	        <el-select  v-model="loginForm.account" placeholder="请选择账号" @focus="getAccountList" style='width: 310px;'>
	        	<el-option v-for="item in accountList" :label="item.label" :value="item.value"></el-option>
	        </el-select>
	       </el-form-item>
	       <el-form-item >
	        <el-input  placeholder="请输入密码" type="password" v-model="loginForm.pwd" @keyup.enter.native="submitForm"></el-input>
	       </el-form-item>
	       <el-button class="confirm form-group" type="button" @click="submitForm" @keyup.enter.native="submitForm" style="border: 0px;">登&nbsp;录</el-button><!---->
	      </el-form>
	      <el-row>
	       <el-col :span="12"><div class="grid-content bg-purple left"><router-link class="span" to="/forgetPwd">忘记密码</router-link></div></el-col>
	       <el-col :span="12"><div class="grid-content bg-purple-light right"><router-link class="span" to="/register">新用户注册</router-link></div></el-col>
	      </el-row>
     </div>
    </div>
   </div>
    <div class="copy-right"><div class="text"> 有限未知公司</div></div>
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
          phone: '',
          pwd: '',
          account:'',
          type:0
        },
        loginTypeList:[
        	{value: 0,label:'系统用户'},
        	{value:1,label:'普通员工'}
        ],
        accountList:[],
        rules: {
//        mobile: [
//          { required: true, message: '请输入用户名', trigger: 'blur' }
//        ],
//        password: [
//          { required: true, message: '请输入密码', trigger: 'blur' }
//        ]
        },
        isLogin: true
      }
    },
    methods: {
    	getAccountList(){
    		 request.getUsersByPhone({type:this.loginForm.type,phone:this.loginForm.phone}).then(res =>{
    		 	let arr=res.data.data
    		 	this.accountList=arr.map((item,index)=>{
    		 		let newJson={};
    		 		newJson.label=item.instName 
    		 		if(this.loginForm.type == 0){
    		 			newJson.value=item.sysUserAcct 
    		 		}else{
    		 			newJson.value=item.empAcct
    		 		}
    		 		return newJson
    		 	})
    		 })
    	},
      submitForm () {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
          	console.log()
          	let loginJson={
          		account:this.loginForm.account,
          		type:this.loginForm.type,
          		pwd:this.loginForm.pwd
          	}
            request.login(loginJson).then(({ data }) => {
              if (data.success) {
               setAuthToken(data.data.token)
               setLSession(data)
                this.openSuccees()
                
                this.$nextTick(() => {
                	this.$router.push({ path: '/insList' })
                })
              } else {
                this.$message.error(data.message)
              }
            })
            }
          })
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


