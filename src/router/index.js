import { createRouter, createWebHistory } from 'vue-router'

/* ================= PUBLIC ================= */
import HomePublik   from '@/views/public/HomePublik.vue'
import Tentang      from '@/views/public/TentangKami.vue'
import Publikasi    from '@/views/public/Publikasi.vue'
import Kontak       from '@/views/public/KontakPublik.vue'

/* ================= AUTH ================= */
import Login        from '@/views/admin/Login.vue'

/* ================= ADMIN ================= */
import DashboardLayout from '@/views/admin/Dashboard.vue'
import AdminHome    from '@/views/admin/HomeAdmin.vue'
import AdminGaleri  from '@/views/admin/GaleriAdmin.vue'
import AdminAgenda  from '@/views/admin/AgendaAdmin.vue'
import AdminPostingan from '@/views/admin/Postingan.vue'
import AdminKontak  from '@/views/admin/KontakAdmin.vue'

const routes = [
  /* ===== PUBLIC ===== */
  { path: '/',          component: HomePublik },
  { path: '/tentang',   component: Tentang    },
  { path: '/publikasi', component: Publikasi  },
  { path: '/kontak',    component: Kontak     },

  /* ===== LOGIN ===== */
  { path: '/login', component: Login, meta: { hideNavbar: true, isAuth: true }},

  /* ===== ADMIN (requires auth) ===== */
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true, hideNavbar: true, isAdmin: true},
    children: [
      { path: '',           component: AdminHome      },
      { path: 'galeri',     component: AdminGaleri    },
      { path: 'agenda',     component: AdminAgenda    },
      { path: 'postingan',  component: AdminPostingan },
      { path: 'kontak',     component: AdminKontak    }
    ]
  },

  /* ===== FALLBACK ===== */
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

/* ===== AUTH GUARD ===== */
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/admin')
  } else {
    next()
  }
})

export default router