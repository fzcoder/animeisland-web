<template>
  <!-- 选集模块 -->
  <div class="ep-list">
    <h3><i class="el-icon-s-unfold"></i> 选集</h3>
    <el-row :gutter="10">
      <el-col :span="6" v-for="item in list" :key="item.id">
        <div style="background-color: #F2F6FC; border-radius: 10px; padding: 10px; margin-bottom: 10px;">
          <el-link :underline="false" :href="'/video/' + item.id">
            <div>
              <h4 style="margin: 0px;">第 {{ item.part_number }} {{ item.part_unit }}</h4>
              <p style="margin: 0px;">{{ item.title }}</p>
            </div>
          </el-link>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VideoList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ep-list {
}
</style>
