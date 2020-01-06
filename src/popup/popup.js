import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ko'
import Storage from 'vue-web-storage'

Vue.use(Element, { locale })
Vue.use(Storage);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  
  router,
  render: h => h(App)
})
