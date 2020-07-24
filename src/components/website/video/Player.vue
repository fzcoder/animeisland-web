<template>
  <!-- 播放器 -->
  <div class="player">
    <div class="player-head">
      <p>第 {{ video.part_number }} {{ video.part_unit }}  {{ video.title }}</p>
    </div>
    <div class="player-content" ref="contentRef">
      <video :width="player.size.width" :height="player.size.height" :src="url" controls preload="auto"></video>
    </div>
    <div>
      <el-select v-model="params.quality" @change="getVideoUrl()">
        <el-option v-for="item in video.quality" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  data () {
    return {
      video: {},
      // 视频链接
      url: '',
      // 路径参数
      params: {
        quality: ''
      },
      player: {
        size: {
          width: 0,
          height: 0
        }
      }
    }
  },
  created () {
    this.getVideo()
  },
  mounted () {
    const _this = this
    this.changePlaySize()
    window.onresize = () => {
      _this.changePlaySize()
    }
  },
  methods: {
    // 获取视频信息
    async getVideo () {
      const { data: result } = await this.$http.get(`/video/${this.$route.params.id}`)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.video = result.data
      this.params.quality = this.video.quality[0]
      this.$emit('success', this.video.media_id)
      this.getVideoUrl()
    },
    // 获取视频链接
    async getVideoUrl () {
      const { data: result } = await this.$http.get(`/resource/video/${this.$route.params.id}`, { params: this.params })
      this.url = result
    },
    // 自动调整播放器大小
    changePlaySize () {
      const contentWidth = this.$refs.contentRef.offsetWidth
      this.player.size.width = contentWidth - 20
      this.player.size.height = (contentWidth - 20) * 0.5625
    }
  },
  destroyed () {
    window.onreset = null
  }
}
</script>

<style lang="less" scoped>
// 播放器样式
.player{
  .player-head{
    background-color: black;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 10px;
    color: #FFF;
    p {
      margin: 0px;
    }
  }
  .player-content{
    background-color: black;
    width: 100%;
    text-align: center;
  }
}
</style>
