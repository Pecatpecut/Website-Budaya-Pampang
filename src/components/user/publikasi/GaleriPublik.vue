<template>
  <section id="galeri" class="galeri-section py-5">
    <div class="container">

      <div class="section-header">
        <h2>Galeri</h2>
        <div class="line"></div>
      </div>

      <div v-if="!adminData.galeri.length" class="empty">
        <p>Belum ada foto di galeri.</p>
      </div>

      <transition-group name="fade" tag="div" class="masonry">
        <div
          v-for="item in paginatedImages"
          :key="item.id"
          class="item"
          @click="openLightbox(item)"
        >
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <div class="item-overlay"><span>{{ item.title }}</span></div>
        </div>
      </transition-group>

      <!-- PAGINATION -->
      <div v-if="totalPages > 1" class="pagination-wrapper mt-4">
        <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">← Previous</button>
        <div class="pages">
          <button v-for="page in totalPages" :key="page" class="page-number"
            :class="{ active: currentPage === page }" @click="changePage(page)">{{ page }}</button>
        </div>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next →</button>
      </div>

      <!-- LIGHTBOX -->
      <Transition name="lb">
        <div v-if="lightbox" class="lightbox" @click="lightbox = null">
          <div class="lb-inner" @click.stop>
            <button class="lb-close" @click="lightbox = null"><i class="bi bi-x-lg"></i></button>
            <img :src="lightbox.image" :alt="lightbox.title" />
            <p class="lb-title">{{ lightbox.title }}</p>
          </div>
        </div>
      </Transition>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { adminData } from '@/store/adminData.js'

const currentPage = ref(1)
const perPage     = 9

const totalPages     = computed(() => Math.max(1, Math.ceil(adminData.galeri.length / perPage)))
const paginatedImages = computed(() => {
  const s = (currentPage.value - 1) * perPage
  return adminData.galeri.slice(s, s + perPage)
})

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: document.getElementById('galeri')?.offsetTop - 80, behavior: 'smooth' })
}

const lightbox = ref(null)
const openLightbox = (item) => { lightbox.value = item }
</script>

<style scoped>
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; font-family: 'Playfair Display', serif; font-weight: 500; }
.line { flex: 1; height: 2px; background: #c0392b; }

.masonry { column-count: 3; column-gap: 15px; }
.item { break-inside: avoid; margin-bottom: 15px; cursor: pointer; position: relative; border-radius: 10px; overflow: hidden; }
.item img { width: 100%; display: block; border-radius: 10px; transition: 0.25s ease; }
.item:hover img { transform: scale(1.04); }

.item-overlay {
  position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  display: flex; align-items: flex-end; padding: 10px; color: white; font-size: 13px; font-weight: 500;
  opacity: 0; transition: 0.2s; border-radius: 10px;
}
.item:hover .item-overlay { opacity: 1; }

.empty { text-align: center; padding: 60px; color: #aaa; }

/* PAGINATION */
.pagination-wrapper { display: flex; justify-content: center; align-items: center; gap: 15px; }
.page-btn { border: none; background: transparent; cursor: pointer; color: #555; transition: 0.2s; }
.page-btn:hover:not(:disabled) { color: #c0392b; }
.page-btn:disabled { opacity: 0.3; cursor: default; }
.pages { display: flex; gap: 6px; }
.page-number { width: 34px; height: 34px; border-radius: 6px; border: none; background: transparent; cursor: pointer; transition: 0.2s; }
.page-number:hover { background: #f0f0f0; color: #c0392b; }
.page-number.active { background: #c0392b; color: white; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* LIGHTBOX */
.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 9999; }
.lb-inner { position: relative; display: flex; flex-direction: column; align-items: center; }
.lb-close { position: absolute; top: -40px; right: 0; background: rgba(255,255,255,0.15); border: none; color: white; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
.lb-close:hover { background: rgba(255,255,255,0.3); }
.lb-inner img { max-width: 90vw; max-height: 80vh; border-radius: 10px; }
.lb-title { color: white; font-size: 14px; margin-top: 12px; opacity: 0.8; }
.lb-enter-active, .lb-leave-active { transition: 0.2s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

@media (max-width: 768px) { .masonry { column-count: 2; } }
</style>