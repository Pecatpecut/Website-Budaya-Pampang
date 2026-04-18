<template>
  <div class="stats-grid">
    <div class="stat-card" v-for="item in stats" :key="item.label">
      <div class="stat-icon"><component :is="item.icon" :size="22" /></div>
      <div class="stat-body">
        <div class="stat-value">{{ item.value }}</div>
        <div class="stat-label">{{ item.label }}</div>
      </div>
      <div class="stat-arrow"><i class="bi bi-arrow-up-right"></i></div>
    </div>
  </div>
</template>

<script setup>
defineProps({ stats: { type: Array, default: () => [] } })
</script>

<style scoped>
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
.stat-card {
  background: white; border-radius: 16px; padding: 20px; border: 1px solid #f0f0f0;
  display: flex; align-items: center; gap: 16px; transition: 0.25s; cursor: pointer; position: relative; overflow: hidden;
}
.stat-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--red); border-radius: 4px 0 0 4px; opacity: 0; transition: 0.2s; }
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
.stat-card:hover::before { opacity: 1; }
.stat-icon { width: 48px; height: 48px; background: #fff4f4; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--red); flex-shrink: 0; }
.stat-body { flex: 1; }
.stat-value { font-size: 30px; font-weight: 700; color: #1a1a1a; line-height: 1; }
.stat-label { font-size: 13px; color: #888; margin-top: 4px; }
.stat-arrow { color: #ccc; font-size: 18px; transition: 0.2s; }
.stat-card:hover .stat-arrow { color: var(--red); transform: translate(2px, -2px); }
@media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } }
</style>