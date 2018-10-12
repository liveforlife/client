<template>
  <el-container class="depotIn-details">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>入库单详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"><NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div>
        <div class="depotIn-title">入库单详情</div>
        <div class="order-details">
          <div class="depotIn-details-title">订单信息</div>
          <div class="content">
            <el-form :model="orderDetails" label-width="90px" size="medium">
              <el-form-item label="入库编号 : ">
                <span style="color:#29b4ae;">{{orderDetails.storageOrderSn}}</span>
              </el-form-item>
              <el-form-item label="仓库名称 : ">
                <span>{{orderDetails.warehouseName}}</span>
              </el-form-item>
              <el-form-item label="联系人 : ">
                <div v-for="(item,index) in orderDetails.warehouseKeeperList" :key="index">{{item.uName}}({{item.uPhone}})</div>
              </el-form-item>
              <el-form-item label="通讯地址 : ">
                <span>{{orderDetails.postalAddress}}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="a-form-result">
          <div class="depotIn-details-title">药品信息</div>
          <div class="content">
            <el-table ref="multipleTable" :data="drugRecordDetail" border style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column width="120" property="infoName" label="药品通用名称">
               <template slot-scope="scope">
                <span class="blueText" @click="routerDrugsDetails(scope)">{{scope.row.infoName}}</span>
               </template>
              </el-table-column>
              <el-table-column width="100" property="infoSpecification" label="规格"></el-table-column>
              <el-table-column width="100" property="infoForm" label="剂型(性状)"></el-table-column>
              <el-table-column width="60" property="infoUnit" label="单位"></el-table-column>
              <el-table-column width="80" property="infoPrice" label="单价(￥)"></el-table-column>
              <el-table-column width="170" property="trpUnitPrice" label="运输/存储包装单价(￥)"></el-table-column>
             <el-table-column property="trpOuterNumber" label="运输/存储包装数量">
              <template slot-scope="scope">
               {{scope.row.trpOuterNumber}}{{scope.row.trpOuterPackingUnit}}/{{scope.row.trpUnit}}
              </template>
             </el-table-column>
              <el-table-column width="140" property="facCompanyName" label="生产企业"></el-table-column>
              <el-table-column width="100" property="facProducedDate" label="生产日期"></el-table-column>
              <el-table-column width="100" property="facValidityDate" label="有效期"></el-table-column>
              <el-table-column width="100" property="facBatchNumber" label="产品批号"></el-table-column>
              <el-table-column width="120" property="facApprovalNumber" label="批准文号"></el-table-column>
              <el-table-column width="100" property="storageDate" label="入库日期"></el-table-column>
              <el-table-column width="120" property="warehouseLocationName" label="库位">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    区域码 - 数量 - 库位
                    <div v-for="(item,index) in scope.row.locationRecordDetail" :key="index" class="popover">
                      {{ item.codeSection }} - {{ item.number }} - {{item.warehouseLocationName}}
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium" class="hidden-box">{{scope.row.warehouseLocationName}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column width="120" property="number" label="存储数量(箱)"></el-table-column>
              <el-table-column width="120" property="codeSection" label="区域码">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    区域码 - 数量 - 库位
                    <div v-for="(item,index) in scope.row.locationRecordDetail" :key="index" class="popover">
                      {{ item.codeSection }} - {{ item.number }} - {{item.warehouseLocationName}}
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium" class="hidden-box">{{scope.row.codeSection}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column width="120" property="totalPrice" label="金额(￥)"></el-table-column>
            </el-table>
            <div class="all">
              合计 : <span>￥<span class="price">{{allMoney}}</span><span>{{allMoneyToRMB}}</span></span>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import request from '@/utils/request'
  import { changeMoneyToChinese } from '@/utils/moneyCapital'
  import {setDrugsDetails} from '@/utils/session'
  // import { digitUppercase } from '@/utils/rmb'

  export default {
    data () {
      return {
        driveModule: false,
        isOut: false,
        drugRecordDetail: [],
        flowData: [
          {
            date: '2018-1-12',
            name: 'XXX',
            address: 'AAAAAAAAA'
          }, {
            date: '2018-1-12',
            name: 'XXX',
            address: 'AAAAAAAAA'
          }
        ],
        orderDetails: {
          ordercode: '',
          postalAddress: '',
          storageOrderSn: '',
          storageStatus: '',
          warehouseKeeperList: [],
          warehouseName: ''
        },
        allMoney: 0,
        allMoneyToRMB: ''
      }
    },
    components: {
      NavHeader
    },
    mounted () {
      this.getOutIn()
    },
    methods: {
      getOutIn () {
        this.getDetailsInfo()
      },
     routerDrugsDetails(scope) {
      let drugData = []
      drugData[0] = scope.row
      setDrugsDetails(drugData)
      this.$router.push({path: "/queryorderDrugsDetails"})
     },
      getDetailsInfo () {
        request.outInDetails({id: this.$route.query.depotIn}).then(({ data }) => {
          if (data.success) {
            let res = data.data
            this.drugRecordDetail = res.drugRecordDetail
            this.orderDetails = {
              ordercode: res.ordercode,
              postalAddress: res.postalAddress,
              storageOrderSn: res.storageOrderSn,
              storageStatus: res.storageStatus,
              warehouseKeeperList: res.warehouseKeeperList,
              warehouseName: res.warehouseName
            }
            res.drugRecordDetail.forEach(item => {
              this.allMoney += parseInt(item.totalPrice)
            })
            this.allMoneyToRMB = changeMoneyToChinese(this.allMoney)
          } else {
            this.$message.error(data.message)
          }
        })
      },
      handDel (row) {
        // this.$router.push({ path: '/memberDetails?member=' + row.id })
      },
      driveDetails (row) {
        this.driveModule = true
      }
    }
  }
</script>

<style>
  .depotIn-details .el-main{
    padding-right: 0;
  }
  .depotIn-details .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
    padding: 20px 35px 50px;
  }
  .depotIn-details .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .depotIn-details .el-checkbox__label{
    color: #333;
  }
  .depotIn-details .a-form-result{
    padding-top: 15px;
  }
  .depotIn-details .depotIn-title{
    color: #474646;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .depotIn-details .depotIn-details-title{
    color: #70a3ff;
    font-weight: bold;
    line-height: 40px;
  }
  .depotIn-details .content{
    border: solid #ccc 1px;
    border-radius: 5px;
  }
  .depotIn-details .order-details .content{
    padding: 15px 20px;
    font-size: 14px;
    color: #5b5b5b;
  }
  .depotIn-details .order-details label{
    font-size: 16px;
    color: #000000;
  }
  .depotIn-details .order-details .el-form-item{
    margin-bottom: 0;
    color: #5b5b5b;
  }
  .depotIn-details .order-details .active0{
    color: #397bf1;
  }
  .depotIn-details .order-details .active1{
    color: #fea014;
  }
  .depotIn-details .order-details .active2{
    color: #2fb9b3;
  }
  .depotIn-details .order-details .active3{
    color: #ff4949;
  }
  .depotIn-details .a-form-result .content{
    padding: 40px 0 0;
  }
  .depotIn-details .a-form-result .all{
    padding: 10px 20px;
    text-align: right;
  }
  .depotIn-details .a-form-result .all span{
    color: #fd8764;
  }
  .depotIn-details .a-form-result .price{
    font-size: 18px;
    padding-right: 15px;
  }
  .depotIn-details .a-form-result .color1{
    background: #ffe8e7;
  }
  .depotIn-details .a-form-result .color2{
    background: #e0efd8;
  }
  .depotIn-details .flow{
    margin-top: 15px;
  }
  .depotIn-details .flow .content{
    padding: 10px 15px 30px;
  }
  .depotIn-details .flow .el-table thead{
    color: #4b4b4b;
  }
  .depotIn-details .flow .el-table tr{
    background: #f5f5f5;
  }
  .depotIn-details .flow .el-table tr:hover{
    color: #397bf1;
  }
  .depotIn-details .icon-href{
    color: #c1c1c1;
    padding: 0 10px;
  }
  /* 弹出层 */
  .depotIn-details .el-dialog__body>div{
    padding: 10px 15px;
    background: hsl(218, 79%, 99%);
    border: solid #ccc 1px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 13px;
  }
  .depotIn-details .el-dialog__body>div label{
    display: inline-block;
    text-align: right;
    width: 76px;
    color: #404040;
    padding-right: 8px;
    font-size: 14px;
  }
  .depotIn-details .el-dialog__body>div span{
    padding-right: 10px;
  }
  .depotIn-details  .hidden-box{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .blueText {
   color: dodgerblue;
   text-decoration: underline;
   cursor: pointer;
  }
</style>

