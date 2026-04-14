<template>
  <section id="sejarah-section" class="sejarah-section py-4">
    <div class="container">

      <!-- TITLE -->
      <div class="text-center mb-4">
        <h2 class="title">
          <em>Sejarah</em> <strong>Turun Temurun</strong>
        </h2>
      </div>

      <!-- TOP ROW -->
      <div class="row g-2 align-items-start">

        <!-- TEXT LEFT -->
        <div class="col-lg-6">
          <div class="text-content">

            <p>
              Di tengah perkembangan zaman yang terus bergerak cepat, Desa Budaya Pampang berdiri sebagai ruang hidup yang menjaga jejak tradisi. Desa ini dihuni oleh masyarakat suku Dayak Kenyah, yang dahulu berasal dari wilayah pedalaman seperti Kutai Barat dan Malinau.
            </p>

            <p>
              Pada sekitar tahun 1960-an, mereka melakukan perjalanan panjang meninggalkan tanah asalnya. Bukan sekadar perpindahan tempat, tetapi sebuah langkah besar untuk masa depan—mendekatkan diri ke wilayah yang lebih mudah mengakses pendidikan dan layanan kesehatan.
            </p>

          </div>
        </div>

        <!-- IMAGE RIGHT -->
        <div class="col-lg-6">
          <div class="image-wrapper">
            <img 
              src="@/assets/images/lamin.svg" 
              alt="Rumah Lamin"
              class="img-fluid"
            />
          </div>
        </div>

      </div>

      <!-- BOTTOM TEXT -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="text-content">

            <p>
              Di tanah baru ini, masyarakat mulai membangun kehidupan tanpa melepaskan identitasnya. Tradisi tetap dijaga, nilai-nilai adat terus dihidupkan, dan kebersamaan menjadi fondasi utama dalam kehidupan sehari-hari. Kegiatan seperti gotong royong, perayaan keagamaan, hingga panen raya menjadi bagian yang tidak terpisahkan dari kehidupan mereka.
            </p>

            <p>
              Waktu terus berjalan, namun semangat menjaga budaya tidak pernah pudar. Desa Pampang tumbuh bukan hanya sebagai tempat tinggal, tetapi sebagai ruang pelestarian warisan leluhur yang tetap hidup di tengah modernitas. Hingga akhirnya, pada tahun 1991, Pemerintah Provinsi Kalimantan Timur secara resmi menetapkan Desa Pampang sebagai desa budaya. Sejak saat itu, Pampang dikenal sebagai salah satu pusat pelestarian budaya Dayak Kenyah—tempat di mana tradisi tidak hanya dikenang, tetapi terus dijalani.
            </p>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// static dulu
</script>

<style scoped>

/* SECTION */
.sejarah-section {
  background: #f8f9fa;
}

/* TITLE */
.title {
  font-size: 2.3rem;
  font-weight: 500;
}

.title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.title strong {
  font-weight: 700;
}

/* TEXT */
.text-content p {
  font-size: 0.95rem;
  line-height: 1.9;
  color: #444;
  margin-bottom: 15px;
  text-align: justify;
}

/* IMAGE */
.image-wrapper {
  display: flex;
  justify-content: flex-end;
}

.image-wrapper img {
  width: 100%;
  max-width: 480px;
  border-radius: 6px;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .image-wrapper {
    justify-content: center;
    margin-top: 20px;
  }

  .title {
    font-size: 1.9rem;
  }
}

</style>