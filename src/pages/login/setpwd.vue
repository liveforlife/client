<template>
  <div class="page-login-content">
    <div class="loginDiv">
      <div class="content">
        <div class="logo logo-title">
          <div class="title center">设置新密码</div>
        </div>
        <el-form :model="setpwdForm" :rules="rules" ref="setpwdForm">
          <el-form-item prop="pwd">
            <el-input type="password" placeholder="新密码" v-model="setpwdForm.pwd"></el-input>
          </el-form-item>
          <el-form-item prop="checkpwd">
            <el-input type="password" placeholder="确认密码" v-model="setpwdForm.checkpwd"></el-input>
          </el-form-item>
          <el-form-item prop="checkpwd">
            <div class="confirm form-group" @click="submitForm('setpwdForm')">确&emsp;定</div>
          </el-form-item>          
        </el-form>
      </div>
    </div>
    <div class="copy-right">Copyright 2007-2017 华药共享网络科技有限公司</div>
  </div>
</template>

<script>
  import '../login/login.css'
  import request from '@/utils/request'
  import { getSSession, clearSSession } from '@/utils/session'

  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码!'))
        } else {
          if (this.setpwdForm.checkpwd !== '') {
            this.$refs.setpwdForm.validateField('checkpwd')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次确认密码!'))
        } else if (value !== this.setpwdForm.pwd) {
          callback(new Error('两次输入不匹配!'))
        } else {
          callback()
        }
      }

      return {
        setpwdForm: {
          pwd: '',
          checkpwd: ''
        },
        rules: {
          pwd: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkpwd: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              pwd: this.setpwdForm.checkpwd,
              mobile: getSSession('hygorgetToken').mobile,
              token: getSSession('hygorgetToken').token
            }
            request.againSetPwd(param).then(({ data }) => {
              console.log(data)
              if (data.success === true) {
                this.openSuccees('新密码设置成功！')
                this.$nextTick(() => {
                  this.$router.push({ path: '/login' })
                })
              } else {
                this.openFalse('新密码设置失败！')
              }
              clearSSession('hygorgetToken')
            })
          }
        })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->