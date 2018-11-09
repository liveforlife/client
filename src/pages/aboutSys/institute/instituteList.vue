<template>
	<el-container>
		<el-header>
			
		</el-header>
		<el-main>
			<el-row class="queryInsDiv">
				<el-row>
					<el-button type="primary" @click="addIns">新增</el-button>
				</el-row>
				<el-row class="queryInsDivButton" :span="24">
					<el-form :inline="true" :model="selectForm" ref="selectForm">
						<el-row :span="24">
							<el-col :span="6">
								<el-form-item label="企业名称">
									<el-input v-model="selectForm.instName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="负责人">
									<el-input v-model="selectForm.director"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="对接人">
									<el-input v-model="selectForm.broker"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="城市区域">
									<el-cascader
									    :options="regionTreeList"
									    v-model="regionIdArry"
									   >
									  </el-cascader>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :span="24">
							<el-col :span="6">
								<el-form-item label="业务涵盖">
									<el-select v-model="selectForm.busiType" placeholder="请选择">
										<el-option 
										v-for="item in busiTypesList" 
										:key="item.value" 
										:label="item.label"
										:value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="状态" >
									<el-select v-model="selectForm.instStatus" placeholder="请选择">
										<el-option
										v-for="item in instStatusList"
										:value="item.value"
										:key="item.value"
										:label="item.label"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click="selectInsList">查询</el-button>
								<el-button type="primary" @click="clearInsQueryCondition">重置</el-button>
							</el-col>
						</el-row>
					</el-form>	
				</el-row>
			</el-row>
			<el-row>
				<el-table :data="insList">
					<el-table-column label="机构名称" prop="instName"></el-table-column>
					<el-table-column label="对接人账号" prop="broker"></el-table-column>
					<el-table-column label="对接人联系电话" prop="brokerPhone"></el-table-column>
					<el-table-column label="负责人账号" prop="director"></el-table-column>
					<el-table-column label="机构入驻日期" prop="instCreateTime"></el-table-column>
					<el-table-column label="机构性质" prop="instNature">
					</el-table-column>
					<el-table-column label="机构简介" prop="instDesc"></el-table-column>
					<el-table-column label="操作"  width="300">
						<template  slot-scope="scope">
							<el-row class="instituButton" style="display: flex;flex-direction: row;">
								<el-button  size="mini" type="primary" @click="reviseIns(scope.row)">修改</el-button>
								<el-button size="mini" type="info" @click="ModifyIns(scope)">维护</el-button>
								<el-button  size="mini" type="danger" @click="deleteIns(scope)">删除</el-button>
								<el-button size="mini"  type="success" @click="setIns">设置</el-button>
							</el-row>
							<el-row class="instituButton" style="display: flex;flex-direction: row;">
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
			<el-dialog title="新增" id="addDiv" :visible.sync="addVisible">				
				<InstituteAdd :busiTypesList="busiTypesList" 
				:instStatusList="instStatusList" :regionTreeList="regionTreeList" 
				:isAddFlag="isAddFlag" :reviseInsForm="reviseInsForm" v-on:disappearAddVisible = "disappearAddVisible"></InstituteAdd>
			</el-dialog>
			<el-dialog title="维护" id="ModifyDiv" :visible.sync="ModifyVisible">	
				<el-table :data="ModifyList"></el-table>
				<el-row style="text-align: center;">
					<el-button  size="mini" type="primary">确定</el-button>
					<el-button  size="mini" type="danger">取消</el-button>
				</el-row>
			</el-dialog>
	</el-container>
</template>

<script>
	import InstituteAdd from './instituteAdd'
	import ModifyAdd from './instituteAdd'
	import request from '@/utils/request'
	import * as format from '@/utils/format'
	export default{
		components:{
			InstituteAdd,ModifyAdd
		},
		data(){
			return{
				insList:[],
				ModifyList:[],
				addVisible:false,
				ModifyVisible:false,
				modifyAddVisible:false,
				selectForm:{
					instName:'',
					director:'',
					broker:'',
					instStatus:'',
					busiType:'',
					regionId:'',
					pageNum:0 ,
					pageSize:10
				},
				total:'',
				regionIdArry:[],
				regionTreeList:[],
				sysCode:[
					{
						sysCode:'C0030000',
						sysName:'业务涵盖',
						list:'busiTypesList'
					},{
						sysCode:'C0050000',
						sysName:'机构状态',
						list:'instStatusList'
					},
					{
						sysCode:'C0160000',
						sysName:'企业性质',
						list:'instNatureList'
					}
				],
				busiTypesList:[],
				instStatusList:[],
				instNatureList:[],
				isAddFlag:false,
				reviseInsForm:{},
			}
		},
		created(){
			this.init()
		},
		methods:{
			init(){
				this.selectInsList()
				request.getDictList({}).then(({data})=>{
				})
				request.getRegionTree({}).then(({data})=>{
					if(data.success){
						this.regionTreeList=format.formatCity(data.data)		
					}
				})
				request.getDictList({code:'C0030000,C0050000,C0160000'}).then(({data})=>{
					if(data.success){
						let {C0030000,C0050000,C0160000}	=data.data
						this.busiTypesList=format.formatSysCodeList(C0030000)
						this.instStatusList=format.formatSysCodeList(C0050000)
						this.instNatureList=format.formatSysCodeList(C0160000)
						console.log(this.busiTypesList,3333)
					}
				})
			},
			selectInsList(){
				console.log(this.regionIdArry.length)
				if(this.regionIdArry.length !=0){
					this.selectForm.regionId=this.regionIdArry[this.regionIdArry.length-1]
				}
				request.getInsList(this.selectForm).then(({data})=>{
					this.insList=data.data.list
					this.total=data.data.total
				})
			},
			addIns(){
				this.addVisible=true;
				this.isAddFlag=true;
			},
			reviseIns(val){
				this.addVisible=true;
				this.isAddFlag=false;
				let obj={...val}
				this.reviseInsForm=obj;
			},
			disappearAddVisible(){
				this.addVisible=false
			},
			ModifyIns({row}){
				let ModifyIns={
					instId:row.instId
				}
				request.instRelationIns(ModifyIns).then(({data})=>{
					if(data.success){
						this.ModifyVisible=true
					}
				})
			},
			modifyAddInfo(){
				
			},
			setIns(){},
			deleteIns({row}){
				let delIns={
					instId:row.instId
				}
				request.deleteIns(delIns).then(({data})=>{
					if(data.success){
						this.$message({
				          message: data.message,
				          type: 'success'
				        });
					}else{
						this.$message.error(data.message);
					}
				})
			},
			clearInsQueryCondition(){
				this.selectForm.instName=''
				this.selectForm.director=''
				this.selectForm.broker=''
				this.selectForm.instStatus=''
				this.selectForm.busiType=''
				this.selectForm.regionId=[]
			},
			formatterInstNature(row,column){
				return instNatureList.filter(item=>{
					if(item.sysDictCode == row.instNature){
						return item.sysDictName
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
.queryInsDiv{
	padding: 20px;margin-bottom: 20px;
}
.queryInsDivButton{
	margin-top: 10px;
}
.queryInsDivButton input{
	width: 220px;
}
.instituButton{
	margin-bottom: 10px;
}
</style>