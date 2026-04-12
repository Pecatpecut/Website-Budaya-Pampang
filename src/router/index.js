import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BeritaDetail from '../views/BeritaDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/berita/:id', component: BeritaDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router