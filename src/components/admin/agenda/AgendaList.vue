<template>
  <div class="section">

    <div class="header">
      <h3>Manajemen Agenda</h3>
      <button class="btn" @click="$emit('add')">Tambah</button>
    </div>

    <div 
      class="item"
      v-for="item in agenda"
      :key="item.id"
    >
      <div>
        <h4>{{ item.title }}</h4>
        <p>{{ item.tempat }}</p>
      </div>

      <div class="right">
        <span>{{ item.tanggal }} • {{ item.jam }}</span>

        <div class="actions">
          <button @click="$emit('edit', item)">Edit</button>
          <button class="danger" @click="$emit('delete', item.id)">Hapus</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  agenda: Array
})
</script>

<style scoped>
.section {
  background: white;
  padding: 20px;
  border-radius: 14px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.btn {
  background: #c0392b;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 14px;
  border-radius: 10px;
  background: #fafafa;
  margin-bottom: 10px;
  transition: 0.2s;
}

.item:hover {
  background: #f0f0f0;
}

.right {
  text-align: right;
}

.actions {
  margin-top: 5px;
  display: flex;
  gap: 6px;
}

.actions button {
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
}

.danger {
  background: #eee;
}
</style>