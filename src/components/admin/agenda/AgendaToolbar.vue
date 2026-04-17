<template>
  <div class="toolbar">

    <div class="search-wrap">
      <i class="bi bi-search search-icon"></i>
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        placeholder="Cari nama / tanggal..."
        class="search-input"
      />
    </div>

    <select
      :value="sort"
      @change="$emit('update:sort', $event.target.value)"
      class="sort-select"
    >
      <option value="newest">Terbaru</option>
      <option value="oldest">Terlama</option>
    </select>

  </div>
</template>

<script setup>
defineProps(['search', 'sort'])
defineEmits(['update:search', 'update:sort'])
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  margin-top: 0;
}

.search-wrap {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 14px;
}

.search-input {
  width: 100%;
  padding: 11px 14px 11px 38px;
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
  background: white;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(165,42,42,0.08);
}

.sort-select {
  padding: 11px 16px;
  border-radius: 10px;
  border: 1.5px solid #e8e8e8;
  background: white;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  outline: none;
  transition: 0.2s;
}

.sort-select:focus {
  border-color: var(--red);
}
</style>