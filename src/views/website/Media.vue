<template>
  <div class="container">
    <Info :media="media"></Info>
    <List :list="list"></List>
    <Series :series="series" v-if="media.has_series"></Series>
  </div>
</template>

<script>
import Info from '@/components/website/media/Info.vue'
import List from '@/components/website/media/List.vue'
import Series from '@/components/website/media/Series.vue'
export default {
  name: 'Media',
  components: {
    Info,
    List,
    Series
  },
  data () {
    return {
      media: {},
      series: [],
      list: []
    }
  },
  created () {
    this.getMedia()
  },
  methods: {
    // 获取media信息
    async getMedia () {
      const { data: result } = await this.$http.get(`/media/${this.$route.params.id}`)
      if (result.status !== 200) {
        return this.$message.error('媒体信息加载失败')
      }
      this.media = result.data
      this.getVideoList()
      if (this.media.has_series) {
        this.getSeries(this.media.series_id)
      }
    },
    // 获取视频选集列表
    async getVideoList () {
      const { data: result } = await this.$http.get('/video', { params: { media_id: this.media.id } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.list = result.data
    },
    // 获取系列信息
    async getSeries (id) {
      const { data: result } = await this.$http.get('/media', { params: { series_id: id } })
      if (result.status !== 200) {
        return this.$message.error('系列信息加载失败')
      }
      this.series = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 64%;
  margin-left: 18%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
