<template>
  <section class="highlight-section py-5">
    <div class="container">

      <!-- ITEM 1 -->
      <div class="row mb-4 align-items-start">

        <!-- IMAGE -->
        <div class="col-md-4">
          <img 
            src="@/assets/images/tarian.svg"
            class="highlight-img"
            alt="Tari Dayak"
          />
        </div>

        <!-- TEXT -->
        <div class="col-md-8">
          <p class="text">
            Pertunjukan tari tradisional menjadi daya tarik utama Desa Budaya Pampang yang tidak boleh dilewatkan. Setiap hari Minggu siang, pengunjung dapat menyaksikan penampilan Tari Tradisional Suku Dayak Kenyah yang sarat akan makna budaya. Tarian ini bukan sekadar hiburan, melainkan representasi nilai kehidupan, keberanian, serta penghormatan terhadap leluhur yang diwariskan secara turun-temurun.
          </p>

          <p class="text">
            Menariknya, pengunjung tidak hanya menjadi penonton, tetapi juga dapat ikut berinteraksi langsung dengan para penari. Dalam beberapa kesempatan, wisatawan diperbolehkan untuk turut menari bersama, menciptakan pengalaman yang lebih dekat dan berkesan. Pertunjukan ini berlangsung di Rumah Lamin sebagai pusat kegiatan budaya, sekaligus menjadi momen yang tepat untuk mengabadikan pengalaman unik bersama masyarakat adat.
          </p>
        </div>

      </div>

      <!-- ITEM 2 (🔥 FIX UTAMA DI SINI) -->
      <div class="row mb-4 align-items-start flex-md-row-reverse">

        <!-- IMAGE -->
        <div class="col-md-4">
          <img 
            src="@/assets/images/lamin.svg"
            class="highlight-img"
            alt="Rumah Lamin"
          />
        </div>

        <!-- TEXT -->
        <div class="col-md-8">
          <p class="text">
            Rumah Lamin merupakan rumah adat khas Dayak yang menjadi pusat kehidupan sosial dan budaya masyarakat di Desa Pampang. Bangunan ini memiliki bentuk memanjang dan dihuni oleh beberapa keluarga, mencerminkan nilai kebersamaan dan gotong royong yang kuat. Di dalamnya, pengunjung dapat melihat berbagai ukiran khas, peralatan tradisional, serta elemen arsitektur yang sarat makna filosofis.
          </p>

          <p class="text">
            Kunjungan ke Rumah Lamin memberikan pengalaman yang tidak hanya bersifat wisata, tetapi juga edukatif. Pengunjung dapat memahami lebih dekat bagaimana masyarakat Dayak menjaga tradisi dan menjalani kehidupan yang selaras dengan alam dan nilai leluhur. Suasana yang hangat dan autentik menjadikan Lamin sebagai simbol penting dalam pelestarian budaya di Desa Pampang.
          </p>
        </div>

      </div>

      <!-- ITEM 3 -->
      <div class="row align-items-start">

        <!-- IMAGE -->
        <div class="col-md-4">
          <img 
            src="@/assets/images/susur-sungai.svg"
            class="highlight-img"
            alt="Sungai"
          />
        </div>

        <!-- TEXT -->
        <div class="col-md-8">
          <p class="text">
            Selain budaya, Desa Pampang juga menawarkan keindahan alam melalui pengalaman menyusuri Sungai Pampang yang masih asri. Perjalanan menuju kawasan sungai dapat ditempuh sekitar 1,5 jam, dengan pemandangan hutan alami yang terjaga sepanjang perjalanan. Suasana yang tenang dan udara yang segar menjadikan aktivitas ini cocok untuk melepas penat.
          </p>

          <p class="text">
            Sungai Pampang memiliki daya tarik berupa air terjun dan sumber mata air alami yang jernih, serta kolam alami yang aman untuk dinikmati bersama keluarga. Anak-anak maupun orang dewasa dapat merasakan kesegaran air sekaligus menikmati panorama alam yang eksotis. Aktivitas susur sungai ini menjadi pelengkap sempurna bagi wisata budaya, menghadirkan keseimbangan antara pengalaman budaya dan keindahan alam.
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
// static
</script>

<style scoped>

/* SECTION */
.highlight-section {
  background: #f8f9fa;
}

/* TEXT */
.text {
  font-size: 0.92rem;
  line-height: 1.8;
  color: #444;
  text-align: justify;
  margin-bottom: 12px;
}

/* IMAGE */
.highlight-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;

  /* 🔥 tambah feel premium */
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transition: 0.4s;
}

.highlight-img:hover {
  transform: scale(1.03);
}

/* RESPONSIVE */
@media (max-width: 768px) {

  /* 🔥 semua item: gambar dulu */
  .row {
    flex-direction: column !important;
  }

  .highlight-img {
    margin-bottom: 15px;
  }
}

</style>