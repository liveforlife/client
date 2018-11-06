<template>
	<div>
		<el-form ref="addForm" :model="addForm" label-width="90px" class="addFormClass">
			<el-row :span="24">
				<el-col :span="12">
					<el-form-item label="企业名称">
						<el-input v-model="addForm.instName"></el-input>
					</el-form-item>
					<el-form-item label="负责人">
						<el-input v-model="addForm.director"></el-input>
					</el-form-item>
					<el-form-item label="负责人电话">
						<el-input v-model="addForm.directorPhone"></el-input>
					</el-form-item>
					<el-form-item label="对接人">
						<el-input v-model="addForm.broker"></el-input>
					</el-form-item>
					<el-form-item label="对接人电话">
						<el-input v-model="addForm.brokerPhone"></el-input>
					</el-form-item>
					<el-form-item label="城市区域">
						<el-cascader
							:options="regionTreeList"
							v-model="instARegionIdArry"
							>
						</el-cascader>
					</el-form-item>
					<el-form-item label="经度">
						<el-input v-model="addForm.instGeoLatitude"></el-input>
					</el-form-item>
					<el-form-item label="纬度">
						<el-input v-model="addForm.instGeoLongitude"></el-input>
					</el-form-item>
					<el-form-item label="业务涵盖">
						<el-select v-model="addForm.busiTypes" multiple >
							<el-option 
								v-for="item in busiTypesList" 
								:key="item.value" 
								:label="item.label"
								:value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="简介">
						<el-input type="textarea" v-model="addForm.instDesc">
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="成立时间">
						 <el-date-picker
					      v-model="addForm.instFoundTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="入驻时间">
						 <el-date-picker
					      v-model="addForm.instCreateTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="公司性质">
						<el-select v-model="addForm.instNature">
							<el-option
								v-for="item in instNatureList"
								:value="item.value"
								:key="item.value"
								:label="item.label"
								></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态">
						<el-select v-model="addForm.instStatus">
							<el-option
								v-for="item in instStatusList"
								:value="item.value"
								:key="item.value"
								:label="item.label"
								></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="股东数量">
						<el-input v-model="addForm.stockholderNum"></el-input>
					</el-form-item>
					<el-form-item label="员工数量">
						<el-input v-model="addForm.employeeNum"></el-input>
					</el-form-item>
					<el-form-item label="收费模式">
						<el-select v-model="addForm.chargeMode">
							<el-option
								v-for="item in chargeScaleList"
								:value="item.value"
								:key="item.value"
								:label="item.label"
								></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="收费标准">
						<el-input v-model="addForm.chargeScale"></el-input>
					</el-form-item>
					<el-form-item label="合作模式">
						<el-select v-model="addForm.cooMode">
							<el-option
								v-for="item in cooModeList"
								:value="item.value"
								:key="item.value"
								:label="item.label"
								></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作价格">
						<el-input v-model="addForm.cooPrice"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-button type="primary" @click="submitForm">提交</el-button>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import request from '@/utils/request'
	import * as format from '@/utils/format'
	export default{
		props:['busiTypesList','instStatusList','regionTreeList','isAddFlag'],
		data(){
			return{
				addForm:{					
				  broker: "",
				  brokerPhone:"",
				  busiTypes: [],
				  chargeMode: "",
				  chargeScale: 0,
				  cooMode: "",
				  cooPrice: 0,
				  director: "",
				  directorPhone: "",
				  employeeNum: "",
				  instARegionId: "",
				  instCreateTime: "",
				  instDesc: "",
				  instFoundTime: "",
				  instGeoLatitude: "",
				  instGeoLongitude: "",
				  instName: "",
				  instNature: "",
				  instStatus: "",
				  stockholderNum: ""
				},
				instARegionIdArry:[],
				sysCode:[
					{
						sysCode:'C0070000',
						sysName:'合作模式',
						list:'cooModeList'
					},{
						sysCode:'C0060000',
						sysName:'收费模式',
						list:'chargeScaleList'
					},{
						sysCode:'C0160000',
						sysName:'企业性质',
						list:'instNatureList'
					}
				],
				cooModeList:[],
				chargeScaleList:[],
				instNatureList:[],
			}
		},
		created () {
			if(!this.isAddFlag){
				this.getInstInfo()
			}
			this.init()
		},
		methods:{
			init(){
				request.getDictList({code:'C0070000,C0060000,C0160000'}).then(({data})=>{
					if(data.success){
						let {C0070000,C0060000,C0160000}=data.data
						this.cooModeList=format.formatSysCodeList(C0070000)
						this.chargeScaleList=format.formatSysCodeList(C0060000)
						this.instNatureList=format.formatSysCodeList(C0160000)
					}
				})	
			},
			getInstInfo(){
				
			},
			submitForm(){
				this.addForm.instARegionId=this.instARegionIdArry[this.instARegionIdArry.length-1]
				request.addIns(this.addForm).then(({data})=>{
					
				})
			}
		}
	}
	/*
	 
	 
	 
	 {
  "broker": "string",
  "brokerPhone": 0,
  "busiType": [
    "string"
  ],
  "busiTypes": "string",
  "chargeMode": "string",
  "chargeScale": 0,
  "cooMode": "string",
  "cooPrice": 0,
  "createTime": "2018-10-22T05:44:51.553Z",
  "director": "string",
  "directorPhone": 0,
  "employeeNum": 0,
  "instARegionId": "string",
  "instCreateTime": "2018-10-22T05:44:51.553Z",
  "instDesc": "string",
  "instFoundTime": "2018-10-22T05:44:51.553Z",
  "instGeoLatitude": 0,
  "instGeoLongitude": 0,
  "instId": 0,
  "instName": "string",
  "instNature": "string",
  "instStatus": "string",
  "modifiedTime": "2018-10-22T05:44:51.553Z",
  "stockholderNum": 0
}
	 
	 * 
	 * */
	
</script>

<style>
	.addFormClass input{
		width: 150px;
	}
</style>