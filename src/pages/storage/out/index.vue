<template>
  <el-container class="depot-out">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>药品出库</el-breadcrumb-item>
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
              <el-input placeholder="请输入订单编号、药品通用名称、收货人/托运人姓名等关键字查询" v-model="form.commonSearch">
                  <template slot="append">
                      <div class="search-btn liner-btn center" @click="depotOutList(0)"><i class="icon-m icon-search-11"></i>搜索</div>
                  </template>
              </el-input>
            </el-col>
            <el-col :xs="4" :sm="4" :md="8" :lg="4" :xl="6">
              <div class="search-btn liner-btn center"  @click="show=!show"><i class="icon-m icon-search-11"></i>查询</div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-show="show">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="7">
              <el-form-item label="选择日期 :" style="margin-bottom:0;">
                <el-date-picker
                  v-model="form.DateTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!--<el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="4">-->
              <!--<el-form-item label="出库状态 :" style="margin-bottom:0;">-->
                <!--<el-select v-model="form.storageStatus" placeholder="选择状态">-->
                  <!--<el-option label="已完成" value="1"></el-option>-->
                  <!--<el-option label="未完成" value="0"></el-option>-->
                  <!--<el-option label="不限" value=""></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          </el-row>
        </el-form>
      </div>
      <div class="a-form-result">
        <el-table ref="multipleTable" :data="tableData3" border style="width: 100%">
          <el-table-column width="60" type="index" label="序号" fixed="left"></el-table-column>
          <el-table-column width="150" property="ordercode" label="订单编号"></el-table-column>
          <el-table-column width="150" property="drugName" label="药品通用名称" show-overflow-tooltip="true"></el-table-column>
          <el-table-column width="100" property="drugTotalNum" label="数量(箱)"></el-table-column>
          <el-table-column width="100" property="drugTotalVolume" label="总体积(m³)"></el-table-column>
          <el-table-column width="100" property="drugTotalWeight" label="总重(kg)"></el-table-column>
          <el-table-column width="100" property="drugTotalPrice" label="总价(￥)"></el-table-column>
          <el-table-column width="110" property="sendName" label="托运人"></el-table-column>
          <el-table-column width="110" property="receiveName" label="收货人"></el-table-column>
          <el-table-column width="150" property="sendFullAreaName" label="始发地"></el-table-column>
          <el-table-column width="150" property="receiveFullAreaName" label="目的地"></el-table-column>
          <el-table-column width="150" property="warehouseName" label="仓库名称"></el-table-column>
          <el-table-column width="150" property="createDateTime" label="订单日期"></el-table-column>
          <el-table-column property="" label="操作" fixed="right">
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
  import { getLSession } from '@/utils/session'
  import { formatDateMin } from '@/utils/format'

  export default {
    data () {
      return {
        show: false,
        cId: '',
        currentPage1: 1,
        tableData3: [],
        total: 0,
        pages: '',
        form: {
          commonSearch: '',
          storageStatus: '',
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
        this.depotOutList(0)
      }
    },
    methods: {
      depotOutList (offset) {
      	console.log(999,this.form.DateTime)
      	let startCreateDateTime=''
      	let endCreateDateTime=''
      	if(this.form.DateTime){
      		startCreateDateTime=this.form.DateTime[0] ? this.form.DateTime[0] : ''
      		endCreateDateTime=this.form.DateTime[1] ? this.form.DateTime[1] : ''
      	}
        request.depotOutList({
          cId: this.cId,
          storageStatus: this.form.storageStatus,
          warehouseId: this.form.warehouseId,
          startCreateDateTime: startCreateDateTime,
          endCreateDateTime: endCreateDateTime,
          commonSearch: this.form.commonSearch,
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
        this.depotOutList(offset)
      },
      handLook (row) {
        this.$router.push({ path: '/depotOutDetails?depotOut=' + row })
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
    padding: 30px 40px 10px;
    margin-bottom: 20px;
  }
  .depot-out .search .el-col{
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
  .depot-out .el-date-editor .el-range-separator{
    width: 20px;
    padding: 0;
  }
  .depot-out .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .depot-out .a-form-result{
    padding-top: 15px;
  }

</style>

