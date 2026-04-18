<template>
  <div class="postingan-page">

    <div class="page-header">
      <h2 class="page-title">Manajemen Postingan</h2>
      <p class="page-sub">Kelola kiriman ulang postingan dari media sosial atau berita</p>
    </div>

    <!-- FORM -->
    <div class="form-card">
      <h5 class="form-title"><i class="bi bi-plus-circle me-2"></i>Tambah Postingan</h5>

      <div class="fields">

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Judul Postingan <span class="req">*</span></label>
            <input v-model="form.title" class="form-input" :class="{ 'is-error': errors.title }"
              placeholder="Judul postingan..." />
            <span v-if="errors.title" class="err-msg">{{ errors.title }}</span>
          </div>

          <div class="col-md-6">
            <label class="form-label">Link Postingan <span class="req">*</span></label>
            <input v-model="form.link" class="form-input" :class="{ 'is-error': errors.link }"
              placeholder="https://..." type="url" />
            <span v-if="errors.link" class="err-msg">{{ errors.link }}</span>
          </div>

          <div class="col-md-4">
            <label class="form-label">Sumber / Credit <span class="req">*</span></label>
            <input v-model="form.source" class="form-input" :class="{ 'is-error': errors.source }"
              placeholder="contoh: Kompas.com / @akun" />
            <span v-if="errors.source" class="err-msg">{{ errors.source }}</span>
          </div>

          <div class="col-md-5">
            <label class="form-label">Thumbnail <span class="req">*</span> <span class="hint">(JPG/PNG/WEBP, maks 5MB)</span></label>
            <div class="file-drop" :class="{ 'is-error': errors.thumbnail }" @click="thumbInput.click()" @dragover.prevent @drop.prevent="onDrop">
              <template v-if="thumbPreview">
                <img :src="thumbPreview" class="file-preview" />
                <span class="file-name">{{ thumbName }}</span>
              </template>
              <template v-else>
                <i class="bi bi-image text-muted fs-3"></i>
                <span>Klik atau seret gambar</span>
              </template>
            </div>
            <input ref="thumbInput" type="file" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none" @change="onThumbChange" />
            <span v-if="errors.thumbnail" class="err-msg">{{ errors.thumbnail }}</span>
          </div>

          <div class="col-md-3 d-flex align-items-end">
            <button class="btn-submit w-100" @click="handleSubmit">
              <i class="bi bi-plus-lg me-1"></i>Tambah
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- TOOLBAR -->
    <div class="toolbar">
      <div class="search-wrap">
        <i class="bi bi-search search-icon"></i>
        <input v-model="search" class="search-input" placeholder="Cari judul postingan..." />
      </div>
      <select v-model="sortBy" class="select-input">
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
      </select>
    </div>

    <!-- LIST -->
    <div class="post-list">
      <div v-for="item in paginatedData" :key="item.id" class="post-card">

        <div class="thumb-wrap">
          <img :src="item.thumbnail" :alt="item.title" />
        </div>

        <div class="post-body">
          <h5>{{ item.title }}</h5>
          <p class="source"><i class="bi bi-link-45deg me-1"></i>{{ item.source }}</p>
          <p class="date">{{ formatDate(item.date) }}</p>
        </div>

        <div class="post-actions">
          <a :href="item.link" target="_blank" class="btn-open">
            <i class="bi bi-box-arrow-up-right me-1"></i>Buka
          </a>
          <button class="btn-del" @click="openConfirm(item.id)">
            <i class="bi bi-trash"></i>
          </button>
        </div>

      </div>
    </div>

    <div v-if="!filteredData.length" class="empty-state">
      <i class="bi bi-newspaper"></i><p>Belum ada postingan</p>
    </div>

    <!-- PAGINATION -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="pg-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
      <button v-for="p in totalPages" :key="p" class="pg-num" :class="{ active: currentPage === p }" @click="currentPage = p">{{ p }}</button>
      <button class="pg-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
    </div>

    <ConfirmModal :show="confirmModal.show" @close="confirmModal.show = false" @confirm="confirmDelete" />
    <Toast :toasts="toasts" />

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { adminData } from '@/store/adminData.js'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import Toast        from '@/components/ui/Toast.vue'

const ALLOWED = ['image/jpeg','image/png','image/webp','image/gif']
const MAX_MB  = 5 * 1024 * 1024

/* FORM */
const thumbInput  = ref(null)
const thumbPreview = ref('')
const thumbName   = ref('')

const form   = reactive({ title: '', link: '', source: '', thumbnailFile: null })
const errors = reactive({ title: '', link: '', source: '', thumbnail: '' })

const validateFile = (f) => {
  if (!f)                      return 'Thumbnail wajib dipilih'
  if (!ALLOWED.includes(f.type)) return 'Format harus JPG, PNG, atau WEBP'
  if (f.size > MAX_MB)         return 'Ukuran maksimal 5MB'
  return ''
}

const onThumbChange = (e) => {
  const f = e.target.files[0]; if (!f) return
  const err = validateFile(f); if (err) { errors.thumbnail = err; return }
  errors.thumbnail = ''
  form.thumbnailFile = f
  thumbPreview.value = URL.createObjectURL(f)
  thumbName.value    = f.name
}

const onDrop = (e) => {
  const f = e.dataTransfer.files[0]; if (!f) return
  const err = validateFile(f); if (err) { errors.thumbnail = err; return }
  errors.thumbnail = ''
  form.thumbnailFile = f
  thumbPreview.value = URL.createObjectURL(f)
  thumbName.value    = f.name
}

const isValidUrl = (s) => { try { new URL(s); return true } catch { return false } }

const handleSubmit = () => {
  errors.title     = form.title    ? '' : 'Judul wajib diisi'
  errors.link      = form.link     ? (isValidUrl(form.link) ? '' : 'URL tidak valid') : 'Link wajib diisi'
  errors.source    = form.source   ? '' : 'Sumber wajib diisi'
  errors.thumbnail = validateFile(form.thumbnailFile)
  if (errors.title || errors.link || errors.source || errors.thumbnail) return

  adminData.postingan.push({
    id: Date.now(),
    title: form.title,
    link: form.link,
    source: form.source,
    thumbnail: thumbPreview.value,
    date: new Date().toISOString().split('T')[0]
  })

  showToast('Postingan berhasil ditambahkan!')
  form.title = ''; form.link = ''; form.source = ''; form.thumbnailFile = null
  thumbPreview.value = ''; thumbName.value = ''
  if (thumbInput.value) thumbInput.value.value = ''
  currentPage.value = 1
}

/* SEARCH + SORT */
const search = ref('')
const sortBy = ref('newest')

const filteredData = computed(() => {
  let data = [...adminData.postingan]
  if (search.value) data = data.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()))
  data.sort((a, b) => sortBy.value === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date))
  return data
})

/* PAGINATION */
const currentPage = ref(1)
const perPage     = 6

const totalPages    = computed(() => Math.max(1, Math.ceil(filteredData.value.length / perPage)))
const paginatedData = computed(() => {
  const s = (currentPage.value - 1) * perPage
  return filteredData.value.slice(s, s + perPage)
})

/* DELETE */
const confirmModal = reactive({ show: false, id: null })
const openConfirm  = (id) => { confirmModal.id = id; confirmModal.show = true }
const confirmDelete = () => {
  const i = adminData.postingan.findIndex(p => p.id === confirmModal.id)
  if (i !== -1) adminData.postingan.splice(i, 1)
  confirmModal.show = false
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  showToast('Postingan berhasil dihapus', 'error')
}

/* TOAST */
const toasts = ref([])
const showToast = (msg, type = 'success') => {
  toasts.value.push({ message: msg, type })
  setTimeout(() => toasts.value.shift(), 2500)
}

const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) : '—'
</script>

<style scoped>
.postingan-page { padding: 4px 0; }
.page-header  { margin-bottom: 24px; }
.page-title   { font-size: 24px; font-weight: 700; margin: 0 0 4px; }
.page-sub     { font-size: 14px; color: #888; margin: 0; }

.form-card { background: white; border-radius: 14px; padding: 24px; border: 1px solid #f0f0f0; margin-bottom: 24px; }
.form-title { font-weight: 600; margin-bottom: 20px; font-size: 15px; }
.form-label { font-size: 13px; font-weight: 500; color: #555; margin-bottom: 6px; display: block; }
.hint { font-weight: 400; color: #aaa; font-size: 12px; }
.req  { color: var(--red); }

.form-input { width: 100%; padding: 10px 14px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 14px; outline: none; transition: 0.2s; background: #fafafa; box-sizing: border-box; }
.form-input:focus { border-color: var(--red); background: white; box-shadow: 0 0 0 3px rgba(165,42,42,0.08); }
.form-input.is-error { border-color: #e74c3c; }
.err-msg { font-size: 12px; color: #e74c3c; margin-top: 4px; display: block; }

.file-drop {
  border: 2px dashed #e0e0e0; border-radius: 10px; padding: 16px; min-height: 80px;
  text-align: center; cursor: pointer; background: #fafafa; transition: 0.2s;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; font-size: 13px; color: #888;
}
.file-drop:hover { border-color: var(--red); }
.file-drop.is-error { border-color: #e74c3c; }
.file-preview { width: 60px; height: 50px; object-fit: cover; border-radius: 6px; }
.file-name { font-size: 12px; color: #555; }

.btn-submit { background: var(--red); color: white; border: none; padding: 11px 20px; border-radius: 10px; font-weight: 500; font-size: 14px; cursor: pointer; transition: 0.2s; }
.btn-submit:hover { background: var(--red-dark, #8b2323); }

/* TOOLBAR */
.toolbar { display: flex; gap: 10px; margin-bottom: 16px; }
.search-wrap { flex: 1; position: relative; }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #aaa; font-size: 14px; }
.search-input { width: 100%; padding: 11px 14px 11px 38px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 14px; outline: none; background: white; box-sizing: border-box; transition: 0.2s; }
.search-input:focus { border-color: var(--red); }
.select-input { padding: 11px 14px; border-radius: 10px; border: 1.5px solid #e8e8e8; background: white; font-size: 14px; cursor: pointer; outline: none; }

/* LIST */
.post-list { display: flex; flex-direction: column; gap: 10px; }

.post-card {
  display: flex; align-items: center; gap: 16px; padding: 14px 16px;
  background: white; border-radius: 14px; border: 1px solid #f0f0f0; transition: 0.25s;
}
.post-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }

.thumb-wrap { width: 90px; height: 68px; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
.thumb-wrap img { width: 100%; height: 100%; object-fit: cover; }

.post-body { flex: 1; min-width: 0; }
.post-body h5 { margin: 0 0 4px; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.source { font-size: 12px; color: #888; margin: 0 0 2px; }
.date   { font-size: 12px; color: #aaa; margin: 0; }

.post-actions { display: flex; gap: 8px; flex-shrink: 0; align-items: center; }
.btn-open { padding: 7px 14px; border-radius: 8px; background: #f0f0f0; color: #333; text-decoration: none; font-size: 13px; transition: 0.2s; display: flex; align-items: center; white-space: nowrap; }
.btn-open:hover { background: var(--red); color: white; }
.btn-del { width: 34px; height: 34px; border-radius: 8px; border: none; background: #fff0f0; color: var(--red); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
.btn-del:hover { background: var(--red); color: white; }

.empty-state { text-align: center; padding: 60px; color: #ccc; }
.empty-state i { font-size: 48px; display: block; margin-bottom: 12px; }

/* PAGINATION */
.pagination { display: flex; justify-content: center; gap: 6px; margin-top: 24px; }
.pg-btn { padding: 8px 14px; border-radius: 8px; border: 1.5px solid #e8e8e8; background: white; cursor: pointer; font-size: 16px; transition: 0.2s; }
.pg-btn:hover:not(:disabled) { border-color: var(--red); color: var(--red); }
.pg-btn:disabled { opacity: 0.4; cursor: default; }
.pg-num { width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid #e8e8e8; background: white; cursor: pointer; font-size: 14px; transition: 0.2s; }
.pg-num:hover { border-color: var(--red); color: var(--red); }
.pg-num.active { background: var(--red); color: white; border-color: var(--red); }
</style>