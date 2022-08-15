<template>
  <div class="app-bangumi-details-bg">
    <div class="app-bangumi-details">
      <div
        class="app-bangumi-details-info"
        :style="{
          'background-image': `url(${bangumi.cover})`,
        }"
      >
        <div class="app-bangumi-details-info-wrapper">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-image :src="bangumi.cover" />
            </a-col>
            <a-col :span="16">
              <div class="app-bangumi-details-info-content">
                <a-descriptions
                  :column="2"
                  :labelStyle="{color: '#fff'}"
                  :contentStyle="{color: '#fff'}"
                >
                  <template #title>
                    <h3 :style="{color: '#fff'}">{{ bangumi.title }}</h3>
                  </template>
                  <a-descriptions-item label="原标题" :span="2">
                    <span>{{ bangumi.originTitle }}</span>
                  </a-descriptions-item>
                  <a-descriptions-item label="类型">
                    <span>{{ bangumi.type?.name }}</span>
                  </a-descriptions-item>
                  <a-descriptions-item label="上映时间">
                    <span>{{ bangumi.releaseDate }}</span>
                  </a-descriptions-item>
                  <a-descriptions-item label="标签" :span="2">
                    <a-tag v-for="tag in bangumi.tags" :key="tag.id" :color="tag.colorHex">{{ tag.name }}</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="描述" :span="2">
                    <span>{{ bangumi.description }}</span>
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="app-bangumi-details-content">
        <a-tabs>
          <a-tab-pane key="episode">
            <template #tab>
              <div class="app-bangumi-details-content-tab-item">
                <menu-unfold-outlined />
                <span>剧集</span>
              </div>
            </template>
            <div class="app-bangumi-details-episode-list">
              <a-row :gutter="8">
                <a-col :span="6" v-for="episode in episodeList" :key="episode.id">
                  <div class="app-bangumi-details-episode-item" v-on:click="playEpisode(episode.id)">
                    <h4>{{ episode.orderName }}</h4>
                    <span>{{ episode.title }}</span>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getView } from '@/api/video/bangumi'
import { getList } from '@/api/video/episode'
import { message } from 'ant-design-vue'
import { MenuUnfoldOutlined } from '@ant-design/icons-vue'

type BangumiProps = Record<string, any>
type EpisodeProps = Record<string, any>

const route = useRoute();
const router = useRouter();

const bangumiId = ref('')
const bangumi: Ref<BangumiProps> = ref({})
const episodeList: Ref<EpisodeProps[]> = ref([])

const getBangumiInfo = async () => {
  try {
    const data = await getView(bangumiId.value)
    bangumi.value = data
  } catch (err: any) {
    message.error(err)
  }
}

const getEpisodeList = async () => {
  try {
    const data = await getList(bangumiId.value)
    episodeList.value = data
  } catch (err: any) {
    message.error(err)
  }
}

const playEpisode = (id: string) => {
  router.push(`/bangumi/play/${id}`)
}

watchEffect(() => {
  const newBangumiId = route.params.id
  if (newBangumiId) {
    if (bangumiId.value === '' || newBangumiId as string !== bangumiId.value) {
      bangumiId.value = newBangumiId as string
      (async () => {
        await getBangumiInfo();
        await getEpisodeList();
      })()
    }
  }
})

</script>

<style lang="less" scoped>
.app-bangumi-details-bg {
  width: inherit;
  height: 100%;
}
.app-bangumi-details {
  width: 1000px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  border-left: 1px solid #434343;
  border-right: 1px solid #434343;
  display: flex;
  flex-direction: column;
}
.app-bangumi-details::-webkit-scrollbar {
  width: 5px; 
}
.app-bangumi-details::-webkit-scrollbar-track {
  background-color: #1f1f1f;
}
.app-bangumi-details::-webkit-scrollbar-thumb {
  background: #434343;
  border-radius: 5px;
}
.app-bangumi-details-info-wrapper {
  backdrop-filter: blur(40px);
}
.app-bangumi-details-info-content {
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 16px;
}
.app-bangumi-details-content {
  flex: 1;
}
.app-bangumi-details-content-tab-item {
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
}
.app-bangumi-details-episode-list {
  padding-left: 16px;
  padding-right: 16px;
  height: inherit;
}
.app-bangumi-details-episode-item {
  padding: 8px;
  background-color: #434343;
  border-radius: 8px;
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.app-bangumi-details-episode-item:hover {
  cursor: pointer;
}
</style>
