<template>
  <div class="container">
    <h3># 搜索结果</h3>
    <!-- 列表区 -->
    <List :list="media.list"></List>
    <!-- 分页区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="media.query.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="media.query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="media.total"
      background>
      </el-pagination>
  </div>
</template>

<script>
import List from '@/components/website/category/List.vue'
export default {
  name: 'Search',
  components: {
    List
  },
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
    this.media.query.key = this.$route.query.key
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
      this.media.query.pageNum = result.data.current
      this.media.query.pageSize = result.data.size
      this.media.total = result.data.total
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.media.query.pageSize = newSize
      this.getMediaList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.media.query.pageNum = newPage
      this.getMediaList()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 60%;
  margin-left: 20%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-pagination {
  margin-bottom: 15px;
}
</style>
