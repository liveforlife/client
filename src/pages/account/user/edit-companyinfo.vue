<template>
 <el-container class="account account-edit_com">
  <el-header style="height:50px;">
   <el-row>
    <el-col :span="11">
     <div class="grid-content bg-purple">
      <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item>账户管理</el-breadcrumb-item>
       <el-breadcrumb-item>个人中心</el-breadcrumb-item>
       <el-breadcrumb-item>企业信息管理</el-breadcrumb-item>
      </el-breadcrumb>
     </div>
    </el-col>
    <el-col :span="13"> <NavHeader/></el-col>
   </el-row>
  </el-header>
  <el-main>
   <div class="form">
    <navTitle>企业信息编辑</navTitle>
    <el-row type="flex" class="row-bg" justify="center">
     <el-col :xs="24" :sm="21" :md="17" :lg="13" :xl="10">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" status-icon size="medium">
       <el-form-item label="企业名称 : " prop="name">
        <el-col :span="18"><el-input v-model="ruleForm.name"></el-input></el-col>
       </el-form-item>
       <el-form-item label="企业类型 : " prop="region">
        <el-col :span="18"><span style="color:#5b5b5b">物流公司</span></el-col>
       </el-form-item>
       <el-form-item label="所在地区 :" prop="PlaceID">
        <el-col :span="16">
         <el-cascader
          :options="options" style="width:100%"
          v-model="ruleForm.PlaceID"
          :props="defaultProps"
          :clearable='true'
          :change-on-select='true'></el-cascader>
        </el-col>
       </el-form-item>
       <el-form-item label="通讯地址 : " prop="address">
        <el-col :span="18"><el-input v-model="ruleForm.address"></el-input></el-col>
       </el-form-item>
       <el-form-item label="企业营业执照 : " prop="fileSuccess">
        <el-col :span="18" class="file-onload" v-bind:class="{'warning':warning}">
         <el-upload :action="actionURL"
                    list-type="picture-card"
                    :auto-upload="true"
                    :data="{'module':'BUS_LICENCE'}"
                    :on-success="uploadSuccess"
                    :limit="1"
                    :on-preview="handlePictureCardPreview"
                    :file-list="fileList"
                    :on-remove="handleRemove"
                    :on-change="data_img"
                    :before-remove="beforeRemove"
                    v-model="ruleForm.fileSuccess">
          <i class="el-icon-plus"></i>
         </el-upload>
         <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt>
         </el-dialog>
        </el-col>
       </el-form-item>
       <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:60px;">
        <el-col :span="6"><div class="save-btn liner-btn" @click="submitForm('ruleForm')"><i class="icon-l icon-save"></i>保存</div></el-col>
        <el-col :span="6"><el-button @click="$router.go(-1)" icon="icon-l icon-cancel-1">取消</el-button></el-col>
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
 import { getLSession } from '@/utils/session'
 import request from '@/utils/request'
 import data from '@/utils/pcas-code.json'
 import { clearCity } from '@/utils/clearCity'

 export default {
  data () {
   return {
    actionURL: `${process.env.CONNECTOR_SERVER}` + 'oss/upload',
    info: getLSession().data.org,
    dialogImageUrl: '',
    dialogVisible: false,
    'auto-upload': false,
    warning: false,
    fileList: [],
    defaultProps: {
     children: 'childs',
     label: 'name',
     value: 'code'
    },
    options: [],
    ruleForm: {
     name: '',
     PlaceID: [],
     address: '',
     img: ''
    },
    rules: {
     name: [
      { required: true, message: '请输入企业名称', trigger: 'blur' },
      { min: 3, max: 15, message: '名称长度在3-15', trigger: 'blur' }
     ],
     address: [
      { required: true, message: '请输入通讯地址', trigger: 'blur' },
      { min: 5, max: 25, message: '地址长度在5-25', trigger: 'blur' }
     ],
     PlaceID: [
      { type: 'array', required: true, message: '请选择地区', trigger: 'change' }
     ],
     img: [
      { required: true, message: '请选择营业执照', trigger: 'blur' }
     ]
    }
   }
  },
  components: {
   NavHeader,
   navTitle
  },
  mounted () {
   this.getComInfo()
   this.options = clearCity(data)
  },
  methods: {
   getComInfo () {
    if (this.info.id) {
     request.getComInfo({cid: this.info.id}).then(({ data }) => {
      if (data.success) {
       let res = data.data
       this.ruleForm = {
        name: res.name,
        address: res.address,
        PlaceID: [String(res.proid), String(res.cityid), String(res.areaid)]
       }

      // this.getImage(res.busLicensePhoto)
         this.fileList.push({
	      url: `${process.env.BACKEND_SERVER}`+res.busLicensePhoto,
	      //response: {data: `${data}`}
	     })
       console.log(this.fileList)
      } else {
       this.$message.error(data.message)
      }
     })
    } else {
     this.$message.error('公司信息获取失败！')
    }
   },
   submitForm (formName) {
    if (!this.ruleForm.img) {
     this.warning = true
    }
    this.$refs[formName].validate((valid) => {
     if (valid) {
      let formData = this.ruleForm
      request.editComInfo({
       id: this.info.id,
       name: formData.name,
       proid: formData.PlaceID[0],
       cityid: formData.PlaceID[1],
       areaid: formData.PlaceID[2],
       address: formData.address,
       busLicensePhoto: String(this.fileSuccess)
      }).then(({ data }) => {
       if (data.success) {
        this.$message({ message: '信息修改成功！', type: 'success' })
        this.$router.go(-1)
       } else {
        this.$message.error(data.message)
       }
      })
     } else {
      return false
     }
    })
   },
   handleRemove (file, fileList) {
    this.warning = true
    this.ruleForm.img = ''
   },
   handlePictureCardPreview (file) {
    this.dialogImageUrl = file.url
    this.dialogVisible = true
   },
   data_img (file, fileList) {
    if (file.url) {
     this.ruleForm.img = file.url
     this.warning = false
    }
   },
   beforeRemove (file, fileList) {
    return this.$confirm(`确定移除照片吗？`)//${file.name}
   },
   uploadSuccess (response, file, fileList) {
    this.fileSuccess = response.data
   },
   getImage (img) {
    request.imageOut(img).then(({ data }) => {
     this.dialogImageUrl = data
     this.fileList.push({
      url: `${process.env.CONNECTOR_SERVER}image/out?path=${img}`,
      //response: {data: `${data}`}
     })
    })
   }
  }
 }
</script>


