<template>
  <el-container class="account account-add">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>账户管理</el-breadcrumb-item>
              <el-breadcrumb-item>新增账户</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="form">
        <navTitle>新建账户</navTitle>
        <el-row type="flex" class="row-bg" justify="center">
         <el-col :span="11">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium" status-icon>
              <el-form-item label="姓 名 : " prop="username" >
                <el-col :span="18">
                  <el-input v-model="ruleForm.username"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="性 别 : " prop="sex">
                <el-col :span="18">
                  <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
                  <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
                </el-col>
              </el-form-item>
              <el-form-item label="出生日期 : " prop="birthday">
                <el-col :span="18">
                  <el-date-picker type="date" placeholder="出生日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="岗 位 : " prop="position">
                <el-col :span="18">
                  <el-input v-model="ruleForm.position"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="手机号码 : " prop="mobile">
                <el-col :span="18">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="座机号 : " prop="phone">
                <el-col :span="18"><el-input v-model="ruleForm.phone"></el-input></el-col>
              </el-form-item>
              <el-form-item label="邮 箱 : " prop="email">
                <el-col :span="18"><el-input v-model="ruleForm.email"></el-input></el-col>
              </el-form-item>
              <el-form-item label="角 色 : " prop="role" :min='1' class="height">
                <el-checkbox-group v-model="ruleForm.role">
                  <el-col :span="9" v-for="(item, index) in role" :key="index">
                    <el-checkbox :label="item.id" :value="item.id" name="type">{{item.name}}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="公司名称 : " class="height1">
                <span class="text">{{info.name}}</span>
              </el-form-item>
              <el-form-item label="通讯地址 : " class="">
                <span class="text">{{info.address}}</span>
              </el-form-item>
              <!-- <el-form-item label="是否发送短信 : " :min='1'>
                  <el-radio v-model="ruleForm.ifSendSms" label="1">是</el-radio>
                  <el-radio v-model="ruleForm.ifSendSms" label="0">否</el-radio>
              </el-form-item> -->
              <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:60px;">
               <div class="save-btn liner-btn" @click="submitForm('ruleForm')"><i class="icon-l icon-save"></i>保存</div>
               <router-link to="/accountSearch"><el-button icon="icon-l icon-cancel-1">取消</el-button></router-link>
              </el-row>
            </el-form>
         </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import navTitle from '@/components/navTitle'
  import '@/pages/account/account.css'
  import request from '@/utils/request'
  import { getLSession } from '@/utils/session'

  export default {
    data () {
      return {
        role: [],
        info: {},
        companyName: '',
        address: '',
        ruleForm: {
          cid: '',
          username: '',
          sex: '',
          birthday: '',
          position: '',
          mobile: '',
          phone: '',
          email: '',
          role: [],
          roleids: [],
          sales: '0',
          ifSendSms:'1'
        },
        rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度3-10', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请输入岗位', trigger: 'blur' },
            { min: 2, max: 10, message: '长度2-10', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1\d{10}$/, message: '请输入正确的11位手机号码' }
          ],
          phone: [
            { message: '', trigger: 'change' }
          ],
          email: [
            { message: '请输入正确的邮箱', trigger: 'change' }
          ],
          role: [
            { type: 'array', required: true, message: '请选择角色', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      NavHeader,
      navTitle
    },
    mounted () {
      this.getInfp()
    },
    methods: {
      getInfp () {
        let info = getLSession().data.org
        if (info !== null && info !== '') {
          this.info = info
          this.ruleForm.cid = info.id
          this.getRole(info.id)
        } else {
          this.$message.error('获取角色信息出错！')
        }
      },
      getRole (id) {
        request.getComRole({companyId: id}).then(({ data }) => {
          if (data.success) {
            this.role = data.data
          } else {
            this.$message.error(data.message)
          }
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.info.id) {
            let formData = this.ruleForm
            formData.roleids = formData.role.join(',')
            request.addAccount(formData).then(({ data }) => {
              if (data.success) {
                this.$message({ message: '新增账户成功！', type: 'success' })
                this.$refs[formName].resetFields()
              } else {
                this.$message.error(data.message)
              }
            })
          }
        })
      }
    }
  }
</script>
<style >
 .el-col-lg-11{
  width: 65%;
 }
 .account-add .form .el-form-item__label{
  width: 120px !important;
 }
 .height .el-form-item__content{
  margin-left: 118px!important;
 }
</style>
