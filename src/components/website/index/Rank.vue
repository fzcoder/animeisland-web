<template>
  <div class="rank-container">
    <div class="rank-title">
      <i class="el-icon-s-data"></i>
      <span style="font-weight: bold;"> 热门</span>
    </div>
    <div class="ranking-item" v-for="(item, index) in ranking.list" :key="item.bvid">
      <el-link :underline="false" :href=" 'https://www.bilibili.com/video/' + item.bvid " target="_blank">
        <p style="margin: 2px; font-weight: bold;">{{ index + 1 }}.{{ item.title }}</p>
        <span>
          <i class="el-icon-view"></i>
          {{ item.play }}
        </span>
        <span>
          <i class="el-icon-star-off"></i>
          {{ item.pts }}
        </span>
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rank',
  data () {
    return {
      ranking: {
        list: []
      }
    }
  },
  created () {
    this.getRankingList()
  },
  methods: {
    async getRankingList () {
      const { data: result } = await this.$http.get('/ranking')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.ranking.list = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.ranking-item {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #F2F6FC;
  border-radius: 8px;
}
</style>
