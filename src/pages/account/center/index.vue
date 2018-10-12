<template>
  <el-container class="page-home-bg">
    <el-header style="height:50px;">
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>个人中心</el-breadcrumb-item>
              <el-breadcrumb-item>我的账户</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="13"> <NavHeader/></el-col>
      </el-row>
    </el-header>
    <el-main class="page-home-div">
      <div class="person-info">
        <div><span class="name">{{info.user.username}}</span>
         <span>{{userMainFrom.user.position}}</span>
        </div>
        <div class="descript">
          <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><i><img src="../../../assets/icon/icon-p-info1.png" alt=""></i>{{info.user.mobile}}</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><i><img src="../../../assets/icon/icon-p-info3.png" alt=""></i>{{userMainFrom.company.name}}</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><i><img src="../../../assets/icon/icon-admin.png" alt=""></i>{{userRole}}</div></el-col>
            <!-- <el-col :span="4"><div class="grid-content bg-purple"><i><img src="../../../assets/icon/icon-p-info4.png" alt=""></i>{{userMainFrom.company.address}}</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><i><img src="../../../assets/icon/icon-mobile.png" alt=""></i>{{userMainFrom.user.phone}}</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><i><img src="../../../assets/icon/icon-p-info2.png" alt=""></i>{{info.org.ifContract =='1'?'合同客户':'临时客户'}}</div></el-col> -->
          </el-row>
        </div>
        <el-row :gutter="20" class="operation-btn">
		  <el-col :span="4" >
            <div class="grid-content bg-purple">
              <router-link to="userinfoEdit">
                <div class="out" @mouseenter="showActive(4)" @mouseleave="showActive(0)">
                  <img src="../../../assets/home/box-operation-04.png" alt="">
                  <img src="../../../assets/home/box-operation-04-h.png" alt="" v-show="active === 4">
                  <div class="in">编辑个人信息</div>
                </div>
              </router-link>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <div class="out" @mouseenter="showActive(2)" @mouseleave="showActive(0)" @click="dialogEditMobile=true">
                <img src="../../../assets/home/box-operation-02.png" alt="">
                <img src="../../../assets/home/box-operation-02-h.png" alt="" v-show="active === 2">
                <div class="in">修改手机号</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <div class="out" @mouseenter="showActive(3)" @mouseleave="showActive(0)" @click="dialogEditPwd=true">
                <img src="../../../assets/home/box-operation-03.png" alt="">
                <img src="../../../assets/home/box-operation-03-h.png" alt="" v-show="active === 3">
                <div class="in">修改登录密码</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4"  v-if="roleSwitch" >
            <div class="grid-content bg-purple">
              <router-link to="/companyinfoEdit">
                <div class="out" @mouseenter="showActive(5)" @mouseleave="showActive(0)">
                  <img src="../../../assets/home/box-operation-05.png" alt="">
                  <img src="../../../assets/home/box-operation-05-h.png" alt="" v-show="active === 5">
                  <div class="in">编辑企业信息</div>
                </div>
              </router-link>
            </div>
          </el-col>
		  <el-col :span="4"  v-if="roleSwitch">
            <div class="grid-content bg-purple">
              <div class="out" @mouseenter="showActive(1)" @mouseleave="showActive(0)" @click="dialogEditAdmin=true">
                <img src="../../../assets/home/box-operation-01.png" alt="">
                <img src="../../../assets/home/box-operation-01-h.png" alt="" v-show="active === 1">
                <div class="in">变更主管理员</div>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="4">
            <div class="grid-content bg-purple" v-if="roleSwitch" >
              <router-link to="/contactsManager">
                <div class="out" @mouseenter="showActive(6)" @mouseleave="showActive(0)">
                  <img src="../../../assets/home/box-operation-04.png" alt="">
                  <img src="../../../assets/home/box-operation-04-h.png" alt="" v-show="active === 6">
                  <div class="in">通讯录</div>
                </div>
              </router-link>
            </div>
          </el-col> -->
        </el-row>
      </div>

      <div class="home-weather">
        <div class="plate-title">天气预报</div>
        <div class="content">
          <el-row>
            <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
              <el-row :span="16">
                <el-col :span="3" v-for="(item2, index) in weather" :key="index">
                  <div class="grid-content bg-purple">
                    <div>{{ item2.weekDay }}</div>
                    <div><img :src="require('../../../assets/home/weather-'+ item2.num +'.png')" alt=""></div>
                    <div>{{ item2.du }}</div>
                    <div>{{ item2.weahher }}</div>
                  </div>
                  </el-col>
              </el-row>
          </el-row>
        </div>
      </div>
      <div class="home-calendar">
        <div class="plate-title">日历</div>
        <el-row>
          <el-col :span="7" class="left">
            <div class="week">{{ isDay.text_week }}</div>
            <div class="isDay">{{ isDay.day }}</div>
          </el-col>
          <el-col :span="7">
            <Calendar
              v-on:chose_day="clickday"
              v-on:is_today="clicktoday"
              v-on:change_month="change_date"
              :mark_array=[1,2]
              :is_hide_otherday=false>
              </Calendar>
          </el-col>
        </el-row>
      </div>

      <!-- 弹出层 -->
      <EditAdmin :show.sync="dialogEditAdmin"/>
      <EditMobile :mobile='info.user.mobile'   :show.sync="dialogEditMobile" />
      <EditPwd :show.sync="dialogEditPwd" />
      <AdminList :show.sync="dialogAdminList" />
    </el-main>
    <el-footer style="height:44px;">版权所有：华药共享网络科技有限公司</el-footer>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/nav-header'
  import EditAdmin from './edit-admin'
  import EditMobile from './edit-mobile'
  import EditPwd from './edit-pwd'
  import AdminList from './admin-list'
  import { getLSession ,removeTemporaryseeion,removeWarehouseOrders} from '@/utils/session'
  import request from "../../../utils/request";
  import './home.css'

  export default {
    data () {
      return {
       roleSwitch:null,
        active: 6,
        dialogEditAdmin: false,
        dialogAdminList: false,
        dialogEditMobile: false,
        dialogEditPwd: false,
        userRole:'',
        userMainFrom:{},
        info: '',
        isDay: '',
        weather: [
          {
            weekDay: 'Mon',
            weahher: '小雪',
            num: 4,
            du: '30°'
          },
          {
            weekDay: 'Tue',
            weahher: '多云',
            num: 5,
            du: '30°'
          },
          {
            weekDay: 'Wed',
            weahher: '晴天',
            num: 6,
            du: '30°',
            img: ''
          },
          {
            weekDay: 'Thu',
            weahher: '阴天',
            num: 0,
            du: '2°',
            img: ''
          },
          {
            weekDay: 'Fri',
            weahher: '雷电',
            num: 3,
            du: '23°',
            img: ''
          },
          {
            weekDay: 'Sat',
            weahher: '小雨',
            num: 1,
            du: '20°',
            img: ''
          },
          {
            weekDay: 'Sun',
            weahher: '大雨',
            num: 2,
            du: '10°',
            img: ''
          }
        ]
      }
    },
    components: {
      NavHeader,
      EditAdmin,
      EditMobile,
      EditPwd,
      AdminList
    },
   created(){
     console.log(1,getLSession())
//   this.orderInit()
//  this.getRolesList()
//  this.getUserInfo()
   },
    mounted: function () {
      this.init()
    },
    methods: {
      init () {
        this.info = getLSession().data
        let dateObj = new Date()
        var day = dateObj.getDay()
        var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        this.isDay = {
          day: dateObj.getDate(),
          text_week: weeks[day]
        }
      },
      closeModule () {
        this.dialogEditAdmin = false
        this.dialogAdminList = false
        this.dialogEditMobile = false
        this.dialogEditPwd = false
      },
     getRolesList () {
      let userid = getLSession().data.user.id
      request.getRolesList({userid:userid}).then(({data})=>{
       this.roleSwitch = data.data.find((v)=>{
        return v.id === '200'
       })
      })
     },
     getUserInfo(){
     	let user = getLSession().data.user
     	request.getUserInfo({userid:user.id,cid:user.cid}).then(({data})=>{
     		if(data.success){
     			/*data.data.companyRoles.forEach(item =>{
     				this.userRole+=item.name+' '
     			})*/
     			this.userRole=data.data.user.rolenames
     			this.userMainFrom=data.data
     		}
     	})
     },
      showActive (index) {
        this.active = index
      },
      clickday (data) {
        console.log(data)
      },
      change_date (data) {
        console.log(data)
      },
      clicktoday (data) {
        console.log(data)
      },
      toStr (value) {
        return value.toString()
      },
     orderInit(){
      removeTemporaryseeion()
      removeWarehouseOrders()
     }
    }
  }
</script>

