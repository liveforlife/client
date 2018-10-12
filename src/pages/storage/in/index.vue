<template>
  <el-container class="depot-in">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>药品入库</el-breadcrumb-item>
              <el-breadcrumb-item>列表查询</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="search">
        <el-form ref="form" :model="form">
          <el-row :gutter="20">
            <el-col :xs="20" :sm="20" :md="16" :lg="14" :xl="10">
              <el-input placeholder="请输入入库编号、药品通用名称等关键字查询" v-model="form.commonSearch">
                  <template slot="append">
                      <div class="search-btn liner-btn center" @click="depotInList(0)"><i class="icon-m icon-search-11"></i>搜索</div>
                  </template>
              </el-input>
            </el-col>
            <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="6">
              <div class="search-btn liner-btn center" @click="show = !show"><i class="icon-m icon-search-11"></i>高级检索</div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-show="show">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="7">
              <el-form-item label="选择日期 :" style="margin-bottom:0;">
                <el-date-picker
                  v-model="form.DateTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="4">
              <el-form-item label="选择仓库 :" style="margin-bottom:0;">
                <el-select v-model="form.warehouseId" placeholder="选择仓库">
                  <el-option v-for="(item,index) in depotList" :key="index" :label="item.warehouseName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="a-form-result">
        <el-table ref="multipleTable" :data="tableData3" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column property="storageOrderSn" label="入库编号"></el-table-column>
          <el-table-column property="drugName" label="药品通用名称" show-overflow-tooltip="true"></el-table-column>
         <el-table-column property="drugTotalNum" label="数量(箱)"></el-table-column>
          <el-table-column property="drugTotalVolume" label="总体积(m³)"></el-table-column>
          <el-table-column property="drugTotalWeight" label="总重(kg)"></el-table-column>
          <el-table-column property="drugTotalPrice" label="总价(￥)"></el-table-column>
          <el-table-column property="warehouseName" label="仓库名称"></el-table-column>
          <el-table-column property="createDateTime" label="入库日期" width="150"></el-table-column>
          <el-table-column property="" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain icon="icon-s icon-edit" @click="handLook(scope.row.id)">查看</el-button>
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
  import { getLSession,setDrugsDetails } from '@/utils/session'
  import { formatDateMin } from '@/utils/format'

  export default {
    data () {
      return {
        show: false,
        currentPage1: 1,
        tableData3: [],
        depotList: [],
        cId: '',
        total: 0,
        pages: '',
        form: {
          commonSearch: '',
          warehouseId: '',
          DateTime: ''
        }
      }
    },
    components: {
      NavHeader
    },
    mounted () {
      let com = getLSession().data.org
      if (com.id) {
        this.cId = com.id
        this.getDepotList()
        this.depotInList(0)
      }
    },
    methods: {
      getDepotList () {
        request.depotList({
          cId: this.cId,
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
      depotInList (offset) {
        request.depotInList({
          cId: this.cId,
          commonSearch: this.form.commonSearch,
          warehouseId: this.form.warehouseId,
          startCreateDateTime: this.form.DateTime[0] ? this.form.DateTime[0] : '',
          endCreateDateTime: this.form.DateTime[1] ? this.form.DateTime[1] : '',
          _size: '10',
          _offset: offset
        }).then(({ data }) => {
          if (data.success) {
            let res = data.data
            res.records.forEach(item => {
              item.createDateTime = formatDateMin(item.createDateTime)
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
        this.depotInList(offset)
      },
      handLook (row) {
        this.$router.push({ path: '/depotInDetails?depotIn=' + row })
      }
    }
  }
</script>

<style>
  .depot-in .el-main{
  }
  .depot-in .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
  }
  .depot-in .search{
    padding: 30px 40px 10px;
    margin-bottom: 20px;
  }
  .depot-in .search .el-col{
    margin-bottom: 20px;
  }
  .depot-in .search .el-input-group__append{
    padding: 0;
    background: none;
    border: none;
  }
  .depot-in .search .el-input-group__append .search-btn{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .depot-in .search .el-form-item__label{
    font-size: 16px;
    color: #000;
  }
  .depot-in .search-btn{
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
  }
  .depot-in .el-date-editor .el-range-separator{
    width: 20px;
    padding: 0;
  }
  .depot-in .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .depot-in .a-form-result{
    padding-top: 15px;
  }
  .blueText {
   color: dodgerblue;
   text-decoration: underline;
   cursor: pointer;
  }
</style>

