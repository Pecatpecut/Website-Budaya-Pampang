<template>
  <div class="layout">

    <Sidebar
      :collapsed="collapsed"
      :isOpen="mobileOpen"
      @toggleCollapse="collapsed = !collapsed"
      @closeMobile="mobileOpen = false"
    />

    <div class="main" :class="{ collapsed }">
      <Header @toggleMobile="mobileOpen = !mobileOpen" />

      <div class="content">
        <router-view />
      </div>
    </div>

    <!-- MOBILE OVERLAY -->
    <div v-if="mobileOpen" class="mobile-overlay" @click="mobileOpen = false"></div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import Header  from '@/components/admin/Header.vue'

const collapsed  = ref(false)
const mobileOpen = ref(false)
</script>

<style scoped>
.layout { display: flex; min-height: 100vh; }

.main {
  margin-left: 240px;
  flex: 1;
  background: #f7f7f7;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  overflow-x: hidden;
  min-width: 0;
}

.main.collapsed { margin-left: 70px; }

.content { padding: 30px; }

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: none;
}

@media (max-width: 768px) {
  .main { margin-left: 0 !important; }
  .mobile-overlay { display: block; }
}
</style>