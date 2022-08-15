<template>
  <div class="header-container">
    <a class="brand" :underline="false" href="/">
      <h2><i class="icon-tv-primary-40px" style="margin-right: 5px;"></i>动漫岛</h2>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Header'
})
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .brand {
    h2 {
      display: flex;
      align-items: center;
      color: #1890ff;
      margin: 0px;
    }
  }
  border-bottom: 1px solid #434343;
  padding: 10px 20px 10px 20px;
}
</style>
