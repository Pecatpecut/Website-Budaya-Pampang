<template>
  <section class="hero-publikasi d-flex align-items-center justify-content-center text-center">

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="content text-white">
      <h1 class="title">Publikasi</h1>
      <p class="subtitle">
        Dokumentasi visual dan cerita budaya
      </p>
    </div>

  </section>
</template>

<script setup>
// pure UI
</script>

<style scoped>

/* HERO */
.hero-publikasi {
  position: relative;
  height: 70vh; /* samakan biar konsisten */
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
}

/* 🔥 OVERLAY (KEY FIX NAVBAR BLUR) */
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

.title {
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
}

.subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }
}

</style>