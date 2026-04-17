<template>
  <div class="form-card">

    <h5 class="form-title">
      <i class="bi bi-plus-circle me-2"></i>Tambah Agenda
    </h5>

    <div class="row g-3">

      <div class="col-md-6">
        <label class="form-label">Judul Kegiatan</label>
        <input
          v-model="form.title"
          class="form-input"
          :class="{ 'is-error': errors.title }"
          placeholder="Masukkan judul agenda..."
        />
        <span v-if="errors.title" class="err-msg">{{ errors.title }}</span>
      </div>

      <div class="col-md-3">
        <label class="form-label">Tanggal</label>
        <input
          v-model="form.date"
          type="date"
          class="form-input"
          :class="{ 'is-error': errors.date }"
        />
        <span v-if="errors.date" class="err-msg">{{ errors.date }}</span>
      </div>

      <div class="col-md-3">
        <label class="form-label">Waktu</label>
        <input
          v-model="form.time"
          type="time"
          class="form-input"
          :class="{ 'is-error': errors.time }"
        />
        <span v-if="errors.time" class="err-msg">{{ errors.time }}</span>
      </div>

      <div class="col-md-9">
        <label class="form-label">Lokasi</label>
        <input
          v-model="form.location"
          class="form-input"
          :class="{ 'is-error': errors.location }"
          placeholder="Masukkan lokasi kegiatan..."
        />
        <span v-if="errors.location" class="err-msg">{{ errors.location }}</span>
      </div>

      <div class="col-md-3 d-flex align-items-end">
        <button class="btn-submit w-100" @click="submit">
          <i class="bi bi-plus-lg me-1"></i> Tambah Agenda
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['add', 'error'])

const form = reactive({
  title: '',
  date: '',
  time: '',
  location: ''
})

const errors = reactive({
  title: '',
  date: '',
  time: '',
  location: ''
})

const validate = () => {
  let valid = true
  errors.title = form.title ? '' : 'Judul wajib diisi'
  errors.date = form.date ? '' : 'Tanggal wajib diisi'
  errors.time = form.time ? '' : 'Waktu wajib diisi'
  errors.location = form.location ? '' : 'Lokasi wajib diisi'
  if (errors.title || errors.date || errors.time || errors.location) valid = false
  return valid
}

const submit = () => {
  if (!validate()) {
    emit('error', 'Semua field wajib diisi', 'error')
    return
  }
  emit('add', { ...form })
  form.title = ''
  form.date = ''
  form.time = ''
  form.location = ''
}
</script>

<style scoped>
.form-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.form-title {
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a1a1a;
  font-size: 15px;
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
  display: block;
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
  background: #fafafa;
}

.form-input:focus {
  border-color: var(--red);
  background: white;
  box-shadow: 0 0 0 3px rgba(165,42,42,0.08);
}

.form-input.is-error {
  border-color: #e74c3c;
  background: #fff5f5;
}

.err-msg {
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
  display: block;
}

.btn-submit {
  background: var(--red);
  color: white;
  border: none;
  padding: 11px 20px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;
}

.btn-submit:hover {
  background: var(--red-dark, #8b2323);
  transform: translateY(-1px);
}
</style>