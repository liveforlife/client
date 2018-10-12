<template>
  <el-container class="account account-s-edit">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>账户管理</el-breadcrumb-item>
              <el-breadcrumb-item>账户查询</el-breadcrumb-item>
              <el-breadcrumb-item>账户{{ opTypeName }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="form">
        <navTitle>账户{{ opTypeName }}</navTitle>
        <div style="width:600px;margin:0 auto">
         <el-form :model="conForm" :rules="rules" ref="conForm" label-width="100px" class="demo-ruleForm" size="medium" status-icon>
          <el-form-item label="姓 名 : " prop="name"  class="required">
           <el-input v-model="conForm.name"></el-input>
          </el-form-item>
          <el-form-item label="公司名称 : " prop="companyName"  class="required">
           <el-input v-model="conForm.companyName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码 : " prop="mobile" class="required">
           <el-input v-model="conForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="座机号码 : " prop="phone"  >
           <el-input v-model="conForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="通讯地址 : " class="required">
           <el-col :span="16">
            <el-cascader style="width:100%"
                         :options="options"
                         v-model="conForm.PlaceID"
                         :props="defaultProps"
                         :clearable='true'
                         @change="handleChanges()"
            ></el-cascader>
           </el-col>
          </el-form-item>
          <el-form-item label="        " prop="address"  class="required">
           <el-input v-model="conForm.address" readonly  @focus="mapShow"></el-input>
          </el-form-item>
          <div class="choiceMap">
           <el-dialog title="通讯地址" :visible.sync="dialogMap" width="1060px">
            <BMap  ref="BMap" :centerAndZoom="centerAndZoom" :position="position" :message="conForm.address" v-on:listenMap="getMapData"></BMap>
           </el-dialog>
          </div>
          <el-row style="padding:20px  100px;">
           <el-col :span="16"><div class="grid-content bg-purple"><div class="save-btn liner-btn" @click="submitForm('conForm')"><i class="icon-l icon-save"></i>保存</div></div></el-col>
           <el-col :span="8"><router-link to="/contactsManager"><el-button icon="icon-l icon-cancel-1">取消</el-button></router-link></el-col>
          </el-row>
         </el-form>
        </div>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import navTitle from '@/components/navTitle'
  import request from '@/utils/request'
  import data from '@/utils/pcas-code.json'
  import { getLSession } from '@/utils/session'
  import BMap from '@/pages/storage/depot/b-map.vue'


  export default {
    data () {
      return {
        dialogMap:false,
        centerAndZoom:'',
        position:{},
        opTypeName:'',
        conForm: {
          name: '',
          companyName: '',
          mobile: '',
          phone: '',
          address: '',
          PlaceID: [],
          proid:'',
          cityid:'',
          areaid:'',
          lat:'',
          lng:''
        },
        options: [],
        defaultProps: {
          children: 'childs',
          label: 'name',
          value: 'code'
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 11, message: '长度2-11', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { min: 2, max: 32, message: '长度2-32', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度11', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      NavHeader,
      navTitle,
      BMap
    },
    mounted () {
      this.options = data
      this.init();
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let pcad = this.conForm.PlaceID;
            let formData = {
              id: this.$route.query.id,
              cid: getLSession().data.org.id,
              name: this.conForm.name,
              companyName:  this.conForm.companyName,
              mobile: this.conForm.mobile,
              phone: this.conForm.phone,
              address: this.conForm.address,
              PlaceID: [],
              lat:this.conForm.lat,
              lng:this.conForm.lng,
              proid:this.conForm.proid,
              cityid:this.conForm.cityid,
              areaid:this.conForm.areaid
            }
            console.log(formData)
            if(formData.address!=''){
             request.editConstacts(formData).then(({data}) => {
              if (data.success === true) {
               this.openSuccees(data.message)
               if(!this.$route.query.id){
                this.$refs[formName].resetFields()
               }
              } else {
               this.openError(data.message)
              }
             })
            }else{
              this.$message.error('请选择详细地址')
            }

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      init () {
        let id = this.$route.query.id
        if (id) {
          this.opTypeName = '编辑';
          request.infoConstacts({id: id}).then(({ data }) => {
            if (data.success === true) {
              let res = data.data
              this.conForm.name = res.name;
              this.conForm.companyName = res.companyName;
              this.conForm.mobile = res.mobile;
              this.conForm.phone = res.phone;
              this.conForm.address = res.address;
              this.conForm.PlaceID = [res.proid, res.cityid, res.areaid];
              this.conForm.areaid=res.areaid;
              this.conForm.proid=res.proid;
              this.conForm.cityid=res.cityid;
              this.conForm.lat=res.lat;
              this.conForm.lng=res.lng;
              this.position.lat=res.lat;
              this.position.lng=res.lng;
             console.log(this.conForm)
            } else {
              this.$message.error('网点信息获取失败！')
            }
          })
        }else{
          this.opTypeName = '新增';
        }
      },
      // 提交成功
      openSuccees (message) {
        this.$message({
          message: message,
          type: 'success'
        })
      },
      // 提交失败
      openError (message) {
        this.$message({
          message: message,
          type: 'error'
        })
      },
     mapShow(){
      this.dialogMap = true
      if(this.$refs.BMap){
       this.$refs.BMap.setCenterAndZoom(this.centerAndZoom)
      }
     },
     getMapData(data) {
       this.dialogMap=false;
       this.conForm.lat=data.lat;
       this.conForm.lng=data.lng;
       this.conForm.address=data.descript;
     },
     handleChanges(){
       const startList = this.conForm.PlaceID
       startList.forEach((item, index) => {
        if (index === 0) {
         this.conForm.proid = item
        } else if (index === 1) {
         this.conForm.cityid = item
        } else {
         this.conForm.areaid = item
        }
       })
      request.getAreaLocation({areaid:this.conForm.areaid}).then((data)=>{
       this.position.lat=data.data.data.area.lat;
       this.position.lng=data.data.data.area.lng;
       this.conForm.lat=data.data.data.area.lat;
       this.conForm.lng=data.data.data.area.lng;
      })
     }
    }
   }
</script>


