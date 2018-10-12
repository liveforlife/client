<template>
  <el-container class="account account-search">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>账户管理</el-breadcrumb-item>
              <el-breadcrumb-item>账户查询</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
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
    <el-main>
      <div style="height:120px;padding-top:10px;">
      <el-row style="height:50px;">
        <el-form>
         <el-col :span="6">
          <el-form-item label="    角色：">
           <el-select v-model="roleFlag" placeholder="请选择">
            <el-option
             v-for="item in roleList"
             :key="item.value"
             :label="item.label"
             :value="item.value"></el-option>
           </el-select>
          </el-form-item>
         </el-col>
          <el-col :span="6">
            <el-form-item label="    禁用登录：">
              <el-select v-model="disable" placeholder="请选择">
                <el-option
                  v-for="item in disableList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="    注销状态：">
              <el-select v-model="deleteFlag" placeholder="请选择">
                <el-option
                  v-for="item in deleteList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
              </el-form-item>
            </el-col>
           <el-col :span="6">
            <div class="grid-content bg-purple"><div class="search-btn liner-btn center" @click="accountList(0)"><i class="icon-m icon-search-11"></i>查询</div></div>
           </el-col>
          </el-form>
      </el-row>
      </div>
      <div class="a-form-result">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column type="index" label="序号" width="60px"></el-table-column>
          <el-table-column property="username" label="姓名" ></el-table-column>
          <el-table-column property="mobile" label="手机号码" ></el-table-column>
          <el-table-column property="rolenames" label="角色"></el-table-column>
          <el-table-column property="position" label="岗位"></el-table-column>
          <el-table-column property="companyName" label="公司名称"></el-table-column>
          <el-table-column property="" label="禁用状态">
            <template slot-scope="scope">
              <span v-if="scope.row.disable === 1" style="color: #fea014">禁止登陆</span>
              <span v-if="scope.row.disable === 0 && scope.row.deleteFlag === 0" style="color: #2fb9b3">允许登录</span>
            </template>
          </el-table-column>
           <el-table-column property="" label="注销状态">
            <template slot-scope="scope">
              <span v-if="scope.row.deleteFlag === 1" style="color: #fea014">已注销</span>
              <span v-if="scope.row.deleteFlag === 0 && scope.row.deleteFlag === 0" style="color: #2fb9b3">未注销</span>
            </template>
          </el-table-column>
          <el-table-column property="createDateTime" label="新建日期" ></el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain icon="icon-s icon-edit" @click="handleEdit(scope.row)">查看</el-button>
              <template v-if="scope.row.deleteFlag===1">
                <el-button size="mini" type="success" plain icon="icon-s icon-prohibit" disabled>账户启用</el-button>
                <el-button size="mini" type="danger" plain icon="icon-s icon-cancel-2" disabled>注销</el-button>
              </template>
              <template v-else>
                <el-button size="mini" type="warning" plain icon="icon-s icon-prohibit" v-if="scope.row.disable===0" @click="handToggle('stop', scope.row)">禁止登陆</el-button>
                <el-button size="mini" type="success" plain icon="icon-s icon-prohibit" v-if="scope.row.disable===1" @click="handToggle('start', scope.row)">账户启用</el-button>
                <el-button size="mini" type="danger" plain icon="icon-s icon-cancel-2" v-if="scope.row.deleteFlag===0"  @click="handToggle('close', scope.row)">注销</el-button>
              </template>
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
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
import NavHeader from "@/components/nav-header";
import request from "@/utils/request";
import { getLSession } from "@/utils/session";
import { formatDate } from "@/utils/format";

export default {
  data() {
    return {
      info: getLSession().data.org,
      checkList: [],
      role: [],
      currentPage1: 1,
      tableData3: [],
      total: 0,
      pages: "",
      content: "",
      caozuo: "",
      rowData: {},
      disable: "",
      deleteFlag: "",
      centerDialogVisible: false,
      roleFlag:"",
      roleList:[{
       value:"",
       label:'不限'
      },{
       value:'201',
       label:"订单管理员"
      },{
       value:'202',
       label:'仓库管理员'
      },{
       value:'203',
       label:'财务管理员'
      }],
      disableList: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "1",
          label: "禁用"
        },
        {
          value: "0",
          label: "启用"
        }
      ],
      deleteList: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "1",
          label: "注销"
        },
        {
          value: "0",
          label: "未注销"
        }
      ]
    };
  },
  components: {
    NavHeader
  },
  mounted() {
    this.getRole();
    this.accountList(0);
  },
  methods: {
    getRole() {
      if (this.info.id) {
        request.getComRole({ companyId: this.info.id }).then(({ data }) => {
          if (data.success) {
            this.role = data.data;
          } else {
            this.$message.error(data.message);
          }
        });
      } else {
        this.$message.error("获取角色信息出错！");
      }
    },
    accountList(offset) {
      console.log(this.checkList);
      if (this.info.id) {
        request
          .searAccount({
            cid: this.info.id,
            roleids: this.roleFlag,
            disable: this.disable,
            deleteFlag: this.deleteFlag,
            _size: "10",
            name: "",
            _offset: offset
          })
          .then(({ data }) => {
            if (data.success) {
              let res = data.data;
              res.records.forEach(item => {
                item.createDateTime = formatDate(item.createDateTime);
              });
              this.tableData3 = res.records;
              this.total = res.total;
              this.pages = res.pages;
            } else {
              this.$message.error(data.message);
            }
          });
      }
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      this.page = val;
      let offset = val * 10 - 10;
      this.accountList(offset);
    },
    handleEdit(row) {
      this.$router.push({
        path: "/accountInfo?account=" + row.id + "&company=" + row.cid
      });
    },
    handToggle(caozuo, row) {
      switch (caozuo) {
        case "start":
          this.content = "确定要启用该账户吗？";
          break;
        case "stop":
          this.content = "确定要禁止登录该账户吗？";
          break;
        case "cancel":
          if (row.disable !== 1) {
            this.content = "请先禁止登录该账户再注销！";
          } else {
            this.content = "确定要注销该账户吗？";
          }
          break;
      }
      this.centerDialogVisible = true;
      this.rowData = row;
      this.caozuo = caozuo;
    },
    confirm() {
      switch (this.caozuo) {
        case "start":
          this.userDisable(false, this.rowData.id);
          break;
        case "stop":
          this.userDisable(true, this.rowData.id);
          break;
        case "close":
          if (this.rowData.disable !== 1) {
            this.centerDialogVisible = false;
          } else {
            this.userLogout(true, this.rowData);
          }
          break;
      }
      this.centerDialogVisible = false;
      this.caozuo = "";
    },
    userDisable(state, row) {
      request
        .userDisable({
          userid: row,
          disable: state
        })
        .then(({ data }) => {
          let info = "账户启用成功！";
          if (data.success) {
            if (state === true) {
              info = "账户禁止登陆成功！";
              this.rowData.disable = 1;
            } else {
              this.rowData.disable = 0;
            }
            this.rowData = "";
            this.$message({ message: info, type: "success" });
          } else {
            this.$message.error(data.message);
          }
        });
    },
    userLogout(state, row) {
      request
        .userLogout({
          userid: row.id,
          disable: true
        })
        .then(({ data }) => {
          if (data.success) {
            this.$message({ message: "账户注销成功！", type: "success" });
            this.rowData.deleteFlag = 1;
            this.rowData = "";
          } else {
            this.$message.error(data.message);
          }
        });
    }
  }
};
</script>

<style>
.account-search .el-main {
}
.account-search .el-main > div {
  box-shadow: 0 0px 8px #d9dde2;
  border-radius: 4px;
  overflow: hidden;
}
.account-search .search {
  height: 90px;
  line-height: 90px;
  margin-bottom: 20px;
}
.account-search .search-btn {
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-left: 20px;
}
.el-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.account-search .el-checkbox__label {
  color: #333;
}
</style>
