<template>
  <div class="container py-4">
    <h3 class="mb-4">Manajemen Postingan</h3>

    <!-- FORM -->
    <BeritaForm
      :formData="form"
      :isEdit="isEdit"
      @submit="handleSubmit"
      @cancel="resetForm"
    />

    <!-- LIST -->
    <BeritaList
      :items="berita"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminData } from '@/store/adminData.js'

import BeritaForm from '@/components/admin/postingan/PostinganForm.vue'
import BeritaList from '@/components/admin/postingan/PostinganList.vue'

const berita = adminData.postingan

const form = ref({
  id: null,
  title: '',
  content: '',
  image: ''
})

const isEdit = ref(false)

// SUBMIT
const handleSubmit = () => {
  if (!form.value.title || !form.value.content) return

  if (isEdit.value) {
    const index = berita.findIndex(item => item.id === form.value.id)
    if (index !== -1) {
      berita[index] = { ...form.value }
    }
  } else {
    berita.push({
      ...form.value,
      id: Date.now()
    })
  }

  resetForm()
}

// EDIT
const handleEdit = (item) => {
  form.value = { ...item }
  isEdit.value = true
}

// DELETE
const handleDelete = (id) => {
  const index = berita.findIndex(item => item.id === id)
  if (index !== -1) {
    berita.splice(index, 1)
  }
}

// RESET
const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    content: '',
    image: ''
  }
  isEdit.value = false
}
</script>