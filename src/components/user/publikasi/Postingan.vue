<template>
  <section id="postingan" class="publikasi-postingan py-5">
    <div class="container">

      <!-- TITLE -->
      <div class="section-header">
        <h2>Postingan</h2>
        <div class="line"></div>
      </div>

      <!-- LIST -->
      <div class="postingan-list">

        <div
          class="postingan-item"
          v-for="item in paginatedData"
          :key="item.id"
          @click="goDetail(item.id)"
        >

          <!-- IMAGE -->
          <div class="img-wrapper">
            <img :src="item.image" />
          </div>

          <!-- CONTENT -->
          <div class="text">
            <h5 class="title">{{ item.title }}</h5>

            <small class="meta">
              {{ item.author }} • {{ item.date }}
            </small>

            <p class="desc">
              {{ item.desc }}
            </p>

            <span class="read-more">Baca selengkapnya →</span>
          </div>

        </div>

      </div>

      <!-- PAGINATION -->
      <div class="pagination-wrapper mt-4">

        <button 
          class="page-btn"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          ←
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="page-number"
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>

        <button 
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          →
        </button>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* DATA */
const postinganList = [
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
    title: 'Keunikan Tarian Dayak Kenyah',
    author: 'Admin',
    date: 'April 10, 2026',
    desc: 'Tarian tradisional yang penuh makna budaya...',
    image: new URL('@/assets/images/tarian.svg', import.meta.url).href
  },
  {
    id: 3,
    title: 'Wisata Budaya yang Mendunia',
    author: 'Admin',
    date: 'April 10, 2026',
    desc: 'Pampang menjadi destinasi wisata budaya...',
    image: new URL('@/assets/images/susur-sungai.svg', import.meta.url).href
  },
  {
    id: 4,
    title: 'Budaya Dayak yang Mendunia',
    author: 'Admin',
    date: 'April 12, 2026',
    desc: 'Keunikan budaya yang terus menarik wisatawan...',
    image: new URL('@/assets/images/tarian.svg', import.meta.url).href
  }
]

/* PAGINATION */
const currentPage = ref(1)
const perPage = 2

const totalPages = computed(() =>
  Math.ceil(postinganList.length / perPage)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return postinganList.slice(start, start + perPage)
})

const changePage = (page) => {
  currentPage.value = page

  window.scrollTo({
    top: document.getElementById('postingan').offsetTop - 80,
    behavior: 'smooth'
  })
}

/* ROUTING */
const goDetail = (id) => {
  router.push(`/berita/${id}`)
}
</script>

<style scoped>

/* OFFSET */
#postingan {
  scroll-margin-top: 100px;
}

/* HEADER */
.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
  font-weight: 500;
}

.line {
  flex: 1;
  height: 2px;
  background: #c0392b;
}

/* =========================
   LIST
========================= */
.postingan-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ITEM */
.postingan-item {
  display: flex;
  gap: 20px;
  padding: 15px;
  border-radius: 10px;

  cursor: pointer;
  transition: all 0.25s ease;
}

/* HOVER */
.postingan-item:hover {
  background: #f9f9f9;
}

/* IMAGE */
.img-wrapper {
  flex-shrink: 0;
}

.img-wrapper img {
  width: 220px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  transition: 0.3s;
}

.postingan-item:hover img {
  transform: scale(1.04);
}

/* TEXT */
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  margin-bottom: 6px;
  font-weight: 600;
  transition: 0.2s;
}

.postingan-item:hover .title {
  color: #c0392b;
}

.meta {
  color: #888;
  font-size: 0.8rem;
}

.desc {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #555;
}

.read-more {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #c0392b;
  opacity: 0.8;
}

/* =========================
   PAGINATION
========================= */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.page-btn,
.page-number {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: 0.2s;
}

.page-number:hover {
  background: #eee;
}

.page-number.active {
  background: #c0392b;
  color: white;
}

.page-btn:hover {
  color: #c0392b;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .postingan-item {
    flex-direction: column;
  }

  .img-wrapper img {
    width: 100%;
    height: 180px;
  }
}

</style>