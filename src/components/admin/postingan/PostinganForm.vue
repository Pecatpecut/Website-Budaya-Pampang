<template>
  <div class="form-card">

    <h5 class="form-title">
      <i class="bi bi-file-earmark-text me-2"></i>
      {{ isEdit ? 'Edit Postingan' : 'Tulis Postingan Baru' }}
    </h5>

    <div class="fields">

      <div class="field">
        <label>Judul</label>
        <input
          v-model="localForm.title"
          class="form-input"
          placeholder="Judul postingan..."
        />
      </div>

      <div class="field">
        <label>Isi Artikel</label>
        <textarea
          v-model="localForm.content"
          class="form-input"
          rows="4"
          placeholder="Tulis isi berita di sini..."
        ></textarea>
      </div>

      <div class="field">
        <label>URL Gambar <span class="opt">(opsional)</span></label>
        <input
          v-model="localForm.image"
          class="form-input"
          placeholder="https://..."
        />
      </div>

    </div>

    <div class="form-actions">
      <button class="btn-submit" @click="handleSubmit">
        <i class="bi me-1" :class="isEdit ? 'bi-check-lg' : 'bi-plus-lg'"></i>
        {{ isEdit ? 'Update Postingan' : 'Tambah Postingan' }}
      </button>
      <button v-if="isEdit" class="btn-cancel" @click="$emit('cancel')">
        Batal
      </button>
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

const localForm = reactive({ id: null, title: '', content: '', image: '' })

watch(() => props.formData, (val) => {
  if (val) Object.assign(localForm, val)
}, { immediate: true, deep: true })

const handleSubmit = () => {
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

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

.opt {
  font-weight: 400;
  color: #aaa;
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
  resize: vertical;
}

.form-input:focus {
  border-color: var(--red);
  background: white;
  box-shadow: 0 0 0 3px rgba(165,42,42,0.08);
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn-submit {
  background: var(--red);
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-submit:hover { background: var(--red-dark, #8b2323); }

.btn-cancel {
  padding: 10px 18px;
  border-radius: 10px;
  border: 1.5px solid #e0e0e0;
  background: white;
  font-size: 14px;
  cursor: pointer;
}
</style>