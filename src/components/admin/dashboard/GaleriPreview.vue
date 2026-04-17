<template>
  <div class="section">

    <div class="header">
      <h3>Galeri Terbaru</h3>
      <button class="btn" @click="goGaleri">Upload</button>
    </div>

    <div class="gallery">
      <img src="@/assets/images/lamin.svg" />
      <img src="@/assets/images/lamin.svg" />
      <img src="@/assets/images/lamin.svg" />
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goGaleri = () => {
  router.push('/admin/galeri')
}
</script>

<style scoped>
.section {
  background: white;
  padding: 20px;
  border-radius: 14px;
  margin-bottom: 25px;
}

.gallery {
  display: flex;
  gap: 15px;
}

.gallery img {
  width: 200px;
  border-radius: 10px;
}
</style>