import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)
Vue.use(VueRouter)

export default new VueRouter({
  routes
})
