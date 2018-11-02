<template>
  <div class="register">
    <el-container>
      <el-header style="height: 70px;">
        <ComHeader/>
      </el-header>
      <el-main class="company-info" v-show="!show">
        <navTitle>填入企业信息</navTitle>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :xs="24" :sm="20" :md="17" :lg="14" :xl="10">
            <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-position="left" label-width="150px" class="demo-ruleForm" status-icon>
              <el-form-item label="企业名称 : " prop="name">
                <el-col :span="18">
                  <el-input v-model="ruleForm1.name"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="企业类型 : " prop="region">
                <el-col :span="18">
                  <span style="color:#5b5b5b">医药客户</span>
                </el-col>
              </el-form-item>
              <el-form-item label="所在地区 :" prop="PlaceID">
                <el-col :span="18">
                  <el-cascader
                    :options="options" style="width:100%"
                    v-model="ruleForm1.PlaceID"
                    :props="defaultProps"
                    :clearable='true'
                    :change-on-select='true'></el-cascader>
                </el-col>
              </el-form-item>
              <el-form-item label="通讯地址 : " prop="address">
                <el-col :span="18">
                  <el-input v-model="ruleForm1.address"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="企业营业执照 : " prop="fileSuccess">
                <el-col :span="18" class="file-onload" v-bind:class="{'warning':warning}">
                  <el-upload :action="uploadUrl"
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
                    v-model="ruleForm1.fileSuccess">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt>
                  </el-dialog>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="18">
                  <el-button type="primary" round @click="submitForm1('ruleForm1')" class="next-btn">下一步</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <el-main class="person-info" v-show="show">
        <navTitle>填入个人信息</navTitle>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :xs="24" :sm="20" :md="17" :lg="14" :xl="18">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="230px" class="demo-ruleForm" status-icon>
              <el-form-item label="姓 名 : " required>
                <el-col :span="9">
                  <el-form-item prop="username">
                    <el-input v-model="ruleForm2.username"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1"><span>&nbsp;</span></el-col>
                <el-col :span="5">
                  <el-form-item prop="sex">
                    <el-select v-model="ruleForm2.sex" placeholder="性别">
                      <el-option label="先生" value="1"></el-option>
                      <el-option label="女士" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="出生日期 : " prop="birthday" >
                <el-col :span="9">
                  <el-date-picker type="date" placeholder="出生日期" v-model="ruleForm2.birthday" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="岗 位 : " prop="position">
                <el-col :span="9">
                  <el-input v-model="ruleForm2.position"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="手机号码 : " >
                <span class="phone">{{ ruleForm2.mobile }}</span>
              </el-form-item>
              <el-form-item label="设置密码 :" prop="pwd" required>
                <el-col :span="15">
                  <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="请输入8-16位只包含“数字、字母或下划线”的密码"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="确认密码 : " prop="checkPass" required>
                <el-col :span="15">
                  <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="座机号 : " prop="phone">
                <el-col :span="15">
                  <el-input v-model="ruleForm2.phone"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="邮 箱" prop="email" :rules="[
                    { required: false, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                  ]">
                <el-col :span="15">
                  <el-input v-model="ruleForm2.email"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item prop="checked">
                <el-checkbox-group v-model="ruleForm2.checked">
                  <el-checkbox> </el-checkbox><span style="font-size:12px;"> <span class="phone"> 已阅读</span><span class="blur-color">《用户协议》</span></span>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-col :span="15">
                  <el-button type="primary" @click="submitForm2('ruleForm2')" class="next-btn">确认注册</el-button>
                  <!-- <div @click="submitForm('ruleForm')" class="next-btn" v-bind:class="{'disabled':ruleForm.checked==false}">下一步</div> -->
                </el-col>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import ComHeader from './header'
  import navTitle from '@/components/navTitle'
  import request from '@/utils/request'
  import data from '@/utils/pcas-code.json'
  import { clearCity } from '@/utils/format'
  import { getSSession } from '@/utils/session'
  import { baseURL } from '@/utils/api'
  export default {
    data () {
      let isok = (rule, value, callback) => {
        this.iscom = false
      }
      let checkComName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入企业名称！'))
        } else {
          if (value < 3) {
            callback(new Error('企业名称不得少于3个字！'))
          } else if (this.iscom === false) {
            let formData = new FormData()
            formData.append('name', this.ruleForm1.name)
            request.checkComName({
              name: this.ruleForm1.name
            }).then(({ data }) => {
              if (data.success) {
                this.iscom = true
                callback()
              } else {
                callback(new Error('该企业已被注册！'))
              }
            })
          }
        }
      }
      let validatePass = (rule, value, callback) => {
       let reg = /^\w{8,16}$/
        if (!reg.test(value)) {
          callback(new Error('请输入符合规则的密码！'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码！'))
        } else if (value !== this.ruleForm2.pwd) {
          callback(new Error('两次输入不匹配！'))
        } else {
          callback()
        }
      }
      let validatePass3 = (rule, value, callback) => {
       let reg = /^0\d{2}-\d{7,8}$/;
       if(reg.test(value)){
        callback()
       }else{
        callback(new Error('请输入正确的座机号码格式！'))
       }
      }
      return {
        show: false,
        iscom: false,
        dialogImageUrl: '',
        dialogVisible: false,
        'auto-upload': false,
        warning: false,
        fileList: [],
        options: [],
        defaultProps: {
          children: 'childs',
          label: 'name',
          value: 'code'
        },
        ruleForm1: {
          name: '',
          PlaceID: [],
          address: '',
          fileSuccess: ''
        },
        rules1: {
          name: [
            { required: true, validator: checkComName, trigger: 'blur' },
            { validator: isok, trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入通讯地址！', trigger: 'blur' },
            { min: 5, max: 25, message: '地址长度在5-25', trigger: 'blur' }
          ],
          PlaceID: [
            { type: 'array', required: true, message: '请选择地区', trigger: 'change' }
          ],
          fileSuccess: [
            { required: true, message: '请选择营业执照！', trigger: 'change' }
          ]
        },
        ruleForm2: {
          username: '',
          sex: '',
          birthday: '',
          position: '',
          mobile: getSSession('hymobile'),
          pwd: '',
          checkPass: '',
          phone: '',
          email: '',
          checked: []
        },
        rules2: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '名称长度不得小于2', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          pwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checked: [
            { required: true,   message: '请勾选同意《用户协议》', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      ComHeader,
      navTitle
    },
    mounted () {
      this.options = clearCity(data)
    },
    computed: {
      uploadUrl () {
        return `${baseURL}oss/upload`
      }
    },
    methods: {
      submitForm1 (formName) {
        if (!this.ruleForm1.name) {
          this.$message.error('请输入企业名称！')
          return
        }
        if (!this.ruleForm1.address) {
          this.$message.error('请输入通讯地址！')
          return
        }
        if (!this.ruleForm1.fileSuccess) {
          this.warning = true
          this.$message.error('请选择营业执照！')
          return
        }
        if (this.iscom === true) {
          this.show = true
        }
      },
      uploadImg (request) {},
      handleRemove (file, fileList) {
        this.warning = true
        this.ruleForm1.fileSuccess = ''
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      data_img (file, fileList) {
        if (file.url) {
          this.ruleForm1.fileSuccess = file.url
          this.warning = false
        }
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除${file.name}吗？`)
      },
      uploadSuccess (response, file, fileList) {
        this.fileSuccess = response.data
      },
      submitForm2 (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData = this.ruleForm1
            request.registerComInfo({
              name: formData.name,
              type: '1',
              proid: formData.PlaceID[0],
              cityid: formData.PlaceID[1],
              areaid: formData.PlaceID[2],
              address: formData.address,
              busLicensePhoto: String(this.fileSuccess),
              username: this.ruleForm2.username,
              pwd: this.ruleForm2.pwd,
              birthday: this.ruleForm2.birthday,
              email: this.ruleForm2.email,
              mobile: this.ruleForm2.mobile,
              phone: this.ruleForm2.phone,
              sex: this.ruleForm2.sex,
              position: this.ruleForm2.position
            }).then(({ data }) => {
              if (data.success) {
                this.$message({ message: '注册成功！', type: 'success' })
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

  html,body{
    background: #ecf0f9;
  }
  .register .el-container{
    width: 1200px;
    margin: 0 auto;
    min-height: 920px;
  }
  .register .el-main{
    width: 100%;
    padding: 46px 0;
    background: #ffffff;
    box-shadow: 0px 0px 5px #d8dbe2;
  }
  .register .next-btn{
    width: 100%;
    height: 50px;
    border-radius: 40px;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    background: #459FFC;
    background: linear-gradient(90deg, rgba(58,147,281,1), rgba(60,226,200,1));
    margin: 20px 0;
    border: none;
  }
  .register .next-btn:hover{
    background: #A1CFFE;
    background: linear-gradient(90deg, rgba(120,200,240,1), rgba(120,236,224,1));
  }
  .company-info .file-onload{
    margin-top: 10px;
    border: dashed 2px #d7d7d7;
    padding: 15px;
    border-radius: 4px;
  }
  .company-info .el-upload-list--picture-card .el-upload-list__item{
    margin-bottom: 0;
  }
  .company-info .el-col-18 .el-form-item__content{
    line-height: 0;
  }
  .company-info .warning{
    border: dashed 2px #ff0000;
  }
  .company-info .el-form-item__label{
    color: #474646;
    font-size: 16px;
  }
  .person-info .phone{
    color: #5b5b5b;
  }
  .person-info .blur-color{
    color: #397bf1;
  }
</style>
