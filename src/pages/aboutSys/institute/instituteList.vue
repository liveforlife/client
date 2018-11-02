<template>
	<el-container>
		<el-header>
			
		</el-header>
		<el-main>
			<el-row class="queryInsDiv" style="">
				<el-row>
					<el-button type="primary" @click="addVisible=true">新增</el-button>
				</el-row>
				<el-row class="queryInsDivButton" :span="24">
					<el-form :inline="true" :model="selectForm">
						<el-row :span="24">
							<el-col :span="6">
								<el-form-item label="企业名称">
									<el-input :model="instName"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="负责人">
									<el-input :model="director"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="对接人">
									<el-input :model="broker"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="城市区域">
									<el-select :model="instARegionId">
										<option></option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :span="24">
							<el-col :span="6">
								<el-form-item label="业务涵盖">
									<el-select :model="busiTypes">
										<option></option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="状态">
									<el-input :model="instStatus"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-button type="primary" @click="">查询</el-button>
								<el-button type="primary" @click="">重置</el-button>
							</el-col>
							<el-col></el-col>
							
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
					<el-table-column label="机构性质" prop="instNature"></el-table-column>
					<el-table-column label="机构简介" prop="instDesc"></el-table-column>
					<el-table-column label="操作"  width="300">
						<template  slot-scope="scope">
							<el-row class="instituButton" style="display: flex;flex-direction: row;">
								<el-button  size="mini" type="primary" @click="reviseIns">修改</el-button>
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
		</el-main>
			<el-dialog title="新增" id="addDiv" :visible.sync="addVisible">				
				<InstituteAdd></InstituteAdd>
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
				},
			}
		},
		created(){
			this.init()
		},
		methods:{
			init(){
				request.getInsList({}).then(({data})=>{
					this.insList=data.data
				})
				request.getDictList({}).then(({data})=>{
				})
			},
			addIns(){
			},
			reviseIns(){},
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