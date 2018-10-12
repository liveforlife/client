<template>
  <el-container class="account account-s-edit">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>账户管理</el-breadcrumb-item>
              <el-breadcrumb-item>账户查询</el-breadcrumb-item>
              <el-breadcrumb-item>账户编辑</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="form">
        <navTitle>账户编辑</navTitle>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="260px" class="demo-ruleForm" size="medium" status-icon>
           <el-form-item label="姓 名 : " class="required">
            <span class="text">XXXX</span>
          </el-form-item>
          <el-form-item label="性 别 : " class="required">
             <span class="text">女</span>
          </el-form-item>
          <el-form-item label="出生日期 : " class="required">
            <span class="text">XXXX</span>
          </el-form-item>
          
          <el-form-item label="岗 位 : " prop="position">
            <el-col :span="10">
              <el-input v-model="ruleForm.position"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码 : " class="required">
            <span class="text">XXXX</span>
          </el-form-item>
          <el-form-item label="座机号 : ">
            <span class="text">XXXX</span>
          </el-form-item>
          <el-form-item label="邮 箱 : ">
            <span class="text">XXXX</span>
          </el-form-item>
          <el-form-item label="角 色 : " prop="role">
            <el-checkbox-group v-model="ruleForm.role">
              <el-checkbox label="专线主管理员  " name="type"></el-checkbox>
              <el-checkbox label="专线订单管理员" name="type"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="ruleForm.role">
              <el-checkbox label="专线门店管理员" name="type"></el-checkbox>
              <el-checkbox label="专线财务管理员" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="公司名称 : " prop="companyName" class="required">
            <span class="text">18955263358</span>
          </el-form-item>
          <el-form-item label="通讯地址 : " prop="address" class="required">
            <span class="text">XXXX</span>
          </el-form-item>
          <el-row style="padding:20px 176px;">
            <el-col :span="16"><div class="grid-content bg-purple"><div class="save-btn liner-btn" @click="submitForm('ruleForm')"><i class="icon-l icon-save"></i>保存</div></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light"><el-button @click="submitForm('ruleForm')"><i class="icon-l icon-cancel-1"></i>取消</el-button></div></el-col>
          </el-row>
        </el-form>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import navTitle from '@/components/navTitle'
  import '@/pages/account/account.css'

  export default {
    data () {
      return {
        ruleForm: {
          name: '',
          sex: '',
          birthday: '',
          position: '',
          mobile: '',
          phone: '',
          companyName: '',
          address: '',
          email: '',
          role: []
        },
        rules: {
          position: [
            { required: true, message: '请输入岗位', trigger: 'blur' },
            { min: 2, max: 10, message: '长度2-10', trigger: 'blur' }
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
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>


