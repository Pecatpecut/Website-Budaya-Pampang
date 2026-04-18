<template>
  <div class="toolbar">

    <div class="search-wrap">
      <i class="bi bi-search search-icon"></i>
      <input :value="search" @input="$emit('update:search', $event.target.value)"
        placeholder="Cari nama kegiatan..." class="search-input" />
    </div>

    <select :value="filter" @change="$emit('update:filter', $event.target.value)" class="select-input">
      <option value="all">Semua</option>
      <option value="upcoming">Akan Datang</option>
      <option value="past">Sudah Berlalu</option>
    </select>

    <select :value="sort" @change="$emit('update:sort', $event.target.value)" class="select-input">
      <option value="newest">Terbaru</option>
      <option value="oldest">Terlama</option>
    </select>

  </div>
</template>

<script setup>
defineProps(['search', 'sort', 'filter'])
defineEmits(['update:search', 'update:sort', 'update:filter'])
</script>

<style scoped>
.toolbar { display: flex; gap: 10px; margin-bottom: 4px; flex-wrap: wrap; }

.search-wrap { flex: 1; min-width: 200px; position: relative; }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #aaa; font-size: 14px; }
.search-input {
  width: 100%; padding: 11px 14px 11px 38px; border: 1.5px solid #e8e8e8;
  border-radius: 10px; font-size: 14px; outline: none; transition: 0.2s;
  background: white; box-sizing: border-box;
}
.search-input:focus { border-color: var(--red); box-shadow: 0 0 0 3px rgba(165,42,42,0.08); }

.select-input {
  padding: 11px 14px; border-radius: 10px; border: 1.5px solid #e8e8e8;
  background: white; font-size: 14px; color: #333; cursor: pointer; outline: none; transition: 0.2s;
}
.select-input:focus { border-color: var(--red); }
</style>