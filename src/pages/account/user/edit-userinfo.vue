<template>
 <el-container class="account account-s-edit">
  <el-header style="height:50px;">
   <el-row>
    <el-col :span="11">
     <div class="grid-content bg-purple">
      <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item>账户管理</el-breadcrumb-item>
       <el-breadcrumb-item>账户查询</el-breadcrumb-item>
       <el-breadcrumb-item>账户查看</el-breadcrumb-item>
      </el-breadcrumb>
     </div>
    </el-col>
    <el-col :span="13"> <NavHeader/></el-col>
   </el-row>
  </el-header>
  <el-main>
   <div class="form">
    <navTitle>账户查看</navTitle>
    <el-row type="flex" class="row-bg" justify="center">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium" status-icon>
       <el-form-item label="姓 名 : " class="required">
        <span class="text">{{ruleForm.name}}</span>
       </el-form-item>
       <el-form-item label="性 别 : " class="required">
        <span class="text">{{ruleForm.sex}}</span>
       </el-form-item>
       <el-form-item label="出生日期 : " class="required">
        <span class="text">{{ruleForm.birthday}}</span>
       </el-form-item>
       <el-form-item label="岗 位 : ">
        <el-input  type="text" v-model="ruleForm.position" class="text" ></el-input>
       </el-form-item>
       <el-form-item label="手机号码 : " class="required">
        <span class="text">{{ruleForm.mobile}}</span>
       </el-form-item>
       <el-form-item label="座机号 : ">
        <el-input  type="text" class="text" v-model="ruleForm.phone" ></el-input>
       </el-form-item>
       <el-form-item label="邮 箱 : ">
        <el-input  type="text" class="text" v-model="ruleForm.email"></el-input>
       </el-form-item>
       <el-form-item label="角 色 : " class="height">
        <el-col :span="9" v-for="(item, index) in ruleForm.role" :key="index">
         <span class="text">{{item}}</span>
        </el-col>
        <!--<template>-->
         <!--<el-checkbox-group v-model="ruleForm.checkList">-->
          <!--<el-col :span="9" v-for="(item, index) in arrRole" :key="index">-->
           <!--<el-checkbox    :value="item.id"  :key="index" :label="item.id" disabled>{{item.name}}</el-checkbox>-->
          <!--</el-col>-->
         <!--</el-checkbox-group>-->
        <!--</template>-->
       </el-form-item>
       <el-form-item label="公司名称 : " class="required">
        <span class="text">{{ruleForm.companyName}}</span>
       </el-form-item>
       <el-form-item label="通讯地址 : " class="required">
        <span class="text">{{ruleForm.address}}</span>
       </el-form-item>
       <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:60px;">
        <div class="save-btn liner-btn" @click="submitForm('ruleForm')"><i class="icon-l icon-save"></i>保存</div>
        <div @click="$router.back(-1)" class="save-btn liner-btn"><i class="icon-l icon-save"></i>返回</div>
       </el-row>
      </el-form>
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
 import { formatDate } from '@/utils/format'
 import request from '@/utils/request'
 import { getLSession } from '@/utils/session'

 export default {
  data () {
   return {
    arrRole: [],
    role: [],
    query: this.$route.query,
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
    }
   }
  },
  components: {
   NavHeader,
   navTitle
  },
  mounted () {
   this.getUserInfo()
  },
  methods: {
   getUserInfo () {
    request.getUserInfo({
     userid: getLSession().data.user.id,
     cid: getLSession().data.org.id
    }).then(({ data }) => {
     console.log(11,data)
     if (data.success) {
      let user = data.data.user
      let com = data.data.company
      let arrRole = []
      data.data.companyRoles.map((v)=>{
       arrRole.push({name:v.name,id:v.id})
      })
      this.arrRole = arrRole
      this.ruleForm = {
       name: user.username,
       sex: (user.sex === 1) ? '男' : '女',
       birthday: formatDate(user.birthday),
       position: user.position,
       mobile: user.mobile,
       phone: user.phone,
       companyName: com.name,
       address: com.address,
       email: user.email,
       role: data.data.user.rolenames.split(','),
       checkList: data.data.user.roleids.split(',')
      }

     } else {
      this.$message.error(data.message)
     }
    })

   },
   submitForm (formName) {
    this.$refs[formName].validate((valid) => {
     let formData = this.ruleForm
     let o = {
      userid:getLSession().data.user.id,
      position:formData.position,
      phone:formData.phone,
      email:formData.email,
      roleids:formData.checkList.join(',')
     }
     request.editUserInfo(o).then(({ data }) => {
      if (data.success) {
       this.$message({ message: '编辑成功！', type: 'success' })
       this.$refs[formName].resetFields()
       this.$router.go(-1)
      } else {
       this.$message.error(data.message)
      }
     })

    })
   }
  }
 }
</script>
