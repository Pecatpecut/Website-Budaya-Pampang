<template>
  <div class="page">

    <!-- HEADER -->
    <div class="top-bar">
      <h2>Manajemen Agenda</h2>

      <button class="btn primary" @click="openModal">
        + Tambah Agenda
      </button>
    </div>

    <!-- LIST -->
    <div class="list">
      <div 
        v-for="item in agenda"
        :key="item.id"
        class="card"
      >

        <div class="left">
          <h4>{{ item.title }}</h4>
          <p>{{ item.tempat }}</p>
          <span class="time">
            {{ item.tanggal }} • {{ item.jam }}
          </span>
        </div>

        <div class="actions">
          <button class="edit" @click="handleEdit(item)">Edit</button>
          <button class="delete" @click="handleDelete(item.id)">X</button>
        </div>

      </div>
    </div>

    <!-- 🔥 MODAL -->
    <div v-if="showModal" class="modal-overlay">

      <div class="modal">

        <h3>Tambah Agenda</h3>

        <input v-model="form.title" placeholder="Judul" />
        <input v-model="form.tempat" placeholder="Tempat" />
        <input v-model="form.tanggal" placeholder="Tanggal" />
        <input v-model="form.jam" placeholder="Jam" />

        <div class="modal-actions">
          <button class="btn primary" @click="handleSubmit">
            Simpan
          </button>
          <button class="btn cancel" @click="closeModal">
            Batal
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const agenda = ref([
  {
    id: 1,
    title: 'Pertunjukan Tari',
    tempat: 'Rumah Lamin',
    tanggal: '18 Apr 2026',
    jam: '13.00'
  },
  {
    id: 2,
    title: 'Festival Budaya',
    tempat: 'Lapangan Pampang',
    tanggal: '20 Apr 2026',
    jam: '15.00'
  }
])

/* MODAL */
const showModal = ref(false)

const form = ref({
  title: '',
  tempat: '',
  tanggal: '',
  jam: ''
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

/* SUBMIT */
const handleSubmit = () => {
  if (!form.value.title) return alert('Judul wajib')

  agenda.value.push({
    id: Date.now(),
    ...form.value
  })

  form.value = {
    title: '',
    tempat: '',
    tanggal: '',
    jam: ''
  }

  closeModal()
}

/* EDIT */
const handleEdit = (item) => {
  form.value = { ...item }
  showModal.value = true
}

/* DELETE */
const handleDelete = (id) => {
  if (confirm('Hapus agenda?')) {
    agenda.value = agenda.value.filter(i => i.id !== id)
  }
}
</script>

<style scoped>

/* PAGE */
.page {
  background: white;
  padding: 25px;
  border-radius: 16px;
}

/* HEADER */
.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

/* BUTTON */
.btn {
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.primary {
  background: #c0392b;
  color: white;
}

.cancel {
  background: #eee;
}

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card {
  display: flex;
  justify-content: space-between;
  background: #fafafa;
  padding: 16px;
  border-radius: 12px;
}

.time {
  display: block;
  margin-top: 6px;
  color: #777;
}

/* ACTION */
.actions {
  display: flex;
  gap: 10px;
}

.edit {
  background: transparent;
  border: none;
  color: #c0392b;
}

.delete {
  background: #c0392b;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

</style>