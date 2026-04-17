<template>
  <div class="overlay">

    <div class="modal">

      <h3>{{ selected ? 'Edit Agenda' : 'Tambah Agenda' }}</h3>

      <input v-model="form.title" placeholder="Judul" />
      <input v-model="form.tempat" placeholder="Tempat" />
      <input v-model="form.tanggal" placeholder="Tanggal" />
      <input v-model="form.jam" placeholder="Jam" />

      <div class="actions">
        <button @click="$emit('close')">Batal</button>
        <button class="save" @click="submit">Simpan</button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  selected: Object
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  id: null,
  title: '',
  tempat: '',
  tanggal: '',
  jam: ''
})

watch(() => props.selected, (val) => {
  if (val) Object.assign(form, val)
  else {
    form.id = null
    form.title = ''
    form.tempat = ''
    form.tanggal = ''
    form.jam = ''
  }
}, { immediate: true })

const submit = () => {
  emit('save', { ...form })
}
</script>

<style scoped>
.overlay {
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
  border-radius: 14px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.save {
  background: #c0392b;
  color: white;
}
</style>