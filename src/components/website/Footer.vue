<template>
  <div class="footer-container">
    <div class="declare" v-if="false">
      <span style="color: #606266; font-size: small;">声明：{{ declare }}</span>
    </div>
    <div class="friends-link">
      <span style="font-weight: bold; color: #606266; font-size: small;">传送门：</span>
      <el-link v-for="item in links.friends" :key="item.name" :underline="false" :href="item.url" target="_blank">
        <span style="margin-left: 5px; margin-right: 5px;">{{ item.name }}</span>
      </el-link>
    </div>
    <div class="copyright">
      <span style="color: #606266; font-size: small;">{{ copyright }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      links: {
        friends: [
          { name: 'AcFun', url: 'https://www.acfun.cn/' },
          { name: '哔哩哔哩', url: 'https://www.bilibili.com/' },
          { name: '动漫之家', url: 'https://www.dmzj.com/' },
          { name: '萌娘百科', url: 'https://zh.moegirl.org/' },
          { name: 'Bangumi 番组计划', url: 'https://bangumi.tv/' },
          { name: 'ニコニコ動画', url: 'https://www.nicovideo.jp/' },
          { name: 'pixiv', url: 'https://www.pixiv.net/' }
        ]
      },
      declare: '本站所有资源均来自互联网，所有资源只用于个人收藏，不用于商业目的！',
      copyright: 'Copyright © 2020 anime.skydrive.com All Rights Reserved.'
    }
  }
}
</script>

<style lang="less" scoped>
.footer-container {
  width: 64%;
  margin-left: 18%;
  text-align: center;
}
.copyright {
  margin-bottom: 15px;
}
</style>
