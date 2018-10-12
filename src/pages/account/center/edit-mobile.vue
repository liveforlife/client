<template>
  <div class="edit-mobile">
    <el-dialog title="修改手机号"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show" width="400px">
      <div class="model-img"><img src="../../../assets/model.png" alt=""></div>
      <el-form :model="editMobileForm" status-icon :rules="rules" ref="editMobileForm" label-width="90px" class="demo-ruleForm" size="small" style="padding: 0 5%;">
        <el-form-item label="旧手机号">
            <el-input v-model="this.editMobileForm.oldmobile" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="pwd">
            <el-input type="password" v-model="editMobileForm.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="newmobile">
            <el-input v-model="editMobileForm.newmobile"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="yzm">
            <el-input v-model="editMobileForm.zym" class="zym"></el-input>
            <el-button type="info" @click="getSms" style="float: right;border:0px" :class="getSmsContentFlag==true?'notGetAssCon':'getAssaCon'" >{{getSmsContent}}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button class="admin-next" @click="editMobile('editMobileForm')"><i class="icon-l icon-success"></i>确定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import { setLSession, getLSession,clearLSession } from '@/utils/session'
  export default {
    props: {
     mobile:{
      type: String,
      default: ''
     },
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
     mobile(){
      this.editMobileForm.oldmobile = this.mobile
     },
      show () {
        this.visible = this.show
      }
    },
    data () {
      return {
        visible: this.dialogEditMobile,
        getSmsContent:'获取验证码',
    		getSmsContentFlag:true,
        editMobileForm: {
          oldmobile: this._props.mobile,
          pwd: '',
          newmobile: '',
          zym: ''
        },
        rules: {
          pwd: [
            { required: true, message: '请输入密码！', min: '6', trigger: 'blur' }
          ],
          newmobile: [
            { required: true, message: '请输入新手机号！', trigger: 'blur' },
            { pattern: /^1\d{2}\d{8}$/, message: '请输入正确的11位新手机号码' }
          ],
          zym: [
            { required: true, message: '请输入验证码！', trigger: 'blur' },
            { pattern: /^\d{6}$/, message: '请输入正确的6位验证码' }
          ]
        }
      }
    },
   mounted(){
     console.log(this._props.mobile)
   },
    methods: {
      getSms () {
      	if(this.getSmsContentFlag){
	        if (this.editMobileForm.newmobile) {
	          request.sendSms({
	            mobile: this.editMobileForm.newmobile,
	            module: 'updateMobile'
	          }).then(({ data }) => {
	            if (data.success) {
	              this.$message({ message: '验证码发送成功！', type: 'success' })
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
	              this.$message.error(data.message)
	            }
	          })
	        } else {
	          return false
	        }
      	}else{
      		this.$message.error('距离上次验证时间未到两分钟')
      	}
      },
      editMobile (formName) {
        let info = getLSession()
        let user = info.data.user
        this.$refs[formName].validate((valid) => {
          if (valid && user.id) {
            request.updateMobile({
              uid: user.id,
              password: this.editMobileForm.pwd,
              newMobile: this.editMobileForm.newmobile,
              code: this.editMobileForm.zym,
              module: 'updateMobile'
            }).then(({ data }) => {
              if (data.success) {
                info.data.user.mobile = this.editMobileForm.newmobile
                setLSession(info)
                this.$message({ message: '手机号码修改成功！', type: 'success' })
                this.$emit('update:show', false)
                clearLSession()
                this.$nextTick(() => {
                  this.$router.push({ path: '/login' })
                })
              } else {
                this.$message.error(data.message)
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style>
	.getAssaCon{
		background-color: #BCBCBC;
	}
	.notGetAssCon{
		background-color: #69b8fa;
	}
</style>
