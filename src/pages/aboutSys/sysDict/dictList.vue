<template>
<el-container>
		<el-header>
			
		</el-header>
		<el-main>
      <el-row style="padding:10px">
        <el-button type="primary" size="mini">新增</el-button>
        <el-button type="primary" size="mini">修改</el-button>
        <el-button type="primary" size="mini">删除</el-button>
        <el-button type="primary" size="mini">启用</el-button>
        <el-button type="primary" size="mini">禁用</el-button>
        <el-button type="primary" size="mini">查看</el-button>
      </el-row>
      <div >
        <div style="width:400px;padding-left:10px">
          <el-tree
              :data="dicListData"
              show-checkbox
              node-key="id"
              check-strictly="true">
              </el-tree>
        </div>
      </div>
		</el-main>
</el-container>
   
</template>
<script>
import request from '@/utils/request'
  export default {
    data() {
      return {
        dicListData: [],
      };
    },
    mounted(){
        this.init()
    },
    methods:{
      init(){
          request.getDictTree({}).then(({data}) =>{
              if(data.success){
                this.dicListData=data.data.map((item)=>{
                  var obj={}
                  obj.label=item.sysDictName
                  obj.code=item.sysDictCode
                  obj.status=item.sysDictStatus
                  obj.children=item.children.map((item)=>{
                    var chilObj={}
                    chilObj.label=item.sysDictName
                    chilObj.code=item.sysDictCode
                    chilObj.status=item.sysDictStatus
                    chilObj.children=item.children
                    return chilObj
                  })
                  return obj
                })
              }
          })
      },
      addDictPoint(){

      },
      changeDictStatus(){

      },
      queryDictInfo(){

      },
      deleteDictInfo(){

      }
    }
  };
</script>