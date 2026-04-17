<template>
  <div class="agenda-page">

    <div class="page-header">
      <div>
        <h2 class="page-title">Manajemen Agenda</h2>
        <p class="page-sub">Kelola jadwal kegiatan Desa Budaya Pampang</p>
      </div>
    </div>

    <AgendaForm @add="handleAdd" @error="showToast" />

    <AgendaToolbar
      v-model:search="search"
      v-model:sort="sortBy"
    />

    <AgendaList
      :agenda="filteredData"
      @delete="openConfirm"
      @edit="openEdit"
    />

    <!-- EMPTY STATE -->
    <div v-if="filteredData.length === 0" class="empty-state">
      <i class="bi bi-calendar-x"></i>
      <p>Tidak ada agenda ditemukan</p>
    </div>

    <!-- MODALS -->
    <ConfirmModal
      :show="showConfirm"
      @close="showConfirm = false"
      @confirm="confirmDelete"
    />

    <AgendaEditModal
      :show="showEdit"
      :data="selectedItem"
      @close="showEdit = false"
      @save="handleEdit"
    />

    <Toast :toasts="toasts" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { adminData } from '@/store/adminData'

import AgendaForm from '@/components/admin/agenda/AgendaForm.vue'
import AgendaList from '@/components/admin/agenda/AgendaList.vue'
import AgendaToolbar from '@/components/admin/agenda/AgendaToolbar.vue'
import AgendaEditModal from '@/components/admin/agenda/AgendaEditModal.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import Toast from '@/components/ui/Toast.vue'

const search = ref('')
const sortBy = ref('newest')

/* TOAST */
const toasts = ref([])
const showToast = (msg, type = 'success') => {
  toasts.value.push({ message: msg, type })
  setTimeout(() => toasts.value.shift(), 2500)
}

/* ADD — data pakai field: title, date, time, location */
const handleAdd = (data) => {
  adminData.agenda.push({ id: Date.now(), ...data })
  showToast('Agenda berhasil ditambahkan!')
}

/* DELETE */
const showConfirm = ref(false)
const selectedId = ref(null)

const openConfirm = (id) => {
  selectedId.value = id
  showConfirm.value = true
}

const confirmDelete = () => {
  adminData.agenda = adminData.agenda.filter(a => a.id !== selectedId.value)
  showToast('Agenda berhasil dihapus', 'error')
  showConfirm.value = false
}

/* EDIT */
const showEdit = ref(false)
const selectedItem = ref(null)

const openEdit = (item) => {
  selectedItem.value = { ...item }
  showEdit.value = true
}

const handleEdit = (updated) => {
  const index = adminData.agenda.findIndex(a => a.id === updated.id)
  if (index !== -1) adminData.agenda[index] = updated
  showToast('Agenda berhasil diperbarui!')
  showEdit.value = false
}

/* FILTER + SORT — field: title & date */
const filteredData = computed(() => {
  let data = [...adminData.agenda]

  if (search.value) {
    data = data.filter(item =>
      (item.title || '').toLowerCase().includes(search.value.toLowerCase()) ||
      (item.date || '').includes(search.value)
    )
  }

  data.sort((a, b) =>
    sortBy.value === 'newest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  )

  return data
})
</script>

<style scoped>
.agenda-page {
  padding: 4px 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px;
  color: #1a1a1a;
}

.page-sub {
  font-size: 14px;
  color: #888;
  margin: 0;
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #bbb;
}

.empty-state i {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 15px;
}
</style>