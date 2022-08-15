<template>
  <div class="app-channel-details">
    <div class="app-channel-details-header">
      <a-form :model="queryParams">
        <a-form-item label="类型" name="type_id">
          <a-radio-group v-model:value="queryParams.type_id" v-on:change="selectItems.type.onChange">
            <a-radio
              v-for="item in selectItems.type.list"
              :key="item.value"
              :value="item.value"
            >{{ item.label  }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="分级" name="grade_id">
          <a-radio-group v-model:value="queryParams.grade_id" v-on:change="selectItems.grade.onChange">
            <a-radio
              v-for="item in selectItems.grade.list"
              :key="item.value"
              :value="item.value"
            >{{ item.label  }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-radio-group v-model:value="queryParams.status" v-on:change="selectItems.status.onChange">
            <a-radio
              v-for="item in selectItems.status.list"
              :key="item.value"
              :value="item.value"
            >{{ item.label  }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="年份" name="release_year">
          <a-select v-model:value="queryParams.release_year" v-on:change="selectItems.releaseYear.onChange">
            <a-select-option
              v-for="item in selectItems.releaseYear.list"
              :key="item.value"
              :value="item.value"
            >{{ item.label  }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="月份" name="release_month">
          <a-select v-model:value="queryParams.release_month" v-on:change="selectItems.releaseMonth.onChange">
            <a-select-option
              v-for="item in selectItems.releaseMonth.list"
              :key="item.value"
              :value="item.value"
            >{{ item.label  }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
    <div class="app-channel-details-content">
      <a-list
        item-layout="horizontal"
        :data-source="records"
        :pagination="pagination"
      >
        <template #header>
          <a-input-search
            v-model:value="keyword"
            placeholder="请输入关键字"
            enter-button
            @search="onSearch"
          />
        </template>
        <template #renderItem="{ item }">
          <div class="app-channel-details-list-item" v-on:click="gotoBangumiDetailsPage(item.id)">
            <a-row :gutter="16">
              <a-col :span="6">
                <a-image :src="item.cover" :preview="false" />
              </a-col>
              <a-col :span="18">
                <a-descriptions :title="item.title" :column="2">
                  <a-descriptions-item label="原标题" :span="2">{{item.originTitle}}</a-descriptions-item>
                  <a-descriptions-item label="类型">{{item.type?.name}}</a-descriptions-item>
                  <a-descriptions-item label="上映时间">{{item.releaseDate}}</a-descriptions-item>
                  <a-descriptions-item label="标签" :span="2">
                    <a-space>
                      <a-tag v-for="tag in item.tags" :key="tag.id" :color="tag.colorHex">{{tag.name}}</a-tag>
                    </a-space>
                  </a-descriptions-item>
                  <a-descriptions-item label="描述" :span="2">{{item.description}}</a-descriptions-item>
                </a-descriptions>
              </a-col>
            </a-row>
          </div>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {
  getRecordsWithCustomParams,
  getTypeList,
  getGradeList,
  getStatusList,
} from '@/api/video/bangumi'
import { getYearList, getMonthList } from '@/api/utils/date'
import { message } from 'ant-design-vue';

type BangumiItemProps = Record<string, any>

const route = useRoute()
const router = useRouter()

const channelId: Ref<string> = ref('')

// result
const records: Ref<BangumiItemProps[]> = ref([])
// 查询参数
const queryParams = reactive({
  key: '',
  page_num: 1,
  page_size: 10,
  channel_id: channelId.value,
  type_id: 'all',
  grade_id: 'all',
  status: -1,
  release_year: 'all',
  release_month: 'all'
})
// 获取番剧列表
const getBangumiList = async () => {
  try {
    const { total, records: _records } = await getRecordsWithCustomParams(queryParams)
    pagination.total = total
    records.value = _records
  } catch (err: any) {
    message.error(err)
  }
}

// 选择项
const selectItems = reactive({
  type: {
    list: [{ value: "all", label: "全部" }],
    onChange: (e: any) => {
      const currentValue = e.target?.value as string
      queryParams.type_id = currentValue
      getBangumiList()
    }
  },
  grade: {
    list: [{ value: "all", label: "全部" }],
    onChange: (e: any) => {
      const currentValue = e.target?.value as string
      queryParams.grade_id = currentValue
      getBangumiList()
    }
  },
  status: {
    list: [{ value: -1, label: "全部" }],
    onChange: (e: any) => {
      const currentValue = e.target?.value as number
      queryParams.status = currentValue
      getBangumiList()
    }
  },
  releaseYear: {
    list: [{ value: "all", label: "全部" }],
    onChange: (value: string) => {
      queryParams.release_year = value
      getBangumiList()
    }
  },
  releaseMonth: {
    list: [{ value: "all", label: "全部" }],
    onChange: (value: string) => {
      queryParams.release_month = value
      getBangumiList()
    }
  }
});

const getSelectItems = async () => {
  try {
    const typeList = await getTypeList(channelId.value)
    typeList.forEach(item => {
      selectItems.type.list.push({ value: item.id, label: item.name })
    })
    const gradeList = await getGradeList(channelId.value)
    gradeList.forEach(item => {
      selectItems.grade.list.push({ value: item.id, label: item.name })
    })
    const statusList = await getStatusList()
    statusList.forEach(item => {
      selectItems.status.list.push({ value: item.value, label: item.label })
    })
    const yearList = await getYearList()
    yearList.forEach(item => {
      selectItems.releaseYear.list.push({ value: item.value, label: item.label })
    })
    const monthList = await getMonthList()
    monthList.forEach(item => {
      selectItems.releaseMonth.list.push({ value: item.value, label: item.label })
    })
  } catch (err: any) {
    return message.error(err)
  }
}

const keyword = ref('')
const onSearch = (value: string) => {
  queryParams.key = value
  getBangumiList()
}

// 分页配置
const pagination = {
  onChange: (page: number, pageSize: number) => {
    queryParams.page_num = page
    queryParams.page_size = pageSize
    getBangumiList()
  },
  total: 0,
  showQuickJumper: true,
  showSizeChanger: true,
  showLessItems: true,
  showTotal: (total: number) => `共 ${total} 条数据`
}

const gotoBangumiDetailsPage = (id: string) => {
  router.push(`/bangumi/details/${id}`)
}

const initData = () => {
  pagination.total = 0
  records.value = []
  queryParams.key = ''
  queryParams.page_num = 1
  queryParams.page_size = 10
  queryParams.channel_id = channelId.value
  queryParams.type_id = 'all'
  queryParams.grade_id = 'all'
  queryParams.status = -1
  queryParams.release_year = 'all'
  queryParams.release_month = 'all'
  selectItems.type.list = [{value: 'all', label: '全部'}]
  selectItems.grade.list = [{value: 'all', label: '全部'}]
  selectItems.status.list = [{value: -1, label: '全部'}]
  selectItems.releaseYear.list = [{value: 'all', label: '全部'}]
  selectItems.releaseMonth.list = [{value: 'all', label: '全部'}]
}

watchEffect(() => {
  const newChannelId = route.params.id
  if (newChannelId) {
    if (channelId.value === '' || newChannelId as string !== channelId.value) {
      (async () => {
        channelId.value = newChannelId as string
        initData()
        await getBangumiList()
        await getSelectItems()
      })()
    }
  }
})
</script>

<style lang="less" scoped>
.app-channel-details {
  width: 1000px;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  border-left: 1px solid #434343;
  border-right: 1px solid #434343;
}
.app-channel-details::-webkit-scrollbar {
  width: 5px; 
}
.app-channel-details::-webkit-scrollbar-track {
  background-color: #1f1f1f;
}
.app-channel-details::-webkit-scrollbar-thumb {
  background: #434343;
  border-radius: 5px;
}
.app-channel-details-list-item {
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #434343;
}
.app-channel-details-list-item:hover {
  cursor: pointer;
}
</style>
