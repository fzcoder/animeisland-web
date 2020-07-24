<template>
  <!-- media信息 -->
  <div class="media">
    <img :src="media.cover_url" />
    <div class="media-info">
      <el-link :underline="false" :href=" '/media/' + media.id ">
        <h1>{{ media.name_zh }}</h1>
      </el-link>
      <p class="media-info-status">{{ style.status[media.status] }} 共 {{ media.total }} 话</p>
      <p class="media-info-intro">{{ media.introduction }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Media',
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
// media样式
.media{
  padding: 20px;
  display: flex;
  align-items: center;
  img{
    width: 120px;
    height: 160px;
    object-fit: fill;
    margin-right: 20px;
  }
  .media-info{
    .el-link{
      margin-top: 0px;
      h1{
        margin-top: 0px;
      }
    }
    .media-info-status{
      font-size: small;
      color: grey;
    }
    .media-info-intro{
      font-size: small;
    }
  }
}
</style>
