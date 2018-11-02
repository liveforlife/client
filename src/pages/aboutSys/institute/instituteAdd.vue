<template>
	<div>
		<el-form ref="addForm" :model="addForm" label-width="90px" class="addFormClass">
			<el-row :span="24">
				<el-col :span="12">
					<el-form-item label="企业名称">
						<el-input :model="instName"></el-input>
					</el-form-item>
					<el-form-item label="负责人">
						<el-input :model="director"></el-input>
					</el-form-item>
					<el-form-item label="负责人电话">
						<el-input :model="directorPhone"></el-input>
					</el-form-item>
					<el-form-item label="对接人">
						<el-input :model="broker"></el-input>
					</el-form-item>
					<el-form-item label="对接人电话">
						<el-input :model="brokerPhone"></el-input>
					</el-form-item>
					<el-form-item label="城市区域">
						<el-select :model="instARegionId">
							<option></option>
						</el-select>
					</el-form-item>
					<el-form-item label="经度">
						<el-input :model="instGeoLatitude"></el-input>
					</el-form-item>
					<el-form-item label="纬度">
						<el-input :model="instGeoLongitude"></el-input>
					</el-form-item>
					<el-form-item label="业务涵盖">
						<el-select :model="busiTypes">
							<option></option>
						</el-select>
					</el-form-item>
					<el-form-item label="简介">
						<el-input type="textarea" :model="instDesc">
						</el-input>
					</el-form-item>
				</el-col>
				  <!--"busiType": [],
				  "busiTypes": "",
				  "createTime": "2018-10-22T05:44:51.553Z",
				  "instId": 0,
				  "modifiedTime": "2018-10-22T05:44:51.553Z",-->
				<el-col :span="12">
					<el-form-item label="成立时间">
						 <el-date-picker
					      v-model="instFoundTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="入驻时间">
						 <el-date-picker
					      v-model="instCreateTime"
					      type="date"
					      placeholder="选择日期">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="公司性质">
						<el-input :model="instNature"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-input :model="instStatus"></el-input>
					</el-form-item>
					<el-form-item label="股东数量">
						<el-input :model="stockholderNum"></el-input>
					</el-form-item>
					<el-form-item label="员工数量">
						<el-input :model="employeeNum"></el-input>
					</el-form-item>
					<el-form-item label="收费模式">
						<el-input :model="chargeMode"></el-input>
					</el-form-item>
					<el-form-item label="收费标准">
						<el-input :model="chargeScale"></el-input>
					</el-form-item>
					<el-form-item label="合作模式">
						<el-input :model="cooMode"></el-input>
					</el-form-item>
					<el-form-item label="合作价格">
						<el-input :model="cooPrice"></el-input>
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
	export default{
		data(){
			return{
				addForm:{
					/*
					  "broker": "",
				  "brokerPhone": 0,
				  //"busiType": [],
				  "busiTypes": [],
				  "chargeMode": "",
				  "chargeScale": 0,
				  "cooMode": "",
				  "cooPrice": 0,
				 // "createTime": "2018-10-22T05:44:51.553Z",
				  "director": "",
				  "directorPhone": 0,
				  "employeeNum": 0,
				  "instARegionId": "",
				  "instCreateTime": "",
				  "instDesc": "",
				  "instFoundTime": "2018-10-22T05:44:51.553Z",
				  "instGeoLatitude": 0,
				  "instGeoLongitude": 0,
				  //"instId": 0,
				  "instName": "",
				  "instNature": "",
				  "instStatus": "string",
				 // "modifiedTime": "2018-10-22T05:44:51.553Z",
				  "stockholderNum": 0
					 * */
				  "broker": "23424",
				  "brokerPhone":2342,
				  //"busiType": [],
				  "busiTypes": ["C0030001"],
				  "chargeMode": "2342",
				  "chargeScale": 2342,
				  "cooMode": "23423",
				  "cooPrice": 2342,
				 // "createTime": "2018-10-22T05:44:51.553Z",
				  "director": "2342",
				  "directorPhone": 2342,
				  "employeeNum": 2420,
				  "instARegionId": "2342",
				  "instCreateTime": "2342",
				  "instDesc": "234234",
				  "instFoundTime": "2018-10-22T05:44:51.553Z",
				  "instGeoLatitude": 2342,
				  "instGeoLongitude": 243420,
				  //"instId": 0,
				  "instName": "2342",
				  "instNature": "2342",
				  "instStatus": "2",
				 // "modifiedTime": "2018-10-22T05:44:51.553Z",
				  "stockholderNum": 2340
				},
			}
		},
		methods:{
			submitForm(){
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