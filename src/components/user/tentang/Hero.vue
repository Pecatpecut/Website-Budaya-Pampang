<template>
  <section class="hero-tentang d-flex align-items-center justify-content-center text-center">

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="content text-white">
      <h1 class="title">Tentang Kami</h1>

      <p class="subtitle">
        Tradisi yang hidup dalam setiap gerakan dan cerita
      </p>
    </div>

  </section>
</template>

<script setup>
// pure UI
</script>

<style scoped>

/* HERO */
.hero-tentang {
  position: relative;
  height: 70vh;
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
}

/* 🔥 OVERLAY (KUNCI NAVBAR BLUR) */
.overlay {
  position: absolute;
  inset: 0;
  background:  rgba(26, 26, 26, 0.8);
}

/* CONTENT */
.content {
  position: relative;
  z-index: 2;
}

/* TITLE */
.title {
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
  margin-bottom: 10px;
}

/* SUBTITLE */
.subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  opacity: 0.9;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }
}

</style>