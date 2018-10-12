<template>
  <div class="edit-pwd">
    <el-dialog title="修改登录密码" 
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show" width="400px">
      <div class="model-img"><img src="../../../assets/model.png" alt=""></div>
      <el-form :model="editPwdForm" status-icon :rules="rulep" ref="editPwdForm" label-width="90px" class="demo-ruleForm" size="small" style="padding: 0 5%;">
        <el-form-item label="手机号码 : " prop="oldmobile">
            <span >{{info.mobile}}</span>
        </el-form-item>
        <el-form-item label="原密码 : " prop="oldpwd">
            <el-input type="password" v-model="editPwdForm.oldpwd" auto-complete="off" placeholder="请输入8—16位数字+字母+下划线"></el-input>
        </el-form-item>
        <el-form-item label="新密码 : " prop="newpwd">
            <el-input type="password" v-model="editPwdForm.newpwd" auto-complete="off" placeholder="请输入8—16位数字+字母+下划线"></el-input>
        </el-form-item>
        <el-form-item label="确认密码 : " prop="checkpwd">
            <el-input type="password" v-model.number="editPwdForm.checkpwd" auto-complete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <button class="admin-next" @click="editMobile('editPwdForm')"><i class="icon-l icon-success"></i>确定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
	import { getLSession, clearLSession } from '@/utils/session'
	import request from '@/utils/request'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show () {
        this.visible = this.show
      }
    },
    data () {
    	var validatePass= (rule,value,callback) => {
    		if(value === ''){
    			callback(new Error("请输入密码!"))
    		}else {
    			if(this.editPwdForm.checkpwd === ''){
    				this.$refs.editPwdForm.validateField('checkpwd')
    			}
    			callback()
    		}
    	}
    	var validatePass2=(rule,value,callback) => {
    		if(value === ''){
    			callback(new Error("请再次输入确认密码"))
    		}else if(value !==this.editPwdForm.checkpwd){
    				callback(new Error("两次输入不匹配"))
    		}else{
    			callback()
    		}
    	}
      return {
        visible: this.dialogEditPwd,
        info: getLSession().data.user,
        editPwdForm: {
        	oldpwd:'',
          newpwd: '',
          checkpwd: ''
        },
        rulep: {
        	oldpwd:[
        		{required:true,message:'输入原密码',trigger:'blur'},
        	],
        	newpwd:[
        		{validator:validatePass,required:true,trigger:"blur"},
        		{min:8,message:'密码长度不小于8',trigger:'blur'}
        	],
          checkpwd: [
            { validator:validatePass2,required:true, trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
    	editMobile (PwdForm) {
    		console.log(this.info)
    		this.$refs[PwdForm].validate((valid) =>{
    			if(valid){
    				request.updateLoginPwd({
    					uid:this.info.id,
    					oldpwd:this.editPwdForm.oldpwd,
    					newpwd:this.editPwdForm.newpwd
    				}).then(({data})=>{
    					if(data.success){
    						this.$message({message:'登录密码修改成功',type:'success'})
    						this.closeModule()
                clearLSession()
	    					this.$nextTick(() => {
	                  this.$router.push({ path: '/login' })
	                })
    					}else{
		    				this.$message.error(data.message)
		    			}
    				})
	    		}
	    	})
			},
      closeModule () {
        this.$emit('update:show', false)
      }
    }
  }
</script>