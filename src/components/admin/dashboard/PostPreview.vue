<template>
  <div class="section-card">
    <div class="section-header">
      <h5>Postingan Terbaru</h5>
      <button class="btn btn-primary btn-sm" @click="router.push('/admin/postingan')">Lihat Semua</button>
    </div>

    <div v-if="!items.length" class="empty"><i class="bi bi-newspaper me-2"></i>Belum ada postingan</div>

    <div class="post-list">
      <a
        v-for="item in items"
        :key="item.id"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="post-item"
      >
        <div class="thumb">
          <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title" />
          <div v-else class="thumb-ph"><i class="bi bi-image"></i></div>
        </div>

        <div class="post-body">
          <div class="post-title">{{ item.title }}</div>
          <div class="post-meta">
            <i class="bi bi-link-45deg me-1"></i>{{ item.source }} &bull; {{ formatDate(item.date) }}
          </div>
        </div>

        <i class="bi bi-box-arrow-up-right link-icon"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({ items: { type: Array, default: () => [] } })

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  : '—'
</script>

<style scoped>
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.section-header h5 { font-weight: 600; margin: 0; }
.empty { text-align: center; color: #bbb; padding: 30px 0; font-size: 14px; }
.post-list { display: flex; flex-direction: column; gap: 12px; }

.post-item {
  display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 10px;
  text-decoration: none; color: inherit; transition: 0.2s; cursor: pointer;
}
.post-item:hover { background: #f9f9f9; }

.thumb { width: 68px; height: 52px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb-ph { width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #ccc; font-size: 20px; }

.post-body { flex: 1; min-width: 0; }
.post-title { font-weight: 600; font-size: 13px; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #1a1a1a; }
.post-meta { font-size: 12px; color: #aaa; }

.link-icon { color: #ccc; font-size: 13px; flex-shrink: 0; transition: 0.2s; }
.post-item:hover .link-icon { color: var(--red); }
</style>