<template>
  <div>
    <div v-if="!items.length" class="empty-state">
      <i class="bi bi-newspaper"></i>
      <p>Belum ada postingan</p>
    </div>

    <div class="post-list">
      <div
        v-for="item in items"
        :key="item.id"
        class="post-card"
      >
        <!-- THUMBNAIL -->
        <div class="thumb-wrap">
          <img v-if="item.image" :src="item.image" :alt="item.title" />
          <div v-else class="thumb-placeholder">
            <i class="bi bi-image"></i>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="post-body">
          <h5>{{ item.title }}</h5>
          <p class="meta">Admin &bull; {{ item.date || '—' }}</p>
          <p class="excerpt">{{ safeExcerpt(item.content) }}</p>
        </div>

        <!-- ACTIONS -->
        <div class="post-actions">
          <button class="btn-edit" @click="$emit('edit', item)">
            <i class="bi bi-pencil me-1"></i>Edit
          </button>
          <button class="btn-delete" @click="$emit('delete', item.id)">
            <i class="bi bi-trash me-1"></i>Hapus
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ items: Array })
defineEmits(['edit', 'delete'])

// FIX: safe substring, guard against undefined/null
const safeExcerpt = (text) => {
  if (!text) return '—'
  return text.length > 80 ? text.substring(0, 80) + '...' : text
}
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 14px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  transition: 0.25s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}

/* THUMB */
.thumb-wrap {
  width: 100px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-placeholder {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 24px;
}

/* BODY */
.post-body {
  flex: 1;
  min-width: 0;
}

.post-body h5 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  font-size: 12px;
  color: #aaa;
  margin: 0 0 6px;
}

.excerpt {
  font-size: 13px;
  color: #777;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ACTIONS */
.post-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
}

.btn-edit, .btn-delete {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.btn-edit {
  background: #f0f0f0;
  color: #444;
}

.btn-edit:hover { background: #e0e0e0; }

.btn-delete {
  background: #fff0f0;
  color: var(--red);
}

.btn-delete:hover {
  background: var(--red);
  color: white;
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