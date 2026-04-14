<template>
  <section class="hero-section d-flex align-items-center text-center text-white">

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="container position-relative">
      <h1 class="hero-title">Desa Budaya Pampang</h1>

      <p class="hero-subtitle mt-3">
        Menyelami kekayaan budaya Dayak Kenyah melalui tarian, musik,
        dan kehidupan adat yang masih lestari hingga kini.
      </p>

      <button
        class="btn btn-danger mt-4 px-4 py-2 rounded-pill"
        @click="scrollToAbout"
      >
        Jelajahi ↓
      </button>
    </div>

  </section>
</template>

<script setup>
const scrollToAbout = () => {
  const section = document.getElementById('about')
  section.scrollIntoView({
    behavior: 'smooth'
  })
}
</script>

<style scoped>

/* HERO */
.hero-section {
  height: 100vh;
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
  position: relative;
}

/* 🔥 OVERLAY (SAMAIN DENGAN PUBLIKASI) */
.overlay {
  position: absolute;
  inset: 0;
  background:  rgba(26, 26, 26, 0.8);
}

/* TITLE */
.hero-title {
  font-size: 3.2rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: -2px;
}

/* TEXT */
.hero-subtitle {
  font-family: 'Inter';
  max-width: 600px;
  margin: auto;
  font-size: 1rem;
  opacity: 0.9;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.3rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }
}

</style>  