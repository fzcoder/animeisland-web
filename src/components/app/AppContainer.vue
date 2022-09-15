<template>
  <div v-if="isMobile" class="app-container">
    <div class="app-top">
      <a class="brand" :underline="false" href="/">
        <h3><i class="icon-tv-primary-24px" style="margin-right: 5px;"></i>动漫岛</h3>
      </a>
    </div>
    <div class="app-body">
      <router-view />
    </div>
    <div class="app-bottom">
    </div>
  </div>
  <div v-if="!isMobile" class="pc">
    <div class="pc-container">
      <div class="app-top">
        <a class="brand" :underline="false" href="/">
          <h3><i class="icon-tv-primary-24px" style="margin-right: 5px;"></i>动漫岛</h3>
        </a>
      </div>
      <div class="app-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "AppContainer",
  data() {
    return {
      isMobile: navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    }
  }
})
</script>
<style scoped lang="less">
.app-container {
  height: inherit;
}
.pc {
  margin: 0 auto;
}
.pc-container {
  width: 480px;
  height: 100%;
  margin: 0 auto;
  border-left: 1px solid #434343;
  border-right: 1px solid #434343;
}
.app-top {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #1f1f1f;
  z-index: 100;
  border-bottom: solid 1px #434343;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.app-pc-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.app-bottom {
  border-top: solid 1px #434343;
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #1f1f1f;
  padding: 16px;
}
.brand {
  h3 {
    display: flex;
    align-items: center;
    color: #1890ff;
    margin: 0px;
  }
}
</style>