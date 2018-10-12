<template>
  <el-container class="depot-perfect">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓储管理</el-breadcrumb-item>
              <el-breadcrumb-item>完善药品信息</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="a-form-result">
        <div class="depot-perfect-title">确认入库信息</div>
        <el-table ref="multipleTable" :data="tableData3" border style="width: 100%">
          <el-table-column  width="60px" type="index" label="序号"></el-table-column>
          <el-table-column width="90px" property="indepotNum" label="药品编号"></el-table-column>
          <el-table-column width="120px" property="drugsName" label="药品通用名称"></el-table-column>
          <el-table-column width="120px" property="drugsName" label="药品商品名"></el-table-column>
          <el-table-column width="100px" property="drugsName" label="规格"></el-table-column>
          <el-table-column width="100px" property="drugsName" label="剂型(性状)"></el-table-column>
          <el-table-column width="60px" property="drugsName" label="单位"></el-table-column>
          <el-table-column width="80px" property="drugsName" label="单价(￥)"></el-table-column>
          <el-table-column width="100px" property="drugsName" label="是否原料药"></el-table-column>
          <el-table-column width="100px" property="drugsName" label="是否处方药"></el-table-column>
          <el-table-column width="140px" property="drugsName" label="生产企业"></el-table-column>
          <el-table-column width="140px" class="color1" property="drugsName" label="生产日期"></el-table-column>
          <el-table-column width="100px" class="color1" property="drugsName" label="有效期"></el-table-column>
          <el-table-column width="100px" class="color1" property="drugsName" label="产品批号"></el-table-column>
          <el-table-column width="100px" class="color1" property="drugsName" label="批准文号"></el-table-column>
          <el-table-column width="140px" class="color2" property="drugsName" label="包装规格(内包装)"></el-table-column>
          <el-table-column width="140px" class="color2" property="drugsName" label="运输/存储包装数量"></el-table-column>
          <el-table-column width="170px" class="color2" property="drugsNum" label="运输/存储包装单价(￥)"></el-table-column>
          <el-table-column width="140px" class="color2" property="adminUserMobile" label="运输/存储包装单位"></el-table-column>
          <el-table-column width="160px" class="color2" property="createDateTime" label="包装尺寸"></el-table-column>
          <el-table-column width="80px" class="color2" property="createDateTime" label="包装体积"></el-table-column>
          <el-table-column width="110px" class="color2" property="createDateTime" label="包装重量(kg)"></el-table-column>
          <el-table-column width="100px" class="color2" property="createDateTime" label="贮藏"></el-table-column>
          <el-table-column width="140px" class="color1" property="createDateTime" label="仓库名称"></el-table-column>
          <el-table-column width="100px" class="color1" property="createDateTime" label="库位"></el-table-column>
          <el-table-column width="120px" class="color1" property="createDateTime" label="存储数量（箱）"></el-table-column>
          <el-table-column width="120px" class="color1" property="createDateTime" label="区域码"></el-table-column>
          <el-table-column width="120px" class="color1" property="createDateTime" label="金额(￥)"></el-table-column>
          <el-table-column width="80px" property="" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" icon="icon-bin" @click="handDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="操作提示"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <div style="font-size:16px;text-align:center;">确定要删除这条信息吗？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="confirm()">确定</el-button>
          </span>
        </el-dialog>
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
      <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:60px;background:none;box-shadow:none;width:70%;margin:50px auto 0;">
        <el-col :span="4">
          <div class="save-btn liner-btn" style="width:90px;height:39px;" @click="submitForm('ruleForm')"><i class="icon-s icon-depot-in"></i>入库</div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="icon-s icon-next-left" size="medium" plain>继续添加</el-button>
        </el-col>
        <el-col :span="4"><router-link to="/memberList"><el-button size="medium" plain type="info" icon="icon-s icon-cancel-1">取消</el-button></router-link></el-col>
      </el-row>
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  // import request from '@/utils/request'
  // import { getLSession } from '@/utils/session'
  // import { formatDate } from '@/utils/format'

  export default {
    data () {
      return {
        centerDialogVisible: false,
        currentPage1: 1,
        tableData3: [],
        total: 0,
        pages: ''
      }
    },
    components: {
      NavHeader
    },
    mounted () {
    },
    methods: {
      handleSizeChange (val) {
        console.log(`${val} items per page`)
      },
      handleCurrentChange (val) {
        this.page = val
        let offset = val * 10 - 10
        this.memberList(offset)
      },
      handDel (row) {
        // this.$router.push({ path: '/memberDetails?member=' + row.id })
      },
      confirm () {}
    }
  }
</script>

<style>
  .depot-perfect .el-main{
    padding-right: 0;
  }
  .depot-perfect .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
  }
  .depot-perfect .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .depot-perfect .el-checkbox__label{
    color: #333;
  }
  .depot-perfect .a-form-result{
    padding-top: 15px;
  }
  .depot-perfect .depot-perfect-title{
    color: #6d6d6d;
    line-height: 40px;
    padding-left: 15px;
  }
  .depot-perfect .a-form-result .color1{
    background: #ffe8e7;
  }
  .depot-perfect .a-form-result .color2{
    background: #e0efd8;
  }
</style>

