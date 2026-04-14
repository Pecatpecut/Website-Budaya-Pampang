<template>
  <section class="berita-section">
    <div class="container">

      <!-- TITLE -->
      <div class="section-header">
        <h2 class="section-title">Berita</h2>
        <div class="line"></div>
      </div>

      <!-- GRID -->
      <div class="row g-4">

        <div
          class="col-md-4"
          v-for="item in beritaList"
          :key="item.id"
        >
          <div
            class="berita-card"
            @click="goDetail(item.id)"
          >

            <!-- IMAGE -->
            <div class="image-wrapper">
              <img :src="item.image" />
            </div>

            <!-- TEXT -->
            <div class="content">
              <h6 class="title">
                {{ item.title }}
              </h6>

              <small class="meta">
                {{ item.author }} • {{ item.date }}
              </small>
            </div>

          </div>
        </div>

      </div>

      <!-- BUTTON -->
      <div class="d-flex justify-content-end mt-4">
        <button class="btn-more">
          Lebih Banyak →
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const beritaList = ref([
  {
    id: 1,
    title: 'Asal-Usul Desa Budaya Pampang',
    author: 'Admin',
    date: 'April 10, 2026',
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href
  },
  {
    id: 2,
    title: 'Keunikan Tarian Dayak Kenyah',
    author: 'Admin',
    date: 'April 10, 2026',
    image: new URL('@/assets/images/tarian.svg', import.meta.url).href
  },
  {
    id: 3,
    title: 'Wisata Budaya yang Mendunia',
    author: 'Admin',
    date: 'April 10, 2026',
    image: new URL('@/assets/images/susur-sungai.svg', import.meta.url).href
  }
])

const goDetail = (id) => {
  router.push(`/berita/${id}`)
}
</script>

<style scoped>

.berita-section {
  padding: 60px 0;
  background: #ffffff;
}

/* HEADER */
.section-header {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
}

.line {
  height: 2px;
  width: 60px;
  background: #c0392b;
  margin-top: 10px;
}

/* CARD */
.berita-card {
  cursor: pointer;
  transition: 0.3s;
}

/* IMAGE */
.image-wrapper {
  overflow: hidden;
  border-radius: 12px;
}

.image-wrapper img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: 0.4s;
}

/* CONTENT */
.content {
  margin-top: 12px;
}

/* TITLE */
.title {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 5px;
  color: #111;
}

/* META */
.meta {
  color: #888;
  font-size: 0.8rem;
}

/* HOVER */
.berita-card:hover img {
  transform: scale(1.05);
}

.berita-card:hover {
  transform: translateY(-4px);
}

/* BUTTON */
.btn-more {
  background: #c0392b;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 999px;
  transition: 0.3s;
}

.btn-more:hover {
  background: #a93226;
}

.title:hover {
  text-decoration: underline;
}

</style>