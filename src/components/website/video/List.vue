<template>
  <div class="ep-list">
    <el-container>
      <el-header>
        <h4><i class="el-icon-s-unfold"></i> 选集</h4>
      </el-header>
      <el-main style="height: 375px;">
        <div class="list-item" v-for="item in list" :key="item.id">
          <el-link :underline="false" :href=" '/video/' + item.id">
            <i class="el-icon-video-play"></i>
            <span> 第  {{ item.part_number }} {{ item.part_unit }} {{ item.title }}</span>
          </el-link>
        </div>
      </el-main>
    </el-container>
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
  background-color: #F2F6FC;
  border-radius: 5px;
  .list-item {
    border-radius: 8px;
    padding: 10px;
    background-color: #FFF;
    margin-bottom: 10px;
  }
  .el-main {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
