/*
 * @Author: DaskV
 * @Date: 2019-09-04 10:45:51
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-04 14:57:46
 * @Description: 国际化
 */
import { loadLanguageAsync } from '@/locales'

const i18n = {
    state: {
        lang: 'en-US'
    },
    mutations: {
        SET_LANG: (state, lang) => {
            state.lang = lang
        }
    },
    actions: {
    // 设置界面语言
        SetLang ({ commit }, lang) {
            return new Promise(resolve => {
                commit('SET_LANG', lang)
                loadLanguageAsync(lang)
                resolve()
            })
        }
    }
}

export default i18n
