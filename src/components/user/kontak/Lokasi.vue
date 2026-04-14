<template>
  <section class="kontak-lokasi py-5">
    <div class="container">

      <!-- TITLE -->
      <h2 class="text-center mb-5">
        Temukan <em>Kami</em> Di
      </h2>

      <div class="row g-4 align-items-start">

        <!-- LEFT -->
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

        <!-- MAP -->
        <div class="col-lg-8">
          <iframe
            class="map"
            src="https://maps.google.com/maps?q=desa%20pampang&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>

/* TITLE */
h2 em {
  font-family: 'Playfair Display', serif;
}

/* CARD */
.contact-card {
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 18px 20px;
  border-radius: 12px;

  margin-bottom: 15px;
  text-decoration: none;

  transition: 0.3s;
}

/* DARK */
.contact-card.dark {
  background: #0f0f0f;
  color: white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

/* LIGHT */
.contact-card.light {
  background: #f2f2f2;
  color: #333;
  box-shadow: 0 8px 10px rgba(0,0,0,0.1);
}

/* ICON */
.contact-card i {
  font-size: 1.6rem;
  min-width: 30px;
}

/* TEXT */
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

/* HOVER */
.contact-card:hover {
  transform: translateY(-5px);
}

/* MAP */
.map {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  border: none;
}

</style>