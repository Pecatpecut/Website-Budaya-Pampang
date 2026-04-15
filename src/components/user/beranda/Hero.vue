<template>
  <section 
    class="hero-section d-flex align-items-center text-center text-white"
    @mousemove="handleParallax"
    @mouseleave="resetParallax"
  >

    <!-- BACKGROUND -->
    <div class="bg-layer" :style="bgStyle"></div>

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="container position-relative content">

      <h1 class="hero-title reveal">
        Desa Budaya Pampang
      </h1>

      <p class="hero-subtitle mt-3 reveal delay-1">
        Menyelami kekayaan budaya Dayak Kenyah melalui tarian, musik,
        dan kehidupan adat yang masih lestari hingga kini.
      </p>

      <button
        class="btn btn-danger mt-4 px-4 py-2 rounded-pill btn-jelajah reveal delay-2"
        @click="scrollToAbout"
      >
        Jelajahi ↓
      </button>

    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'

/* =========================
   SCROLL
========================= */
const scrollToAbout = () => {
  const section = document.getElementById('about')
  section.scrollIntoView({
    behavior: 'smooth'
  })
}

/* =========================
   PARALLAX (HALUS)
========================= */
const bgStyle = ref({})

const handleParallax = (e) => {
  const { innerWidth, innerHeight } = window

  const x = (e.clientX / innerWidth - 0.5) * 15
  const y = (e.clientY / innerHeight - 0.5) * 15

  bgStyle.value = {
    transform: `scale(1.05) translate(${x}px, ${y}px)`
  }
}

const resetParallax = () => {
  bgStyle.value = {
    transform: `scale(1)`
  }
}
</script>

<style scoped>

/* =========================
   HERO
========================= */
.hero-section {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* BACKGROUND */
.bg-layer {
  position: absolute;
  inset: 0;
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
  transition: transform 0.3s ease;
  z-index: 0;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.75);
  z-index: 1;
}

/* CONTENT */
.content {
  z-index: 2;
}

/* =========================
   TEXT
========================= */
.hero-title {
  font-size: 3.2rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: -2px;
}

.hero-subtitle {
  font-family: 'Inter';
  max-width: 600px;
  margin: auto;
  font-size: 1rem;
  opacity: 0.9;
}

/* =========================
   BUTTON
========================= */
.btn-jelajah {
  transition: all 0.3s ease;
}

.btn-jelajah:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

/* 🔥 SUBTLE ANIMATION (ganti garis tadi) */
.btn-jelajah {
  animation: bounce 2.2s infinite;
}

@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* =========================
   REVEAL TEXT
========================= */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.3rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }
}

</style>