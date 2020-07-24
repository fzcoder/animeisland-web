<template>
  <!-- 列表区 -->
  <div class="list">
    <div class="list-item" v-for="item in list" :key="item.id">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-image :src="item.cover_url" fit="cover"></el-image>
        </el-col>
        <el-col :span="19">
          <el-link :underline="false" :href=" '/media/' + item.id " style="padding: 0px;">
            <h1 style="margin: 0px;">{{ item.name_zh }}</h1>
          </el-link>
          <div class="list-item-tags">
            <el-tag v-for="(tag, i) in item.tags" :key="tag" :type="style.tagTypes[i%5]" effect="dark">{{ tag }}</el-tag>
          </div>
          <el-row :gutter="10">
            <el-col :span="12">
              <h4>原版名称：{{ item.name_orgin }}</h4>
              <h4>上映时间：{{ item.release_time }}</h4>
            </el-col>
            <el-col :span="12">
              <h4>类型：{{ item.type_name }}</h4>
              <h4>状态：{{ style.status[item.status] }}</h4>
            </el-col>
            <h4 style="margin: 0px;">简介</h4>
            <p style="margin: 0px; margin-top: 2px; font-size: small;">{{ item.introduction }}</p>
          </el-row>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 显示样式
      style: {
        status: ['未上映', '正在连载', '已完结'],
        tagTypes: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list{
  .list-item{
    .el-image{
      width: 180px; height: 240px;
    }
    .list-item-tags{
      margin-top: 10px;
      .el-tag{
        margin-right: 10px;
      }
    }
  }
}
</style>
