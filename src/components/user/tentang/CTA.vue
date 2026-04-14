<template>
  <section class="cta-section d-flex align-items-center justify-content-center text-center">
    
    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="content text-white">
      <h2 class="title">
        <em>Rencanakan</em> Kunjunganmu <strong>Sekarang</strong>
      </h2>

      <button class="btn btn-danger cta-btn">
        Hubungi Kami
      </button>
    </div>

  </section>
</template>

<script setup>
// nanti bisa dihubungkan ke halaman kontak
</script>

<style scoped>

/* SECTION */
.cta-section {
  position: relative;
  height: 45vh;
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
  overflow: hidden;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
}

/* CONTENT */
.content {
  position: relative;
  z-index: 2;
}

/* TITLE */
.title {
  font-size: 2.2rem;
  margin-bottom: 20px;
}

.title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.title strong {
  font-weight: 700;
}

/* BUTTON */
.cta-btn {
  padding: 10px 25px;
  border-radius: 999px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .title {
    font-size: 1.6rem;
  }
}

</style>