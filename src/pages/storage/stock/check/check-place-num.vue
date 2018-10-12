<template>
  <el-container class="check-pn">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>库存查询</el-breadcrumb-item>
              <el-breadcrumb-item>盘点</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div>
        <div class="drug-title">{{drugsFrom.infoName}}</div>
        <div style="text-align:right;margin-bottom: 5px;">当前仓库 : {{drugsFrom.warehouseName}}</div>
        <div class="content">
          <el-form :model="drugsFrom" :inline="true" class="demo-form-inline" size="medium">
            <el-form-item label="药品通用名称 :">
              <el-input v-model="drugsFrom.infoName" readonly />
            </el-form-item>
            <el-form-item label="运输/存储包装数量 :">
              <el-input v-model="drugsFrom.trpOuterNumber" readonly />
            </el-form-item>
            <el-form-item label="产品批号 :">
              <el-input v-model="drugsFrom.facBatchNumber" readonly />
            </el-form-item>
            <el-form-item label="剂型(性状) :">
              <el-input v-model="drugsFrom.infoForm" readonly />
            </el-form-item>
          </el-form>
          <el-form :model="priceFrom" size="medium" class="price" style="height:36px;">
           <el-row>
            <el-col :span="12">
             <div style="height:50px;line-height:50px;">账面库存 : <span style="color:#22b4b1;font-weight: bold;">{{drugsFrom.inventoryTotal}}</span>
             <span v-if="this.warehouseLocationNum">选中库存 : <span style="color:#22b4b1;font-weight: bold;">{{this.warehouseLocationNum}}</span></span>
            </div>
            </el-col>
            <el-col :span="12">
             <el-form-item label="设置存储单价 :" style="width:280px;float:right;">
              <el-input min="0" v-model="priceFrom.storagePrice" type="number" style="width: 100px;margin-right: 5px;" /><span>￥/箱/天</span>
             </el-form-item>
            </el-col>
           </el-row>
          </el-form>
        </div>
        <div>
          <ul class="vague big" v-show="!checkDetailsList && (haveCode==1 || haveLocation == 1)">
            <li v-for="(item,index) in jsonData" :key="index" @click="accurate(item)">
              <el-card class="box-card" v-bind:class="{ active: ( warehouseLocationId == item.warehouseLocationId) }">
                <div>{{item.codeSection}}</div>
                <div v-if="item.warehouseLocationId">{{item.warehouseLocationName}}</div>
              </el-card>
            </li>
          </ul>
          <el-button type="success" size="mini" class="return" v-show="checkDetailsList" @click="checkDetailsList=false">返回模糊盘点</el-button>
          <div class="check-detail-list" v-show="checkDetailsList">
            <ul class="vague">
              <li class="header-list" v-for="(item,index) in 10" :key="index">**{{index}}</li>
            </ul>
            <ul class="vague small">
              <li class="list" v-for="item in ListData" :key="item.name" :style="{'margin-left':item.px}" @click="caoZuo(item)">
                <el-card class="box-card" :class="{'active':item.state}">
                  <div>{{item.name}}</div>
                </el-card>
              </li>
              <li class="list" v-if="ListData.add" v-for="(item,index) in ListData.add" :key="index" v-show="item.state">
                <el-card class="box-card" :style="{background:'#96f169'}">
                  <div class="delete" @click="deleteAdd(item, index)">删除</div>
                  <div>{{item.name}}</div>
                </el-card>
              </li>
              <li class="list" @click="addDialogVisible = true">
                <el-card class="box-card">
                  <div>添加</div>
                </el-card>
              </li>
            </ul>
          </div>
        </div>
        <div v-if=" ! haveCode" style="margin-top: 20px">
          <el-form :model="checkNumFrom" ref="checkNumFrom" :inline="true" size="medium">
            <el-form-item label="实际库存 : ">
              <el-input min="0" type="number" v-model="checkNumFrom.num" />
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div style="height: 36px;line-height:36px;">备 注 :</div>
          <div>
            <el-input type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入异常备注"
              v-model="textarea">
            </el-input>
          </div>
        </div>
        <el-dialog title="操作" :visible.sync="updateDialogVisible" width="40%" center>
          <el-checkbox v-model="checked">灭失</el-checkbox>
          <span slot="footer" class="dialog-footer">
            <el-button @click="updateDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="confirmUpdate()">确定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="操作" :visible.sync="addDialogVisible" width="40%" center>
          <el-form :model="addFrom" ref="addFrom" :inline="true" size="medium">
            <el-form-item label="区域码 : "
            :rules="[ { required: true, message: '请输入区域码', trigger: 'blur' } ]">
              <el-input max="3" v-model="addFrom.codeSection" />
              <span style="color:#f00;" v-show="codeShow">该区域码已存在！</span>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="confirmAdd('addFrom')">确定</el-button>
          </span>
        </el-dialog>
        <el-row type="flex" class="row-bg" justify="space-around" style="margin:60px 10% 0;">
          <el-col :span="6"><div class="save-btn liner-btn" @click="centerDialogVisible = true"><i class="icon-l icon-success"></i>确定</div></el-col>
          <el-col :span="6"><el-button style="width:124px;" @click="$router.back(-1)" icon="icon-l icon-cancel-1" size="medium">取消</el-button></el-col>
        </el-row>
        <el-dialog title="操作提示" :visible.sync="centerDialogVisible"  width="40%" center>
          <div style="font-size:16px;text-align:center;">
            确定提交盘点吗？
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="submitForm()">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import request from '@/utils/request'
  // import { getLSession } from '@/utils/session'
  // import { formatDate } from '@/utils/format'

  export default {
    data () {
      return {
       warehouseLocationId:'',
       warehouseLocationNum:'',
        defaultFlag: false,
        haveLocation : false,
        haveCode: false,
        centerDialogVisible: false,
        codeShow: false,
        checkDetailsList: false,
        updateDialogVisible: false,
        addDialogVisible: false,
        click: {},
        checked: false,
        jsonData: [],
        drugsFrom: {
          infoName: '',
          inventoryTotal: '',
          facBatchNumber: '',
          infoForm: '',
          storagePrice: '',
          trpOuterNumber: '',
          warehouseName: ''
        },
        addFrom: {
          codeSection: ''
        },
        checkNumFrom: {
          num: ''
        },
        textarea: '',
        priceFrom: {
          storagePrice: ''
        },
        ListData: [],
        info: {}
      }
    },
    components: { NavHeader },
    mounted () {
      this.getStockInfo()
    },
    methods: {
      getStockInfo () {
        this.defaultFlag = this.$route.query.checkNum
        request.getStockInfo({
          warehouseDrugId: this.$route.query.warehouseDrug
        }).then(({ data }) => {
          if (data.success) {
            if(data.data.drugInfo.haveCode == 1){
              this.haveCode = true;//有区域码
            }
            if(data.data.drugInfo.haveLocation == 1){
              this.haveLocation = true;
            }
           if(data.data.warehouseDrugLocations&& data.data.warehouseDrugLocations.length>0){
            this.warehouseLocationId = data.data.warehouseDrugLocations[0].warehouseLocationId
            this.warehouseLocationNum = data.data.warehouseDrugLocations[0].num
           }
            this.drugsFrom = data.data.drugInfo
            this.priceFrom.storagePrice = String(data.data.drugInfo.storagePrice)
            this.init(data.data.warehouseDrugLocations)
          } else {
            this.$message.error(data.message)
          }
        })
      },
      init (warehouse) {
        warehouse.forEach(item => {
          let list = {
            state: false,
            codeSection: item.codeSection,
            num: item.num,
            warehouseLocationName: item.warehouseLocationName,
            warehouseLocationId: item.warehouseLocationId,
            data: []
          }
          let arr = item.codeSection.split('-')
          let num = parseInt(arr[1]) - parseInt(arr[0]) + 1
          let arrList = []
          for (var i = 0; i < num; i++) {
            let long
            let three = String(parseInt(arr[0]) + i).padStart(3, '0')
            if (i === 0) {
              let index = parseInt(three) % 10
              long = String(index * 90) + 'px'
            } else {
              long = '0px'
            }
            arrList.push({name: three, px: long, state: false})
          }
          list.data = arrList
          this.jsonData.push(list)
        })
      },
      accurate (item) {
        this.warehouseLocationId = item.warehouseLocationId
        this.warehouseLocationNum = item.num;
        if(this.haveCode){
          this.checkDetailsList = true
          this.ListData = item.data
        }
      },
      caoZuo (item) {
        this.updateDialogVisible = true
        this.click = item
        this.checked = item.state
      },
      confirmUpdate () {
        if (!this.checked && !this.click.state) {
          return
        } else {
          this.click.state = this.checked
        }
        this.updateDialogVisible = false
      },
      confirmAdd (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let add = {
              name: this.addFrom.codeSection,
              px: '0px',
              state: true
            }
            let isHave = this.contains2(this.addFrom.codeSection)
            if (isHave) {
              this.codeShow = true
            } else {
              if (this.ListData.add) {
                this.ListData.add.push(add)
              } else {
                this.ListData['add'] = []
                this.ListData['add'].push(add)
              }
              this.addDialogVisible = false
            }
          }
        })
      },
      deleteAdd (item, delIndex) {
        item.state = false
        this.$set(item, 'state', false)
        console.log(item)
        this.ListData.add.splice(delIndex, 1)
      },
      contains (arr, obj) {
        var i = arr.length
        while (i--) {
          if (arr[i].warehouseLocationId === obj) {
            return i
          }
        }
        return false
      },
      contains2 (obj) {
        for (let i = 0; i < this.jsonData.length; i++) {
          let item1 = this.jsonData[i].data
          for (var m = 0; m < item1.length; m++) {
            if (item1[m].name === obj) {
              return true
            }
          }
          if (item1.add) {
            let add = item1.add
            for (var n = 0; n < add.length; n++) {
              if (add[n].name === obj) {
                return true
              }
            }
          }
        }
        return false
      },
      submitForm () {

        if (this.defaultFlag) {
          this.$refs['checkNumFrom'].validate((valid) => {
            if (valid) {
              let num = 0
              let lossNum = 0
              console.log(this.checkNumFrom.num , parseInt(this.drugsFrom.inventoryTotal))
              if(null!=this.checkNumFrom.num&&""!=this.checkNumFrom.num){
              	 let a = this.checkNumFrom.num - parseInt(this.drugsFrom.inventoryTotal)
	              if (a > 0) {
	                num = a
	              } else {
	                lossNum = Math.abs(a)
	              }
              }
             
              request.checkStock({
                id: this.$route.query.warehouseDrug,
                storagePrice: this.priceFrom.storagePrice,
                description: this.textarea,
                warehouseDrugLocations: [{
                  warehouseLocationId: this.warehouseLocationId,
                  num: num,
                  codeSection: '',
                  lossNum: lossNum,
                  lossCodeSection: ''
                }]
              }).then(({ data }) => {

                if (data.success) {
                  this.$router.back(-1)
                  this.$message({message: '盘点成功！', type: 'success'})
                } else {
                  this.$message.error(data.message)
                }
              })
            }
          })
        } else {
          if(this.haveCode){
             let warehouseDrugLocations = []
              this.jsonData.forEach(item => {
                let updateNum = 0
                let addNum = 0
                let updateCode = []
                let addCode = []
                if (item.data.add) {
                  item.data.add.forEach(addItem => {
                    addNum++
                    addCode.push(addItem.name + '-' + addItem.name)
                  })
                }
                item.data.forEach(item2 => {
                  if (item2.state === true) {
                    updateNum++
                    updateCode.push(`${item2.name}-${item2.name}`)
                  }
                })
                if (addCode.length !== 0 || updateCode.length !== 0) {
                  let a = {
                    warehouseLocationId: item.warehouseLocationId,
                    num: addNum,
                    codeSection: addCode.join(','),
                    lossNum: updateNum,
                    lossCodeSection: updateCode.join(',')
                  }
                  if (warehouseDrugLocations.length !== 0) {
                    let obj = a.warehouseLocationId
                    let isHave = this.contains(warehouseDrugLocations, obj)
                    if (isHave !== false) {
                      let item = warehouseDrugLocations[isHave]
                      item.num += a.num
                      item.lossNum += a.lossNum
                      if (item.codeSection) {
                        item.codeSection = item.codeSection + ',' + a.codeSection
                      } else {
                        item.codeSection = a.codeSection
                      }
                      if (item.lossCodeSection) {
                        item.lossCodeSection = item.lossCodeSection + ',' + a.lossCodeSection
                      } else {
                        item.lossCodeSection = a.lossCodeSection
                      }
                    } else {
                      warehouseDrugLocations.push(a)
                    }
                  } else {
                    warehouseDrugLocations.push(a)
                  }
                }
              })
              let params = {
                id: this.$route.query.warehouseDrug,
                storagePrice: this.priceFrom.storagePrice,
                description: this.textarea,
                warehouseDrugLocations: warehouseDrugLocations
              }
              request.checkStock(params).then(({ data }) => {
              if (data.success) {
                this.$router.back(-1)
                this.$message({message: '盘点成功！', type: 'success'})
              } else {
                this.$message.error(data.message)
              }
            })
          }else{
              this.$refs['checkNumFrom'].validate((valid) => {
              if (valid) {
                let num = 0
                let lossNum = 0
                console.log(this.checkNumFrom.num, parseInt(this.warehouseLocationNum))
                if(null!=this.checkNumFrom.num&&""!=this.checkNumFrom.num){
                  	let a = this.checkNumFrom.num - parseInt(this.warehouseLocationNum)
		                if (a > 0) {
		                  num = a
		                } else {
		                  lossNum = Math.abs(a)
		                }
                  }
                
                request.checkStock({
                  id: this.$route.query.warehouseDrug,
                  storagePrice: this.priceFrom.storagePrice,
                  description: this.textarea,
                  warehouseDrugLocations: [{
                    warehouseLocationId: this.warehouseLocationId,
                    num: num,
                    codeSection: '',
                    lossNum: lossNum,
                    lossCodeSection: ''
                  }]
                }).then(({ data }) => {

                  if (data.success) {
                    this.$router.back(-1)
                    this.$message({message: '盘点成功！', type: 'success'})
                  } else {
                    this.$message.error(data.message)
                  }
                })
              }
            })
          }
        }
        this.centerDialogVisible = false
      }
    }
  }
</script>

<style>
  .check-pn .el-main{
    overflow: visible;
    padding-right: 0;
  }
  .check-pn .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
    padding: 20px 30px 50px;
    color: #606266;
  }
  .check-pn .drug-title{
    color: #397bf1;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
  }
  .check-pn .content{
    padding: 30px 20px;
    border: solid #ccc 1px;
    border-radius: 5px;
  }
  .check-pn .demo-form-inline .el-input__inner{
    border: none;
    padding: 0;
  }
  .check-pn .el-form-item__label{
    font-size: 16px;
    color: #000;
  }
  .check-pn .vague{
    width: 900px;
    overflow: hidden;
  }
  .check-pn .vague li{
    background: #f2f8ff;
    text-align: center;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .check-pn .vague li .active{
    background: rgba(255, 0, 0, 0.6);
  }
  .check-pn .box-card{
    width: 80px;
    cursor: pointer;
    background: #fefeff;
  }
  .check-pn .big .box-card{
    height: 100px;
  }
  .check-pn .small .box-card .delete{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 60px;
    display: none;
  }
  .check-pn .small .box-card:hover .delete{
    display: block;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
  .check-pn .small .box-card{
    position: relative;
    height: 60px;
  }
  .check-pn .el-card__body{
    padding: 20px 10px;
  }
  .check-pn .danger{
    color: #f00;
  }
  .check-pn .header-list{
    width: 80px;
    height: 20px;
    line-height: 20px;
    background: #f2f2f2;
    margin-right: 10px;
    margin-bottom: 10px;
    border: solid #ccc 1px;
    float: left;
    text-align: center;
  }
  .check-pn .return{
    margin-bottom: 20px;
  }
</style>

