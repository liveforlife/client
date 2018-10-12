<template>
  <el-container class="line depot-add">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
              <el-breadcrumb-item>编辑仓库</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="form">
        <navTitle>编辑仓库</navTitle>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="9">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="medium" status-icon>
              <el-form-item label="仓库编号 :" prop="depotNum">
                <el-col :span="18">
                  <el-input v-model="ruleForm.depotNum" placeholder="仓库编号"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="仓库名称 :" prop="depotName">
                <el-col :span="18">
                  <el-input v-model="ruleForm.depotName" placeholder="仓库名称"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="联系人 :" prop="depotHead">
                <el-col :span="18">
                  <el-select v-model="ruleForm.depotHead" multiple placeholder="选择联系人(可多选)">
                    <el-option
                    v-for="item in depotHeadData"
                    :key="item.id"
                    :label="item.username"
                    :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="所属公司 :" class="required">
                <el-col :span="18">
                  <span>{{com.name}}</span>
                </el-col>
              </el-form-item>
              <el-form-item label="通讯地址 :" prop="PlaceID">
                <el-col :span="18">
                  <el-cascader
                    :options="options" style="width:100%"
                    v-model="ruleForm.PlaceID"
                    :props="defaultProps"
                    :clearable='true'
                    @change="mapInit"
                    :change-on-select='true'></el-cascader>
                </el-col>
              </el-form-item>
              <el-form-item label="" prop="address">
                <el-col :span="18" class="click">
                  <el-input v-model="ruleForm.address" class="input-with-select" disabled>
                    <el-button slot="append" icon="el-icon-search" @click="dialogMap = true"></el-button>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:60px;">
                <el-col :span="6"><div class="save-btn liner-btn" @click="submitForm('ruleForm')"><i class="icon-l icon-save"></i>保存</div></el-col>
                <el-col :span="6"><router-link to="/depotList"><el-button icon="icon-l icon-cancel-1">取消</el-button></router-link></el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-dialog
          title="操作提示"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <div style="font-size:16px;text-align:center;">
            确定编辑该仓库吗？
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="confirm()">确定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="choiceMap">
        <el-dialog title="通讯地址" :visible.sync="dialogMap" width="1060px">
          <BMap v-bind:message="mapdesrcipt" :address="ruleForm.address" :position="position" v-on:listenMap="getMapData" ></BMap>
        </el-dialog>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import navTitle from '@/components/navTitle'
  import BMap from '@/pages/storage/depot/b-map.vue'
  import request from '@/utils/request'
  import { getLSession } from '@/utils/session'
  import data from '@/utils/pcas-code.json'
  import { clearCity } from '@/utils/clearCity'

  export default {
    data () {
      var checkDepotNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入仓库编号！'))
        } else {
          if (!(/[A-Za-z0-9]/.test(value))) {
            return callback(new Error('仓库编号只能由数字和字母组成！'))
          } else {
            callback()
          }
        }
      }
      return {
        com: '',
        dialogMap: false,
        mapdesrcipt: '',
        position:{},
        lng: '',
        lat: '',
        address_d: '',
        radio: '0',
        centerDialogVisible: false,
        defaultProps: {
          children: 'childs',
          label: 'name',
          value: 'code'
        },
        options: [],
        depotHeadData: [],
        ruleForm: {
          id: '',
          depotNum: '',
          depotName: '',
          depotHead: '',
          PlaceID: [],
          address: ''
        },
        rules: {
         
          depotName: [
            { required: true, message: '请输入仓库名称！', trigger: 'blur' },
            { min: 2, message: '名称长度不得小于2', trigger: 'blur' }
          ],
          depotHead: [
            { required: true, message: '请选择仓库负责人！', trigger: 'change' }
          ],
          PlaceID: [
            { required: true, message: '请选择仓库地区！', trigger: 'blur' }
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
      this.getdepotHead()
      this.options = clearCity(data)
      this.getDepotInfo()
    },
    methods: {
      getdepotHead () {
        let com = getLSession().data.org
        if (com !== null && com !== '') {
          this.com = com
          request.getStoreHead({
            cid: this.com.id, _size: 1000, _offset: 0
          }).then(({ data }) => {
            if (data.success) {
              this.depotHeadData = data.data.records
            } else {
              this.$message.error('仓库负责人获取失败！')
            }
          })
        } else {
          this.$message.error('仓库负责人获取失败！')
        }
      },
      getDepotInfo () {
        if (this.$route.query.depot) {
          request.getDepotInfo({id: this.$route.query.depot}).then(({ data }) => {
            if (data.success) {
              let res = data.data
              this.ruleForm = {
                id: res.id,
                depotNum: res.warehouseNo,
                depotName: res.warehouseName,
                PlaceID: [String(res.provinceId), String(res.cityId), String(res.areaId)],
                address: res.postalAddress,
                depotHead: res.warehouseKeepers
              }
              this.lng = res.longitude
              this.lat = res.latitude
              this.position={
              	lng:res.longitude,
              	lat:res.latitude
              }
            } else {
              this.$message.error(data.message)
            }
          })
        } else {
          this.$message.error('仓库信息获取失败！')
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.centerDialogVisible = true
          } else {
            return false
          }
        })
      },
      confirm () {
        let formData = this.ruleForm
        if (this.com.id) {
          request.updateDepotInfo({
            cId: this.com.id,
            id: formData.id,
            warehouseNo: formData.depotNum,
            warehouseName: formData.depotName,
            keeperUids: formData.depotHead.join(','),
            provinceId: formData.PlaceID[0],
            cityId: formData.PlaceID[1],
            areaId: formData.PlaceID[2],
            postalAddress: formData.address,
            longitude: this.lng,
            latitude: this.lat
          }).then(({ data }) => {
            if (data.success) {
              this.$message({ message: '编辑仓库成功！', type: 'success' })
             this.$router.go(-1)
            } else {
              this.$message.error(data.message)
            }
            this.centerDialogVisible = false
          })
        }
      },
      getMapData (data) {
        this.dialogMap = false
        this.lng = data.lng
        this.lat = data.lat
        this.address_d = data.descript
        this.ruleForm.address = data.descript
      },
      mapInit() {
		   if(this.ruleForm.PlaceID[2]){
			   	request.getAreaLocation({areaid:this.ruleForm.PlaceID[2]}).then(({data})=>{
			   		console.log(data)
			   		this.position={
			   			lng:data.data.area.lng,
			   			lat:data.data.area.lat
			   		}
			   	})	
		   }
		 },
    }
  }
</script>
