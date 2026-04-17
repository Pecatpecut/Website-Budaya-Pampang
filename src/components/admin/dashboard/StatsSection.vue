<template>
  <div class="stats">

    <div 
      class="card"
      v-for="item in stats"
      :key="item.label"
    >
      <div class="card-header">
        <p>{{ item.label }}</p>
        <component :is="item.icon" class="icon" />
      </div>

      <h2>{{ item.value }}</h2>
    </div>

  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  flex: 1;
  background: white;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #eee;
  transition: 0.25s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
}

/* HEADER */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.card-header p {
  font-size: 13px;
  color: #777;
  margin: 0;
}

.icon {
  width: 18px;
  color: #555;
}

h2 {
  margin: 0;
  font-size: 28px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .stats {
    flex-direction: column;
  }
}
</style>