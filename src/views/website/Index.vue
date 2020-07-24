<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 走马灯 -->
        <el-carousel height="360px" :interval="5000" arrow="always">
          <el-carousel-item v-for="item in carousel" :key="item.id">
            <a :href="item.url">
              <el-image :src="item.pic" fit="contain"></el-image>
            </a>
          </el-carousel-item>
        </el-carousel>
        <!-- 按钮组 -->
        <BtnGroup :module="module" style="margin-top: 20px;"></BtnGroup>
        <!-- 模块区 -->
        <div class="module">
          <Module v-for="item in module" :key="item.title" :title="item.title" :type="item.type"></Module>
        </div>
      </el-col>
      <el-col :span="6">
        <!-- 时间表 -->
        <TimeTable></TimeTable>
        <!-- 排行榜 -->
        <Rank style="margin-top: 20px;"></Rank>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Module from '@/components/website/index/Module.vue'
import TimeTable from '@/components/website/index/TimeTable.vue'
import Rank from '@/components/website/index/Rank.vue'
import BtnGroup from '@/components/website/index/BtnGroup.vue'
export default {
  name: 'Index',
  components: {
    Module,
    TimeTable,
    Rank,
    BtnGroup
  },
  data () {
    return {
      // 走马灯
      carousel: [],
      // 模块
      module: [
        { title: '推荐', type: 'recommend' },
        { title: '校园', type: '校园' },
        { title: '日常', type: '日常' },
        { title: '社团', type: '社团' },
        { title: '音乐', type: '音乐' },
        { title: '战斗', type: '战斗' },
        { title: '奇幻', type: '奇幻' },
        { title: '百合', type: '百合' },
        { title: '泡面', type: '泡面' }
      ]
    }
  },
  created () {
    this.getCarouselList()
  },
  methods: {
    async getCarouselList () {
      const { data: result } = await this.$http.get('/carousel')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.carousel = result.data
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
