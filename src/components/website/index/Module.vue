<template>
  <div class="module-container">
    <div class="module-title">
      <h3 :id="title"># {{ title }}</h3>
      <div class="module-title-btn">
        <el-button type="text" icon="el-icon-refresh" @click="changeList()">换一批</el-button>
        <el-button type="text" @click="gotoPage('/category')">更多 >></el-button>
      </div>
    </div>
    <el-row class="module-body" :gutter="10">
      <el-col :span="6" v-for="item in media.list" :key="item.id">
        <el-link :underline="false" :href=" '/media/' + item.id ">
          <el-image :src="item.cover_url" fit="contain"></el-image>
          <i class="el-icon-star-on"></i>
          <span>{{ item.name_zh }}</span>
        </el-link>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Module',
  props: {
    title: {
      type: String,
      default: 'Module'
    },
    type: {
      type: String,
      default: 'recommend'
    }
  },
  data () {
    return {
      media: {
        // 路径参数
        params: {
          category_name: '动漫',
          homepage_recommend: 1,
          tag: 'all'
        },
        // 请求体
        query: {
          // 关键字
          key: '',
          // 当前页面
          pageNum: 1,
          // 每页的结果数
          pageSize: 4,
          // 排序依据
          orderBy: ['weight'],
          // 正序或逆序
          reverse: true
        },
        // 结果总数
        total: 0,
        // media列表
        list: []
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      if (this.type !== 'recommend') {
        this.media.params.tag = this.type
      }
      this.getMediaList()
    },
    // 获取media列表
    async getMediaList () {
      const { data: result } = await this.$http.post('/media', this.media.query, { params: this.media.params })
      if (result.status !== 200) {
        return this.$message.error('媒体信息加载失败')
      }
      this.media.list = result.data.records
      this.media.query.pageNum = result.data.current
      this.media.query.pageSize = result.data.size
      this.media.total = result.data.total
    },
    // 换一批
    changeList () {
      const pageNum = this.media.query.pageNum
      const pageSize = this.media.query.pageSize
      const total = this.media.total
      if (total >= pageNum * (pageSize + 1)) {
        this.media.query.pageNum++
      } else {
        this.media.query.pageNum = 1
      }
      this.getMediaList()
    },
    // 链接跳转
    gotoPage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.module-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.module-body {
  text-align: center;
  span {
    font-weight: bold;
  }
}
</style>
