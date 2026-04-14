<template>
  <section class="galeri-section py-5">
    <div class="container">

      <!-- TITLE -->
      <div class="section-header">
        <h2><em>Galeri</em></h2>
        <div class="line"></div>
      </div>

      <!-- GRID -->
      <div class="galeri-grid">

        <div
          v-for="(img, i) in images"
          :key="i"
          class="galeri-item"
        >
          <img :src="img" />
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
const images = Array(12).fill(
  new URL('@/assets/images/lamin.svg', import.meta.url).href
)
</script>

<style scoped>

.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.section-header h2 {
  font-family: 'Playfair Display', serif;
}

.line {
  flex: 1;
  height: 2px;
  background: #c0392b;
}

/* GRID */
.galeri-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.galeri-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  transition: 0.3s;
}

.galeri-item:hover img {
  transform: scale(1.05);
}

</style>