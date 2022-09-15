<template>
  <div class="app-home">
    <div v-for="channel in channelList" :key="channel.id">
      <a-list
        item-layout="horizontal"
        :data-source="channel.bangumiList"
        :grid="{ gutter: 16, column: 2 }"
        v-if="channel.bangumiList.length > 0"
      >
        <template #header>
          <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
            <a-space>
              <NumberOutlined />
              <span>{{channel.name}}</span>
            </a-space>
            <a-button type="link" @click="getChannelDetails(channel.id)">更多</a-button>
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <div @click="getBangumiDetails(item.id)">
              <a-space direction="vertical" :style="{display: 'flex'}">
                <a-image :src="item.cover" :preview="false" :style="{borderRadius: '6px'}" />
                <h4>{{item.title}}</h4>
              </a-space>
            </div>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from "vue";
import { useRouter } from 'vue-router'
import { NumberOutlined } from '@ant-design/icons-vue'
import { getChannelList } from '@/api/video/channel';
import { getRecordsWithCustomParams, BangumiProps } from '@/api/video/bangumi';
import { message } from 'ant-design-vue';
type Channel = {
  id: string,
  name: string,
  bangumiList: BangumiProps[]
};
const router = useRouter();
const channelList: Ref<Channel[]> = ref([]);
  getChannelList().then(data => {
    data.forEach((item) => {
      getRecordsWithCustomParams({page_num: 1, page_size: 8, channel_id: item.id})
      .then(({records}) => {
        const channel: Channel = {
          id: item.id,
          name: item.name,
          bangumiList: records
        }
        channelList.value = [...channelList.value, channel];
      })
    });
  }).catch(err => {
    message.error(err)
  });
  const getChannelDetails = (channelId: string) => {
    router.push(`/channel/${channelId}`)
  }
  const getBangumiDetails = (bangumiId: string) => {
    router.push(`/bangumi/details/${bangumiId}`)
  }
</script>

<style lang="less" scoped>
.app-home {
  width: 100%;
  padding: 20px;
}
</style>
