<template>
  <div class="layout">

    <Sidebar 
      :isOpen="mobileOpen"
      :collapsed="collapsed"
      @toggleCollapse="collapsed = !collapsed"
      @closeMobile="mobileOpen = false"
    />

    <div class="main" :class="{ collapsed }">

      <Header @toggleMobile="mobileOpen = !mobileOpen" />

      <div class="content">
        <router-view />
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import Header from '@/components/admin/Header.vue'

const collapsed = ref(false)
const mobileOpen = ref(false)
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

/* Konten geser ke kanan sesuai lebar sidebar */
.main {
  margin-left: 240px;
  flex: 1;
  background: #f7f7f7;
  min-height: 100vh;
  transition: margin-left 0.3s;
  /* Pastikan tidak keluar dari viewport */
  min-width: 0;
  overflow-x: hidden;
}

.main.collapsed {
  margin-left: 70px;
}

.content {
  padding: 30px;
}

/* MOBILE: sidebar overlay, konten full width */
@media (max-width: 768px) {
  .main {
    margin-left: 0 !important;
  }
}
</style>