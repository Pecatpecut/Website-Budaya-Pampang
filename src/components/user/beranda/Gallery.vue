<template>
  <section class="gallery-section pt-5 pb-1">
    <div class="container">

      <!-- TITLE -->
      <h2 class="section-title mb-5 text-center">
        <span>Cerita</span> dalam Gambar
      </h2>

      <!-- GRID -->
      <div class="gallery-grid">

        <div
          v-for="(item, i) in galleryList"
          :key="i"
          class="gallery-item"
          :class="item.class"
          @click="openLightbox(item.image)"
          @mousemove="handleTilt($event, i)"
          @mouseleave="resetTilt(i)"
          :style="tiltStyles[i]"
        >
          <img :src="item.image" loading="lazy" />

          <!-- OVERLAY -->
          <div class="overlay">
            <div class="caption">
              <h6>{{ item.title }}</h6>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- BUTTON -->
      <div class="d-flex justify-content-end mt-4">
        <button class="btn-more" @click="goToGaleri">
          Lebih Banyak →
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* DATA */
const galleryList = [
  {
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href,
    title: 'Rumah Adat Lamin',
    desc: 'Simbol budaya Dayak Kenyah',
    class: 'large'
  },
  {
    image: new URL('@/assets/images/tarian.svg', import.meta.url).href,
    title: 'Tarian Tradisional',
    desc: 'Pertunjukan setiap Minggu',
    class: 'tall'
  },
  {
    image: new URL('@/assets/images/susur-sungai.svg', import.meta.url).href,
    title: 'Susur Sungai',
    desc: 'Pengalaman alam yang menenangkan'
  },
  {
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href,
    title: 'Interior Lamin',
    desc: 'Ukiran khas Dayak'
  },
  {
    image: new URL('@/assets/images/tarian.svg', import.meta.url).href,
    title: 'Busana Adat',
    desc: 'Keindahan pakaian tradisional'
  },
  {
    image: new URL('@/assets/images/lamin.svg', import.meta.url).href,
    title: 'Budaya Lokal',
    desc: 'Warisan yang terus hidup'
  }
]

/* NAVIGATE */
const goToGaleri = () => {
  router.push({
    path: '/publikasi',
    hash: '#galeri'
  })
}

/* LIGHTBOX */
const lightbox = ref(null)
const openLightbox = (img) => {
  lightbox.value = img
}

/* TILT EFFECT */
const tiltStyles = ref([])

const handleTilt = (e, index) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const rotateX = ((y / rect.height) - 0.5) * 10
  const rotateY = ((x / rect.width) - 0.5) * -10

  tiltStyles.value[index] = {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
}

const resetTilt = (index) => {
  tiltStyles.value[index] = {
    transform: 'rotateX(0) rotateY(0)'
  }
}
</script>

<style scoped>

/* SECTION */
.gallery-section {
  padding: 100px 0;
}

/* TITLE */
.section-title {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.section-title span {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

/* GRID */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 15px;
}

/* ITEM (CONTAINER FIXED) */
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transform-style: preserve-3d;
}

/* SIZE */
.gallery-item.large {
  grid-column: span 2;
}

.gallery-item.tall {
  grid-row: span 2;
}

/* IMAGE (ZOOM ONLY HERE 🔥) */
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  transform: scale(1);
  transition: transform 0.6s ease, filter 0.4s ease;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.75),
    rgba(0,0,0,0.2)
  );
  opacity: 0;
  transition: 0.4s ease;

  display: flex;
  align-items: flex-end;
  padding: 15px;
}

/* CAPTION */
.caption {
  color: white;
  transform: translateY(20px);
  transition: 0.4s ease;
}

.caption h6 {
  margin: 0;
  font-weight: 600;
}

.caption p {
  font-size: 0.8rem;
  opacity: 0.9;
}

/* 🔥 HOVER EFFECT */
.gallery-item:hover img {
  transform: scale(1.12);
  filter: brightness(0.95);
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.gallery-item:hover .caption {
  transform: translateY(0);
}

/* EXTRA DEPTH */
.gallery-item::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.1);
  opacity: 0;
  transition: 0.4s;
}

.gallery-item:hover::after {
  opacity: 1;
}

/* BUTTON */
.btn-more {
  background: #e74c3c;
  color: white;
  border-radius: 999px;
  padding: 10px 22px;
  border: none;
}

.btn-more:hover {
  background: #c0392b;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* LIGHTBOX */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox img {
  max-width: 95%;
  max-height: 95%;
  border-radius: 10px;
}

</style>