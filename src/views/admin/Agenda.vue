<template>
  <div class="container py-4">
    <h3 class="mb-4">Manajemen Agenda</h3>

    <!-- FORM -->
    <AgendaForm
      :formData="form"
      :isEdit="isEdit"
      @submit="handleSubmit"
      @cancel="resetForm"
    />

    <!-- LIST -->
    <AgendaList
      :items="agenda"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminData } from '@/store/adminData.js'

import AgendaForm from '@/components/admin/agenda/AgendaForm.vue'
import AgendaList from '@/components/admin/agenda/AgendaList.vue'

const agenda = adminData.agenda

const form = ref({
  id: null,
  title: '',
  date: ''
})

const isEdit = ref(false)

const handleSubmit = () => {
  if (!form.value.title || !form.value.date) return

  if (isEdit.value) {
    // ✅ UPDATE DATA
    const index = agenda.findIndex(item => item.id === form.value.id)
    if (index !== -1) {
      agenda[index] = { ...form.value }
    }
  } else {
    // ✅ TAMBAH DATA
    agenda.push({
      ...form.value,
      id: Date.now()
    })
  }

  resetForm()
}

const handleEdit = (item) => {
  form.value = { ...item }
  isEdit.value = true
}

const handleDelete = (id) => {
  const index = agenda.findIndex(item => item.id === id)
  if (index !== -1) {
    agenda.splice(index, 1)
  }
}

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    date: ''
  }
  isEdit.value = false
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