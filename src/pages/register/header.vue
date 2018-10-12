<template>
  <div class="header">
    <el-row :gutter="20">
      <el-col :span="18"><div class="grid-content bg-purple"><img src="../../assets/login/logo2.png" alt=""><span class="title">华药共享ILS平台</span></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple right">{{ cdate }}</div></el-col>
    </el-row>
  </div>
</template>

<script>
  import { formatDate2 } from '@/utils/format'

  export default {
    data () {
      return {
        cdate: ''
      }
    },
    mounted: function () {
      this.init()
    },
    methods: {
      init () {
        let date = new Date()
        let s = date.getSeconds()
        let that = this
        that.cdate = formatDate2(new Date())
        setInterval(function () {
          s++
          if (s === 60) {
            that.cdate = formatDate2(new Date())
            s = 0
          }
        }, 1000)
      }
    }
  }
</script>

<style>
  .header{
      width: 100%;
      height: 70px;
  }
  .el-header{
    margin-bottom: 20px;
    box-shadow: 0px 0px 5px #888888;
    background: #397cf1;
    color: #ffffff;
    padding: 0 30px;
  }
  .el-row{
    margin-top: 7px;
    line-height: 60px;
    padding-left: 50px;
  }
  .el-row .grid-content{
    color: #ffffff;
  }
  .el-row .grid-content .title{
    font-size: 18px;
    padding-left: 15px;
  }
  .right{
    text-align: right;
  }
  
</style>
