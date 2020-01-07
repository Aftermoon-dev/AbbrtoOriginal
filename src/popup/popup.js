import Vue from 'vue'
import App from './App'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ko'

Vue.use(Element, { locale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  
  router,
  render: h => h(App)
})
