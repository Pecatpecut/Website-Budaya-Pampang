<template>
  <footer class="footer">
    <div class="container">

      <div class="row g-4">

        <!-- ABOUT -->
        <div class="col-md-6">
          <h5 class="footer-title">Tentang Kami</h5>
          <p class="footer-text">
            Jl. Wisata Budaya Pampang, No.32, RT.03, Kelurahan Budaya Pampang,
            Kec. Samarinda Utara
          </p>
        </div>

        <!-- SOCIAL -->
        <div class="col-md-6 text-md-end">
          <h5 class="footer-title">Ikuti Kami</h5>

          <div class="social-icons">
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-whatsapp"></i></a>
          </div>
        </div>

      </div>

      <!-- COPYRIGHT -->
      <div class="footer-bottom">
        <p>© 2026 Desa Budaya Pampang. All rights reserved.</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f0f0f;
  color: white;
  padding: 60px 0 20px;
}

/* TITLE */
.footer-title {
  font-weight: 600;
  margin-bottom: 10px;
}

/* TEXT */
.footer-text {
  color: #aaa;
  max-width: 400px;
}

/* SOCIAL */
.social-icons a {
  color: white;
  font-size: 1.5rem;
  margin-left: 15px;
  transition: 0.3s;
}

.social-icons a:hover {
  color: #c0392b;
  transform: translateY(-3px);
}

/* BOTTOM */
.footer-bottom {
  border-top: 1px solid #222;
  margin-top: 30px;
  padding-top: 15px;
  text-align: center;
  font-size: 0.85rem;
  color: #777;
}
</style>