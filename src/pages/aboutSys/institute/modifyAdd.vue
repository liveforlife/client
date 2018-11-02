<template>
	<div>
		<el-form :model="modifyAddForm">
			<el-form-item label="机构名称">
				<el-select :model="instARegionId">
					<option></option>
				</el-select>
			</el-form-item>
		</el-form>		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				modifyAddForm:{
					instARegionId:''
				}
			}
		}
	}
</script>

<style>
</style>