import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './assets/fonts/iconfont.css'
import axios from 'axios'


axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
