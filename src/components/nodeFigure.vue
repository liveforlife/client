<template>
 <div  v-if="stepArray&&stepArray.length>0" class="tabBox">
  <div  class="nodeFigure">
   <el-dialog :visible.sync="dialogTableVisible" title="联系人">
    <div v-if="gridDataShow">
     <div><i class="iconfont icon-geren-copy"></i><span class="label">姓名：</span><span class="value">{{gridData[0].user.username}}</span></div>
     <div><i class="iconfont icon-shouji-copy"></i><span class="label">手机号码：</span><span class="value">{{gridData[0].user.mobile}}</span></div>
     <div><i class="iconfont icon-gerenxinxixiugai"></i><span class="label">岗位：</span><span class="value">{{gridData[0].user.position}}</span></div>
     <div><i class="iconfont icon-kucunguanli"></i><span class="label">公司名称：</span><span class="value">{{gridData[0].user.companyName}}</span></div>
    </div>
    <el-table v-else :data="gridData" border >
     <el-table-column property="drivers[0].name" label="姓名" width="150"></el-table-column>
     <el-table-column property="drivers[0].mobile" label="联系方式" width="150"></el-table-column>
     <el-table-column property="drivers[0].carNumber" label="车牌" width="150"></el-table-column>
     <el-table-column property="drivers[0].carType" label="车辆类型" width="150">
      <template slot-scope="scope">
       <span v-if="scope.row.drivers[0].carType === '1'" >箱式车</span>
       <span v-if="scope.row.drivers[0].carType === '2'" >集装箱(挂车)</span>
       <span v-if="scope.row.drivers[0].carType === '3'" >集装箱(周转)</span>
       <span v-if="scope.row.drivers[0].carType === '4'" >冷藏车</span>
      </template>
     </el-table-column>
     <el-table-column property="drivers[0].fullInfo" label="车辆准载" width="200"></el-table-column>
     <el-table-column property="drivers[0].carBelong" label="车辆属性">
      <template slot-scope="scope">
       <span v-if="scope.row.drivers[0].carBelong === '1'" >自有车辆</span>
       <span v-if="scope.row.drivers[0].carBelong === '2'" >临时车辆</span>
       <span v-if="scope.row.drivers[0].carBelong === '3'" >挂靠车辆</span>
      </template>
     </el-table-column>
    </el-table>
   </el-dialog>
   <el-steps align-center v-for="(items,n) in stepArraySlice" :key="n" >
    <el-step class="stepMar" :title="item.user.companyName" :description="item.description"  v-for="(item,index) in items"  :key="item.id" >
     <i @click="showList(item)" :class="n%2 !== 0?'el-icon-arrow-left':'el-icon-arrow-right'" slot="icon" ></i>
    </el-step>
   </el-steps>
  </div>
 </div>
</template>
<script>

 import request from '@/utils/request'

export default{
 props: {
  ordercode: {
   type: String,
   default: ''
  }
 },
 data(){
  return{
   gridDataShow:true,
   stepArraySlice: [],
   dialogTableVisible: false,
   gridData: [{user:{}}],
   stepArray: [],
  }
 },
 created(){
  this.getOrderFlowList()
 },
 methods: {
  getOrderFlowList(){
   let o ={
    ordercode:this.ordercode
   }
   if(this.ordercode !== ''){
    request.getOrderFlowList(o).then(({data})=>{
     if(data.success){
      this.stepArray = data.data
      console.log('节点',this.stepArray)
      this.init()
     }
    })
   }
  },
  showList(val){
   this.dialogTableVisible = true
   this.gridData = [val]
   this.gridDataShow = val.drivers
   if(val.drivers.length>0){
    this.gridDataShow = false
   }

  },
  init(){
   let num = 7
   if(this.stepArray && this.stepArray.length>7){
    let n = 0;
    let arr = [];
    this.stepArray.map((v,index)=>{
     arr.push(v)
     this.$set(this.stepArraySlice,n,arr)
     if( index !== 0 && index%(num-1) === 0 && index <=num|| (index !== 0 && index%num === (num-1) && index >num)){
      arr = []
      n+=1
     }
    })

    if(this.stepArraySlice&&this.stepArraySlice.length>0){
     this.stepArraySlice.map((v,index)=>{
      if(index%2 !== 0){
       return v.reverse()
      }
     })
    }
   }else{
    this.$set(this.stepArraySlice,0,this.stepArray)
   }
  }
 },
 watch:{
  ordercode(){
   this.getOrderFlowList()
  }
 }
}
</script>
<style lang="scss"  >
 $green : #35ca93 ;
 .tabBox{
  padding: 20px 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 10px 35px;
  .nodeFigure{
   .el-step__line{
    background: $green;
   }

   .el-step__title{
    color: $green !important;
   }
   .el-step,.is-horizontal{
    display: block !important;
   }
   .stepMar{
    .el-step__icon,.is-text{
     color: $green !important;
     background:$green ;
     border-color:transparent !important;
     .el-icon-arrow-right,.el-icon-arrow-left{
      padding: 10px;
      color: #fff;
     }
    }
   }
   .el-table--border tr:nth-of-type(2n), .el-table--border th {
    background: #e1efff;
    border: 1px solid #d7d7d7;
   }

   .el-table--border thead tr {
    color: #2D2D2D;
   }

   .el-table--border td {
    border: 1px solid #d7d7d7;
   }
     .el-step__description.is-wait{
	   color:#35ca93 !important
	  }
   .el-dialog{
    width:400px;
    border-radius: 20px;
   }
   .el-dialog .el-dialog__header{
    background-color: #69B8FA;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
   }
   .el-dialog .el-dialog__header .el-dialog__title{
    color: #fff;
    font-size: 16px;
    font-weight: bold;
   }
   .el-dialog .el-dialog__header  .el-dialog__close{
    color: #fff;
   }
   .el-dialog .el-dialog__body{
    font-size: 16px;
   }
   .el-dialog .el-dialog__body div>div{
    margin: 20px 0;
   }
   .el-dialog .el-dialog__body .iconfont{
    color: #69b8fa;
    font-size: 24px;
    margin: 0  10px;
   }
   .el-dialog .el-dialog__body .label{
    display: inline-block;
    width: 100px;
   }
   .el-dialog .el-dialog__body .value{
    color: #6D6D6D;
   }

  }
 }

</style>
