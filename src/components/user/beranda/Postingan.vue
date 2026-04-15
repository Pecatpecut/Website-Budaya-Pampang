<template>
  <section class="postingan-section">
    <div class="container">

      <!-- TITLE -->
      <div class="section-header">
        <h2 class="section-title">Postingan</h2>
        <div class="line"></div>
      </div>

      <!-- GRID -->
      <div class="row g-4">

        <div
          class="col-md-4"
          v-for="item in postinganList"
          :key="item.id"
        >
          <div class="postingan-card" @click="goDetail(item.link)">

            <!-- IMAGE -->
            <div class="image-wrapper">
              <img :src="item.image" />
            </div>

            <!-- TEXT -->
            <div class="content">
              <h6 class="title">{{ item.title }}</h6>
              <small class="meta">
                {{ item.author }} • {{ item.date }}
              </small>
            </div>

          </div>
        </div>

      </div>

      <!-- BUTTON -->
      <div class="d-flex justify-content-end mt-4">
        <button class="btn-more" @click="goTopostingan">
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

const postinganList = ref([
  {
    id: 1,
    title: 'Asal-Usul Desa Budaya Pampang',
    author: 'Admin',
    date: 'April 10, 2026',
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href,
    link: '/postingan/1'
  },
  {
    id: 2,
    title: 'Keunikan Tarian Dayak Kenyah',
    author: 'Admin',
    date: 'April 10, 2026',
    image: new URL('@/assets/images/tarian.svg', import.meta.url).href,
    link: '/postingan/2'
  },
  {
    id: 3,
    title: 'Wisata Budaya yang Mendunia',
    author: 'Admin',
    date: 'April 10, 2026',
    image: new URL('@/assets/images/susur-sungai.svg', import.meta.url).href,
    link: '/postingan/3'
  }
])

const goDetail = (link) => {
  router.push(link)
}

const goTopostingan = () => {
  router.push({
    path: '/publikasi',
    hash: '#postingan'
  })
}
</script>

<style scoped>
.postingan-section {
  padding: 60px 0;
}

.section-header {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 500;
  font-family: 'Playfair Display', serif;
}

.line {
  height: 2px;
  width: 60px;
  background: #c0392b;
  margin-top: 10px;
}

/* CARD */
.postingan-card {
  cursor: pointer;
  transition: all 0.3s ease;
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
  transition: 0.4s ease;
}

/* TEXT */
.title {
  transition: 0.3s;
}

.meta {
  color: #888;
  font-size: 0.8rem;
}

/* HOVER */
.postingan-card:hover {
  transform: translateY(-6px);
}

.postingan-card:hover img {
  transform: scale(1.07);
}

.postingan-card:hover .title {
  text-decoration: underline;
  color: #c0392b;
}

/* BUTTON */
.btn-more {
  background: #e74c3c;
  color: white;
  border-radius: 999px;
  padding: 10px 22px;
  border: none;
  transition: all 0.3s ease;
}

.btn-more:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
</style>