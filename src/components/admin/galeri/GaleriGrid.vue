<template>
  <div class="row g-3">

    <div
      v-for="item in items"
      :key="item.id"
      class="col-md-3"
    >
      <div class="card h-100">

        <img
          :src="item.image"
          class="card-img-top"
          style="height: 180px; object-fit: cover;"
        />

        <div class="card-body">
          <h6>{{ item.title }}</h6>

          <div class="d-flex gap-2 mt-2">
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
          </div>
        </div>

      </div>
    </div>

    <div v-if="!items.length" class="text-center">
      Belum ada gambar
    </div>

  </div>
</template>

<script setup>
defineProps({
  items: Array
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: white;
  padding: 12px;
  border-radius: 12px;
}
</style>