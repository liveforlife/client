<template>
<el-container>
		<el-header>
			
		</el-header>
		<el-main>
            <el-row>
                <el-button type="primary">新增</el-button>
            </el-row>
            <el-row>

            </el-row>
            <el-row>
                <el-table :data="EmployeeList">
                    <el-table-column prop="instName" label="机构"></el-table-column>
                    <el-table-column  label="头像">
                        <template slot-scope="scope">
                            <img :src="scope.row.empAvatar"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="empName" label="姓名"></el-table-column>
                    <el-table-column prop="empAcct" label="账号"></el-table-column>
                    <el-table-column prop="" label="性别">
                        <template slot-scope="scope">
                            {{scope.row.empSex == 1 ?'男':'女'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="empPhone" label="联系方式"></el-table-column>
                    <el-table-column prop="empBirthDate" label="生日"></el-table-column>
                    <el-table-column prop="" label="状态">
                        <template slot-scope="scope">
                            {{scope.row.empStatus == 0 ?'启用':'禁用'}}
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作">
                        <template slot-scope="scope">
                            <el-row class="emploDiv" style="display: flex;flex-direction: row;flex-wrap:wrap">
                                <el-button type="primary" size="mini">详情</el-button>
                                <el-button type="warning" size="mini">修改</el-button>
                                <el-button type="danger" size="mini">删除</el-button>
                            </el-row>
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
        EmployeeList:[],
        selectEmployeeForm:{
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
            request.getEmployeeList(this.selectEmployeeForm).then(({data}) =>{
                if(data.success){
                    this.EmployeeList=data.data.list
                    this.total=data.data.total
                }
            })
        },
        handleSizeChange(val){
            this.selectEmployeeForm.pageSize=val
            this.init()
        },
        handleCurrentChange(val){
            this.selectEmployeeForm.pageNum=val
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
.emploDiv button{
    margin: 5px 0px
}
</style>
