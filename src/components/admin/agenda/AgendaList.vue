<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Tanggal</th>
          <th width="150">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.date }}</td>
          <td class="d-flex gap-2">
            <button
              class="btn btn-sm btn-warning"
              @click="$emit('edit', item)"
            >
              Edit
            </button>

            <button
              class="btn btn-sm btn-danger"
              @click="$emit('delete', item.id)"
            >
              Hapus
            </button>
          </td>
        </tr>

        <tr v-if="!items.length">
          <td colspan="3" class="text-center">
            Belum ada agenda
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  items: Array
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