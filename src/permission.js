/*
 * @Author: DaskV
 * @Date: 2019-09-04 10:45:51
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-09 11:32:51
 * @Description: 权限
 */
import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import mainfest from '@/config/mainfest'

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['login', 'register', 'registerResult'] // 不重定向 白名单

router.beforeEach((to, from, next) => {
    NProgress.start() // NProgress 开始
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${mainfest.title}`))
    if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
        if (to.path === '/user/login') {
            next({ path: '/dashboard/workplace' })
            NProgress.done()
        } else {
            if (store.getters.roles.length === 0) {
                store
                    .dispatch('GetInfo')
                    .then(res => {
                        const roles = res.result && res.result.role
                        store.dispatch('GenerateRoutes', { roles }).then(() => {
                            // 根据roles权限生成可访问的路由表
                            // 动态添加可访问路由表
                            router.addRoutes(store.getters.addRouters)
                            const redirect = decodeURIComponent(from.query.redirect || to.path)
                            if (to.path === redirect) {
                                // hack方法 确保addRoutes已完成
                                next({ ...to, replace: true })
                            } else {
                                // 跳转到目的路由
                                next({ path: redirect })
                            }
                        })
                    })
                    .catch(() => {
                        notification.error({
                            message: '错误',
                            description: '请求用户信息失败，请重试'
                        })
                        store.dispatch('Logout').then(() => {
                            next({ path: '/user/login', query: { redirect: to.fullPath } })
                        })
                    })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
            NProgress.done()
        }
    }
})

// 页面加载 NProgress 结束
router.afterEach(() => {
    NProgress.done()
})
