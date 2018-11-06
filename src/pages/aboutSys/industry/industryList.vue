<template>
	<el-container>
		<el-header>
			
		</el-header>
		<el-main>
			<el-row class="queryIndustryDiv" style="">
				<el-row>
					<el-button type="primary" @click="addIndustry">新增</el-button>
				</el-row>
			</el-row>
			<el-row>
				<el-table :data="induList">
					<el-table-column  type="index"  width="50"></el-table-column>
					<el-table-column label="行业名" prop="indName"></el-table-column>
					<el-table-column label="描述" prop="indDesc"></el-table-column>
					<el-table-column label="操作"  width="300">
						<template  slot-scope="scope">
							<el-row class="industryButton" style="display: flex;flex-direction: row;">
								<el-button  size="mini" type="primary" @click="reviseIndustry(scope.row)">修改</el-button>
								<el-button  size="mini" type="danger" @click="deleteIndustry(scope.row)">删除</el-button>
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
                :page-sizes="[2,15]"
                :page-size="15"
                layout="total, sizes, prev, pager, next"
                :total="total">
                </el-pagination>
            </div>
		</el-main>
        <el-dialog title="新增" id="addInduDiv" :visible.sync="addInduVisible">				
				<el-form :model="addInduForm" :ref="addInduForm">
                    <el-form-item label="行业名">

                    </el-form-item>
                    <el-form-item label="描述">
                        
                    </el-form-item>
                </el-form>
		</el-dialog>
	</el-container>
</template>

<script>
	import request from '@/utils/request'
	import * as format from '@/utils/format'
	export default{
		components:{
		
		},
		data(){
			return{
				induList:[],
				selectForm:{
                    pageNum:0,
					pageSize:15
                },
                total:'',
                addInduVisible:false,
                addInduForm:{
                    indDesc:'',
                    indName:'',
                }
			}
		},
		created(){
			this.init()
		},
		methods:{
			init(){
				request.getInduList(this.selectForm).then(({data})=>{
					if(data.success){
                        this.induList=data.data.list
                        this.total=data.data.total
					}
				})
            },
            addIndustry(){

            },
			reviseIndustry(){

            },
            deleteIndustry(row){
                request.deleteInduList({indId:row.indId}).then(({data})=>{
					if(data.success){
                       this.$message.success(data.data.message)
					}else{
                       this.$message.error(data.data.message)
                    }
				})
            },
            handleSizeChange(val){
                this.selectForm.pageSize=val
                this.init()
            },
            handleCurrentChange(val){
                this.selectForm.pageNum=val
                this.init()
            }
		}
	}
</script>

<style>
.queryIndustryDiv{
	padding: 20px;margin-bottom: 20px;
}
.industryButton{
	margin-bottom: 10px;
}
.block{
    text-align: right;
    padding: 20px 0px
}
</style>