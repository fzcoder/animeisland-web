<template>
  <div class="group-container">
    <div class="btn-group">
      <el-button type="danger" circle icon="el-icon-s-home" @click="gotoPage('/')"></el-button>
      <el-button type="primary" circle icon="el-icon-s-fold" @click="gotoPage('/category')"></el-button>
    </div>
    <div class="tag-group">
      <el-link v-for="(item, index) in module" :key="item.title" :underline="false" :href=" '#' + item.title ">
        <el-tag :type="show.tags[index%4]">
          <span>{{ item.title }}</span>
        </el-tag>
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BtnGroup',
  props: {
    module: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      show: {
        tags: ['success', 'primary', 'warning', 'danger']
      }
    }
  },
  methods: {
    gotoPage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.group-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.tag-group {
  margin-left: 10px;
  .el-tag {
    margin-left: 2px;
    margin-right: 2px;
  }
}
</style>
