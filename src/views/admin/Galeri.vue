<template>
  <div class="galeri-page">

    <div class="page-header">
      <div>
        <h2 class="page-title">Manajemen Galeri</h2>
        <p class="page-sub">Kelola foto dan gambar kegiatan desa</p>
      </div>
    </div>

    <GaleriForm
      v-model:formData="form"
      :isEdit="isEdit"
      @submit="handleSubmit"
      @cancel="resetForm"
    />

    <GaleriGrid
      :items="adminData.galeri"
      @edit="handleEdit"
      @delete="handleDelete"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminData } from '@/store/adminData.js'
import GaleriForm from '@/components/admin/galeri/GaleriForm.vue'
import GaleriGrid from '@/components/admin/galeri/GaleriGrid.vue'

const form = ref({ id: null, title: '', image: '' })
const isEdit = ref(false)

const handleSubmit = () => {
  if (!form.value.title || !form.value.image) return

  if (isEdit.value) {
    const index = adminData.galeri.findIndex(item => item.id === form.value.id)
    if (index !== -1) adminData.galeri[index] = { ...form.value }
  } else {
    adminData.galeri.push({ ...form.value, id: Date.now() })
  }

  resetForm()
}

const handleEdit = (item) => {
  form.value = { ...item }
  isEdit.value = true
}

const handleDelete = (id) => {
  const index = adminData.galeri.findIndex(item => item.id === id)
  if (index !== -1) adminData.galeri.splice(index, 1)
}

const resetForm = () => {
  form.value = { id: null, title: '', image: '' }
  isEdit.value = false
}
</script>

<style scoped>
.galeri-page {
  padding: 4px 0;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px;
}

.page-sub {
  font-size: 14px;
  color: #888;
  margin: 0;
}
</style>