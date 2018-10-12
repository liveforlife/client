<template>
  <el-container class="check-record">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>库存查询</el-breadcrumb-item>
              <el-breadcrumb-item>盘点记录</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="a-form-result">
        <el-table :data="tableData3" style="width: 100%" border size="medium">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="checkPersonName" label="盘点人"></el-table-column>
          <el-table-column prop="checkPersonMobile" label="手机号" width="120"></el-table-column>
          <el-table-column prop="trpUnitName" label="单位"></el-table-column>
          <el-table-column prop="createDateTimeStr" label="操作时间"></el-table-column>
          <el-table-column label="账面库存">
            <el-table-column prop="checkBeforCodeSection" label="区域码">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" style="max-width:250px;">
                  <div style="max-width:250px;">{{ scope.row.checkBeforCodeSection }}</div>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" class="hidden-box">{{ scope.row.checkBeforCodeSection }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="checkBeforNum" label="数量"></el-table-column>
          </el-table-column>
          <el-table-column label="实际库存">
            <el-table-column prop="checkAfterCodeSection" label="区域码">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" style="max-width:250px;">
                  <div style="max-width:250px;">{{ scope.row.checkAfterCodeSection }}</div>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" class="hidden-box">{{ scope.row.checkAfterCodeSection }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="checkAfterNum" label="数量"></el-table-column>
          </el-table-column>
          <el-table-column prop="inventoryProfitNum" label="盘盈"></el-table-column>
          <el-table-column prop="inventoryLossesNum" label="盘亏"></el-table-column>
          <el-table-column prop="storagePrice" label="存储单价(¥)"></el-table-column>
          <el-table-column prop="description" label="备注">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <div style="max-width:250px;">{{ scope.row.description }}</div>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" class="hidden-box">{{ scope.row.description }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="" label="操作">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <el-table :data="scope.row.checkRecordDetail" style="width: 100%">
                  <el-table-column type="index" label="序号" width="50"></el-table-column>
                  <el-table-column prop="warehouseLocationName" label="库位" width="100"></el-table-column>
                  <el-table-column prop="code" label="区域码" width="120"></el-table-column>
                  <el-table-column prop="operateTypeName" label="操作"></el-table-column>
                </el-table>
                <div slot="reference" class="name-wrapper">
                  <div>{{scope.row.codeSection}}</div>
                <el-tag size="medium">查看详情</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
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
        tableData3: []
      }
    },
    components: { NavHeader },
    mounted () { this.getInit() },
    methods: {
      getInit () {
        request.checkRecord({
          warehouseDrugId: this.$route.query.record
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

