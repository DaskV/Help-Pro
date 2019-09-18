<!--
 * @Author: DaskV
 * @Date: 2019-09-04 10:45:51
 * @LastEditors: DaskV
 * @LastEditTime: 2019-09-09 11:16:24
 * @Description: 全局footer
 -->
<template>
  <div class="footer">
    <div class="links">
      <!-- <a
        href="https://github.com/sendya/ant-design-pro-vue"
        target="_blank"
      >
        <a-icon type="github" />
      </a> -->
      <a href="https://ant.design/">Ant Design</a>
      <a href="https://vue.ant.design/">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> {{ mainfest.year }} <span>{{ mainfest.Copyright }}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'GlobalFooter',
    data () {
        return {}
    }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
