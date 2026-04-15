<template>
  <section class="kontak-lokasi py-5">
    <div class="container">

      <!-- TITLE -->
      <h2 class="text-center mb-5">
        Temukan <em>Kami</em> Di
      </h2>

      <div class="row g-4 align-items-start">

        <!-- =========================
             LEFT
        ========================= -->
        <div class="col-lg-4">

          <!-- EMAIL -->
          <a href="mailto:budayapampang90@gmail.com" class="contact-card dark">
            <i class="bi bi-envelope"></i>
            <span>budayapampang90@gmail.com</span>
          </a>

          <!-- INSTAGRAM -->
          <a href="https://www.instagram.com/budayapampang" target="_blank" class="contact-card dark">
            <i class="bi bi-instagram"></i>
            <span>@budayapampang</span>
          </a>

          <!-- WHATSAPP -->
          <div class="contact-card dark">
            <i class="bi bi-whatsapp"></i>

            <div class="text-group">
              <a href="https://wa.me/6281254993755" target="_blank">
                081254993755
              </a>
              <a href="https://wa.me/6281325505759" target="_blank">
                081325505759
              </a>
            </div>
          </div>

          <!-- ADDRESS -->
          <div class="contact-card light">
            <i class="bi bi-geo-alt"></i>

            <p>
              Jl. Wisata Budaya Pampang, No.32, RT.03,
              Kelurahan Budaya Pampang, Kec Samarinda Utara
            </p>
          </div>

        </div>

        <!-- =========================
             MAP
        ========================= -->
        <div class="col-lg-8">
          <div class="map-wrapper">

            <iframe
              class="map"
              src="https://maps.google.com/maps?q=desa%20pampang&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>

            <!-- OVERLAY INTERAKTIF -->
            <div class="map-overlay">
              <button @click="openMaps">
                Buka di Google Maps →
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
const openMaps = () => {
  window.open(
    "https://www.google.com/maps?q=desa+pampang",
    "_blank"
  )
}
</script>

<style scoped>

/* =========================
   TITLE
========================= */
h2 em {
  font-family: 'Playfair Display', serif;
}

/* =========================
   CARD BASE
========================= */
.contact-card {
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 18px 20px;
  border-radius: 14px;

  margin-bottom: 15px;
  text-decoration: none;

  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* =========================
   DARK CARD
========================= */
.contact-card.dark {
  background: #0f0f0f;
  color: white;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
}

/* =========================
   LIGHT CARD
========================= */
.contact-card.light {
  background: #f5f5f5;
  color: #333;
}

/* =========================
   ICON
========================= */
.contact-card i {
  font-size: 1.6rem;
  min-width: 30px;
  transition: 0.3s;
}

/* =========================
   TEXT GROUP
========================= */
.text-group {
  display: flex;
  flex-direction: column;
}

.text-group a {
  color: white;
  text-decoration: none;
}

.text-group a:hover {
  text-decoration: underline;
}

/* =========================
   HOVER EFFECT
========================= */
.contact-card:hover {
  transform: translateY(-6px) scale(1.02);
}

/* ICON POP */
.contact-card:hover i {
  transform: scale(1.2);
}

/* GLOW EFFECT */
.contact-card.dark::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: 0.3s;
}

.contact-card.dark:hover::after {
  opacity: 1;
}

/* =========================
   MAP
========================= */
.map-wrapper {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 420px;
  border: none;
  filter: grayscale(30%);
  transition: 0.4s;
}

/* MAP HOVER */
.map-wrapper:hover .map {
  filter: grayscale(0%);
  transform: scale(1.02);
}

/* =========================
   MAP OVERLAY
========================= */
.map-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: 0.3s;
}

.map-wrapper:hover .map-overlay {
  opacity: 1;
}

.map-overlay button {
  background: #c0392b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.3s;
}

.map-overlay button:hover {
  transform: scale(1.05);
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .map {
    height: 300px;
  }
}

</style>  