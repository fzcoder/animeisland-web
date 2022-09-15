import * as VueRouter from 'vue-router'
// 网站主体
const AppContainer = () => import(/* webpackChunkName: "container" */'@/components/app/AppContainer.vue')
const Home = () => import(/* webpackChunkName: "index" */ '@/views/home/Index.vue')
const ChannelDetails = () => import(/* webpackChunkName: "category" */ '@/views/channel/Details.vue')
const BangumiDetails = () => import(/* webpackChunkName: "media" */ '@/views/bangumi/Details.vue')
const BangumiPlay = () => import(/* webpackChunkName: "video" */ '@/views/bangumi/Play.vue')
// 错误提醒
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue')

const router = VueRouter.createRouter({
  // 开启历史模式
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AppContainer,
      meta: {
        requireLogin: false,
        title: '动漫岛 | 首页'
      },
      children: [
        {
          path: '',
          component: Home,
          meta: {
            requireLogin: false,
            title: '动漫岛 | 首页'
          }
        },
        {
          path: '/channel/:id',
          component: ChannelDetails,
          meta: {
            requireLogin: false,
            title: '动漫岛 | 频道'
          }
        },
        {
          path: '/bangumi/details/:id',
          component: BangumiDetails,
          meta: {
            requireLogin: false,
            title: '动漫岛 | 番剧详情'
          }
        },
        {
          path: '/bangumi/play/:episodeId',
          component: BangumiPlay,
          meta: {
            requireLogin: false,
            title: '动漫岛 | 播放番剧'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: NotFound,
      meta: {
        requireLogin: false,
        title: '动漫岛 | 404 NotFound'
      }
    }
  ]
})

router.beforeEach((to, from) => {
  document.title = to.meta.title as string
})

export default router
