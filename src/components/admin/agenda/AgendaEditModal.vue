<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="overlay" @click.self="$emit('close')">

        <div class="modal-box">

          <div class="modal-header">
            <h5><i class="bi bi-pencil-square me-2"></i>Edit Agenda</h5>
            <button class="close-btn" @click="$emit('close')">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <div class="modal-body">

            <div class="field">
              <label>Judul Kegiatan</label>
              <input v-model="form.title" placeholder="Judul agenda..." />
            </div>

            <div class="row-fields">
              <div class="field">
                <label>Tanggal</label>
                <input v-model="form.date" type="date" />
              </div>
              <div class="field">
                <label>Waktu</label>
                <input v-model="form.time" type="time" />
              </div>
            </div>

            <div class="field">
              <label>Lokasi</label>
              <input v-model="form.location" placeholder="Lokasi kegiatan..." />
            </div>

          </div>

          <div class="modal-footer">
            <button class="btn-cancel" @click="$emit('close')">Batal</button>
            <button class="btn-save" @click="save">
              <i class="bi bi-check-lg me-1"></i> Simpan
            </button>
          </div>

        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ show: Boolean, data: Object })
const emit = defineEmits(['save', 'close'])

const form = reactive({
  id: null,
  title: '',
  date: '',
  time: '',
  location: ''
})

watch(() => props.data, (v) => {
  if (v) Object.assign(form, v)
}, { immediate: true, deep: true })

const save = () => emit('save', { ...form })
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.modal-box {
  background: white;
  border-radius: 18px;
  width: 440px;
  max-width: 95vw;
  box-shadow: 0 24px 60px rgba(0,0,0,0.15);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h5 {
  font-weight: 600;
  margin: 0;
  font-size: 15px;
}

.close-btn {
  background: #f5f5f5;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #eee;
}

.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

.field input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
  box-sizing: border-box;
}

.field input:focus {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(165,42,42,0.08);
}

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.btn-cancel {
  padding: 9px 20px;
  border-radius: 10px;
  border: 1.5px solid #e0e0e0;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-save {
  padding: 9px 22px;
  border-radius: 10px;
  border: none;
  background: var(--red);
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.btn-save:hover {
  background: var(--red-dark, #8b2323);
  transform: translateY(-1px);
}

/* TRANSITION */
.modal-enter-active, .modal-leave-active {
  transition: 0.25s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>