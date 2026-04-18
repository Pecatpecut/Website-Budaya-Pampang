<template>
  <header class="header">

    <button class="menu-btn" @click="$emit('toggleMobile')">
      <i class="bi bi-list"></i>
    </button>

    <div class="header-info">
      <h1 class="title">{{ pageTitle }}</h1>
      <span class="breadcrumb">Admin / {{ pageTitle }}</span>
    </div>

  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineEmits(['toggleMobile'])

const route = useRoute()

const pageTitle = computed(() => {
  const map = {
    '/admin':           'Dashboard',
    '/admin/agenda':    'Agenda',
    '/admin/galeri':    'Galeri',
    '/admin/postingan': 'Postingan',
    '/admin/kontak':    'Kontak'
  }
  return map[route.path] || 'Dashboard'
})
</script>

<style scoped>
.header {
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 24px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 50;
}

.menu-btn {
  border: none;
  background: #f5f5f5;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}
.menu-btn:hover { background: #eee; }

.header-info { flex: 1; padding-top: 16px; }

.title {
  font-size: 17px;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  color: #1a1a1a;
}

.breadcrumb {
  font-size: 12px;
  color: #bbb;
}

@media (max-width: 768px) {
  .menu-btn { display: flex; }
  .breadcrumb { display: none; }
}
</style>