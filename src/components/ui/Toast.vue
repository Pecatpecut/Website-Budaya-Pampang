<template>
  <Teleport to="body">
    <div class="toast-wrap">
      <TransitionGroup name="toast-anim">
        <div v-for="(t, i) in toasts" :key="i" class="toast" :class="t.type">
          <i class="bi me-2" :class="t.type === 'error' ? 'bi-x-circle-fill' : 'bi-check-circle-fill'"></i>
          {{ t.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({ toasts: Array })
</script>

<style scoped>
.toast-wrap { position: fixed; top: 20px; right: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 8px; }
.toast { background: #1a1a1a; color: white; padding: 12px 18px; border-radius: 12px; font-size: 14px; font-weight: 500; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: flex; align-items: center; min-width: 220px; }
.toast.success { background: #1e7e4a; }
.toast.error   { background: var(--red, #a52a2a); }
.toast-anim-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-anim-leave-active { transition: all 0.2s ease; }
.toast-anim-enter-from { opacity: 0; transform: translateX(60px) scale(0.9); }
.toast-anim-leave-to   { opacity: 0; transform: translateX(60px); }
</style>