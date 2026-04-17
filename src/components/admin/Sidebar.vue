<template>
  <aside 
    class="sidebar"
    :class="{ collapsed, open: isOpen }"
  >

    <div class="top">

      <div class="logo-row">
        <h2 class="logo">
          Desa Budaya <span>Pampang</span>
        </h2>

        <button 
          class="toggle"
          @click="handleToggle"
        >
          <Menu />
        </button>
      </div>

      <nav>

        <!-- DASHBOARD -->
        <RouterLink 
          to="/admin"
          class="nav-item"
          :class="{ active: isDashboard }"
          @click="handleNavClick"
        >
          <LayoutDashboard class="icon" />
          <span v-if="!collapsed">Dashboard</span>
        </RouterLink>

        <!-- AGENDA -->
        <RouterLink 
          to="/admin/agenda"
          class="nav-item"
          active-class="active"
          @click="handleNavClick"
        >
          <Calendar class="icon" />
          <span v-if="!collapsed">Agenda</span>
        </RouterLink>

        <!-- GALERI -->
        <RouterLink 
          to="/admin/galeri"
          class="nav-item"
          active-class="active"
          @click="handleNavClick"
        >
          <Image class="icon" />
          <span v-if="!collapsed">Galeri</span>
        </RouterLink>

      </nav>

    </div>

    <button class="logout" @click="handleLogout">
      <LogOut class="icon" />
      <span v-if="!collapsed">Logout</span>
    </button>

  </aside>

  <div 
    class="overlay" 
    v-if="isOpen"
    @click="$emit('closeMobile')"
  ></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  LayoutDashboard,
  Calendar,
  Image,
  Menu,
  LogOut
} from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  collapsed: Boolean
})

const emit = defineEmits(['toggleCollapse', 'closeMobile'])

const route = useRoute()
const router = useRouter()

/* FIX: Dashboard hanya active kalau path PERSIS /admin */
const isDashboard = computed(() => route.path === '/admin')

/* LOGOUT */
const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

/* FIX RESPONSIVE */
const isMobile = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

/* TOGGLE */
const handleToggle = () => {
  if (isMobile.value) {
    emit('closeMobile')
  } else {
    emit('toggleCollapse')
  }
}

/* CLOSE MOBILE */
const handleNavClick = () => {
  if (isMobile.value) emit('closeMobile')
}
</script>

<style scoped>

/* BASE */
.sidebar {
  width: 240px;
  height: 100vh;
  position: fixed;
  background: #0f0f0f;
  color: white;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s;
  z-index: 1001;
}

/* COLLAPSE */
.sidebar.collapsed {
  width: 70px;
  padding: 24px 10px;
}

/* TOP */
.top {
  display: flex;
  flex-direction: column;
}

/* LOGO */
.logo {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
}

.logo span {
  color: #c0392b;
}

/* HIDE LOGO */
.sidebar.collapsed .logo {
  display: none;
}

/* LOGO ROW */
.logo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* TOGGLE BUTTON */
.toggle {
  background: rgba(255,255,255,0.06);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.toggle:hover {
  background: rgba(255,255,255,0.12);
  transform: scale(1.05);
}

/* NAV */
nav {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ITEM */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  color: #aaa;
  text-decoration: none;
  transition: 0.2s;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
  color: white;
}

/* COLLAPSE MODE */
.sidebar.collapsed .nav-item {
  justify-content: center;
}

.sidebar.collapsed .nav-item span {
  display: none;
}

/* ACTIVE */
.nav-item.active {
  background: linear-gradient(
    90deg,
    rgba(192,57,43,0.25),
    rgba(192,57,43,0.1)
  );
  color: white;
}

/* ICON */
.icon {
  width: 18px;
}

/* LOGOUT */
.logout {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #c0392b;
  border: none;
  padding: 13px;
  border-radius: 999px;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.logout:hover {
  transform: scale(1.03);
}

/* COLLAPSE LOGOUT */
.sidebar.collapsed .logout {
  justify-content: center;
}

.sidebar.collapsed .logout span {
  display: none;
}

/* MOBILE */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
}

</style>