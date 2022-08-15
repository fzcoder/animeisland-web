<template>
  <div class="app">
    <div class="app-header">
      <Header></Header>
    </div>
    <div class="app-main">
      <div class="app-content">
        <div class="app-content-left">
          <side-bar />
        </div>
        <div class="app-content-main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/web/Header.vue'
import SideBar from '@/components/web/SideBar.vue'
export default defineComponent({
  name: 'Web',
  components: {
    Header,
    'side-bar': SideBar
  }
})
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  display: flex;
  flex-direction: column;
}
.app-header {
  flex: 0;
  width: inherit;
}
.app-main {
  flex: 1;
  overflow-y: auto;
}
.app-content {
  width: inherit;
  height: 100%;
  display: flex;
}
.app-content-left  {
  width: 280px;
  height: 100%;
  min-width: 280x;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #434343;
}
.app-content-left::-webkit-scrollbar {
  width: 5px; 
}
.app-content-left::-webkit-scrollbar-track {
  background-color: #1f1f1f;
}
.app-content-left::-webkit-scrollbar-thumb {
  background: #434343;
  border-radius: 5px;
}
.app-content-main {
  flex: 1;
  overflow-y: auto;
}
</style>
