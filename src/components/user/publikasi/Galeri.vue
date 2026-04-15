<template>
  <section id="galeri" class="galeri-section py-5">
    <div class="container">

      <!-- TITLE -->
      <div class="section-header">
        <h2>Galeri</h2>
        <div class="line"></div>
      </div>

      <!-- MASONRY -->
      <transition-group name="fade" tag="div" class="masonry">

        <div
          v-for="(img, i) in paginatedImages"
          :key="img + i + currentPage"
          class="item"
          @click="openLightbox(img)"
        >
          <img 
            :src="img"
            loading="lazy"
          />
        </div>

      </transition-group>

      <!-- PAGINATION -->
      <div class="pagination-wrapper mt-4">

        <button 
          class="page-btn"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          ← Previous
        </button>

        <div class="pages">
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-number"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button 
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next →
        </button>

      </div>

      <!-- LIGHTBOX -->
      <div v-if="lightbox" class="lightbox" @click="lightbox = null">
        <img :src="lightbox" />
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const images = Array(30).fill(
  new URL('@/assets/images/lamin.svg', import.meta.url).href
)

const currentPage = ref(1)
const perPage = 9

const totalPages = computed(() => Math.ceil(images.length / perPage))

const paginatedImages = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return images.slice(start, start + perPage)
})

const changePage = async (page) => {
  currentPage.value = page

  await nextTick()

  window.scrollTo({
    top: document.getElementById('galeri').offsetTop - 80,
    behavior: 'smooth'
  })
}

const lightbox = ref(null)
const openLightbox = (img) => {
  lightbox.value = img
}
</script>

<style scoped>

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
   MASONRY
========================= */
.masonry {
  column-count: 3;
  column-gap: 15px;
}

.item {
  break-inside: avoid;
  margin-bottom: 15px;
  cursor: pointer;
}

.item img {
  width: 100%;
  border-radius: 10px;
  transition: 0.25s ease;
}

.item:hover img {
  transform: scale(1.04);
}

/* =========================
   PAGINATION
========================= */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

/* PREV NEXT */
.page-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: #555;
  transition: 0.2s;
}

.page-btn:hover {
  color: #c0392b;
}

/* PAGE NUMBERS */
.pages {
  display: flex;
  gap: 6px;
}

.page-number {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: none;

  background: transparent;
  cursor: pointer;

  transition: 0.2s;
}

/* 🔥 HOVER */
.page-number:hover {
  background: #f0f0f0;
  color: #c0392b;
}

/* ACTIVE */
.page-number.active {
  background: #c0392b;
  color: white;
}

/* =========================
   TRANSITION (SUBTLE)
========================= */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* =========================
   LIGHTBOX
========================= */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .masonry {
    column-count: 2;
  }
}

</style>