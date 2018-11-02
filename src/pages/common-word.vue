<template>
    <div class="page-div-content">
      <el-container>
        <el-aside>
          <div class="left-nav-menu">
            <div class="logo" v-if="!isCollapse">
              <img src="../assets/page-logo.png" alt="" style="width: 0px;">
            </div>
           <el-switch
            v-model="isCollapse">
           </el-switch>
            <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @click="el-menu-item"
            background-color="#2d313d"
            text-color="#fff"
            :collapse="isCollapse"
            active-text-color="#7ab3ff"
            :unique-opened="true"          
            >
            <template  v-for="(item,index) in menuList">
                  <el-submenu :path="item.index" :index="toStr(index)"  v-if="item.subs != null" :key="index" > 
                    <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item-group>
	                    <el-submenu v-if = 'subItem.subs != null' v-for="(subItem, index2) in item.subs" :key="index2" :path="subItem.index" :index="toStr(index)+'-'+toStr(index2)">
	                      <template slot="title">
		                      <el-menu-item-group  @click="locationchange(subItem.index)">
			                      <i :class="subItem.icon"></i>
			                      <span>{{ subItem.title }}</span>
		                      </el-menu-item-group>
	                      </template>
	                      <el-menu-item-group>
	                       <el-menu-item v-for="(meuItem, index3) in subItem.subs" :key="index3" :path= "meuItem.index" :index="toStr(index)+'-'+toStr(index2)+'-'+toStr(index3)" @click="locationchanges(meuItem.index)">
		                      <i :class="meuItem.icon"></i>
		                      <span>{{ meuItem.title }}</span>
		                   </el-menu-item>
	                      </el-menu-item-group>
	                    </el-submenu>
	                    <template  v-for="(subItem , index2) in item.subs" v-if="subItem.subs == null">
		                    <el-menu-item  :key="index2" :path="subItem.index" :index="subItem.permission"  @click="locationchange(subItem.index,index,index2)">
		                       <i :class="subItem.icon"></i>
		                      <span>{{ subItem.title }}</span>
		                    </el-menu-item>
	                    </template>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-menu-item :path="item.index" :index="toStr(index)" @click="toLocationchange(item.index)" v-else>
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                  </el-menu-item>
              </template>
            </el-menu>
          </div>
        </el-aside>
        <router-view></router-view>
      </el-container>
    </div>
</template>

<script>
import {getLSession} from '@/utils/session'
import request from '@/utils/request'
  export default {
    data () {
      return {
       	menuList:[
          {num: '1', index: '/Home', title: '个人中心', icon: 'icon-userinfo'},
          {num:'2',title:'系统相关',icon:'icon-user-manage',subs:[
          	{index:'/insList',title:'机构管理',icon:'icon-add-user1'}
          ]}
//        {
//          num: '2',
//          title: '账户管理',
//          icon: 'icon-user-manege',
//          subs: [
//            {index: '/accountAdd', title: '新建账户', icon: 'icon-add-user1'},
//            {index: '/accountSearch', title: '账户查询', icon: 'icon-user-search'}
//          ]
//        },
//        {
//          num: '3',
//          title: '客户相关',
//          icon: 'icon-user-manege',
//          subs: [
//            {index: '/customerManageList', title: '客户管理', icon: 'icon-add-user1'},
//            {index: '/', title: '企业管理', icon: 'icon-user-search'}
//          ]
//        },
        ],
        isCollapse:false
      }
    },
    created:function() {
    	//this.getMenuList()
    },
    methods: {
      getMenuList(){
    	
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      locationchange (index,v1,v2) {
        this.$router.push({ path: index })
        console.log(v1)
        console.log(v2)
      },
      locationchanges (index) {
        this.$router.push({ path: index })
      },
      toLocationchange (index) {
        this.$router.push({ path: index })
      },
      toStr (value) {
        return value.toString()
      }
    }
  }
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 190px;
  }
  .left-nav-menu .logo{
    margin-bottom: 20px;
  }
  .left-nav-menu .el-menu{
    border: none;
  }
  .left-nav-menu .el-menu-item{
    padding-right: 0px;
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
    width: auto!important;
  }
  .left-nav-menu img{
    vertical-align: text-top;
  }
  .left-nav-menu [class^="icon-"]{
    font-size: 20px;
    padding-right: 3px;
  }
  .left-nav-menu [class*=" icon-"]{
    font-size: 20px;
    padding-right: 3px;
  }
.el-switch__core {
 margin-left: 10px;
}
</style>
