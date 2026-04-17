<template>
  <div class="kontak-page">

    <div class="page-header">
      <div>
        <h2 class="page-title">Pengaturan Kontak</h2>
        <p class="page-sub">Kelola informasi kontak yang tampil di halaman publik</p>
      </div>
    </div>

    <div class="form-card">

      <div class="fields">

        <div class="field">
          <label><i class="bi bi-geo-alt me-2"></i>Alamat</label>
          <textarea v-model="form.alamat" class="form-input" rows="3" placeholder="Masukkan alamat lengkap..."></textarea>
        </div>

        <div class="row-fields">
          <div class="field">
            <label><i class="bi bi-envelope me-2"></i>Email</label>
            <input v-model="form.email" type="email" class="form-input" placeholder="email@example.com" />
          </div>
          <div class="field">
            <label><i class="bi bi-telephone me-2"></i>Telepon</label>
            <input v-model="form.telepon" type="text" class="form-input" placeholder="0812-xxxx-xxxx" />
          </div>
        </div>

        <div class="field">
          <label><i class="bi bi-instagram me-2"></i>Instagram</label>
          <div class="input-prefix-wrap">
            <span class="prefix">@</span>
            <input v-model="instagramHandle" class="form-input prefix-input" placeholder="username" />
          </div>
        </div>

      </div>

      <div class="form-footer">
        <button class="btn-save" @click="handleSubmit" :disabled="saved">
          <i class="bi me-2" :class="saved ? 'bi-check-lg' : 'bi-floppy'"></i>
          {{ saved ? 'Tersimpan!' : 'Simpan Perubahan' }}
        </button>
      </div>

    </div>

    <!-- PREVIEW -->
    <div class="preview-card">
      <h6 class="preview-title"><i class="bi bi-eye me-2"></i>Preview Kontak Publik</h6>
      <div class="preview-list">
        <div class="preview-item"><i class="bi bi-geo-alt-fill"></i><span>{{ form.alamat || '—' }}</span></div>
        <div class="preview-item"><i class="bi bi-envelope-fill"></i><span>{{ form.email || '—' }}</span></div>
        <div class="preview-item"><i class="bi bi-telephone-fill"></i><span>{{ form.telepon || '—' }}</span></div>
        <div class="preview-item"><i class="bi bi-instagram"></i><span>{{ form.instagram || '—' }}</span></div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { adminData } from '@/store/adminData.js'

const form = reactive({ ...adminData.kontakInfo })
const saved = ref(false)

const instagramHandle = computed({
  get: () => (form.instagram || '').replace('@', ''),
  set: (val) => { form.instagram = val ? '@' + val.replace('@', '') : '' }
})

const handleSubmit = () => {
  Object.assign(adminData.kontakInfo, form)
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}
</script>

<style scoped>
.kontak-page { padding: 4px 0; }
.page-header { margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 700; margin: 0 0 4px; }
.page-sub { font-size: 14px; color: #888; margin: 0; }

.form-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.fields { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }

.row-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.field label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 11px 14px;
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

.input-prefix-wrap {
  display: flex;
  align-items: center;
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
  background: #fafafa;
  transition: 0.2s;
}

.input-prefix-wrap:focus-within {
  border-color: var(--red);
  background: white;
  box-shadow: 0 0 0 3px rgba(165,42,42,0.08);
}

.prefix {
  padding: 11px 12px;
  background: #f0f0f0;
  color: #888;
  font-weight: 600;
  border-right: 1.5px solid #e8e8e8;
}

.prefix-input { border: none !important; border-radius: 0 !important; box-shadow: none !important; background: transparent !important; }

.form-footer { border-top: 1px solid #f5f5f5; padding-top: 20px; }

.btn-save {
  background: var(--red);
  color: white;
  border: none;
  padding: 11px 26px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  display: inline-flex;
  align-items: center;
}

.btn-save:hover:not(:disabled) { background: var(--red-dark, #8b2323); transform: translateY(-1px); }
.btn-save:disabled { background: #27ae60; cursor: default; }

.preview-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #f0f0f0;
}

.preview-title { font-size: 14px; font-weight: 600; color: #555; margin-bottom: 16px; }

.preview-list { display: flex; flex-direction: column; gap: 12px; }

.preview-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #444; }

.preview-item i { color: var(--red); font-size: 15px; margin-top: 1px; flex-shrink: 0; }

@media (max-width: 768px) {
  .row-fields { grid-template-columns: 1fr; }
}
</style>