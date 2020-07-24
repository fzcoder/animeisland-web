<template>
  <div class="timeline-container">
    <div class="timetable-title">
      <i class="el-icon-date"></i>
      <span style="font-weight: bold;"> 新番时间表</span>
    </div>
    <el-tabs v-model="Switch.activeTab" :stretch="true">
      <el-tab-pane v-for="item in timetable" :key="item.date"
      :label="show.week[item.day_of_week - 1]"
      :name="show.week[item.day_of_week - 1]">
        <div class="bugumi-item" v-for="i in item.seasons" :key="i.ep_id">
          <el-link :underline="false" :href="i.url" target="_blank">
            <p style="font-weight: bold; margin: 1px;">
              <i class="el-icon-video-play"></i>
              {{ i.title }}
            </p>
            <span>{{ i.pub_index }} </span>
            <span>{{ i.pub_time }} 播出</span>
          </el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  data () {
    return {
      timetable: [],
      // 展示数据
      show: {
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      Switch: {
        activeTab: '周一'
      }
    }
  },
  created () {
    this.getTimeLine()
  },
  methods: {
    async getTimeLine () {
      const { data: result } = await this.$http.get('/timetable')
      this.timetable = result.data
      for (var i = 0; i < 7; i++) {
        if (this.timetable[i].is_today === 1) {
          this.Switch.activeTab = this.show.week[i]
          break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bugumi-item {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
