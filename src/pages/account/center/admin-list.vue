<template>
  <div class="admin-list">
    <el-dialog title="变更主管理员" :visible.sync="dialogAdminList" width="780px">
      <div class="content">
        <div class="search">
          <input type="text" placeholder="请输入姓名" class="center">
          <button class="blur-btn"><i class="icon-m icon-search-2"></i>搜索</button>
        </div>
        <template>
          <el-table
            ref="multipleTable"
            :data="adminList"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column property="name" label="姓名" width="90"></el-table-column>
            <el-table-column property="mobile" label="手机号" width="120"></el-table-column>
            <el-table-column property="position" label="岗位" width="80"></el-table-column>
            <el-table-column property="companyName" label="公司名称" show-overflow-tooltip></el-table-column>
            <el-table-column property="role" label="角色" width="110"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)"><i class="icon-s icon-success"></i>确认</el-button>
                </template>
            </el-table-column>
          </el-table>         
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['dialogAdminList'],
    data () {
      return {
        adminList: [
          {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }, {
            name: 'XXX',
            mobile: '15899562258',
            position: '销售',
            companyName: 'EEEEEEEE',
            role: '专线主管理员'
          }
        ]
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        console.log(index, row)
        this.$router.push({ path: '/account-edit' })
      }
    }
  }
</script>
