<template>
  <div class="media-info">
    <div class="info-cover">
      <img :src="media.cover_url" />
    </div>
    <div style="margin-left: 30px;">
      <h1>{{ media.name_zh }}</h1>
      <div>
        <el-tag v-for="(item, index) in media.tags" :key="item" :type="style.tagTypes[index%5]" effect="dark" style="margin-right: 10px;">{{ item }}</el-tag>
      </div>
      <div class="info-body" style="color: #606266;">
        <p>{{ media.release_time }} 开播    {{ style.status[media.status] }} 共 {{ media.total }} 话</p>
        <p>{{ media.introduction }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    media: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 样式
      style: {
        status: ['未上映', '正在连载', '已完结'],
        tagTypes: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  }
}
</script>

<style lang="less" scoped>
.media-info {
  display: flex;
  justify-content: flex-start;
  .info-cover {
    background-color: #F2F6FC;
    padding: 10px;
    border-radius: 8px;
    img {
      width: 240px;
      height: 320px;
      object-fit: fill;
    }
  }
}
</style>
