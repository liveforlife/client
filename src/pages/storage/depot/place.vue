<template>
  <el-container class="place-list">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
              <el-breadcrumb-item>仓库查询</el-breadcrumb-item>
              <el-breadcrumb-item>库位列表</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="a-form-result">
        <div class="add-btn">
          <div class="liner-btn center" @click="addPlece=true,content='新增库位'"><i class="icon-m icon-add-5"></i>新建库位</div>
        </div>
        <p class="list-title">库位列表 - <span>({{deppotName}})</span></p>
        <el-table ref="multipleTable" :data="tableData3" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column property="locationName" label="库位名称"></el-table-column>
          <el-table-column property="description" label="备注"></el-table-column>>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="editToggle(scope.row)" icon="icon-s icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" plain @click="deleteToggle(scope.row)" icon="icon-s icon-cancel-2">删除</el-button>
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
     <button  class="liner-btn center returnBtn" @click="$router.go(-1)">返回</button>
    </el-main>
    <el-dialog title='' :visible.sync="addPlece" width="40%" center>
      <div class="module-title">{{content}}</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="medium" status-icon>
        <el-form-item label="库位名称 : " prop="locationName">
          <el-col :span="18">
            <el-input v-model="ruleForm.locationName" placeholder="请输入库位名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备 注 : " prop="description">
          <el-col :span="18">
            <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="ruleForm.description">
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd('ruleForm')">取消</el-button>
        <el-button type="danger" @click="addPleceConfrim('ruleForm')" v-show="!showBtn">确定</el-button>
        <el-button type="danger" @click="editPleceConfrim('ruleForm')" v-show="showBtn">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除提示" :visible.sync="centerDialogVisible" width="40%" center>
      <div style="font-size:16px;text-align:center;">确定要删除该库位吗？</div>
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

  export default {
    data () {
      return {
        deppotName: this.$route.query.depotName,
        total: 0,
        pages: '',
        page: '1',
        currentPage1: 1,
        addPlece: false,
        centerDialogVisible: false,
        showBtn: false,
        content: '',
        delId: '',
        tableData3: [],
        ruleForm: {
          warehouseId: '',
          locationName: '',
          description: ''
        },
        rules: {
          locationName: [
            { required: true, message: '请输入库位名称！', trigger: 'blur' }
          ]
//        ,
//        description: [
//          { required: true, message: '请输入库位备注！', trigger: 'blur' }
//        ]
        }
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
        if (this.$route.query.depot) {
          this.ruleForm.warehouseId = this.$route.query.depot
          request.depotPlaceList({
            warehouseId: this.$route.query.depot,
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
        } else {
          this.$message.error('库位列表加载失败！')
        }
      },
      addPleceConfrim (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.depotPlaceAdd(this.ruleForm).then(({ data }) => {
              if (data.success) {
                this.$message({ message: '新增库位成功！', type: 'success' })
                this.init(0)
                this.cancelAdd(formName)
                this.addPlece = false
              } else {
                this.$message.error(data.message)
              }
            })
          }
        })
      },
      editToggle (row) {
        this.addPlece = true
        this.showBtn = true
        this.content = '编辑库位'
        request.getDepotPlaceInfo({id: row.id}).then(({ data }) => {
          if (data.success) {
            let res = data.data
            this.ruleForm = {
              warehouseId: res.id,
              locationName: res.locationName,
              description: res.description
            }
          } else {
            this.$message.error('库位信息获取失败！')
          }
        })
      },
      editPleceConfrim (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.updateDepotPlace({
              id: this.ruleForm.warehouseId,
              locationName: this.ruleForm.locationName,
              description: this.ruleForm.description
            }).then(({ data }) => {
              if (data.success) {
                this.$message({ message: '编辑库位成功！', type: 'success' })
                this.cancelAdd(formName)
                this.addPlece = false
                this.showBtn = false
                this.init(0)
              } else {
                this.$message.error(data.message)
              }
            })
          }
        })
      },
      deleteToggle (row) {
        this.centerDialogVisible = true
        this.delId = row.id
      },
      confirm () {
        request.depotPlaceDel({id: this.delId}).then(({ data }) => {
          if (data.success) {
            this.$message({ message: '删除库位成功！', type: 'success' })
            this.centerDialogVisible = false
            this.delId = ''
            this.init(0)
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
        this.init(offset)
      },
      cancelAdd (formName) {
        this.$refs[formName].resetFields()
        this.addPlece = false
      }
    }
  }
</script>

<style>
 .place-list .returnBtn{
  display: block;
  width: 100px;
  height: 34px;
  margin: auto;
 }
  .place-list .el-main{
    overflow: visible;
  }
  .place-list .el-main>div{
    box-shadow: 0 0px 8px #d9dde2;
    margin-bottom: 70px;
    border-radius: 4px;
  }
  .place-list .a-form-result{
    padding-top: 24px;
  }
  /* result */
  .place-list .add-btn{
    position: relative;
    height: 20px;
  }
  .place-list .add-btn .liner-btn{
    width: 100px;
    height: 34px;
    line-height: 34px;
    position: absolute;
    top: 0;
    right: 5%;
  }
  .place-list .list-title{
    padding-left:20px;
    height:36px;
    line-height:30px;
  }
  .place-list .el-dialog__body{
    padding-top: 0;
  }
  .place-list .module-title{
    color: #000000;
    font-size: 18px;
    text-align: center;
    margin-bottom: 30px;
  }
</style>

