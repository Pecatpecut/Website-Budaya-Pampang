import { createRouter, createWebHistory } from 'vue-router'

/* ================= PUBLIC ================= */
import HomePublic from '@/views/public/Home.vue'
import Tentang from '@/views/public/TentangKami.vue'
import Publikasi from '@/views/public/Publikasi.vue'
import Kontak from '@/views/public/Kontak.vue'

/* ================= AUTH ================= */
import Login from '@/views/admin/Login.vue'

/* ================= ADMIN ================= */
import DashboardLayout from '@/views/admin/Dashboard.vue'
import Home from '@/views/admin/Home.vue'
import Galeri from '@/views/admin/Galeri.vue'
import Agenda from '@/views/admin/Agenda.vue'

const routes = [
  /* ===== PUBLIC ROUTES ===== */
  { path: '/', component: HomePublic },
  { path: '/tentang', component: Tentang },
  { path: '/publikasi', component: Publikasi },
  { path: '/kontak', component: Kontak },

  /* ===== LOGIN ===== */
  { path: '/login', component: Login },

  /* ===== ADMIN ROUTES (butuh login) ===== */
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Home },
      { path: 'galeri', component: Galeri },
      { path: 'agenda', component: Agenda }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* AUTH GUARD */
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Belum login → redirect ke /login
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    // Sudah login tapi buka /login → redirect ke /admin
    next('/admin')
  } else {
    next()
  }
})

export default router