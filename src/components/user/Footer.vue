<template>
  <footer class="footer-section">

    <div class="container">

      <div class="row footer-row">

        <!-- LOGO -->
        <div class="col-md-2 logo-col">
          <img 
            src="@/assets/images/logo-pesona-indonesia-putih.svg" 
            alt="Pesona Indonesia"
            class="footer-logo"
          />
        </div>

        <!-- LEFT -->
        <div class="col-md-4 footer-col">
          <h5 class="title">Desa Budaya Pampang</h5>
          <p class="desc">
            Destinasi wisata budaya di Samarinda yang menampilkan tradisi Suku Dayak Kenyah yang autentik.
          </p>
        </div>

        <!-- NAVIGASI -->
        <div class="col-md-3 footer-col">
          <h5 class="title">Navigasi</h5>

          <ul class="nav-list">
            <li><router-link to="/">Beranda</router-link></li>
            <li><router-link to="/tentang">Tentang Kami</router-link></li>
            <li><router-link to="/publikasi">Publikasi</router-link></li>
            <li><router-link to="/kontak">Kontak</router-link></li>
          </ul>
        </div>

        <!-- RIGHT -->
        <div class="col-md-3 footer-col">
          <h5 class="title">Temukan Kami</h5>

          <p class="desc small">
            Jl. Wisata Budaya Pampang, No.32, RT.03, 
            Kelurahan Budaya Pampang, Kec Samarinda Utara
          </p>

          <div class="socials">
            <a href="https://www.instagram.com/budayapampang" target="_blank" class="social-icon">
              <i class="bi bi-instagram"></i>
            </a>

            <a href="https://wa.me/6281254993755" target="_blank" class="social-icon">
              <i class="bi bi-whatsapp"></i>
            </a>

            <a href="mailto:budayapampang90@gmail.com" class="social-icon">
              <i class="bi bi-envelope"></i>
            </a>
          </div>
        </div>

      </div>

    </div>

    <!-- COPYRIGHT -->
    <div class="copyright">
      <p>
        © {{ year }} Desa Budaya Pampang — All rights reserved
      </p>
    </div>

  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>

/* MAIN */
.footer-section {
  background: linear-gradient(to right, #111, #1a1a1a);
  color: #ddd;
  padding-top: 70px;
}

/* 🔥 ROW FIX */
.footer-row {
  align-items: flex-start;
}

/* COLUMN SPACING */
.footer-col {
  padding-left: 20px;
}

/* LOGO COLUMN */
.logo-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🔥 LOGO SIZE FIX (INI KUNCI) */
.footer-logo {
  max-width: 140px; /* sebelumnya 200 → terlalu besar */
  opacity: 0.85;
  transition: 0.3s;
}

.footer-logo:hover {
  opacity: 1;
  transform: scale(1.05);
}

/* TITLE */
.title {
  color: white;
  font-weight: 600;
  margin-bottom: 18px;
}

/* TEXT */
.desc {
  font-size: 0.92rem;
  line-height: 1.7;
  color: #bbb;
}

.desc.small {
  font-size: 0.85rem;
}

/* NAV */
.nav-list {
  list-style: none;
  padding: 0;
}

.nav-list li {
  margin-bottom: 10px;
}

.nav-list a {
  text-decoration: none;
  color: #bbb;
  transition: 0.3s;
}

.nav-list a:hover {
  color: white;
  padding-left: 4px; /* subtle movement */
}

/* SOCIAL */
.socials {
  margin-top: 18px;
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 1.2rem;

  transition: 0.3s;
}

.social-icon:hover {
  background: white;
  color: black;
  transform: translateY(-3px) scale(1.05);
}

/* COPYRIGHT */
.copyright {
  border-top: 1px solid rgba(255,255,255,0.08);
  margin-top: 50px;
  padding: 18px 0;
  text-align: center;
  font-size: 0.85rem;
  color: #888;
}

/* RESPONSIVE */
@media (max-width: 768px) {

  /* WRAPPER GRID */
  .footer-section .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* LOGO + DESKRIPSI FULL WIDTH */
  .footer-section .row > div:nth-child(1),
  .footer-section .row > div:nth-child(2) {
    grid-column: span 2;
    text-align: center;
  }

  /* NAVIGASI (KIRI) */
  .footer-section .row > div:nth-child(3) {
    text-align: left;
  }

  /* KONTAK (KANAN) */
  .footer-section .row > div:nth-child(4) {
    text-align: right;
  }

  /* LOGO */
  .logo-col {
    justify-content: center !important;
  }

  .footer-logo {
    max-width: 120px;
    margin: 0 auto;
  }

  /* DESKRIPSI */
  .desc {
    max-width: 320px;
    margin: 0 auto;
  }

  /* NAV LIST */
  .nav-list {
    padding-left: 0;
  }

  /* SOCIAL */
  .socials {
    justify-content: flex-end;
  }

}

</style>