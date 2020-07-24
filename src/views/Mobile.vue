<template>
  <el-container>
    <el-header style="display: flex; align-items: center; background-color: snow;">
      <el-link class="brand" :underline="false" href="/mobile">
        <i class="icon-tv-primary-40px" style="margin-right: 5px;"></i>
      </el-link>
      <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" style="margin-left: 8px; margin-right: 8px;"></el-input>
      <el-button type="primary" size="small">下载App</el-button>
    </el-header>
    <el-main style="padding: 0px; height: 752px;">
      <div v-for="item in media.list" :key="item.id" style="padding: 10px;">
        <el-link :underline="false">
          <h3>{{ item.name_zh }}</h3>
        </el-link>
        <div class="item-tags">
          <el-tag v-for="tag in item.tags" :key="tag">{{ tag }}</el-tag>
        </div>
        <p>简介：{{ item.introduction }}</p>
      </div>
      <div style="text-align: center; margin-bottom: 10px;">
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      media: {
        // 路径参数
        params: {
          category_name: 'all',
          type_name: 'all',
          level: 'all',
          tag: 'all',
          name_firstchar: 'all'
        },
        // 请求体
        query: {
          // 关键字
          key: '',
          // 当前页面
          pageNum: 1,
          // 每页的结果数
          pageSize: 10,
          // 排序依据
          orderBy: ['id'],
          // 正序或逆序
          reverse: false
        },
        // 结果总数
        total: 0,
        // media列表
        list: []
      }
    }
  },
  created () {
    this.getMediaList()
  },
  methods: {
    // 获取media列表
    async getMediaList () {
      const { data: result } = await this.$http.post('/media', this.media.query, { params: this.media.params })
      if (result.status !== 200) {
        return this.$message.error('媒体信息加载失败')
      }
      this.media.list = result.data.records
    }
  }
}
</script>

<style lang="less" scoped>
</style>
