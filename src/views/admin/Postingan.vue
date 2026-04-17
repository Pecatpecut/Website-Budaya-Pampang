<template>
  <div class="postingan-page">

    <div class="page-header">
      <div>
        <h2 class="page-title">Manajemen Postingan</h2>
        <p class="page-sub">Kelola artikel dan berita seputar Desa Budaya Pampang</p>
      </div>
    </div>

    <PostinganForm
      v-model:formData="form"
      :isEdit="isEdit"
      @submit="handleSubmit"
      @cancel="resetForm"
    />

    <PostinganList
      :items="adminData.postingan"
      @edit="handleEdit"
      @delete="handleDelete"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminData } from '@/store/adminData.js'
import PostinganForm from '@/components/admin/postingan/PostinganForm.vue'
import PostinganList from '@/components/admin/postingan/PostinganList.vue'

const form = ref({ id: null, title: '', content: '', image: '' })
const isEdit = ref(false)

const handleSubmit = () => {
  if (!form.value.title || !form.value.content) return

  if (isEdit.value) {
    const index = adminData.postingan.findIndex(item => item.id === form.value.id)
    if (index !== -1) adminData.postingan[index] = { ...form.value }
  } else {
    adminData.postingan.push({
      ...form.value,
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    })
  }

  resetForm()
}

const handleEdit = (item) => {
  form.value = { ...item }
  isEdit.value = true
}

const handleDelete = (id) => {
  const index = adminData.postingan.findIndex(item => item.id === id)
  if (index !== -1) adminData.postingan.splice(index, 1)
}

const resetForm = () => {
  form.value = { id: null, title: '', content: '', image: '' }
  isEdit.value = false
}
</script>

<style scoped>
.postingan-page { padding: 4px 0; }

.page-header { margin-bottom: 24px; }

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