<template>
  <div class="layout">

    <Sidebar 
      :collapsed="collapsed"
      @toggleCollapse="collapsed = !collapsed"
    />

    <div class="main" :class="{ collapsed }">
      <Header />

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
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

/* 🔥 FIX UTAMA */
.main {
  flex: 1;
  background: var(--gray-bg);
  min-height: 100vh;

  margin-left: 240px; /* ⬅️ penting */
  transition: margin-left 0.3s ease;
  overflow-x: hidden;
}

/* COLLAPSE */
.main.collapsed {
  margin-left: 70px;
}

.content {
  padding: 30px;
}

/* MOBILE */
@media (max-width: 768px) {
  .main {
    margin-left: 0 !important;
  }
}
</style>