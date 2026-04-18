<template>
  <div class="galeri-page">

    <div class="page-header">
      <h2 class="page-title">Manajemen Galeri</h2>
      <p class="page-sub">Kelola foto dan gambar kegiatan desa</p>
    </div>

    <!-- FORM UPLOAD -->
    <div class="form-card">
      <h5 class="form-title"><i class="bi bi-cloud-upload me-2"></i>Upload Foto Baru</h5>

      <div class="row g-3">
        <div class="col-md-5">
          <label class="form-label">Judul Foto <span class="req">*</span></label>
          <input v-model="form.title" class="form-input" :class="{ 'is-error': errors.title }"
            placeholder="Masukkan judul foto..." />
          <span v-if="errors.title" class="err-msg">{{ errors.title }}</span>
        </div>

        <div class="col-md-5">
          <label class="form-label">File Gambar <span class="req">*</span> <span class="hint">(JPG, PNG, WEBP, maks 5MB)</span></label>
          <div class="file-drop" :class="{ 'is-error': errors.image }" @click="fileInput.click()" @dragover.prevent @drop.prevent="onDrop">
            <template v-if="preview">
              <img :src="preview" class="file-preview" />
              <span class="file-name">{{ fileName }}</span>
            </template>
            <template v-else>
              <i class="bi bi-image text-muted fs-3"></i>
              <span>Klik atau seret gambar ke sini</span>
            </template>
          </div>
          <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none" @change="onFileChange" />
          <span v-if="errors.image" class="err-msg">{{ errors.image }}</span>
        </div>

        <div class="col-md-2 d-flex align-items-end">
          <button class="btn-submit w-100" @click="handleSubmit">
            <i class="bi bi-plus-lg me-1"></i>Upload
          </button>
        </div>
      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="toolbar">
      <span class="count-info">{{ adminData.galeri.length }} foto</span>
      <span class="page-info">Halaman {{ currentPage }} / {{ totalPages || 1 }}</span>
    </div>

    <!-- GRID -->
    <GaleriGrid :items="paginatedData" @edit="openEdit" @delete="openConfirm" />

    <div v-if="!adminData.galeri.length" class="empty-state">
      <i class="bi bi-images"></i><p>Belum ada foto di galeri</p>
    </div>

    <!-- PAGINATION -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="pg-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
      <button v-for="p in totalPages" :key="p" class="pg-num" :class="{ active: currentPage === p }" @click="currentPage = p">{{ p }}</button>
      <button class="pg-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
    </div>

    <!-- EDIT MODAL (judul saja) -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="editModal.show" class="overlay" @click.self="editModal.show = false">
          <div class="modal-box">
            <div class="modal-header">
              <h5>Edit Judul Foto</h5>
              <button class="close-btn" @click="editModal.show = false"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="modal-body">
              <label class="form-label">Judul <span class="req">*</span></label>
              <input v-model="editModal.title" class="form-input" :class="{ 'is-error': editModal.error }" placeholder="Judul foto..." />
              <span v-if="editModal.error" class="err-msg">{{ editModal.error }}</span>
            </div>
            <div class="modal-footer">
              <button class="btn-cancel" @click="editModal.show = false">Batal</button>
              <button class="btn-save" @click="saveEdit"><i class="bi bi-check-lg me-1"></i>Simpan</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <ConfirmModal :show="confirmModal.show" @close="confirmModal.show = false" @confirm="confirmDelete" />
    <Toast :toasts="toasts" />

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { adminData } from '@/store/adminData.js'
import GaleriGrid  from '@/components/admin/galeri/GaleriGrid.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import Toast        from '@/components/ui/Toast.vue'

/* FORM */
const fileInput = ref(null)
const form      = reactive({ title: '', imageFile: null })
const errors    = reactive({ title: '', image: '' })
const preview   = ref('')
const fileName  = ref('')

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE      = 5 * 1024 * 1024 // 5MB

const validateFile = (file) => {
  if (!file) return 'File gambar wajib dipilih'
  if (!ALLOWED_TYPES.includes(file.type)) return 'Format harus JPG, PNG, WEBP, atau GIF'
  if (file.size > MAX_SIZE) return 'Ukuran file maksimal 5MB'
  return ''
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const err = validateFile(file)
  if (err) { errors.image = err; return }
  errors.image = ''
  form.imageFile = file
  fileName.value = file.name
  preview.value  = URL.createObjectURL(file)
}

const onDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (!file) return
  const err = validateFile(file)
  if (err) { errors.image = err; return }
  errors.image = ''
  form.imageFile = file
  fileName.value = file.name
  preview.value  = URL.createObjectURL(file)
}

const handleSubmit = () => {
  errors.title = form.title ? '' : 'Judul wajib diisi'
  errors.image = validateFile(form.imageFile)
  if (errors.title || errors.image) return

  adminData.galeri.push({
    id: Date.now(),
    title: form.title,
    image: preview.value // blob URL
  })

  showToast('Foto berhasil diupload!')
  form.title = ''; form.imageFile = null; preview.value = ''; fileName.value = ''
  if (fileInput.value) fileInput.value.value = ''
  currentPage.value = 1
}

/* PAGINATION */
const currentPage = ref(1)
const perPage     = 9

const totalPages    = computed(() => Math.max(1, Math.ceil(adminData.galeri.length / perPage)))
const paginatedData = computed(() => {
  const s = (currentPage.value - 1) * perPage
  return adminData.galeri.slice(s, s + perPage)
})

/* EDIT MODAL (judul saja) */
const editModal = reactive({ show: false, id: null, title: '', error: '' })

const openEdit = (item) => {
  editModal.id    = item.id
  editModal.title = item.title
  editModal.error = ''
  editModal.show  = true
}

const saveEdit = () => {
  if (!editModal.title.trim()) { editModal.error = 'Judul wajib diisi'; return }
  const i = adminData.galeri.findIndex(g => g.id === editModal.id)
  if (i !== -1) adminData.galeri[i].title = editModal.title.trim()
  editModal.show = false
  showToast('Judul berhasil diperbarui!')
}

/* DELETE */
const confirmModal = reactive({ show: false, id: null })

const openConfirm = (id) => { confirmModal.id = id; confirmModal.show = true }

const confirmDelete = () => {
  const i = adminData.galeri.findIndex(g => g.id === confirmModal.id)
  if (i !== -1) adminData.galeri.splice(i, 1)
  confirmModal.show = false
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  showToast('Foto berhasil dihapus', 'error')
}

/* TOAST */
const toasts = ref([])
const showToast = (msg, type = 'success') => {
  toasts.value.push({ message: msg, type })
  setTimeout(() => toasts.value.shift(), 2500)
}
</script>

<style scoped>
.galeri-page  { padding: 4px 0; }
.page-header  { margin-bottom: 24px; }
.page-title   { font-size: 24px; font-weight: 700; margin: 0 0 4px; }
.page-sub     { font-size: 14px; color: #888; margin: 0; }

.form-card { background: white; border-radius: 14px; padding: 24px; border: 1px solid #f0f0f0; margin-bottom: 24px; }
.form-title { font-weight: 600; margin-bottom: 20px; font-size: 15px; }
.form-label { font-size: 13px; font-weight: 500; color: #555; margin-bottom: 6px; display: block; }
.hint { font-weight: 400; color: #aaa; font-size: 12px; }
.req { color: var(--red); }

.form-input {
  width: 100%; padding: 10px 14px; border: 1.5px solid #e8e8e8; border-radius: 10px;
  font-size: 14px; outline: none; transition: 0.2s; background: #fafafa; box-sizing: border-box;
}
.form-input:focus { border-color: var(--red); background: white; box-shadow: 0 0 0 3px rgba(165,42,42,0.08); }
.form-input.is-error { border-color: #e74c3c; }

.file-drop {
  border: 2px dashed #e0e0e0; border-radius: 10px; padding: 20px;
  text-align: center; cursor: pointer; transition: 0.2s; background: #fafafa;
  min-height: 90px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; font-size: 13px; color: #888;
}
.file-drop:hover { border-color: var(--red); background: #fff9f9; }
.file-drop.is-error { border-color: #e74c3c; }
.file-preview { width: 60px; height: 50px; object-fit: cover; border-radius: 6px; }
.file-name { font-size: 12px; color: #555; }

.err-msg { font-size: 12px; color: #e74c3c; margin-top: 4px; display: block; }

.btn-submit { background: var(--red); color: white; border: none; padding: 11px 20px; border-radius: 10px; font-weight: 500; font-size: 14px; cursor: pointer; transition: 0.2s; }
.btn-submit:hover { background: var(--red-dark, #8b2323); }

.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.count-info, .page-info { font-size: 13px; color: #888; }

.pagination { display: flex; justify-content: center; gap: 6px; margin-top: 24px; }
.pg-btn { padding: 8px 14px; border-radius: 8px; border: 1.5px solid #e8e8e8; background: white; cursor: pointer; font-size: 16px; transition: 0.2s; }
.pg-btn:hover:not(:disabled) { border-color: var(--red); color: var(--red); }
.pg-btn:disabled { opacity: 0.4; cursor: default; }
.pg-num { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid #e8e8e8; background: white; cursor: pointer; font-size: 14px; transition: 0.2s; }
.pg-num:hover { border-color: var(--red); color: var(--red); }
.pg-num.active { background: var(--red); color: white; border-color: var(--red); }

.empty-state { text-align: center; padding: 60px; color: #ccc; }
.empty-state i { font-size: 48px; display: block; margin-bottom: 12px; }

/* MODAL */
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(2px); }
.modal-box { background: white; border-radius: 18px; width: 380px; max-width: 95vw; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.15); }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
.modal-header h5 { font-weight: 600; margin: 0; }
.close-btn { background: #f5f5f5; border: none; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.modal-body { padding: 24px; }
.modal-footer { display: flex; gap: 10px; justify-content: flex-end; padding: 16px 24px; border-top: 1px solid #f0f0f0; background: #fafafa; }
.btn-cancel { padding: 9px 20px; border-radius: 10px; border: 1.5px solid #e0e0e0; background: white; font-size: 14px; cursor: pointer; }
.btn-save { padding: 9px 22px; border-radius: 10px; border: none; background: var(--red); color: white; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; }
.btn-save:hover { background: var(--red-dark, #8b2323); }
.modal-enter-active, .modal-leave-active { transition: 0.25s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
</style>