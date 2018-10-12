<template>
  <div class="person-info">
    <el-container>
      <el-header style="height: 70px;">
        <ComHeader/>
      </el-header>
      <el-main>
        <navTitle>填入个人信息</navTitle>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="230px" class="demo-ruleForm" status-icon>
          <el-form-item label="姓 名 : " required>
            <el-col :span="9">
              <el-form-item prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1"><span>&nbsp;</span></el-col>
            <el-col :span="5">
              <el-form-item prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="性别">
                  <el-option label="先生" value="1"></el-option>
                  <el-option label="女士" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="出生日期 12313123: ">
            <el-col :span="9">
              <el-date-picker type="date" placeholder="出生日期12313213213" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="岗 位 : " prop="position">
            <el-col :span="9">
              <el-input v-model="ruleForm.position"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码 : " >
            <span class="phone">{{ this.ruleForm.mobile }}</span>
          </el-form-item>
          <el-form-item label="设置密码 :" prop="pwd" required>
            <el-col :span="15">
              <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="请输入8-16位只包含“数字、字母或下划线”的密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码 : " prop="checkPass" required>
            <el-col :span="15">
              <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="座机号 : " prop="phone">
            <el-col :span="15">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="邮 箱" prop="email">
            <el-col :span="15">
              <el-input v-model="ruleForm.email"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox-group v-model="ruleForm.checked">
              <el-checkbox> </el-checkbox><span style="font-size:12px;"> <span class="phone"> 已阅读</span><span class="blur-color">《用户协议》</span></span>
            </el-checkbox-group>

          </el-form-item>
          <el-form-item>
            <el-col :span="15">
              <el-button type="primary" @click="submitForm('ruleForm')" class="next-btn">下一步</el-button>
              <!-- <div @click="submitForm('ruleForm')" class="next-btn" v-bind:class="{'disabled':ruleForm.checked==false}">下一步</div> -->
            </el-col>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import ComHeader from './header'
  import navTitle from '@/components/navTitle'
  import request from '@/utils/request'
  import { getSSession } from '@/utils/session'

  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码！'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码！'))
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入不匹配！'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          cid: getSSession('hycomId'),
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
        rules: {
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
          email: [
            { message: '请输入正确的邮箱', trigger: 'blur' }
          ],
          checked: [
            { required: true, message: '请勾选同意《用户协议》', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      ComHeader,
      navTitle
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.registerUserInfo(this.ruleForm).then(({ data }) => {
              if (data.success) {
                this.$message({
                  message: '个人信息信息编辑成功！', type: 'success'
                })
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
  .person-info .el-container{
    width: 1200px;
    min-height: 920px;
    margin: 0 auto;
  }
  .person-info .el-main{
    width: 100%;
    padding: 46px 150px;
    background: #ffffff;
    box-shadow: 0px 0px 5px #d8dbe2;
  }
  .person-info .el-form{
    padding: 0 80px;
  }
  .person-info .blur-color{
    color: #397bf1;
  }
  .person-info .next-btn{
    width: 100%;
    height: 50px;
    border-radius: 40px;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    background: #459FFC;
    background: linear-gradient(90deg, rgba(58,147,281,1), rgba(60,226,200,1));
    border: none;
    margin: 20px 0;
  }
  .person-info .next-btn:hover{
    background: #A1CFFE;
    background: linear-gradient(90deg, rgba(120,200,240,1), rgba(120,236,224,1));
  }
  .person-info .el-form-item__label{
    color: #474646;
    font-size: 16px;
  }
  .person-info .phone{
    color: #5b5b5b;
  }
</style>

