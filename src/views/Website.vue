<template>
  <el-container>
    <el-header>
      <!-- 头部导航栏 -->
      <Header></Header>
    </el-header>
    <el-main>
      <!-- 返回顶部按钮 -->
      <el-backtop :bottom="150" :right="100">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
      <!-- 路由占位符 -->
      <router-view v-if="Switch.isRouterAlive"></router-view>
    </el-main>
    <el-footer>
      <!-- 页足 -->
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from '@/components/website/Header.vue'
import Footer from '@/components/website/Footer.vue'
export default {
  name: 'Website',
  components: {
    Header,
    Footer
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      Switch: {
        isRouterAlive: true
      }
    }
  },
  methods: {
    // 重新加载页面
    reload () {
      this.Switch.isRouterAlive = false
      this.$nextTick(function () {
        this.Switch.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  border-bottom: solid 1px #e6e6e6;
}
.el-main {
  padding: 0;
}
.el-footer {
  padding: 0;
}
</style>
