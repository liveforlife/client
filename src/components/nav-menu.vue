<template>
  <div class="left-nav-menu">
    <div class="logo">
      <img src="../assets/page-logo.png" alt="">
    </div>
    <el-menu default-active="0-0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @click="el-menu-item"
      background-color="#2d313d"
      text-color="#fff"
      active-text-color="#7ab3ff">
      <div v-for="(item,index) in menuList" :key="index">
        <div v-if="item.subs">
          <el-submenu :path="item.index" :index="toStr(index)">
            <template slot="title">
              <i><img src="../assets/icon/icon-account-0.png" alt=""></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(subItem, index2) in item.subs" :key="index2" :path="subItem.index" :index="toStr(index) +'-' +toStr(index2)" @click="locationchange(subItem.index)"><span>{{ subItem.title }}</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :path="item.index" :index="toStr(index)">
            <i class="el-icon-setting"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        menuList: [
          {
            num: '1',
            title: '账户管理',
            subs: [
              {index: '/', title: '个人中心'},
              {index: '/account-search', title: '新建账户'},
              {index: '', title: '账户查询'}
            ]
          },
          {
            num: '2',
            title: '线路管理',
            subs: [
              {index: '', title: '门店管理'},
              {index: '', title: '新增路线'},
              {index: '', title: '路线查询'}
            ]
          },
          { num: '3', title: '订单管理', index: '' },
          { num: '4', title: '司机管理', index: '' },
          {
            num: '5',
            title: '财务管理',
            subs: [
              {index: '', title: '支付管理'},
              {index: '', title: '发票管理'}
            ]
          }
        ]
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      locationchange (index) {
        this.$router.push({ path: index })
        console.log(`CCCCCCCCCCCCCCCCCCC${index}`)
      },
      toStr (value) {
        return value.toString()
      }
    }
  }
</script>

<style>
  .left-nav-menu .logo{
    margin-bottom: 20px;
  }
  .left-nav-menu .el-menu{
    border: none;
  }
  .left-nav-menu .el-menu-item{
    padding-right: 0px;
    padding: 0 80px;
  }
  .left-nav-menu .el-submenu__title{
    padding: 0 80px;
  }
  .left-nav-menu .el-menu-item-group__title{
    padding: 0;
  }
  .left-nav-menu .el-submenu .el-menu-item{
    min-width: 190px;
  }
  .page-div-content .el-aside{
    line-height: 0px;
  }
  .left-nav-menu img{
    vertical-align: text-top;
  }
</style>
