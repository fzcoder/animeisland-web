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
        <div class="app-bangumi-play-controls">
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
      <div class="app-bangumi-play-episode-list">
        <div class="app-bangumi-play-episode-list-header">
          <span>剧集</span>
        </div>
        <div class="app-bangumi-play-episode-list-content">
          <div
            :class="episodeId === episode.id ? `app-bangumi-play-episode-list-content-item-current` : `app-bangumi-play-episode-list-content-item`"
            v-for="episode in episodeList"
            :key="episode.id"
            v-on:click="changeEpisode(episode.id)"
          >
            <span>{{ `${episode.orderName} ${episode.title}` }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="app-bangumi-play-content">
      <div class="app-bangumi-play-info">
        <a-row>
          <a-col :span="6">
            <a-image :src="bangumi.cover" />
          </a-col>
          <a-col :span="18">
            <div style="padding: 16px;">
              <a-descriptions :column="2">
                <template #title>
                  <a v-on:click="gotoBangumiDetailsPage">
                    <h4>{{ bangumi.title }}</h4>
                  </a>
                </template>
                <a-descriptions-item label="类型">
                  <span>{{ bangumi?.type?.name }}</span>
                </a-descriptions-item>
                <a-descriptions-item label="上映时间">
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
          </a-col>
        </a-row>
      </div>
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

const gotoBangumiDetailsPage = () => {
  router.push(`/bangumi/details/${bangumi.value.id}`)
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
  width: 1000px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  border-left: 1px solid #434343;
  border-right: 1px solid #434343;
}
.app-bangumi-play::-webkit-scrollbar {
  width: 5px; 
}
.app-bangumi-play::-webkit-scrollbar-track {
  background-color: #1f1f1f;
}
.app-bangumi-play::-webkit-scrollbar-thumb {
  background: #434343;
  border-radius: 5px;
}
.app-bangumi-play-header {
  display: flex;
  height: 506px;
}
.app-bangumi-play-player-wrapper {
  width: 768px;
  height: 506px;
  background-color: #000;
  border-bottom: 1px solid #434343;
}
.app-bangumi-play-player-header {
  width: 768px;
  height: 38px;
  padding: 8px 16px 8px 16px;
  background-color: #000;
  color: #fff;
}
#video-player { 
  width: 768px;
  height: 432px;
  padding: 0px;
  margin: 0px;
}
.app-bangumi-play-controls {
  width: 768px;
  height: 30px;
  padding-left: 6px;
  padding-right: 6px;
}
.app-bangumi-play-episode-list {
  width: 100%;
  height: 506px;
  background-color: #1f1f1f;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #434343;
  border-bottom: 1px solid #434343;
}
.app-bangumi-play-episode-list-header {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #434343;
  flex: 0;
}
.app-bangumi-play-episode-list-content {
  padding: 8px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
}
.app-bangumi-play-episode-list-content::-webkit-scrollbar {
  width: 5px; 
}
.app-bangumi-play-episode-list-content::-webkit-scrollbar-track {
  background-color: #1f1f1f;
}
.app-bangumi-play-episode-list-content::-webkit-scrollbar-thumb {
  background: #434343;
  border-radius: 5px;
}
.app-bangumi-play-episode-list-content-item {
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.app-bangumi-play-episode-list-content-item-current {
  padding: 8px;
  background-color: #434343;
  color: #1890ff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.app-bangumi-play-episode-list-content-item:hover {
  cursor: pointer;
  background-color: #434343;
}
.app-bangumi-play-info  {
  padding: 16px;
}
</style>
