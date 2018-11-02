import axios from 'axios'
import { getAuthToken } from './session'
import { Notification,Message,Loading } from 'element-ui'
import router from '@/router/router'

// 只显示一个错误提示
let networkError = false
const warn = (message) => {
  console.log(message)
  if (!networkError) {
    networkError = true
    Notification.error({
      message,
      onClose () {
        networkError = false
      }
    })
  }
}

export const baseURL = process.env.CONNECTOR_SERVER

const api = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    'Content-Type': 'application/json;charset=UTF-8'
  },
  showLoading:true
})
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
 if (needLoadingRequestCount === 0) {
  startLoading()
 }
 needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
 if (needLoadingRequestCount <= 0) return
 needLoadingRequestCount--
 if (needLoadingRequestCount === 0) {
  endLoading()
 }
}
let loading
function startLoading() {
 loading = Loading.service({
  lock: true,
  text: '网速不够快...喝口茶...',
  background: 'rgba(0, 0, 0, 0.7)'
 })
}
function endLoading() {
 loading.close()
}
// 添加请求拦截器
api.interceptors.request.use((config) => {
  // 带上用户token

  if (config.showLoading) {
    showFullScreenLoading()
   }
  // 清除不需要的参数
  for (const i in config.params) {
    if (config.params[i] === undefined ||
      config.params[i] === null ||
      config.params[i] === '') {
      delete config.params[i]
    }
  }
  return config
})

// 添加响应拦截器
/*api.interceptors.response.use(response => {
  if (response.config.showLoading) {
    tryHideFullScreenLoading()
   }
  
 if(response.data.code === 401){
  Message.error(response.data.message)
  setTimeout(()=>{
   router.push({ path: '/login' })
  },1000)
  return false
 }
 return response
}, (err) => {
  console.log(err)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        router.push({ path: '/login' })
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  } else {
    err.message = '网络错误，请稍后再试！'
  }
  if (err && err.response && err.response.data && err.response.data.message) {
    warn(err.response.data.message)
  } else {
    warn(err.message)
  }
  return Promise.reject(err)
})*/

// export default api
export default {
  install: function (Vue, option = {}) {
    // 1.通过 Vue.httpClient 调用
    Vue.httpClients = api
    // 2.通过 this.$httpClient 调用
    Vue.prototype.$httpClients = api
  }
}
