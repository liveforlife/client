<template>
  <el-container class="depotIn-drugs">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>药品入库</el-breadcrumb-item>
              <el-breadcrumb-item>录入药品</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div>
        <el-form label-position="left" label-width="134px" :model="drugsFrom" ref="drugsFrom" size="medium">
          <div class="drugs-info">
            <div class="depotIn-drugs-title">药品信息</div>
            <div class="content">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="box-left" style="padding: 0 4%;">
                  <el-form-item label="药品通用名称" prop="infoName"
                    :rules="[{ required: true, message: '请输入药品通用名称', trigger: 'blur' }]">
                    <el-autocomplete
                      class="inline-input"
                      v-model="drugsFrom.infoName"
                      :fetch-suggestions="querySearch"
                      placeholder="搜索药品名称"
                      :trigger-on-focus="false"
                      @select="handleSelect"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="药品商品名" prop="infoNamed"
                    :rules="[{ required: true, message: '请输入药品商品名', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.infoNamed" placeholder="曾用名，厂家命名" />
                  </el-form-item>
                  <el-form-item label="剂型(性状)" prop="infoForm"
                    :rules="[{ required: true, message: '请输入剂型(性状)', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.infoForm" placeholder="例如“胶囊、片剂“" />
                  </el-form-item>
                  <el-form-item label="是否为处方药" prop="ifPrescription" class="long-select"
                    :rules="[{ required: true, message: '请选择是否为处方药', trigger: 'change' }]">
                    <el-select v-model="drugsFrom.ifPrescription" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否为原料药" prop="ifRawMaterial" class="long-select"
                    :rules="[{ required: true, message: '请选择是否为原料药', trigger: 'change' }]">
                    <el-select v-model="drugsFrom.ifRawMaterial" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding: 0 4%;">
                  <el-form-item label="药品编码" prop="code"
                    :rules="[{ required: true, message: '请输入药品编码', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.code" placeholder="生成编码" />
                  </el-form-item>
                  <el-form-item label="规 格" prop="infoSpecification"
                    :rules="[{ required: true, message: '请输入规格', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.infoSpecification" placeholder="例如“0.25克/粒”" />
                  </el-form-item>
                  <el-form-item label="单 位" prop="infoUnit" class="long-select"
                    :rules="[{ required: true, message: '请选择单位', trigger: 'change' }]">
                    <el-select v-model="drugsFrom.infoUnit" placeholder="请选择">
                      <el-option label="盒" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="单 价" prop="infoPrice" class="volume_style_all"
                    :rules="[
                    { required: true, message: '请输入药品单价', trigger: 'blur'},
                    { pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, message: '请输入正整数', trigger: 'blur' }]">
                    <el-input type="number" min='0' v-model="drugsFrom.infoPrice" placeholder="请输入每盒单价" @change="yunshuPrice" />
                    <span>￥</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="drugs-info">
            <div class="depotIn-drugs-title">运输/存储包装信息</div>
            <div class="content">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="box-left" style="padding: 0 4%;">
                  <el-form-item label="运输/存储包装单位" prop="trpUnit" class="long-select"
                    :rules="[{ required: true, message: '请选择运输/存储包装单位', trigger: 'change' }]">
                    <el-select v-model="drugsFrom.trpUnit" placeholder="请选择">
                      <el-option label="箱" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                 <el-form-item label="运输/存储包装数量" prop="trpOuterNumber" class="volume_style_all"
                               :rules="[{ required: true, message: '请输入运输/存储包装数量', trigger: 'blur' },
                               { pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur' }]">
                  <el-input type="number" v-model="drugsFrom.trpOuterNumber"  class="middle-input" @change="yunshuPrice" />
                  <el-select v-model="drugsFrom.trpOuterPackingUnit" placeholder="请选择" class="short-select">
                   <el-option label="盒" value="1"></el-option>
                  </el-select>
                  <span>每</span>
                  <el-select v-model="drugsFrom.trpUnit" placeholder="请选择"  class="short-select">
                   <el-option label="箱" value="1"></el-option>
                  </el-select>
                 </el-form-item>
                  <div class="three-input">
                    <el-form-item label="包装外观尺寸" prop="trpLength"
                      :rules="[{ required: true, message: '请输入包装外观尺寸-长度', trigger: 'change' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur' }]">
                      <el-input type="number" v-model="drugsFrom.trpLength" @change="allMoney" min="1" placeholder="长度：关键数据,误差不超过5%" /><span>mm</span>
                    </el-form-item>
                    <el-form-item label="" prop="trpWidth"
                      :rules="[{ required: true, message: '请输入包装外观尺寸-宽度', trigger: 'change' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur' }]">
                      <el-input type="number" v-model="drugsFrom.trpWidth" @change="allMoney" min="1" placeholder="宽度：关键数据,误差不超过5%" /><span>mm</span>
                    </el-form-item>
                    <el-form-item label="" prop="trpHeight"
                      :rules="[{ required: true, message: '请输入包装外观尺寸-高度', trigger: 'change' },
                      { pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur' }]">
                      <el-input type="number" v-model="drugsFrom.trpHeight" @change="allMoney" min="1" placeholder="高度：关键数据,误差不超过5%" /><span>mm</span>
                    </el-form-item>
                  </div>
                  <!-- <el-form-item label="包装外观尺寸" prop="trpLength" class="volume_style_all"
                    :rules="[{ required: true, message: '请输入包装外观尺寸', trigger: 'change' }]">
                    <el-input type="number" v-model="drugsFrom.trpLength" min="1" class="short-input" /><span>x</span>
                    <el-input type="number" v-model="drugsFrom.trpWidth" min="1" class="short-input" /><span>x</span>
                    <el-input type="number" v-model="drugsFrom.trpHeight" min="1" class="short-input" />
                    <span style="width:40px;">mm</span>
                  </el-form-item> -->
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding: 0 4%;">
                  <el-form-item label="药品贮藏" prop="trpStorageCond" class="long-select"
                    :rules="[{ required: true, message: '请选择药品贮藏方式', trigger: 'change' }]">
                    <el-select v-model="drugsFrom.trpStorageCond" placeholder="请选择">
                      <el-option label="常温" value="常温"></el-option>
                      <el-option label="阴凉" value="阴凉"></el-option>
                      <el-option label="冷藏" value="冷藏"></el-option>
                    </el-select>
                  </el-form-item>
                 <el-form-item label="运输/存储包装单价" prop="trpUnitPrice" class="volume_style_all"
                               :rules="[{ required: true, message: '请输入运输/存储包装单价', trigger: 'blur' }]">
                  <el-input type="number" v-model="drugsFrom.trpUnitPrice" placeholder="系统生成每箱价格" readonly @change="allMoney" /><span>￥</span>
                 </el-form-item>


                 <el-form-item label="货损单价" prop="trpDamagePrice" class="volume_style_all"
                               :rules="[{ required: true, message: '请输入货损单价', trigger: 'blur' },
                               { pattern:/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, message: '请输入正数', trigger: 'blur' }]">
                  <el-input type="number" v-model="drugsFrom.trpDamagePrice" placeholder="等同于包装单价" /><span>￥</span>
                 </el-form-item>
                  <el-form-item label="包装重量" prop="trpWeight" class="volume_style_all"
                    :rules="[{ required: true, message: '关键数据,误差不超过5%', trigger: 'blur' },
                    { pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, message: '请输入正数', trigger: 'blur' }]">
                    <el-input type="number" v-model="drugsFrom.trpWeight" placeholder="每箱重量：关键数据,误差不超过5%" /><span>kg</span>
                  </el-form-item>
                  <el-form-item label="包装体积" prop="trpBulk" class="volume_style_all"
                    :rules="[{ required: true, message: '请输入包装体积', trigger: 'blur' }]">
                    <el-input type="number" v-model="drugsFrom.trpBulk" placeholder="每箱体积：关键数据,误差不超过5%" readonly /><span>m³</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="drugs-info">
            <div class="depotIn-drugs-title">出厂信息</div>
            <div class="content">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="box-left" style="padding: 0 4%;">
                  <el-form-item label="生产企业" prop="facCompanyName"
                    :rules="[{ required: true, message: '请输入生产企业', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.facCompanyName" placeholder="默认当前企业" />
                  </el-form-item>
                  <el-form-item label="生产日期" prop="facProducedDate"
                    :rules="[{ required: true, message: '请选择生产日期', trigger: 'change' }]">
                    <el-date-picker type="date" v-model="drugsFrom.facProducedDate" placeholder="精确到天" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" />
                  </el-form-item>
                  <el-form-item label="有效期至" prop="facValidityDate"
                    :rules="[{ required: true, message: '请输入有效期', trigger: 'blur' }]">
                    <el-date-picker type="date" v-model="drugsFrom.facValidityDate" placeholder="精确到天" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding: 0 4%;">
                  <el-form-item label="产品批号" prop="facBatchNumber"
                    :rules="[{ required: true, message: '请输入产品批号', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.facBatchNumber" placeholder="例如“991108-2”" />
                  </el-form-item>
                  <el-form-item label="批准文号" prop="facApprovalNumber"
                    :rules="[{ required: true, message: '请输入批准文号', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.facApprovalNumber" placeholder="例如“国药准字H00000000”" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="drugs-info">
            <div class="depotIn-drugs-title">下单信息</div>
            <div class="content">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="box-left" style="padding: 0 4%;">
                  <el-form-item label="存储仓库" prop="warehouseId"
                    :rules="[{ required: true, message: '请选择存储仓库', trigger: 'blur' }]">
                    <el-select v-model="drugsFrom.warehouseId" placeholder="请选择" @change="getDepotPlace">
                      <el-option v-for="(item,index) in depotList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="选填区域码和库位">
                    <el-checkbox v-model="checked" @change="inputCodeCheckBoxChange()">选填区域码和库位</el-checkbox>
                    <el-button v-show="checked" type="primary" icon="el-icon-circle-plus-outline" style="float:right;" size="mini" @click="addDomain">添加</el-button>
                    <div class="areacode_main" v-show="checked" >
                      <el-form-item
                        label-width="20px"
                        v-for="(item, index) in drugsFrom.warehouseDrugLocation"
                        :label="String(index+1)"
                        :key="item.key">
                        <div style="margin-bottom: 10px;">
                          <el-input v-model="item.codeSection" placeholder="区域码,001-002" class="short-input" @blur="checkFormat(item)" @change="setFormat(item)" />
                          <el-input type="number" v-model="item.num" placeholder="数量" class="short-input" :readonly="numReadonly" @blur="allNum()"/>
                          <el-select v-model="item.warehouseLocationId" placeholder="请选择库位" class="short-input">
                            <el-option v-for="(item,index) in placeList" :key="index" :label="item.locationName" :value="item.id"></el-option>
                          </el-select>
                          <el-button type="primary" icon="el-icon-delete" @click.prevent="removeDomain(item)"></el-button>
                        </div>
                      </el-form-item>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="padding: 0 4%;">
                  <el-form-item label="存储总量" prop="stockNumber"
                    :rules="[{ required: true, message: '请输入存储总量', trigger: 'blur' },
                    { pattern: /^[1-9]\d*$/, message: '请输入正整数' }]">
                    <el-input v-model="drugsFrom.stockNumber" class="l-input" :readonly="checked" @change="allMoney" />
                    <el-select v-model="drugsFrom.trpUnit" placeholder="请选择" class="short-select">
                      <el-option label="箱" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="药品总金额" class="volume_style_all" prop="allMoney"
                    :rules="[{ required: true, message: '请输入药品总金额', trigger: 'blur' }]">
                    <el-input v-model="drugsFrom.allMoney" readonly /><span>￥</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
        <el-dialog title="操作提示" :visible.sync="centerDialogVisible" width="40%" center>
          <div style="font-size:16px;text-align:center;">确定录入该药品吗？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="confirm()">确定</el-button>
          </span>
        </el-dialog>
        <el-row type="flex" class="row-bg" justify="space-around" style="margin:60px 10% 0;">
          <el-col :span="6"><div class="save-btn liner-btn" @click="submitForm('drugsFrom')"><i class="icon-l icon-success"></i>确定</div></el-col>
          <el-col :span="6"><router-link to="/accountSearch"><el-button style="width:124px;" icon="icon-l icon-cancel-1" size="medium">取消</el-button></router-link></el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import request from '@/utils/request'
  import { getLSession } from '@/utils/session'
  // import { formatDate } from '@/utils/format'
   import { accMul } from '@/utils/format'

  export default {
    data () {
      return {
        numReadonly: false,
        timeout: null,
        centerDialogVisible: false,
        checked: false,
        drugsFrom: {
          cid: '',
          code: '',
          infoName: '',
          infoNamed: '',
          infoSpecification: '',
          infoForm: '',
          infoUnit: '1',
          ifPrescription: '',
          ifRawMaterial: '',
          infoPrice: '',
          trpInnerPacking: '',
          trpOuterNumber: '',
          trpOuterPackingUnit: '1',
          trpUnit: '1',
          trpUnitPrice: '',
          trpDamagePrice: '',
          trpWeight: '',
          trpBulk: '',
          trpLength: '',
          trpWidth: '',
          trpHeight: '',
          trpStorageCond: '',
          facCompanyName: '',
          facBatchNumber: '',
          facApprovalNumber: '',
          facProducedDate: '',
          facValidityDate: '',
          warehouseId: '',
          stockNumber: '',
          warehouseDrugLocation: [{
            warehouseLocationId: '',
            num: '',
            codeSection: ''
          }],
          allMoney: ''
        },
        depotList: [],
        placeList: [],
        info: {}
      }
    },
    components: { NavHeader },
    methods: {
      inputCodeCheckBoxChange() {
        if(this.drugsFrom.warehouseDrugLocation.length < 1){
          this.drugsFrom.warehouseDrugLocation.push({
            warehouseLocationId: '',
            num: '',
            codeSection: '',
            key: Date.now()
          })
        }
        if(this.checked){
          this.allNum()
        }
      },
      getDepotPlace (value) {
        request.depotPlaceList({
          warehouseId: value,
          _size: '9999',
          _offset: '0'
        }).then(({ data }) => {
          if (data.success) {
            this.placeList = data.data.records
          } else {
            this.$message.error(data.message)
          }
        })
      },
      // 添加区域码
      addDomain () {
        this.drugsFrom.warehouseDrugLocation.push({
          warehouseLocationId: '',
          num: '',
          codeSection: '',
          key: Date.now()
        })
      },
      // 删除区域码
      removeDomain (item) {
        var index = this.drugsFrom.warehouseDrugLocation.indexOf(item)
        if (index !== -1) {
          this.drugsFrom.warehouseDrugLocation.splice(index, 1)
        }
        this.drugsFrom.stockNumber=this.drugsFrom.stockNumber-item.num
      },
      querySearch (queryString, cb) {
        var result = []
        request.searchLikeName({
          cid: this.info,
          name: queryString
        }).then(({ data }) => {
          if (data.success) {
            let name = data.data.records
            name.forEach(item => {
              item.value = item.fullInfo
              result.push(item)
            })
          }
        })
        cb(result)
      },
      handleSelect (item) {
        delete item.id
        item.infoUnit = String(item.infoUnit)
        item.ifPrescription = String(item.ifPrescription)
        item.ifRawMaterial = String(item.ifRawMaterial)
        item.trpOuterPackingUnit = String(item.trpOuterPackingUnit)
        item.trpUnit = String(item.trpUnit)
       this.drugsFrom.cid = item.cid
       this.drugsFrom.code = item.code
       this.drugsFrom.infoName = item.infoName
       this.drugsFrom.infoNamed = item.infoNamed
       this.drugsFrom.infoSpecification = item.infoSpecification
       this.drugsFrom.infoForm = item.infoForm
       this.drugsFrom.infoUnit = item.infoUnit
       this.drugsFrom.ifPrescription = item.ifPrescription
       this.drugsFrom.ifRawMaterial = item.ifRawMaterial
       this.drugsFrom.infoPrice = item.infoPrice
       this.drugsFrom.trpInnerPacking = item.trpInnerPacking
       this.drugsFrom.trpOuterNumber = item.trpOuterNumber
       this.drugsFrom.trpOuterPackingUnit = item.trpOuterPackingUnit
       this.drugsFrom.trpUnit = item.trpUnit
       this.drugsFrom.trpUnitPrice = item.trpUnitPrice
       this.drugsFrom.trpDamagePrice = item.trpDamagePrice
       this.drugsFrom.trpWeight = item.trpWeight
       this.drugsFrom.trpBulk = item.trpBulk
       this.drugsFrom.trpLength = item.trpLength
       this.drugsFrom.trpWidth = item.trpWidth
       this.drugsFrom.trpHeight = item.trpHeight
       this.drugsFrom.trpStorageCond = item.trpStorageCond
       this.drugsFrom.facCompanyName = item.facCompanyName
       this.drugsFrom.facBatchNumber = item.facBatchNumber
       this.drugsFrom.facApprovalNumber = item.facApprovalNumber
       this.drugsFrom.facProducedDate = item.facProducedDate
       this.drugsFrom.facValidityDate = item.facValidityDate
       this.drugsFrom.warehouseId = item.warehouseId
       this.drugsFrom.stockNumber = item.stockNumber
       this.drugsFrom.warehouseDrugLocation = item.warehouseDrugLocation
       this.drugsFrom.allMoney = item.allMoney
       this.drugsFrom.stockNumber = item.stockNumber
      },
      getDepotList () {
        request.depotList({
          cId: this.info,
          _size: '999',
          _offset: '0'
        }).then(({ data }) => {
          if (data.success) {
            this.depotList = data.data.records
          } else {
            this.$message.error(data.message)
          }
        })
      },
      buquan (num, length) {
        var numstr = num.toString()
        var l = numstr.length
        if (numstr.length >= length && numstr !== '000') {
          return numstr
        }
        for (var i = 0; i < length - l; i++) {
          numstr = '0' + numstr
          if (numstr === '000') {
            numstr = '001'
          }
        }
        return numstr
      },
      setFormat (item) {
        console.log(item)
        if (item.codeSection) {
          this.numReadonly = true
          var arr = item.codeSection.split('-')
          item.num = arr[1] - arr[0] + 1
        } else {
          this.numReadonly = false
          item.num = ''
        }
        this.allNum()
      },
      checkFormat (item) {
        console.log(item)
        if (item.codeSection) {
          this.numReadonly = true
          var arr = item.codeSection.split('-')
          if(arr.length != 2 || arr[1] < arr[0]){
            this.$message.error('区域码输入错误,结尾数字大于等于开始数字,例如:005-012,020-123')
            item.codeSection = '';
          }
          item.num = arr[1] - arr[0] + 1
        }
      },
      checkArry () {
        // 验证 区域码-数量-库位  数据是否一致
        let array = this.drugsFrom.warehouseDrugLocation
        for (let i = 0; i < array.length; i++) {
          if (array[0].warehouseLocationId !== '') {
            if (array[i].warehouseLocationId === '') {
              return false
            }
          } else {
            if (array[i].warehouseLocationId !== '') {
              return false
            }
          }
          if (array[0].num !== '') {
            if (array[i].num === '') {
              return false
            }
          } else {
            if (array[i].num !== '') {
              return false
            }
          }
          if (array[0].codeSection !== '') {
            if (array[i].codeSection === '') {
              return false
            }
          } else {
            if (array[i].codeSection !== '') {
              return false
            }
          }
        }
        return true
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.checked)
            if (this.checked) {
              let check = this.checkArry()
              if (check) {
                this.centerDialogVisible = true
              } else {
                alert('请保持输入的“区域码-数量-库位”一致！')
              }
            } else {
              this.drugsFrom.warehouseDrugLocation = []
              this.centerDialogVisible = true
            }
          }
        })
      },
      confirm () {
        this.drugsFrom.cid = this.info
        if (this.checked) {
          let array = this.drugsFrom.warehouseDrugLocation
          for (let i = 0; i < array.length; i++) {
            if (array[0].warehouseLocationId === '' && array[0].num.length > 0 ) {
              this.$message.error("请选择入库的库位信息!")
              this.centerDialogVisible = false
              return
            }
          }
        }
        request.InsertDrugs(this.drugsFrom).then(({ data }) => {
          if (data.success) {
             this.$message({ message: '入库成功！', type: 'success' })
            this.$refs.drugsFrom.resetFields()
            this.drugsFrom.warehouseDrugLocation = []
            this.checked = false
          } else {
            this.$message.error(data.message)
          }
          this.centerDialogVisible = false
        })
      },
      allNum () {
        let allnum = 0
        this.drugsFrom.warehouseDrugLocation.forEach(item => {
          if(item.num){
            allnum += item.num * 1
          }
        })
        this.drugsFrom.stockNumber = String(allnum)
        this.allMoney()
      },
      allMoney () {
       console.log(11)
        let from = this.drugsFrom
        this.drugsFrom.allMoney = from.stockNumber * from.trpUnitPrice
        this.drugsFrom.trpBulk =accMul(accMul((from.trpLength/1000),(from.trpWidth/1000)),(from.trpHeight / 1000))
      },
      yunshuPrice () {
        let from = this.drugsFrom
        this.drugsFrom.trpUnitPrice = String(from.infoPrice * from.trpOuterNumber)
        this.drugsFrom.trpDamagePrice = this.drugsFrom.trpUnitPrice
      },
    },
    mounted () {
      this.info = getLSession().data.org.id
      this.getDepotList()
    }
  }
</script>

<style>
  .depotIn-drugs .el-main{
    padding-right: 0;
  }
  .depotIn-drugs .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
    padding: 20px 35px 50px;
  }
  .depotIn-drugs .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .depotIn-drugs .depotIn-title{
    color: #474646;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .depotIn-drugs .depotIn-drugs-title{
    color: #70a3ff;
    font-weight: bold;
    line-height: 40px;
  }
  .depotIn-drugs .content{
    padding: 30px 0 30px;
    border: solid #ccc 1px;
    border-radius: 5px;
    background: #f2f8ff;
  }
  .depotIn-drugs .el-select>.el-input{
    width: 100%;
  }
  .depotIn-drugs .content .box-left{
    border-right: solid #ccc 1px;
  }
  .depotIn-drugs .three-input{
    width: 100%;
    overflow: hidden;
    color: #5b5b5b;
  }
  .depotIn-drugs .three-input .el-form-item{
    padding-right: 26px;
  }
  .depotIn-drugs .volume_style_all{
    padding-right: 26px;
  }
  .depotIn-drugs .volume_style_all span{
    width: 26px;
    display: inline-block;
    text-align: center;
    color: #5b5b5b;
  }
  .depotIn-drugs .el-date-editor.el-input{
    width: 100%;
  }
  .depotIn-drugs .short-input{
    width: 27.2%;
  }
  .depotIn-drugs .middle-input{
    width: 35%;
  }
  .depotIn-drugs .l-input{
    width: 74%;
  }
  .depotIn-drugs .short-select{
    width: 25%;
  }
  .depotIn-drugs .el-table__body-wrapper{
    overflow: hidden;
  }
  .depotIn-drugs .long-select .el-select{
    width: 100%;
  }
  .depotIn-drugs .el-autocomplete{
    width: 100%;
  }
</style>

