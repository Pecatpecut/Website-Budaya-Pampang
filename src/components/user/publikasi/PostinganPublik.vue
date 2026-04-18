<template>
  <section id="postingan" class="publikasi-postingan py-5">
    <div class="container">

      <div class="section-header">
        <h2>Postingan</h2>
        <div class="line"></div>
      </div>

      <div v-if="!adminData.postingan.length" class="empty">
        <p>Belum ada postingan.</p>
      </div>

      <div class="postingan-list">
        <a
          v-for="item in paginatedData"
          :key="item.id"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="postingan-item"
        >
          <div class="img-wrapper">
            <img :src="item.thumbnail" :alt="item.title" />
          </div>

          <div class="text">
            <h5 class="title">{{ item.title }}</h5>
            <small class="meta">
              <i class="bi bi-link-45deg me-1"></i>{{ item.source }} &bull; {{ formatDate(item.date) }}
            </small>
            <span class="read-more">Baca selengkapnya →</span>
          </div>
        </a>
      </div>

      <!-- PAGINATION -->
      <div v-if="totalPages > 1" class="pagination-wrapper mt-4">
        <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">←</button>
        <button v-for="page in totalPages" :key="page" class="page-number"
          :class="{ active: currentPage === page }" @click="changePage(page)">{{ page }}</button>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">→</button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { adminData } from '@/store/adminData.js'

const currentPage = ref(1)
const perPage     = 6

const totalPages    = computed(() => Math.max(1, Math.ceil(adminData.postingan.length / perPage)))
const paginatedData = computed(() => {
  const s = (currentPage.value - 1) * perPage
  // sort newest first
  return [...adminData.postingan]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(s, s + perPage)
})

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: document.getElementById('postingan')?.offsetTop - 80, behavior: 'smooth' })
}

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : '—'
</script>

<style scoped>
#postingan { scroll-margin-top: 100px; }
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; font-family: 'Playfair Display', serif; font-weight: 500; }
.line { flex: 1; height: 2px; background: #c0392b; }

.empty { text-align: center; padding: 60px; color: #aaa; }

.postingan-list { display: flex; flex-direction: column; gap: 20px; }

.postingan-item {
  display: flex; gap: 20px; padding: 15px; border-radius: 10px;
  cursor: pointer; transition: all 0.25s ease; text-decoration: none; color: inherit;
}
.postingan-item:hover { background: #f9f9f9; }

.img-wrapper { flex-shrink: 0; width: 140px; height: 100px; border-radius: 8px; overflow: hidden; }
.img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
.postingan-item:hover .img-wrapper img { transform: scale(1.04); }

.text { display: flex; flex-direction: column; justify-content: center; gap: 6px; }
.title { font-size: 1rem; font-weight: 600; margin: 0; color: #1a1a1a; }
.meta { font-size: 0.82rem; color: #888; }
.read-more { color: #c0392b; font-size: 0.85rem; font-weight: 500; }

/* PAGINATION */
.pagination-wrapper { display: flex; justify-content: center; align-items: center; gap: 8px; }
.page-btn { border: none; background: transparent; cursor: pointer; color: #555; font-size: 18px; transition: 0.2s; padding: 4px 8px; }
.page-btn:hover:not(:disabled) { color: #c0392b; }
.page-btn:disabled { opacity: 0.3; cursor: default; }
.page-number { width: 34px; height: 34px; border-radius: 6px; border: none; background: transparent; cursor: pointer; transition: 0.2s; }
.page-number:hover { background: #f0f0f0; color: #c0392b; }
.page-number.active { background: #c0392b; color: white; }

@media (max-width: 576px) {
  .postingan-item { flex-direction: column; }
  .img-wrapper { width: 100%; height: 160px; }
}
</style>