<template>
  <aside :class="['sidebar', { collapsed }]">

    <!-- TOP -->
    <div class="top">

      <!-- LOGO (HILANG SAAT COLLAPSE) -->
      <div class="logo" v-if="!collapsed">
        <span class="main">Desa Budaya</span>
        <span class="highlight">Pampang</span>
      </div>

      <!-- TOGGLE -->
      <button class="toggle-btn" @click="emit('toggleCollapse')">
        <i class="bi bi-list"></i>
      </button>

    </div>

    <!-- MENU -->
    <nav class="menu">

      <RouterLink 
        to="/admin" 
        class="menu-item"
        :class="{ active: route.path === '/admin' }"
        :title="collapsed ? 'Dashboard' : ''"
      >
        <i class="bi bi-grid"></i>
        <span v-if="!collapsed">Dashboard</span>
      </RouterLink>

      <RouterLink 
        to="/admin/agenda" 
        class="menu-item"
        :class="{ active: route.path.includes('/admin/agenda') }"
        :title="collapsed ? 'Agenda' : ''"
      >
        <i class="bi bi-calendar"></i>
        <span v-if="!collapsed">Agenda</span>
      </RouterLink>

      <RouterLink 
        to="/admin/galeri" 
        class="menu-item"
        :class="{ active: route.path.includes('/admin/galeri') }"
        :title="collapsed ? 'Galeri' : ''"
      >
        <i class="bi bi-image"></i>
        <span v-if="!collapsed">Galeri</span>
      </RouterLink>

      <RouterLink 
        to="/admin/postingan" 
        class="menu-item"
        :class="{ active: route.path.includes('/admin/postingan') }"
        :title="collapsed ? 'Postingan' : ''"
      >
        <i class="bi bi-file-text"></i>
        <span v-if="!collapsed">Postingan</span>
      </RouterLink>

      <RouterLink 
        to="/admin/kontak" 
        class="menu-item"
        :class="{ active: route.path.includes('/admin/kontak') }"
        :title="collapsed ? 'Kontak' : ''"
      >
        <i class="bi bi-envelope"></i>
        <span v-if="!collapsed">Kontak</span>
      </RouterLink>

    </nav>

    <!-- LOGOUT -->
    <div class="logout">
      <button class="logout-btn" @click="handleLogout">
        <i class="bi bi-box-arrow-right"></i>
        <span v-if="!collapsed">Logout</span>
      </button>
    </div>

  </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

defineProps({
  collapsed: Boolean
})

const emit = defineEmits(['toggleCollapse'])

const route = useRoute()
const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>

/* BASE */
.sidebar {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  background: var(--black);
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px 14px;
  transition: 0.3s ease;
  z-index: 100;
}

/* COLLAPSE */
.sidebar.collapsed {
  width: 70px;
}

/* TOP */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

/* CENTER SAAT COLLAPSE */
.sidebar.collapsed .top {
  justify-content: center;
}

/* LOGO */
.logo {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  line-height: 1.2;
}

.logo .main {
  font-size: 14px;
}

.logo .highlight {
  font-size: 18px;
  color: var(--red);
}

/* TOGGLE */
.toggle-btn {
  background: rgba(255,255,255,0.08);
  border: none;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.toggle-btn:hover {
  background: rgba(255,255,255,0.2);
}

/* COLLAPSE STYLE */
.sidebar.collapsed .toggle-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 12px;
  border-radius: 12px;

  color: #ccc;
  text-decoration: none;
  transition: 0.25s;
}

/* ICON */
.menu-item i {
  font-size: 18px;
}

/* HOVER */
.menu-item:hover {
  background: rgba(255,255,255,0.05);
  color: white;
  transform: translateX(4px);
}

/* ACTIVE */
.menu-item.active {
  background: rgba(165,42,42,0.2);
  color: white;
}

.menu-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 20%;
  width: 4px;
  height: 60%;
  background: var(--red);
  border-radius: 4px;
}

/* COLLAPSE MENU */
.sidebar.collapsed .menu-item {
  justify-content: center;
}

.sidebar.collapsed .menu-item span {
  display: none;
}

/* LOGOUT */
.logout {
  margin-top: auto;
}

.logout-btn {
  width: 100%;
  background: #c0392b;
  border: none;
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  transition: 0.2s ease;
}

/* HOVER (NO GLOW) */
.logout-btn:hover {
  background: #a93226;
  transform: translateY(-1px);
}

/* CLICK */
.logout-btn:active {
  transform: scale(0.98);
}

/* COLLAPSE MODE */
.sidebar.collapsed .logout-btn span {
  display: none;
}

.sidebar.collapsed .logout-btn {
  padding: 12px 0;
}

</style>