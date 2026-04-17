<template>
  <div class="table-responsive">
    <table class="table table-bordered">

      <thead>
        <tr>
          <th width="200">Gambar</th>
          <th>Judul</th>
          <th>Isi</th>
          <th width="150">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">

          <td>
            <img
              v-if="item.image"
              :src="item.image"
              style="width: 100%; height: 100px; object-fit: cover;"
            />
            <span v-else class="text-muted">-</span>
          </td>

          <td>{{ item.title }}</td>

          <td>
            {{ item.content.substring(0, 60) }}...
          </td>

          <td class="d-flex gap-2">
            <button
              class="btn btn-sm btn-warning w-100"
              @click="$emit('edit', item)"
            >
              Edit
            </button>

            <button
              class="btn btn-sm btn-danger w-100"
              @click="$emit('delete', item.id)"
            >
              Hapus
            </button>
          </td>

        </tr>

        <tr v-if="!items.length">
          <td colspan="4" class="text-center">
            Belum ada berita
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