import Vue from 'vue'
import Router from 'vue-router'

import { hasAuthToken, clearLSession, getSSession } from '@/utils/session'

import Login from '@/pages/login/index'
import CommonLayout from '@/pages/common-word'
import Home from '@/pages/account/center/index'

/* login */
const ForgetPwd = () => import('@/pages/login/forgetpwd')
const Register = () => import('@/pages/register/index')
const CompanyInfo = () => import('@/pages/register/company-info')
const PersonInfo = () => import('@/pages/register/person-info')
const SetPwd = () => import('@/pages/login/setpwd')
const AcSearch = () => import('@/pages/account/search/index')
const AcAdd = () => import('@/pages/account/add/index')
/*客户相关*/
const customerManageList = () => import('@/pages/customer/customerManage/list')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login, name: '登录' },
    { path: '/forgetPwd', name: '忘记密码', component: ForgetPwd },
//  { path: '/mobilePayment',name:"手机支付",component:mobilePayment},
//  { path:'/paymentSuccess',name:"支付成功",component:paymentSuccess},
    { path: '/setpwd', name: '设置新密码', component: SetPwd },
    { path: '/register', component: Register, name: '新用户注册' },
    { path: '/companyInfo', name: '填写企业信息', component: CompanyInfo },
    { path: '/personInfo', name: '填写个人信息', component: PersonInfo },
    { path: '',
      component: CommonLayout,
      children: [
        { path: '/Home', name: '个人中心', component: Home },
      	{ path: '/accountAdd', name: '新建账户', component: AcAdd },
	      { path: '/accountSearch', name: '账户查询', component: AcSearch },
	      {path:'/customerManageList',name:'客户管理',component:customerManageList},
//     { path: '/accountInfo', name: '账户编辑',component:  AcEdit },
//      { path: '/userinfoEdit', name: '个人信息编辑', component: AcEditUserinfo },
//      { path: '/companyinfoEdit', name: '企业信息编辑', component: AcEditCominfo },
      ]
    }
  ]
})

router.beforeEach(({meta, path,name}, from, next) => {
  let isLogin=''
//if(path=='/mobilePayment'||path=='/paymentSuccess'){
// isLogin=true
//}else{
// isLogin=hasAuthToken();
//}
  const isForget = getSSession('hygorgetToken')
  const isRegister = getSSession('hymobile')
  console.log(isLogin)
  console.log('999888')
  console.log(path)
  if (path !== '/login' && !isLogin) {
   console.log('66666');
    if (path === '/register' || path === '/forgetPwd') {
      next()
      return
    }else if (path === '/setpwd') {
      if (isForget) {
        next()
        return
      } else {
        return next({ path: '/login' })
      }
    } else if (path === '/companyInfo') {
      if (isRegister) {
        next()
        return
      } else {
        return next({ path: '/login' })
      }
    } else {
    	      next()
      return
      //return next({ path: '/login' })
    }
  }
  if (path === '/login' && isLogin) {
    clearLSession()
    location.reload()
  }
  next()
})
export default router
