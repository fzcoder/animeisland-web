<template>
  <!-- 筛选区 -->
  <div class="select">
    <!-- 目录 -->
    <div class="select-radio">
      <h4>目录</h4>
      <el-radio-group v-model="params.category_name" @change="handleChange">
        <el-radio label="all">
          <span>全部</span>
        </el-radio>
        <el-radio v-for="item in select.category" :key="item.value" :label="item.value">
          <span>{{ item.name }}</span>
        </el-radio>
      </el-radio-group>
    </div>
    <!-- 版本 -->
    <div class="select-radio">
      <h4>类型</h4>
      <el-radio-group v-model="params.type_name" @change="handleChange">
        <el-radio label="all">
          <span>全部</span>
        </el-radio>
        <el-radio v-for="item in select.type" :key="item.value" :label="item.value">
          <span>{{ item.name }}</span>
        </el-radio>
      </el-radio-group>
    </div>
    <!-- 分级 -->
    <div class="select-radio">
      <h4>分级</h4>
      <el-radio-group v-model="params.level" @change="handleChange">
        <el-radio label="all">
          <span>全部</span>
        </el-radio>
        <el-radio v-for="item in select.level" :key="item.value" :label="item.value">
          <span>{{ item.name }}</span>
        </el-radio>
      </el-radio-group>
    </div>
    <div class="select-radio-firstchar">
      <h4>首字母</h4>
      <el-radio-group v-model="params.name_firstchar" @change="handleChange">
        <el-radio label="all">
          <span>全部</span>
        </el-radio>
        <el-radio v-for="i in 26" :key="i" :label="String.fromCharCode((64 + i))" class="alphabet">
          <span>{{ String.fromCharCode((64 + i)) }}</span>
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  model: {
    prop: 'params',
    event: 'value-change'
  },
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      select: {
        category: [],
        type: [],
        level: []
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$http.get('/category', { params: { type: '目录' } }).then(res => {
        this.select.category = res.data.data
      })
      this.$http.get('/category', { params: { type: '类型' } }).then(res => {
        this.select.type = res.data.data
      })
      this.$http.get('/category', { params: { type: '分级' } }).then(res => {
        this.select.level = res.data.data
      })
    },
    handleChange () {
      this.$emit('change')
      this.$emit('value-change', this.params)
    }
  }
}
</script>

<style lang="less" scoped>
.select{
  .select-radio{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h4{
      margin-right: 15px;
    }
    .el-radio-group{
      margin-top: 5px;
    }
  }
  .select-radio-firstchar {
    .alphabet {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
