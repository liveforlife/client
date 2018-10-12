<template>
 <div class="edit-admin">
  <el-dialog title="变更主管理员"
             :visible.sync="visible"
             @close="$emit('update:show', false)"
             :show="show" width="400px">
   <div class="model-img"><img src="../../../assets/model.png" alt=""></div>
   <div class="from">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
     <el-form-item label="当前账户 : ">
      <span class="text">{{ruleForm.name}}</span>
     </el-form-item>
     <el-form-item label="手机号码 : ">
      <span class="text">{{ruleForm.mobile}}</span>
     </el-form-item>
     <el-form-item label="验证码 : " prop="yzm">
      <el-input placeholder="输入验证码" v-model="ruleForm.yzm" class="input-with-select" style="width: 100px;">
      </el-input>
     </el-form-item>
     <el-button type="info"  @click="getSms" style="position: absolute;border: 0px;bottom: 112px;right: 30px;width: 120px;" :class="getSmsContentFlag==true?'notGetAssCon':'getAssaCon'"><span style="color: #FFF;">{{getSmsContent}}</span></el-button>
    </el-form>
   </div>
   <span slot="footer" class="dialog-footer">
        <button class="admin-next" @click="next('ruleForm')">下一步<i class="icon-l icon-next-2"></i></button>
      </span>
  </el-dialog>

  <div class="admin-list">
   <el-dialog title="变更主管理员" :visible.sync="dialogAdminList" width="50%">
    <div class="content">
     <div class="search">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0" class="demo-ruleForm">
       <el-form-item label="" prop="searchName">
        <el-input placeholder="请输入姓名" v-model="ruleForm2.searchName" class="input-with-select">
         <el-button slot="append" @click="search('ruleForm2')" icon="icon-m icon-search-2">搜索</el-button>
        </el-input>
       </el-form-item>
      </el-form>
     </div>
     <el-table ref="multipleTable" :data="adminList" border style="width: 100%"
               @selection-change="handleSelectionChange">
      <el-table-column property="username" label="姓名"></el-table-column>
      <el-table-column property="mobile" label="手机号"></el-table-column>
      <el-table-column property="position" label="岗位"></el-table-column>
      <el-table-column property="rolenames" label="角色"></el-table-column>
      <el-table-column label="操作" width="100">
       <template slot-scope="scope">
        <el-button size="mini" type="success" @click="confirmEdit(scope.row)"><i class="icon-s icon-success"></i>确认</el-button>
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
   </el-dialog>
  </div>
 </div>
</template>

<!--<template>-->
 <!--<div class="edit-admin">-->
  <!--<el-dialog title="变更主管理员"-->
             <!--:visible.sync="visible"-->
             <!--@close="$emit('update:show', false)"-->
             <!--:show="show" width="400px">-->
   <!--<div class="model-img"><img src="../../../assets/model.png" alt=""></div>-->
   <!--<div class="from">-->
    <!--<div><label>当前账户：</label><span>李小志</span></div>-->
    <!--<div><label>手机号码：</label><span>{{ mobile | toTel }}</span></div>-->
    <!--<div><label>验 证 码：</label><input type="text" class="center" placeholder="请输入验证码"><button class="blur-btn">获取验证码</button></div>-->
   <!--</div>-->
   <!--<span slot="footer" class="dialog-footer">-->
        <!--<button class="admin-next" @click="editAdmin">下一步<i class="icon-l icon-next-2"></i></button>-->
      <!--</span>-->
  <!--</el-dialog>-->
 <!--</div>-->
<!--</template>-->
<script>
 import request from '@/utils/request'
 import { getLSession } from '@/utils/session'

 export default {
  props: {
   show: {
    type: Boolean,
    default: false
   }
  },
  watch: {
   show () {
    this.visible = this.show
   }
  },
  data () {
   return {
   	getSmsContent:'获取验证码',
    getSmsContentFlag:true,
    background:'#BCBCBC',
    user: '',
    currentPage1: 1,
    total: 0,
    pages: '',
    adminList: [],
    visible: this.dialogEditAdmin,
    dialogAdminList: false,
    token: '',
    ruleForm: {
     yzm: '',
     name: '',
     mobile: ''
    },
    rules: {
     yzm: [
      { required: true, message: '请输入验证码！', trigger: 'blur' }
     ]
    },
    ruleForm2: {
     searchName: ''
    },
    rules2: {
     searchName: [
      { required: true, message: '请输入名字！', trigger: 'blur' }
     ]
    }
   }
  },
  filters: {
   toTel (str) {
    let start = str.slice(0, 4)
    let end = str.slice(-2)
    return `${start}******${end}`
   }
  },
  mounted () {
   let user = getLSession().data.user

   if (user !== null && user !== '') {
    this.user = user
    this.ruleForm.name = user.username
    this.ruleForm.mobile = user.mobile
   }
  },
  methods: {
   getSms () {
   	if(this.getSmsContentFlag){
	    if (this.user.mobile) {
	     request.sendSms({
	      mobile: this.user.mobile,
	      module: 'updateAdminUser'
	     }).then(({ data }) => {
	      if (data.success) {
	       this.$message({ message: '验证码发送成功！', type: 'success' })
	       this.getSmsContentFlag=false
		 	let count=120
			var timer=window.setInterval(() =>{
				count--
				if(count>0){
					this.getSmsContent="剩余时间"+count+"s"
				}else{
					this.getSmsContent="重新获取"
					this.getSmsContentFlag=true
					window.clearInterval(timer);
				}
			},1000)
	      } else {
	       this.$message.error(data.message)
	      }
	     })
	    } else {
	     this.$message.error('未获取到当前手机号，请重新登陆！')
	    } 		
   	}else{
   		this.$message.error('距离上次验证时间未到两分钟')
   	}
   },
   next (formName) {
    this.$refs[formName].validate((valid) => {
     if (valid && this.ruleForm.mobile) {
      console.log(11,{
       mobile: this.ruleForm.mobile,
       module: 'updateAdminUser',
       code: this.ruleForm.yzm
      })
      request.checkSms({
       mobile: this.ruleForm.mobile,
       module: 'updateAdminUser',
       code: this.ruleForm.yzm
      }).then(({ data }) => {
       if (data.success) {
        this.$message({ message: '手机号验证成功！', type: 'success' })
        this.dialogAdminList = true
        this.token = data.data.token
        this.accountList(0)
       } else {
        this.$message.error(data.message)
       }
      })
     } else {
      return false
     }
    })
   },
   closeModule () {
    this.$emit('update:show', false)
   },
   accountList (offset) {
    if (this.user.cid) {
     request.searAccount({
      cid: this.user.cid,
      roleids: '',
      disable: '-1',
      deleteFlag: '-1',
      _size: '10',
      name: this.ruleForm2.searchName,
      _offset: offset
     }).then(({ data }) => {
      if (data.success) {
       let res = data.data
       this.adminList = res.records
       this.total = res.total
       this.pages = res.pages
      } else {
       this.$message.error(data.message)
      }
     })
    }
   },
   handleSelectionChange (val) {
    this.multipleSelection = val
   },
   confirmEdit (row) {
    if (this.token) {
     console.log(11 ,{
      cid: this.user.cid,
      mobile: this.user.mobile,
      token: this.token,
      newAdminId: row.id
     })

     request.updateAdmin({
      cid: this.user.cid,
      mobile: this.user.mobile,
      token: this.token,
      newAdminId: row.id
     }).then(({ data }) => {
      console.log(22,data)
      if (data.success) {
       this.$message({ message: data.message, type: 'success' })
       this.closeModule()
       this.dialogAdminList = false
       this.$router.back(-1)
      } else {
       this.$message.error(data.message)
      }
     })
    } else {
     this.$message.error('手机号验证已失效！')
    }
   },
   handleSizeChange (val) {
    console.log(`${val} items per page`)
   },
   handleCurrentChange (val) {
    this.page = val
    let offset = val * 10 - 10
    this.accountList(offset)
   },
   search (formName) {
    this.$refs[formName].validate((valid) => {
     if (valid && this.ruleForm.mobile) {
      this.accountList(0)
     }
    })
   }
  }
 }
</script>
<style>
	.getAssaCon{
		background-color: #BCBCBC;
	}
	.notGetAssCon{
		background-color: #69b8fa;
	}
</style>