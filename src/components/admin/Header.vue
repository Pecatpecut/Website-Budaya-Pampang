<template>
  <header class="header">

    <!-- MOBILE ONLY -->
    <button class="menu-btn" @click="$emit('toggleMobile')">
      <Menu />
    </button>

    <h1 class="title">Dashboard</h1>

  </header>
</template>

<script setup>
import { Menu } from 'lucide-vue-next'
defineEmits(['toggleMobile'])
</script>

<style scoped>

.header {
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

.menu-btn {
  border: none;
  background: none;
  cursor: pointer;
}

/* HIDE DI DESKTOP */
@media (min-width: 769px) {
  .menu-btn {
    display: none;
  }
}

</style>