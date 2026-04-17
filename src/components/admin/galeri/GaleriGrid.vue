<template>
  <div>
    <div v-if="!items.length" class="empty-state">
      <i class="bi bi-images"></i>
      <p>Belum ada gambar di galeri</p>
    </div>

    <div class="galeri-grid">
      <div
        v-for="item in items"
        :key="item.id"
        class="galeri-card"
      >
        <div class="img-wrap">
          <img :src="item.image" :alt="item.title" />
          <div class="overlay">
            <button class="ov-btn edit" @click="$emit('edit', item)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="ov-btn delete" @click="$emit('delete', item.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
        <div class="card-info">
          <span class="card-title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ items: Array })
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.galeri-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.galeri-card {
  border-radius: 14px;
  overflow: hidden;
  background: white;
  border: 1px solid #f0f0f0;
  transition: 0.25s;
}

.galeri-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.08);
}

.img-wrap {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
}

.galeri-card:hover .img-wrap img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: 0.2s;
}

.galeri-card:hover .overlay {
  opacity: 1;
}

.ov-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: 0.2s;
}

.ov-btn.edit {
  background: white;
  color: #333;
}

.ov-btn.delete {
  background: var(--red);
  color: white;
}

.ov-btn:hover {
  transform: scale(1.1);
}

.card-info {
  padding: 10px 14px;
}

.card-title {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

/* EMPTY */
.empty-state {
  text-align: center;
  padding: 60px;
  color: #ccc;
}

.empty-state i {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}
</style>