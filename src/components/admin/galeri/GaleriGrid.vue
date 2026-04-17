<template>
  <div class="grid">

    <div 
      class="card"
      v-for="i in 6"
      :key="i"
      @click="$emit('edit', i)"
    >
      <img src="@/assets/images/lamin.svg" />
      <button class="delete">Hapus</button>
    </div>

  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: white;
  padding: 12px;
  border-radius: 12px;
}
</style>