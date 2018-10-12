import Login from '@/pages/login/index'

const ForgetPwd = () => import('@/pages/login/forgetpwd')
const Register = () => import('@/pages/login/register/index')

export default [
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/forgetPwd',
    name: '忘记密码',
    component: ForgetPwd
  },
  {
    path: '/register',
    name: '新用户注册',
    component: Register
  }
]
