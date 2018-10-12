<template>
  <el-container class="depot-out">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>库存查询</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="search">
        <el-form ref="form" :model="form" size="medium">
          <el-row :gutter="20">
            <el-col :span="14" style="margin-bottom:20px;">
              <el-input placeholder="请输入药品名称/批号等关键词" v-model="form.commonSearch"></el-input>
            </el-col>
            <el-col :span="6">
              <div class="search-btn liner-btn center" @click="getStockList(0)"><i class="icon-m icon-search-11"></i>查询</div>
            </el-col>
          </el-row>
          <el-form-item label="选择仓库 :" style="margin-bottom:0;">
            <el-select v-model="form.warehouseType" placeholder="选择状态">
              <el-option label="华药仓" value="1"></el-option>
              <el-option label="本地仓" value="2"></el-option>
              <el-option label="不限" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="a-form-result">
        <el-table ref="multipleTable" :data="tableData3" border style="width: 100%" v-loading="loading">
          <el-table-column width="60" type="index" label="序号" fixed="left"></el-table-column>
          <el-table-column width="140" property="drug.infoName" label="药品通用名称"></el-table-column>
          <el-table-column width="120" property="drug.infoSpecification" label="规格"></el-table-column>
          <el-table-column width="100" property="drug.infoForm" label="剂型(性状)"></el-table-column>
          <el-table-column width="90" property="drug.infoUnit" label="单位">
            <template slot-scope="scope">
              <span v-if="scope.row.drug.infoUnit == 1">盒</span>
              <span v-if="scope.row.drug.infoUnit == 2">包</span>
            </template>
          </el-table-column>
          <el-table-column width="100" property="drug.infoPrice" label="单价(￥)"></el-table-column>
          <el-table-column width="140" property="drug.trpOuterNumber" label="存储运输包装数量">
           <template slot-scope="scope">
            <span>{{scope.row.drug.trpOuterNumber}}{{scope.row.drug.trpOuterPackingUnit=='1'?'盒':'包'}}/{{scope.row.drug.trpUnit=='1'?'箱':'包'}}</span>
           </template>
          </el-table-column>
          <el-table-column width="140" property="drug.facCompanyName" label="生产企业"></el-table-column>
          <el-table-column width="120" property="drug.facBatchNumber" label="产品批号"></el-table-column>
          <el-table-column width="100" property="drug.facProducedDate" label="生产日期"></el-table-column>
          <el-table-column width="100" property="drug.facValidityDate" label="有效日期"></el-table-column>
          <el-table-column width="120" property="drug.facApprovalNumber" label="批准文号"></el-table-column>
          <el-table-column width="120" property="warehouseName" label="仓库名称"></el-table-column>
          <el-table-column width="120" property="inventoryTotal" label="库存(箱)"></el-table-column>
          <el-table-column property="" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain icon="icon-s icon-edit" @click="handLook(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="paging">
          <el-col :span="13"><div class="grid-content bg-purple">每页10行，当前第<span class="common-color">{{pages}}</span>页</div></el-col>
          <el-col :span="11">
            <div class="grid-content bg-purple">
              <el-pagination background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
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
  import { getLSession } from '@/utils/session'
  import { formatDate } from '@/utils/format'

  export default {
    data () {
      return {
        cId: '',
        currentPage1: 1,
        tableData3: [],
        total: 0,
        pages: '',
        form: {
          search: '',
          commonSearch: '',
          warehouseType: ''
        },
        loading: true
      }
    },
    components: { NavHeader },
    mounted () {
      let com = getLSession().data.org
      if (com !== '' && com !== null) {
        this.cId = com.id
      }
      this.getStockList(0)
    },
    methods: {
      getStockList (offset) {
        this.loading = true
        request.getStockList({
          cId: this.cId,
          commonSearch: this.form.commonSearch,
          warehouseType: this.form.warehouseType,
          _size: '10',
          _offset: offset
        }).then(({ data }) => {
          this.loading = false
          if (data.success) {
            let res = data.data
            res.records.forEach(item => {
              item.drug.facProducedDate = formatDate(item.drug.facProducedDate)
              item.drug.facValidityDate = formatDate(item.drug.facValidityDate)
            })
            this.tableData3 = res.records
            this.total = res.total
            this.pages = res.pages
          } else {
            this.$message.error(data.message)
          }
        })
      },
      handleSizeChange (val) {
        console.log(`${val} items per page`)
      },
      handleCurrentChange (val) {
        this.page = val
        let offset = val * 10 - 10
        this.getStockList(offset)
      },
      handLook (row) {
        console.log(row)
        console.log(row.drug.id, row.id)
        this.$router.push({path: '/drugDetails?stock=' + row.id + '&&drug=' + row.drug.id})
      }
    }
  }
</script>

<style>
  .depot-out .el-main{
  }
  .depot-out .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
  }
  .depot-out .search{
    padding: 30px 40px;
    margin-bottom: 20px;
  }
  .depot-out .search .el-input-group__append{
    padding: 0;
    background: none;
    border: none;
  }
  .depot-out .search .el-input-group__append .search-btn{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .depot-out .search .el-form-item__label{
    font-size: 16px;
    color: #000;
  }
  .depot-out .search-btn{
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
  }
  .depot-out .el-range-editor.el-input__inner{
      width: 100%;
  }
  .depot-out .el-date-editor .el-range-separator{
    width: 20px;
    padding: 0;
  }
  .depot-out .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .depot-out .el-checkbox__label{
    color: #333;
  }
  .depot-out .a-form-result{
    padding-top: 15px;
  }
</style>

