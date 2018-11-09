import Vue from 'vue'
import Router from 'vue-router'

import { hasAuthToken, clearLSession, getSSession } from '@/utils/session'

import Login from '@/pages/login/index'
import CommonLayout from '@/pages/common-word'

/* login */
const ForgetPwd = () => import('@/pages/login/forgetpwd')
const Register = () => import('@/pages/register/index')
const CompanyInfo = () => import('@/pages/register/company-info')
const PersonInfo = () => import('@/pages/register/person-info')
const SetPwd = () => import('@/pages/login/setpwd')

const InsList = () => import('@/pages/aboutSys/institute/instituteList')
const InduList = () => import('@/pages/aboutSys/industry/industryList')
const DictList = () => import('@/pages/aboutSys/sysDict/dictList')
const DepartmentList = () => import('@/pages/aboutStaff/department/departmentList')
const EmployeeList = () => import('@/pages/aboutStaff/employee/employeeList')
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login, name: '登录' },
    { path: '/forgetPwd', name: '忘记密码', component: ForgetPwd },
    { path: '/setpwd', name: '设置新密码', component: SetPwd },
    { path: '/register', component: Register, name: '新用户注册' },
    { path: '/companyInfo', name: '填写企业信息', component: CompanyInfo },
    { path: '/personInfo', name: '填写个人信息', component: PersonInfo },
    { path: '',
      component: CommonLayout,
      children: [
        { path: '/insList', name: 'InsList', component: InsList },
        { path: '/induList', name: 'InduList', component: InduList },
        { path: '/dictList', name: 'DictList', component: DictList },
        { path: '/departmentList', name: 'DepartmentList', component: DepartmentList },
        { path: '/employeeList', name: 'EmployeeList', component: EmployeeList },
      ]
    }
  ]
})

router.beforeEach(({meta, path,name}, from, next) => {
  let isLogin=hasAuthToken();
  const isForget = getSSession('hygorgetToken')
  const isRegister = getSSession('hymobile')
  if (path !== '/login' && !isLogin) {
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
      return next({ path: '/login' })
    }
  }
  if (path === '/login' && isLogin) {
    clearLSession()
    location.reload()
  }
  next()
})
export default router
