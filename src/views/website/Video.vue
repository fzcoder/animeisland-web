<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 播放器 -->
        <div class="wrap">
          <div class="video-title">
            <p>第 {{ video.part_number }} {{ video.part_unit }}  {{ video.title }}</p>
          </div>
          <div id="player-container" class="player" ref="contentRef">
            <video id="player" :width="player.size.width" :height="player.size.height" :src="url" preload="auto"></video>
            <div class="player-control">
              <el-slider v-model="player.currentTime" :max="player.duration" :show-tooltip="false" :step="0.01" style="margin-left: 5px; margin-right: 5px;" @change="progress"></el-slider>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                  <el-button type="text" size="mini" circle icon="icon-play" @click="play()" v-if="Switch.playBtn"></el-button>
                  <el-button type="text" size="mini" circle icon="icon-pause" @click="pause()" v-if="Switch.pauseBtn"></el-button>
                  <span style="color: #FFF;">{{ player.progress.current }} / {{ player.progress.total }}</span>
                </div>
                <div class="btn-right" style="display: flex; align-items: center;">
                  <span style="color: #FFF; font-weight: bold; margin-right: 8px;">新版本</span>
                  <el-switch v-model="Switch.control" style="margin-right: 8px;"></el-switch>
                  <el-tooltip placement="top" style="margin-right: 8px;">
                    <div slot="content" style="text-align: center; padding: 0px;">
                      <p style="color: #FFF; margin: 0px; margin-bottom: 10px;">{{ player.volumn }}</p>
                      <el-slider v-model="player.volumn" vertical height="100px" :show-tooltip="false" @input="volumn()"></el-slider>
                    </div>
                    <el-button type="text" circle icon="icon-volumn" size="mini" style="color: #FFF;"></el-button>
                  </el-tooltip>
                  <el-select v-if="false" v-model="params.quality" @change="getVideoUrl()" size="mini" style="width: 85px;">
                    <el-option v-for="item in video.quality" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                  <el-tooltip placement="top" style="margin-right: 8px;">
                    <div slot="content" style="text-align: center; padding: 0px;">
                      <el-menu background-color="#303133" text-color="#fff" active-text-color="#409EFF" @select="qualityChange" style="border-right: 0px; margin: 0px;">
                        <el-menu-item v-for="item in video.quality" :key="item" :index="item" style="padding: 0px; margin: 0px;">
                          <span style="font-weight: bold; margin: 0px;">{{ item }}</span>
                        </el-menu-item>
                      </el-menu>
                    </div>
                    <span style="color: #FFF; font-weight: bold;">{{ params.quality }}</span>
                  </el-tooltip>
                  <el-button type="text" circle icon="icon-fullscreen" size="mini" style="color: #FFF;" @click="fullscreen()"></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Player v-if="false"></Player>
        <Series :series="series" v-if="media.has_series"></Series>
        <Media :media="media"></Media>
      </el-col>
      <el-col :span="6">
        <List :list="list"></List>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/website/video/List.vue'
import Media from '@/components/website/video/Media.vue'
import Series from '@/components/website/video/Series.vue'
import Player from '@/components/website/video/Player.vue'
export default {
  name: 'Video',
  components: {
    List,
    Media,
    Series,
    Player
  },
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
        currentTime: 0.00,
        duration: 0.00,
        // 音量
        volumn: 100,
        // 尺寸
        size: {
          width: 0,
          height: 0
        },
        progress: {
          current: '00:00:00',
          total: '00:00:00'
        }
      },
      media: {},
      // 系列信息
      series: [],
      // 选集列表
      list: [],
      Switch: {
        playBtn: true,
        pauseBtn: false,
        control: true
      }
    }
  },
  created () {
    this.getVideo()
  },
  mounted () {
    this.playerControll()
    const _this = this
    // this.init()
    this.changePlaySize()
    window.onresize = () => {
      _this.changePlaySize()
    }
  },
  methods: {
    playerControll () {
      var player = document.getElementById('player')
      player.addEventListener('canplay', () => {
        this.player.duration = (player.duration).toFixed(2) * 1.00
        this.player.progress.total = formatTime(player.duration)
      })
      player.addEventListener('timeupdate', () => {
        this.player.currentTime = (player.currentTime).toFixed(2) * 1.00
        this.player.progress.current = formatTime(player.currentTime)
      })
      function formatTime (t) {
        var h = parseInt(t / 3600)
        h = h < 10 ? ('0' + h) : h
        var m = parseInt(t % 3600 / 60)
        m = m < 10 ? ('0' + m) : m
        var s = parseInt(t % 60)
        s = s < 10 ? ('0' + s) : s
        return h + ':' + m + ':' + s
      }
    },
    progress (value) {
      var player = document.getElementById('player')
      player.currentTime = value * 1.00000000
    },
    init () {
      // 注意：如果不加定时器获取到的值是NaN, 视频还未加载下来，无法同步获取到，使用定时器即可解决
      setTimeout(() => {
        const duration = document.getElementById('player').duration
        this.player.duration = duration
        this.player.progress.total = (duration / 60).toFixed(0) + ':' + ((duration / 60).toFixed(2) - (duration / 60).toFixed(0))
      }, 800)
    },
    fullscreen () {
      var player = document.getElementById('player')
      player.webkitRequestFullScreen()
    },
    play () {
      var player = document.getElementById('player')
      player.play()
      this.Switch.playBtn = false
      this.Switch.pauseBtn = true
    },
    pause () {
      var player = document.getElementById('player')
      player.pause()
      this.Switch.playBtn = true
      this.Switch.pauseBtn = false
    },
    volumn () {
      var player = document.getElementById('player')
      // 注意音量的取值范围是[0, 1]
      player.volume = this.player.volumn * 0.01
    },
    qualityChange (quality) {
      this.params.quality = quality
      this.getVideoUrl()
    },
    // 获取视频信息
    async getVideo () {
      const { data: result } = await this.$http.get(`/video/${this.$route.params.id}`)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.video = result.data
      this.params.quality = this.video.quality[0]
      this.getVideoUrl()
      this.getVideoList(this.video.media_id)
      this.getMedia(this.video.media_id)
    },
    // 获取视频资源
    async getVideoUrl () {
      const { data: result } = await this.$http.get(`/resource/video/${this.$route.params.id}`, { params: this.params })
      this.url = result
      this.Switch.playBtn = true
      this.Switch.pauseBtn = false
    },
    // 自动调整播放器大小
    changePlaySize () {
      const contentWidth = this.$refs.contentRef.offsetWidth
      this.player.size.width = contentWidth - 20
      this.player.size.height = (contentWidth - 20) * 0.5625
    },
    // 获取视频选集列表
    async getVideoList (id) {
      const { data: result } = await this.$http.get('/video', { params: { media_id: id } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.list = result.data
    },
    // 获取media信息
    async getMedia (id) {
      const { data: result } = await this.$http.get(`/media/${id}`)
      if (result.status !== 200) {
        return this.$message.error('媒体信息加载失败')
      }
      this.media = result.data
      if (this.media.has_series) {
        this.getSeries(this.media.series_id)
      }
    },
    // 获取系列信息
    async getSeries (id) {
      const { data: result } = await this.$http.get('/media', { params: { series_id: id } })
      if (result.status !== 200) {
        return this.$message.error('系列信息加载失败')
      }
      this.series = result.data
    }
  },
  destroyed () {
    window.onreset = null
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
// 播放器样式
.wrap{
  background-color: black;
  .video-title{
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 10px;
    color: #FFF;
    p {
      margin: 0px;
    }
  }
  .player {
    width: 100%;
    text-align: center;
  }
  .player-control {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
  }
}
.popper {
  padding: 0px;
}
</style>
