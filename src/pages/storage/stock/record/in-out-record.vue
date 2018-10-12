<template>
  <el-container class="check-record">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>库存查询</el-breadcrumb-item>
              <el-breadcrumb-item v-if="recordIn">入库记录</el-breadcrumb-item>
              <el-breadcrumb-item v-if="!recordIn">出库记录</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="a-form-result" v-if="recordIn">
        <div style="height:40px;line-height:40px;padding-left:15px;">入库记录</div>
        <el-table :data="tableData3" style="width: 100%" border size="medium">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="storageOrderSn" label="入库号"></el-table-column>
         <el-table-column prop="storageBeforeNum" label="入库前数量"></el-table-column>
         <el-table-column prop="number" label="入库数"></el-table-column>
         <el-table-column prop="currentNum" label="入库后数量" width="120"></el-table-column>
         <el-table-column prop="trpUnit" label="单位"></el-table-column>
          <el-table-column prop="" label="状态">
            <template slot-scope="scope">
              <span>入库</span>
            </template>
          </el-table-column>
          <el-table-column prop="codeSection" label="区域码"></el-table-column>
          <el-table-column prop="createDateTimeStr" label="操作时间"></el-table-column>
        </el-table>
      </div>
      <div class="a-form-result" v-if="!recordIn">
        <div style="height:40px;line-height:40px;padding-left:15px;">出库记录</div>
        <el-table :data="tableData3" style="width: 100%" border size="medium">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="ordercode" label="订单号"></el-table-column>
         <el-table-column prop="storageBeforeNum" label="出库前数量"></el-table-column>
         <el-table-column prop="number" label="出库数"></el-table-column>
         <el-table-column prop="currentNum" label="出库后数量" width="120"></el-table-column>
         <el-table-column prop="trpUnit" label="单位"></el-table-column>
          <el-table-column prop="" label="状态">
            <template slot-scope="scope"><span>出库</span></template>
          </el-table-column>
          <el-table-column prop="codeSection" label="区域码"></el-table-column>
          <el-table-column prop="createDateTimeStr" label="操作时间"></el-table-column>
        </el-table>
      </div>
      <el-row type="flex" class="row-bg" justify="space-around" style="margin:60px 10% 0;">
        <el-col :span="6">
          <el-button type="primary" plain style="width:124px;" @click="$router.back(-1)" icon="icon-l icon-next-left" size="medium">返回</el-button>
        </el-col>
      </el-row>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import request from '@/utils/request'

  export default {
    data () {
      return {
        recordIn: false,
        tableData3: []
      }
    },
    components: { NavHeader },
    mounted () { this.init() },
    methods: {
      init () {
        if (this.$route.query.type === '1') {
          this.recordIn = true
        }

        this.getInit()
      },
      getInit () {
        request.outInRecord({
          drugId: this.$route.query.drugId,
          warehouseId: this.$route.query.warehouseId,
          storageType: this.$route.query.type
        }).then(({ data }) => {
          if (data.success) {
            this.tableData3 = data.data
          } else {
            this.$message.error(data.message)
          }
        })
      }
    }
  }
</script>

<style>
  .check-record .el-main{
    overflow: visible;
  }
  .check-record .el-main>div.a-form-result{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
  }
  .check-record .el-main>div.el-row{
    background: none;
  }
  .check-record .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .check-record .el-checkbox__label{
    color: #333;
  }
  .check-record .a-form-result{
    padding-top: 15px;
  }
  .check-record .el-table--border .has-gutter th:nth-last-of-type(2){
    border-right: solid #d7d7d7 1px;
  }
  .check-record .hidden-box{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

