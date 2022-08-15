<template>
  <div class="app-content-sidebar">
    <div class="app-content-sidebar-nav">
      <div class="app-content-sidebar-nav-item" v-on:click="gotoPage('/')">
        <home-outlined />
        <span>首页</span>
      </div>
    </div>
    <div class="app-content-sidebar-channel">
      <div class="app-content-sidebar-channel-title">
        <span>频道</span>
      </div>
      <div class="app-content-sidebar-channel-list">
        <div
          class="app-content-sidebar-channel-item"
          v-for="channel in channelList"
          :key="channel.id"
          v-on:click="gotoPage(`/channel/${channel.id}`)"
        >
          <number-outlined />
          <span>{{ channel.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/api/axios'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { HomeOutlined, NumberOutlined } from '@ant-design/icons-vue'
const router = useRouter()

const channelList: Ref<Record<string, any>[]> = ref([])

const getChannelList = async () => {
  try {
    const { data: result } = await axiosInstance.get('/video/channel', {
      params: { uid: '' }
    })
    channelList.value = result.data
  } catch (err: any) {
    message.error(err)
  }
}
const gotoPage = (path: string) => {
  router.push(path)
}
getChannelList()
</script>

<style lang="less" scoped>
.app-content-sidebar-nav {
  padding-bottom: 8px;
  border-bottom: 1px solid #434343;
}
.app-content-sidebar-nav-item {
  width: 100%;
  padding: 16px 0px 16px 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.app-content-sidebar-nav-item:hover {
  background-color: #434343;
  color: #1890ff;
  cursor: pointer;
}
.app-content-sidebar-channel-title {
  padding-left: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 10pt;
  color: #434343;
}
.app-content-sidebar-channel-item {
  width: 100%;
  padding: 16px 0px 16px 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.app-content-sidebar-channel-item:hover {
  background-color: #434343;
  color: #1890ff;
  cursor: pointer;
}
</style>
