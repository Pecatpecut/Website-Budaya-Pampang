<template>
  <section class="fasilitas-section py-5">
    <div class="container">

      <div class="row">

        <!-- FASILITAS -->
        <div class="col-lg-6 fasilitas-box">
          <h3 class="title">
            <em>Fasilitas</em> Yang Tersedia
          </h3>

          <div class="row">
            <div class="col-6">
              <ul class="list">
                <li>Areal Parkir</li>
                <li>Balai Pertemuan</li>
                <li>Jungle Tracking</li>
                <li>Kamar Mandi Umum</li>
              </ul>
            </div>

            <div class="col-6">
              <ul class="list">
                <li>Kios Souvenir</li>
                <li>Kuliner</li>
                <li>Musholla</li>
                <li>Spot Foto</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- TIPS -->
        <div class="col-lg-6 tips-box">
          <h3 class="title">
            <em>Tips</em> Berkunjung
          </h3>

          <ul class="list">
            <li>Datang di hari Minggu untuk melihat pertunjukan</li>
            <li>Gunakan pakaian nyaman</li>
            <li>Datang lebih awal untuk mendapatkan tempat terbaik</li>
            <li>Siapkan uang tunai untuk tiket dan aktivitas</li>
          </ul>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
// static
</script>

<style scoped>

/* SECTION BACKGROUND */
.fasilitas-section {
  background: linear-gradient(90deg, #111 50%, #1a1a1a 50%);
  color: #fff;
}

/* BOX SPACING */
.fasilitas-box,
.tips-box {
  padding: 20px 40px;
}

/* TITLE */
.title {
  font-size: 1.6rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

/* LIST */
.list {
  padding-left: 18px;
}

.list li {
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #ddd;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .fasilitas-section {
    background: #111;
  }

  .fasilitas-box,
  .tips-box {
    padding: 20px;
  }

  .title {
    font-size: 1.4rem;
  }
}

</style>