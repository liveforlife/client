<template>
<el-container>
		<el-header>
			
		</el-header>
		<el-main>
            <el-row style="margin-bottom:20px;padding:20px">
                <ei-row>
                    <el-button type="primary">新增</el-button>
                </ei-row>
                <el-row style="margin-top:10px">
                    <el-form :inline="true" :model="selectDepartmentForm" ref="selectForm">
						<el-row :span="24">
							<el-col :span="6">
								<el-form-item label="机构名字">
									<el-input v-model="selectDepartmentForm.instName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="部门名称">
									<el-input v-model="selectDepartmentForm.deptName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="部门负责人">
									<el-input v-model="selectDepartmentForm.director"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click="selectDepartmentList">查询</el-button>
								<el-button type="primary" @click="clearDepartmentForm">重置</el-button>
							</el-col>
						</el-row>
					</el-form>	
                </el-row>
            </el-row>
            <el-row>
                <el-table :data="departmentList">
                    <el-table-column prop="instName" label="机构"></el-table-column>
                    <el-table-column prop="parDeptName" label="上级路由"></el-table-column>
                    <el-table-column prop="deptName" label="部门名称"></el-table-column>
                    <el-table-column prop="deptEmpAcct" label="负责人"></el-table-column>
                    <el-table-column prop="deptDesc" label="描述"></el-table-column>
                    <el-table-column  label="操作">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="reviseDepaertment(scope.row)">修改</el-button>
                            <el-button type="danger" size="mini" @click="deleteDepaertment(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
             <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[15]"
                :page-size="15"
                layout="total, sizes, prev, pager, next"
                :total="total">
                </el-pagination>
            </div>
		</el-main>
</el-container>
   
</template>
<script>
import request from '@/utils/request'
  export default {
    data() {
      return {
        departmentList:[],
        selectDepartmentForm:{
            instName:'',
            deptName:'',
            director:'',
            pageNum:0,
			pageSize:15
        },
        total:''
      };
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.selectDepartmentList()
        },
        selectDepartmentList(){
            request.getDeptList(this.selectDepartmentForm).then(({data}) =>{
                if(data.success){
                    this.departmentList=data.data.list
                    this.total=data.data.total
                }
            })
        },
        clearDepartmentForm(){
            this.selectDepartmentForm.instName=''
            this.selectDepartmentForm.deptName=''
            this.selectDepartmentForm.director=''            
        },
        reviseDepaertment(val){

        },
        deleteDepaertment(val){
            request.deleteDept({deptId:val.deptId}).then(({data})=>{
                if(data.success){
					this.selectDepartmentList()
                    this.$message.success(data.message)
                }else{
                    this.$message.error(data.message)
                }
            })
        },
        handleSizeChange(val){
            this.selectDepartmentForm.pageSize=val
            this.init()
        },
        handleCurrentChange(val){
            this.selectDepartmentForm.pageNum=val
            this.init()
        }
    }
  };
</script>
<style>
.block{
    text-align: right;
    padding: 20px 0px
}
</style>
