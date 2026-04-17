<template>
  <div class="mb-4">
    <form @submit.prevent="$emit('submit')">

      <div class="mb-2">
        <input
          v-model="localForm.title"
          type="text"
          class="form-control"
          placeholder="Judul berita"
        />
      </div>

      <div class="mb-2">
        <textarea
          v-model="localForm.content"
          class="form-control"
          rows="3"
          placeholder="Isi berita"
        ></textarea>
      </div>

      <div class="mb-2">
        <input
          v-model="localForm.image"
          type="text"
          class="form-control"
          placeholder="URL gambar (opsional)"
        />
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-primary">
          {{ isEdit ? 'Update' : 'Tambah' }}
        </button>

        <button
          v-if="isEdit"
          type="button"
          class="btn btn-secondary"
          @click="$emit('cancel')"
        >
          Batal
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  formData: Object,
  isEdit: Boolean
})

const localForm = reactive({
  id: null,
  title: '',
  content: '',
  image: ''
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