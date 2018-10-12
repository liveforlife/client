<template>
  <el-container class="account account-search">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>个人中心</el-breadcrumb-item>
              <el-breadcrumb-item>通讯录</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="search">
        <el-row class="search-btn" style="width:650px;height:50px;padding: 0 20px;">
          <el-input placeholder="按“姓名、电话、地址、公司名称”搜索" v-model="conForms.likeStr"  :clearable="true" class="input-with-select" style="width:500px;">
            <el-button slot="append" type="primary" class='button_append_search liner-btn' icon="el-icon-search" @click="searchKeword()">搜索</el-button>
          </el-input>

        </el-row>
      </div>
      <div class="a-form-result">
        <div class="add-btn">
          <router-link class="liner-btn center" to="/contactsEdit"><i class="icon-m icon-add-5"></i>新建联系人</router-link>
        </div>
        <p style="height:30px"></p>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column type="index" label="序号" width="60px"></el-table-column>
          <el-table-column property="companyName" label="公司名称" ></el-table-column>
          <el-table-column property="name" label="姓名" ></el-table-column>
          <el-table-column property="mobile" label="手机号码"></el-table-column>
          <el-table-column property="phone" label="座机号码"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain icon="icon-s icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" plain icon="icon-s icon-del" @click="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="操作提示"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <div style="font-size:16px;text-align:center;">{{ content }}</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="confirmDel()">确定</el-button>
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
        info: getLSession().data.org,
        conForms: {
          cid: '',
          likeStr: ''
        },
        checkList: [],
        role: [],
        currentPage1: 1,
        tableData3: [],
        total: 0,
        pages: '',
        content: '',
        caozuo: '',
        rowData: {},
        centerDialogVisible: false
      }
    },
    components: {
      NavHeader
    },
    mounted () {
      this.list(0)
    },
    methods: {
      list(offset) {
        let conForms = {
          cid: this.info.id,
           likeStr: this.conForms.likeStr,
          _size:  '10',
          _offset: offset
        }
         if (this.info.id) {
          request.listConstacts(conForms).then(({ data }) => {
            if (data.success) {
              let res = data.data
              res.records.forEach(item => {
                item.createDateTime = formatDate(item.createDateTime)
              })
              this.tableData3 = res.records
              this.total = res.total
              this.pages = res.pages
            } else {
              this.$message.error(data.message)
            }
          })
        }
      },
      handleSizeChange (val) {
        console.log(`${val} items per page`)
      },
      handleCurrentChange (val) {
        this.page = val
        let offset = val * 10 - 10
        this.list(offset)
      },
      searchKeword(){
        this.list();
      },
      handleEdit(row){
         this.$router.push({ path: '/contactsEdit?id=' + row.id  })
      },
      handleDel(row){
        this.content = '确定要删除[' + row.name+ ']联系人吗,删除后不可恢复？'
        this.centerDialogVisible = true
        this.rowData = row;
      },
      confirmDel(){
        request.delConstacts({
          id: this.rowData.id
        }).then(({data}) => {
          this.centerDialogVisible = false
          if (data.success === true) {
            this.list(0);
            this.$message({
              message: data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .add-btn{
    position: relative;
    height: 20px;
  }
  .add-btn .liner-btn{
    width: 100px;
    height: 34px;
    line-height: 34px;
    position: absolute;
    top: 0;
    right: 5%;
  }
  .account-search .el-main{
  }
  .account-search .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    border-radius: 4px;
    overflow: hidden;
  }
  .account-search .search{
    height: 90px;
    line-height: 90px;
    margin-bottom: 20px;
  }
  .account-search .search-btn{
    width: 100px;
    height: 36px;
    line-height: 36px;
    margin-top: 26px;
  }
  .el-col{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .account-search .el-checkbox__label{
    color: #333;
  }
</style>
