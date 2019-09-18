/*
 * @Author: DaskV
 * @Date: 2019-09-04 10:45:51
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-09 11:14:37
 * @Description: 全局引用
 */
import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'
import mainfest from '@/config/mainfest'

// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext library
import VueClipboard from 'vue-clipboard2'
import PermissionHelper from '@/utils/helper/permission'
// import '@/components/use'
import './directives/action'

VueClipboard.config.autoSetContainer = true

Vue.prototype.mainfest = mainfest

Vue.use(Antd)
Vue.use(Viser)

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
