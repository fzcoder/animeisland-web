<template>
  <el-container>
    <el-main>
      <div class="container">
        <div>
          <h1>(´⊙ω⊙`)！ 页面走丢了...</h1>
          <img src="../assets/img/404.png" style=" height: 256px;" />
        </div>
        <div style="margin-top: 15px;">
          <el-button type="primary" round icon="el-icon-s-home" @click="gotoHomePage()">返回首页</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods: {
    gotoHomePage () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 60%;
  margin-left: 20%;
  text-align: center;
}
</style>
