<template>
  <div class="mb-4">
    <form @submit.prevent="$emit('submit')">
      <div class="row g-2">
        <div class="col-md-5">
          <input
            v-model="localForm.title"
            type="text"
            class="form-control"
            placeholder="Judul agenda"
          />
        </div>

        <div class="col-md-4">
          <input
            v-model="localForm.date"
            type="date"
            class="form-control"
          />
        </div>

        <div class="col-md-3 d-flex gap-2">
          <button class="btn btn-primary w-100">
            {{ isEdit ? 'Update' : 'Tambah' }}
          </button>

          <button
            v-if="isEdit"
            type="button"
            class="btn btn-secondary w-100"
            @click="$emit('cancel')"
          >
            Batal
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { watch, reactive } from 'vue'

const props = defineProps({
  formData: Object,
  isEdit: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

const localForm = reactive({
  id: null,
  title: '',
  date: ''
})

// sync props → local
watch(
  () => props.formData,
  (val) => {
    Object.assign(localForm, val)
  },
  { immediate: true, deep: true }
)

// sync local → parent
watch(
  localForm,
  (val) => {
    Object.assign(props.formData, val)
  },
  { deep: true }
)
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