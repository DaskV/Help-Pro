/*
 * @Author: DaskV
 * @Date: 2019-09-04 10:45:51
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-04 11:48:54
 * @Description: 登录
 */
import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
    return axios({
        url: '/auth/login',
        method: 'post',
        data: parameter
    })
}

export function getSmsCaptcha (parameter) {
    return axios({
        url: api.SendSms,
        method: 'post',
        data: parameter
    })
}

export function getInfo () {
    return axios({
        url: '/user/info',
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function logout () {
    return axios({
        url: '/auth/logout',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
    return axios({
        url: api.twoStepCode,
        method: 'post',
        data: parameter
    })
}
