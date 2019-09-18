/*
 * @Author: DaskV
 * @Date: 2019-09-04 10:45:51
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-09 10:30:01
 * @Description: 项目入口
 */

// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap' // 响应式控制
import './core/use' // 全局引用
import './permission' // 权限控制
import './utils/filter' // 全局过滤
import i18n from './locales' // 国际化

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
    router,
    store,
    i18n,
    created: bootstrap,
    render: h => h(App)
}).$mount('#app')
