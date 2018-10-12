<template>
  <div class="grid-content bg-purple-light nav-header">
    <span class="nav-header-date">{{ cdate }}</span>
    <span class="logout" @click="logout">退出登录</span>
  </div>
</template>

<script>
  import { formatDate2 } from '@/utils/format'
  import request from '@/utils/request'
  import { clearLSession } from '@/utils/session'

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
      },
      logout () {
        request.logout().then(({ data }) => {
          console.log(data)
          if (data.success === true) {
            clearLSession()
            this.$router.push({ path: '/' })
          }
        })
      }
    }
  }
</script>

<style>
  .el-header .el-breadcrumb{
    height: 50px;
    line-height: 50px;
    font-size: 12px;
  }
  .el-header .el-breadcrumb__inner{
    font-weight: normal;
    color: #9a9fa6;
  }
  .el-header .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    color: #397bf1;
  }
  .el-header .el-col-13{
    text-align: right;
    font-size: 12px;
  }
  .nav-header{
    text-align: right;
  }
  .nav-header .logout{
    color: #9a9fa6;
    cursor: pointer;
    padding-left: 20px;
  }
  .nav-header .logout:hover{
    color: #f56c6c;
    text-decoration: underline;
  }
  
</style>

