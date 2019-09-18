<!--
 * @Author: DaskV
 * @Date: 2019-09-04 10:45:51
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-09 11:21:36
 * @Description: Logo
 -->
<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">{{ title || mainfest.title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
    name: 'Logo',
    components: {
        LogoSvg
    },
    props: {
        title: {
            type: String,
            default: '',
            required: false
        },
        showTitle: {
            type: Boolean,
            default: true,
            required: false
        }
    }
}
</script>
