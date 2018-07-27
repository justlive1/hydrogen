import Vue from 'vue'
import axios from 'axios'

import App from './App'
import conf from '../../config/conf'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router'
import store from './store'
import eventBus from './service/EventBus'

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.use(MintUI)

axios.defaults.withCredentials = true
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$conf = conf
Vue.prototype.$eventBus = eventBus

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
