<template>
  <div class="mb-4">
    <form @submit.prevent="$emit('submit')">
      <div class="row g-2">

        <div class="col-md-4">
          <input
            v-model="localForm.title"
            type="text"
            class="form-control"
            placeholder="Judul gambar"
          />
        </div>

        <div class="col-md-5">
          <input
            v-model="localForm.image"
            type="text"
            class="form-control"
            placeholder="URL gambar (sementara)"
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
import { reactive, watch } from 'vue'

const props = defineProps({
  formData: Object,
  isEdit: Boolean
})

const localForm = reactive({
  id: null,
  title: '',
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

<style scoped>
.form {
  background: white;
  padding: 20px;
  border-radius: 12px;
}
</style>