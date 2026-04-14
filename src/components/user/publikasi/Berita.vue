<template>
  <section class="publikasi-berita py-5">
    <div class="container">

      <!-- TITLE -->
      <div class="section-header">
        <h2><em>Berita</em></h2>
        <div class="line"></div>
      </div>

      <!-- LIST -->
      <div class="berita-list">

        <div
          class="berita-item"
          v-for="item in beritaList"
          :key="item.id"
        >
          <!-- IMAGE -->
          <img :src="item.image" />

          <!-- CONTENT -->
          <div class="text">
            <h5>{{ item.title }}</h5>
            <small>{{ item.author }} - {{ item.date }}</small>
            <p>{{ item.desc }}</p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
const beritaList = [
  {
    id: 1,
    title: 'Asal-Usul Desa Budaya Pampang',
    author: 'Admin',
    date: 'April 10, 2026',
    desc: 'Desa Budaya Pampang merupakan representasi hidup dari budaya...',
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href
  },
  {
    id: 2,
    title: 'Asal-Usul Desa Budaya Pampang',
    author: 'Admin',
    date: 'April 10, 2026',
    desc: 'Desa Budaya Pampang merupakan representasi hidup dari budaya...',
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href
  },
  {
    id: 3,
    title: 'Asal-Usul Desa Budaya Pampang',
    author: 'Admin',
    date: 'April 10, 2026',
    desc: 'Desa Budaya Pampang merupakan representasi hidup dari budaya...',
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href
  }
]
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

/* LIST */
.berita-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  cursor: pointer;
}

.berita-item img {
  width: 220px;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
}

.text h5 {
  margin-bottom: 5px;
}

.text small {
  color: #888;
}

.text p {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #555;
}

</style>