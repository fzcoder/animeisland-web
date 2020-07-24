<template>
  <div class="header-container">
    <el-link class="brand" :underline="false" href="/">
      <h2><i class="icon-tv-primary-40px" style="margin-right: 5px;"></i>动漫岛</h2>
    </el-link>
    <el-menu mode="horizontal" :router="true" active-text-color="#409EFF">
      <el-input
      v-model="query.key"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      size="small" clearable
      @input="search" @clear="handleClear"></el-input>
      <el-menu-item v-for="item in menu.header" :key="item.id" :index="item.link">
        <template slot="title">
          <i :class="item.icon"></i>
          <span style="font-weight: bold;">{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  inject: ['reload'],
  data () {
    return {
      menu: {
        header: [
          { id: 1, title: '首页', link: '/', icon: 'el-icon-s-home' },
          { id: 2, title: '目录', link: '/category', icon: 'el-icon-s-fold' },
          { id: 3, title: '关于', link: '/about', icon: 'el-icon-info' }
        ]
      },
      query: {
        key: ''
      }
    }
  },
  methods: {
    search (key) {
      if (key !== '') {
        this.$router.push({ path: '/search', query: this.query })
        this.reload()
      } else {
        this.$router.push('/category')
      }
    },
    handleClear () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  width: 64%;
  margin-left: 18%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .brand {
    h2 {
      display: flex;
      align-items: center;
      color: #409EFF;
      margin: 0px;
    }
  }
  .el-menu {
    // border-bottom: 0px;
    display: flex;
    align-items: center;
    .el-input {
      width: 200px;
      margin-right: 15px;
    }
  }
}
</style>
