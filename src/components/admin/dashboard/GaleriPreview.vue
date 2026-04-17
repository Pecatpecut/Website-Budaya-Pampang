<template>
  <div class="section-card">

    <div class="section-header">
      <h5>Galeri Terbaru</h5>
      <button class="btn btn-primary btn-sm" @click="router.push('/admin/galeri')">
        Lihat Semua
      </button>
    </div>

    <div v-if="!items.length" class="empty">
      <i class="bi bi-images me-2"></i>Belum ada foto
    </div>

    <div class="galeri-grid">
      <div
        v-for="item in items"
        :key="item.id"
        class="galeri-item"
      >
        <img :src="item.image" :alt="item.title" />
        <div class="overlay">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({ items: { type: Array, default: () => [] } })
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h5 { font-weight: 600; margin: 0; }

.empty { text-align: center; color: #bbb; padding: 30px 0; font-size: 14px; }

.galeri-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.galeri-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
}

.galeri-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
}

.galeri-item:hover img { transform: scale(1.07); }

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65), transparent);
  display: flex;
  align-items: flex-end;
  padding: 8px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  transition: 0.2s;
}

.galeri-item:hover .overlay { opacity: 1; }
</style>