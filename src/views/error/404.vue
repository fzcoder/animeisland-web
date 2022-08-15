<template>
  <div class="app-error-404">
    <div>
      <h1>(´⊙ω⊙`)! 页面走丢了...</h1>
      <img src="../../assets/img/404.png" style=" height: 256px;" />
    </div>
    <div style="margin-top: 15px;">
      <a-button @click="gotoHomePage()" type="primary">返回首页</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const gotoHomePage = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.app-error-404 {
  width: 60%;
  margin-left: 20%;
  text-align: center;
}
</style>
