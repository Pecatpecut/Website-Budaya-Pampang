<template>
  <div class="form">

    <button @click="$emit('back')">← Kembali</button>

    <img src="@/assets/images/lamin.svg" />

    <input type="file" />
    <textarea placeholder="Deskripsi..." />

    <button class="save">Simpan</button>
    <button class="delete">Hapus</button>

  </div>
</template>

<style scoped>
.form {
  background: white;
  padding: 20px;
  border-radius: 12px;
}
</style>