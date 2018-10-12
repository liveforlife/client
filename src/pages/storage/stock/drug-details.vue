<template>
  <el-container class="drug-details">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>药品入库</el-breadcrumb-item>
              <el-breadcrumb-item>药品详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div>
        <div class="drugs-info">
          <div class="drug-details-title">药品详情</div>
          <div class="content">
            <el-form label-position="left" label-width="134px" :model="drugsFrom" size="mini" v-loading="loading">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding: 0 4%;">
                  <div class="drug-details-title">基本信息</div>
                   <el-form-item label="药品编码 :"><span>{{drugsFrom.code}}</span></el-form-item>
                  <el-form-item label="药品通用名称 :"><span>{{drugsFrom.infoName}}</span></el-form-item>
                  <el-form-item label="药品商品名 :"><span>{{drugsFrom.infoNamed}}</span></el-form-item>
                  <el-form-item label="规格 :"><span>{{drugsFrom.infoSpecification}}</span></el-form-item>
                  <el-form-item label="单价 :"><span>{{drugsFrom.infoPrice}}</span><span> ￥</span></el-form-item>
                  <el-form-item label="单位 :"><span>{{drugsFrom.infoUnit?'盒':'包'}}</span></el-form-item>
                  <el-form-item label="剂型(性状) :"><span>{{drugsFrom.infoForm}}</span></el-form-item>
                  <el-form-item label="是否原料药 :"><span>{{drugsFrom.ifRawMaterial?'是':'否'}}</span></el-form-item>
                  <el-form-item label="是否处方药 :"><span>{{drugsFrom.ifPrescription?'是':'否'}}</span></el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding: 0 4%;border-left:solid #ccc 1px;border-right:solid #ccc 1px;">
                  <div class="drug-details-title">包装信息</div>
                  <el-form-item label="运输/存储包装数量 :"><span>{{drugsFrom.trpOuterNumber}} 盒/箱</span></el-form-item>
                  <el-form-item label="运输/存储包装单位 :"><span>{{drugsFrom.trpUnit?'箱':'包'}}</span></el-form-item>
                  <el-form-item label="包装尺寸 :"><span>{{drugsFrom.trpLength}}mm * {{drugsFrom.trpWidth}}mm * {{drugsFrom.trpHeight}} mm</span></el-form-item>
                  <el-form-item label="体 积 :"><span>{{drugsFrom.trpBulk}}</span> m³<span></span></el-form-item>
                  <el-form-item label="包装重量 :"><span>{{drugsFrom.trpWeight}}</span><span> kg</span></el-form-item>
                  <el-form-item label="运输/存储包装单价 :"><span>{{drugsFrom.trpUnitPrice}}</span><span> ￥</span></el-form-item>
                  <el-form-item label="货损单价 :"><span>{{drugsFrom.trpDamagePrice}}</span><span> ￥</span></el-form-item>
                  <el-form-item label="贮藏 :"><span>{{drugsFrom.trpStorageCond}}</span></el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" style="padding: 0 4%;">
                  <div class="drug-details-title">厂家信息</div>
                  <el-form-item label="生产企业 :"><span>{{drugsFrom.facCompanyName}}</span></el-form-item>
                  <el-form-item label="所属公司 :"><span>{{drugsFrom.companyName}}</span></el-form-item>
                  <el-form-item label="生产日期 :"><span>{{drugsFrom.facProducedDate}}</span></el-form-item>
                  <el-form-item label="有 效 期 :"><span>{{drugsFrom.facValidityDate}}</span></el-form-item>
                  <el-form-item label="产品批号 :"><span>{{drugsFrom.facBatchNumber}}</span></el-form-item>
                  <el-form-item label="批准文号 :"><span>{{drugsFrom.facApprovalNumber}}</span></el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div>
          <div class="drug-details-title">账面库存</div>
          <div class="content a-form-result">
            <el-table :data="tableData3" style="width: 100%" size="medium" v-loading="loading">
              <el-table-column prop="warehouseName" label="仓库名称"></el-table-column>
              <el-table-column prop="warehouseLocationName" label="库位">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <el-table :data="scope.row.warehouseDrugLocationList" style="width: 100%">
                      <el-table-column prop="warehouseLocationName" label="库位" width="100"></el-table-column>
                      <el-table-column prop="codeSection" label="区域码" width="100"></el-table-column>
                      <el-table-column prop="number" label="数量"></el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium" class="hidden-box">{{scope.row.warehouseLocationName}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="" label="联系人/手机号">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <el-table :data="scope.row.warehouseKeepers" style="width: 100%">
                      <el-table-column prop="uName" label="联系人" width="100"></el-table-column>
                      <el-table-column prop="uPhone" label="电话号码" width="120"></el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium" class="hidden-box">查看详情</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="postalAddress" label="通讯地址"></el-table-column>
              <el-table-column prop="storagePrice" label="存储单价(￥/箱/天)"></el-table-column>
              <el-table-column prop="trpUnit" label="单位"></el-table-column>
              <el-table-column label="账面库存">
              <el-table-column prop="codeSection" label="区域码">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <el-table :data="scope.row.warehouseDrugLocationList" style="width: 100%">
                      <el-table-column prop="warehouseLocationName" label="库位" width="100"></el-table-column>
                      <el-table-column prop="codeSection" label="区域码" width="100"></el-table-column>
                      <el-table-column prop="number" label="数量"></el-table-column>
                    </el-table>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium" class="hidden-box">{{scope.row.codeSection}}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="总数量"></el-table-column>
              </el-table-column>
              <el-table-column property="" label="操作" width="220" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" v-if="handLookShow" type="primary" plain icon="icon-s icon-edit" @click="handLook(scope.row)">盘点</el-button>
                  <el-button size="mini" type="primary" plain icon="icon-s icon-edit" @click="checkRecord(scope.row.warehouseDrugId)">盘点记录</el-button>
                  <el-button size="mini" type="primary" plain icon="icon-s icon-edit" @click="inOutRecord(2, scope.row.warehouseId)">出库记录</el-button>
                  <el-button size="mini" type="primary" plain icon="icon-s icon-edit" @click="inOutRecord(1, scope.row.warehouseId)">入库记录</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-row type="flex" class="row-bg" justify="space-around" style="margin:60px 10% 0;">
          <el-col :span="6">
            <el-button type="primary" plain style="width:124px;" @click="$router.back(-1)" icon="icon-l icon-next-left" size="medium">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import request from '@/utils/request'
  import {getLSession} from '@/utils/session'

  export default {
    data () {
      return {
       handLookShow:false,
        loading: true,
        tableData3: [],
        drugsFrom: {
          companyName:'',
          id: '',
          cid: '',
          code: '',
          infoName: '',
          infoNamed: '',
          infoSpecification: '',
          infoForm: '',
          infoUnit: '',
          ifPrescription: '',
          ifRawMaterial: '',
          infoPrice: '',
          trpInnerPacking: '',
          trpOuterNumber: '',
          trpOuterPackingUnit: '',
          trpUnit: '',
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
          facValidityDate: ''
        }
      }
    },
    components: { NavHeader },
    mounted () {
      this.getDrugInfo()
    },
    methods: {
      getDrugInfo () {
        request.getDrugStock({
          warehouseDrugId: this.$route.query.stock,
          drugId: this.$route.query.drug
        }).then(({ data }) => {
          this.loading = false
          if (data.success) {
            let res = data.data
            this.drugsFrom = res.drugDetail
            res.warehouseDrudDetail.trpUnit = res.warehouseDrudDetail.trpUnit ? '箱' : '包'
            this.tableData3.push(res.warehouseDrudDetail)
           console.log(221,res)
           console.log(222,getLSession().data.org.id)
           this.handLookShow = res.warehouseDrudDetail.warehouseCid === getLSession().data.org.id?true:false
          } else {
            this.$message.error(data.message)
          }
        })
      },
      handLook (row) {
        if (row.warehouseLocationName === '' && row.codeSection === '') {

          this.$router.push({
            path: '/checkPN?warehouseDrug=' + row.warehouseDrugId + '&checkNum=true'
          })
        } else {
          this.$router.push({ path: '/checkPN?warehouseDrug=' + row.warehouseDrugId ,query:{warehouseLocationName:true}})
        }
      },
      checkRecord (row) {
        this.$router.push({ path: '/checkRecord?record=' + row })
      },
      inOutRecord (type, row) {
        let drugId = this.$route.query.drug
        this.$router.push({
          path: '/inOutRecord?warehouseId=' + row + '&drugId=' + drugId + '&type=' + type
        })
      }
    }
  }
</script>

<style>
  .drug-details .el-main{
    padding-right: 0;
  }
  .drug-details .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
    padding: 30px;
  }
  .drug-details .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .drug-details .depotIn-title{
    color: #474646;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .drug-details .drug-details-title{
    color: #70a3ff;
    font-weight: bold;
    line-height: 40px;
  }
  .drug-details .content{
    padding: 20px 0;
    border: solid #ccc 1px;
    border-radius: 5px;
  }
  .drug-details .drugs-info .content{
    background: #f2f8ff;
  }
  .drug-details .el-form-item--mini.el-form-item{
    margin-bottom: 10px;
  }
  .drug-details .el-form--label-left .el-form-item__label{
    color: #333;
  }
  .drug-details .el-form div{
    color: #5b5b5b;
  }
  .drug-details .el-table--border .has-gutter th:nth-last-of-type(2){
    border-right: solid #d7d7d7 1px;
  }
  .drug-details .el-tag--medium{
    cursor: pointer;
  }
  .drug-details .hidden-box{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

