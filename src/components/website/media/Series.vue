<template>
  <!-- 系列模块 -->
  <div>
    <h3><i class="el-icon-s-unfold"></i> 系列</h3>
    <el-row :gutter="10">
      <el-col :span="4" v-for="item in series" :key="item.id">
        <div style="text-align: center;">
          <el-link :underline="false" :href="'/media/' + item.id">
            <el-image :src="item.cover_url" fit="cover"></el-image>
            <h3 style="margin-left: 2px; margin-top: 2px;">{{ item.name_in_series }}</h3>
          </el-link>
        </div>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Series',
  props: {
    series: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style>
</style>
