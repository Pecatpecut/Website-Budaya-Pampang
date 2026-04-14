<template>
  <section class="hero-kontak d-flex align-items-center justify-content-center text-center">

    <div class="overlay"></div>

    <div class="content text-white">
      <h1 class="title">Kontak</h1>
      <p class="subtitle">
        Temukan informasi dan hubungi kami dengan mudah
      </p>
    </div>

  </section>
</template>

<style scoped>
.hero-kontak {
  position: relative;
  height: 70vh;
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
}

.overlay {
  position: absolute;
  inset: 0;
  background:  rgba(26, 26, 26, 0.8);
}

.content {
  position: relative;
  z-index: 2;
}

.title {
  font-size: 2.8rem;
  font-family: 'Playfair Display', serif;
}

.subtitle {
  opacity: 0.85;
}
</style>