<template>
  <el-container class="depot-list">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
              <el-breadcrumb-item>仓库查询</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="a-form-result">
        <div class="add-btn">
          <router-link class="liner-btn center" to="/depotAdd"><i class="icon-m icon-add-5"></i>新建仓库</router-link>
        </div>
        <p class="list-title">仓库查询</p>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column property="warehouseNo" label="仓库编号"></el-table-column>
          <el-table-column property="warehouseName" label="仓库名称"></el-table-column>
          <!-- <el-table-column property="cName" label="公司名称"></el-table-column> -->
          <el-table-column property="cName" label="联系人">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <div v-for="(item,index) in scope.row.warehouseKeeperList" :key="index" class="popover">
                  {{ item.uName }} : {{ item.uPhone }}
                </div>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">点击查看</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="postalAddress" label="通讯地址"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="handleToggle(scope.row)" icon="icon-s icon-edit">编辑</el-button>
              <el-button size="mini" type="info" plain @click="handlePlace(scope.row)" icon="el-icon-search">库位</el-button>
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
    <el-dialog
      title="操作提示"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <div style="font-size:16px;text-align:center;">{{ content }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirm()">确定</el-button>
      </span>
    </el-dialog>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import request from '@/utils/request'
  import { getLSession } from '@/utils/session'

  export default {
    data () {
      return {
        total: 0,
        pages: '',
        page: '1',
        editStatus: {},
        currentPage1: 1,
        centerDialogVisible: false,
        caozuo: '',
        content: '',
        tableData3: [],
        multipleSelection: []
      }
    },
    components: {
      NavHeader
    },
    mounted () {
      this.init(0)
    },
    methods: {
      init (offset) {
        var com = getLSession().data.org
        if (com !== null && com !== '') {
          request.depotList({
            cId: com.id,
            _size: '10',
            _offset: offset
          }).then(({ data }) => {
            if (data.success) {
              let res = data.data
              this.tableData3 = res.records
              this.total = res.total
              this.pages = res.pages
            } else {
              if (data.message) {
                this.$message.error(data.message)
              }
            }
          })
        }
      },
      handleToggle (row) {
        this.$router.push({ path: '/depotEdit?depot=' + row.id })
      },
      handlePlace (row) {
        this.$router.push({ path: '/placeList?depot=' + row.id + '&&depotName=' + row.warehouseName })
      },
      handleSizeChange (val) {
        console.log(`${val} items per page`)
      },
      handleCurrentChange (val) {
        this.page = val
        let offset = val * 10 - 10
        this.init(offset)
      },
      openSuccees (info) {
        this.$message({ message: info, type: 'success' })
      },
      openFalse (info) {
        this.$message.error(info)
      }
    }
  }
</script>

<style>
  .depot-list .el-main{
  }
  .depot-list .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    margin-bottom: 70px;
    border-radius: 4px;
  }
  .depot-list .a-form-result{
    padding-top: 24px;
  }
  /* result */
  .depot-list .add-btn{
    position: relative;
    height: 20px;
  }
  .depot-list .add-btn .liner-btn{
    width: 100px;
    height: 34px;
    line-height: 34px;
    position: absolute;
    top: 0;
    right: 5%;
  }
  .depot-list .list-title{
    padding-left:20px;
    height:36px;
    line-height:26px;
  }
  .depot-list .el-popover .popover{
    height: 40px;
    line-height: 40px;
  }
  .depot-list .el-popover .popover>span{
    color: #333333;
  }
  .depot-list .el-tag{
    cursor: pointer;
  }
</style>

