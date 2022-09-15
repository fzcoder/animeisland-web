<template>
  <div class="app-bangumi-play">
    <div class="app-bangumi-play-header">
      <div class="app-bangumi-play-player-wrapper">
        <div class="app-bangumi-play-player-header">
          <span>{{ `${currentEpisode.orderName} ${currentEpisode.title}` }}</span>
        </div>
        <video
          id="video-player"
          :src="currentVideoSource.url"
          controls
          autoplay
        />
        <div class="app-bangumi-play-controls" v-if="false">
          <a-radio-group
            v-model:value="currentVideoSourceId"
            size="small"
            button-style="solid"
            @change="changeSource"
          >
            <a-radio-button
              v-for="source in currentVideoItem.srcList"
              :key="source.id"
              :value="source.id"
            >{{ source.quality }}</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="app-bangumi-play-content">
      <a-tabs>
        <a-tab-pane key="episodes">
          <template #tab>
            <div class="app-bangumi-play-content-tab-item">
              <menu-unfold-outlined />
              <span>剧集</span>
            </div>
          </template>
          <div class="app-bangumi-play-episode-list">
            <a-row :gutter="8">
              <a-col :span="12" v-for="episode in episodeList" :key="episode.id">
                <div :class="episode.id === currentEpisode.id ? `app-bangumi-play-episode-item app-bangumi-play-episode-item-current` : 'app-bangumi-play-episode-item'" v-on:click="changeEpisode(episode.id)">
                  <h4>{{ episode.orderName }}</h4>
                  <span>{{ episode.title }}</span>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        <a-tab-pane key="details">
          <template #tab>
            <div class="app-bangumi-play-content-tab-item">
              <InfoCircleOutlined />
              <span>详情</span>
            </div>
          </template>
          <div class="app-bangumi-play-info">
            <a-descriptions :column="2">
              <a-descriptions-item label="名称" :span="2">
                <span>{{ bangumi?.title }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="类型" :span="2">
                <span>{{ bangumi?.type?.name }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="上映时间" :span="2">
                <span>{{ bangumi.releaseDate }}</span>
              </a-descriptions-item>
              <a-descriptions-item label="标签" :span="2">
                <a-space>
                  <a-tag v-for="tag in bangumi.tags" :key="tag.id" :color="tag.colorHex">{{ tag.name }}</a-tag>
                </a-space>
              </a-descriptions-item>
              <a-descriptions-item label="描述" :span="2">
                <span>{{ bangumi.description }}</span>
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/api/axios'
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getView, getList } from '@/api/video/episode'
import { getView as getBangumiView } from '@/api/video/bangumi'
import { message } from 'ant-design-vue'
import { MenuUnfoldOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

type EpisodeProps = Record<string, any>
type VideoItemProps = Record<string, any>
type VideoSourceProps = Record<string, any>
type BangumiProps = Record<string, any>

const route = useRoute()
const router = useRouter()

const episodeId = ref('')
const currentEpisode: Ref<EpisodeProps> = ref({})
const currentVideoItem: Ref<VideoItemProps> = ref({})
const currentVideoSource: Ref<VideoSourceProps> = ref({})
const episodeList: Ref<EpisodeProps[]> = ref([])
const currentVideoSourceId = ref('')
const bangumi: Ref<BangumiProps> = ref({})

const getEpisode = async () => {
  try {
    const data = await getView(episodeId.value)
    currentEpisode.value = data
    await getVideoItem()
    await getEpisodeList(currentEpisode.value.bangumiId)
    await getBangumi(currentEpisode.value.bangumiId)
  } catch (err: any) {
    message.error(err)
  }
}
const getEpisodeList = async (bangumiId: string) => {
  try {
    const list = await getList(bangumiId)
    episodeList.value = list
  } catch (err: any) {
    return Promise.reject(err)
  }
}
const getVideoItem = async () => {
  try {
    const { data: result } = await axiosInstance.get(`/video/item/play/${currentEpisode.value.videoId}`)
    currentVideoItem.value = result.data
    currentVideoSourceId.value = currentVideoItem.value.srcList[0].id
    await getVideoSource()
  } catch (err: any) {
    return Promise.reject(err)
  }
}
const getVideoSource = async () => {
  try {
    const { data: result } = await axiosInstance.get(`/video/source/play/${currentVideoSourceId.value}`)
    currentVideoSource.value = result.data
  } catch (err: any) {
    return Promise.reject(err)
  }
}

const getBangumi = async (bangumiId: string) => {
  try {
    const data = await getBangumiView(bangumiId)
    bangumi.value = data
  } catch (err: any) {
    return Promise.reject(err)
  }
}
const changeEpisode = (episodeId: string) => {
  router.push(`/bangumi/play/${episodeId}`)
}

const changeSource = (e: any) => {
  const newVideoSourceId = e.target.value as string
  currentVideoSourceId.value = newVideoSourceId
  getVideoSource()
}

watchEffect(() => {
  const newEpisodeId = route.params.episodeId
  if (newEpisodeId) {
    if (episodeId.value === '' || newEpisodeId as string !== episodeId.value) {
      episodeId.value = newEpisodeId as string
      (async () => {
        await getEpisode()
      })()
    }
  }
})
</script>

<style lang="less" scoped>
.app-bangumi-play {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  border-left: 1px solid #434343;
  border-right: 1px solid #434343;
}
.app-bangumi-play-header {
  display: flex;
}
.app-bangumi-play-player-wrapper {
  width: 100%;
  background-color: #000;
}
.app-bangumi-play-player-header {
  padding: 8px;
  background-color: #000;
  color: #fff;
}
#video-player { 
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.app-bangumi-play-controls {
  width: 768px;
  height: 30px;
  padding-left: 6px;
  padding-right: 6px;
}
.app-bangumi-play-content-tab-item {
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
}
.app-bangumi-play-episode-list {
  padding-left: 16px;
  padding-right: 16px;
  height: inherit;
}
.app-bangumi-play-episode-item-current {
  color: #1890ff;
  h4 {
    color: #1890ff; 
  }
}
.app-bangumi-play-episode-item {
  padding: 8px;
  background-color: #434343;
  border-radius: 8px;
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.app-bangumi-play-episode-item:hover {
  cursor: pointer;
}
.app-bangumi-play-info {
  padding: 8px 16px;
}
</style>
