<template>
  <div class="section-card">

    <div class="section-header">
      <h5>Postingan Terbaru</h5>
      <button class="btn btn-primary btn-sm" @click="router.push('/admin/postingan')">
        Lihat Semua
      </button>
    </div>

    <div v-if="!items.length" class="empty">
      <i class="bi bi-newspaper me-2"></i>Belum ada postingan
    </div>

    <div class="post-list">
      <div
        v-for="item in items"
        :key="item.id"
        class="post-item"
      >
        <div class="thumb">
          <img v-if="item.image" :src="item.image" :alt="item.title" />
          <div v-else class="thumb-ph"><i class="bi bi-image"></i></div>
        </div>

        <div class="post-body">
          <div class="post-title">{{ item.title }}</div>
          <div class="post-meta">Admin &bull; {{ item.date || '—' }}</div>
          <div class="post-excerpt">{{ safeExcerpt(item.content) }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({ items: { type: Array, default: () => [] } })

const safeExcerpt = (text) => {
  if (!text) return '—'
  return text.length > 70 ? text.substring(0, 70) + '...' : text
}
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

.post-list { display: flex; flex-direction: column; gap: 14px; }

.post-item {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;
}

.post-item:hover { background: #f9f9f9; }

.thumb {
  width: 72px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.thumb img { width: 100%; height: 100%; object-fit: cover; }

.thumb-ph {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 20px;
}

.post-body { flex: 1; min-width: 0; }

.post-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-meta { font-size: 12px; color: #aaa; margin-bottom: 4px; }

.post-excerpt {
  font-size: 12px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>