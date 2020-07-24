import Vue from 'vue'
import VueRouter from 'vue-router'
// 网站主体
const Website = () => import(/* webpackChunkName: "frame" */ '@/views/Website.vue')
const Index = () => import(/* webpackChunkName: "index" */ '@/views/website/Index.vue')
const Category = () => import(/* webpackChunkName: "category" */ '@/views/website/Category.vue')
const Search = () => import(/* webpackChunkName: "search" */ '@/views/website/Search.vue')
const Media = () => import(/* webpackChunkName: "media" */ '@/views/website/Media.vue')
const Video = () => import(/* webpackChunkName: "video" */ '@/views/website/Video.vue')
const About = () => import(/* webpackChunkName: "about" */ '@/views/website/About.vue')
// 错误提醒
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
const Mobile = () => import(/* webpackChunkName: "mobile" */ '@/views/Mobile.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  // 开启历史模式
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Website,
      meta: { requireLogin: false },
      children: [
        { path: '', component: Index, meta: { requireLogin: false } },
        { path: '/category', component: Category, meta: { requireLogin: false } },
        { path: '/search', component: Search, meta: { requireLogin: false } },
        { path: '/media/:id', component: Media, meta: { requireLogin: false } },
        { path: '/video/:id', component: Video, meta: { requireLogin: false } },
        { path: '/about', component: About, meta: { requireLogin: false } }
      ]
    },
    { path: '/mobile', component: Mobile, meta: { requireLogin: false } },
    { path: '*', component: NotFound, meta: { requireLogin: false } }
  ]
})

export default router
