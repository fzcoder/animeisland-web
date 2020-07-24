<template>
  <!-- 系列信息 -->
  <div class="series">
    <h4><i class="el-icon-s-unfold"></i> 系列</h4>
    <el-button v-for="item in series" :key="item.id" @click="gotoPath('/media/' + item.id)">
      <h4 style="margin: 0px;">{{ item.name_in_series }}</h4>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Series',
  props: {
    series: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    gotoPath (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
