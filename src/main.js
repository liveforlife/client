import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './reset.css'

import App from './App'

import router from './router/router.js'
import store from './store'

import Calendar from 'vue-calendar-component'

import '@/icomoon/style.css'
import '@/iconFont/iconfont.css'
import api from './utils/api'
import apiJson from './utils/apiJson'
import VueQArt from 'vue-qart'

Vue.use(Calendar)




Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(api)
Vue.use(apiJson)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
 components:{VueQArt},
  render: h => h(App)
})


