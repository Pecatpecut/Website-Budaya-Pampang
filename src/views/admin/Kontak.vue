<template>
  <div class="container py-4">
    <h3 class="mb-4">Pengaturan Kontak</h3>

    <form @submit.prevent="handleSubmit" class="card p-4">

      <div class="mb-3">
        <label>Alamat</label>
        <textarea
          v-model="form.alamat"
          class="form-control"
        ></textarea>
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label>Telepon</label>
        <input
          v-model="form.telepon"
          type="text"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label>Instagram</label>
        <input
          v-model="form.instagram"
          type="text"
          class="form-control"
        />
      </div>

      <button class="btn btn-primary">
        Simpan Perubahan
      </button>

    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { adminData } from '@/store/adminData.js'

const form = reactive({
  ...adminData.kontakInfo
})

const handleSubmit = () => {
  Object.assign(adminData.kontakInfo, form)
  alert('Data kontak berhasil diperbarui!')
}
</script>