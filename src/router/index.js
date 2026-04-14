import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TentangKami from '../views/TentangKami.vue'
import Publikasi from '@/views/Publikasi.vue'
import Kontak from '@/views/Kontak.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/tentang', component: TentangKami },
  { path: '/publikasi', component: Publikasi },
  { path: '/kontak', component: Kontak }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})



export default router