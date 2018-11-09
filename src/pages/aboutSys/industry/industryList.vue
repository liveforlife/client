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
             <div class="paginationStyle">
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
        <el-dialog title="新增" id="addInduDiv" :visible.sync="addInduVisible">				
				<el-form :model="addInduForm" :inline="true" :ref="addInduForm">
                    <el-form-item label="行业名">
						<el-input v-model="addInduForm.indName"></el-input>						
                    </el-form-item>
                    <el-form-item label="描述">
						<el-input v-model="addInduForm.indDesc"></el-input>                        
                    </el-form-item>
                </el-form>
				<el-row style="text-align: center;">
					<el-button  size="mini" type="primary" @click="addIndustryRecord">确定</el-button>
					<el-button  size="mini" type="danger" @click="cancelAddIndustry">取消</el-button>
				</el-row>
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
				isAddFlag:false,
                addInduForm:{
                    indDesc:'',
					indName:'',
					indId:''
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
				this.isAddFlag=true
				this.addInduVisible=true
            },
			addIndustryRecord(){
				if(this.isAddFlag){
					request.addIndu(this.addInduForm).then(({data})=>{
						console.log(data.success)
						if(data.success){
							this.init()
							this.$message.success(data.message)
							this.addInduVisible=false           
						}else{
						this.$message.error(data.message)
						}
					})
				}else{
					request.undateInduList(this.addInduForm).then(({data})=>{
						if(data.success){
							this.init()
							this.$message.success(data.message)
							this.cancelAddIndustry()
						}else{
						this.$message.error(data.message)
						}
					})
				}
				
			},
			cancelAddIndustry(){
				this.addInduVisible=false
				this.isAddFlag=false
				this.addInduForm.indDesc= ""
				this.addInduForm.indName= ""
				this.addInduForm.indId=""
			},
			reviseIndustry(val){
				this.isAddFlag=false
				this.addInduForm.indDesc= val.indDesc
				this.addInduForm.indName= val.indName
				this.addInduForm.indId= val.indId
				this.addInduVisible=true
            },
            deleteIndustry(row){
                request.deleteInduList({indId:row.indId}).then(({data})=>{
					if(data.success){
						this.init()
                       this.$message.success(data.message)
					}else{
                       this.$message.error(data.message)
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

</style>