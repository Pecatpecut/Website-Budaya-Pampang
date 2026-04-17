<template>
  <div class="form-card">

    <h5 class="form-title">
      <i class="bi bi-image me-2"></i>
      {{ isEdit ? 'Edit Gambar' : 'Upload Gambar Baru' }}
    </h5>

    <div class="row g-3">

      <div class="col-md-5">
        <label class="form-label">Judul Gambar</label>
        <input
          v-model="localForm.title"
          class="form-input"
          placeholder="Masukkan judul gambar..."
        />
      </div>

      <div class="col-md-4">
        <label class="form-label">URL Gambar</label>
        <input
          v-model="localForm.image"
          class="form-input"
          placeholder="https://..."
        />
      </div>

      <div class="col-md-3 d-flex align-items-end gap-2">
        <button class="btn-submit flex-grow-1" @click="handleSubmit">
          {{ isEdit ? 'Update' : 'Tambah' }}
        </button>
        <button v-if="isEdit" class="btn-cancel" @click="$emit('cancel')">
          Batal
        </button>
      </div>

    </div>

    <!-- PREVIEW -->
    <div v-if="localForm.image" class="preview">
      <img :src="localForm.image" alt="preview" />
    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  formData: Object,
  isEdit: Boolean
})

const emit = defineEmits(['submit', 'cancel', 'update:formData'])

const localForm = reactive({ id: null, title: '', image: '' })

// props → local
watch(() => props.formData, (val) => {
  if (val) Object.assign(localForm, val)
}, { immediate: true, deep: true })

const handleSubmit = () => {
  // emit update ke parent, bukan mutasi props langsung
  emit('update:formData', { ...localForm })
  emit('submit')
}
</script>

<style scoped>
.form-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.form-title {
  font-weight: 600;
  margin-bottom: 20px;
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
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--red);
  background: white;
  box-shadow: 0 0 0 3px rgba(165,42,42,0.08);
}

.btn-submit {
  background: var(--red);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;
}

.btn-submit:hover { background: var(--red-dark, #8b2323); }

.btn-cancel {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1.5px solid #e0e0e0;
  background: white;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.preview {
  margin-top: 16px;
}

.preview img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
}
</style>