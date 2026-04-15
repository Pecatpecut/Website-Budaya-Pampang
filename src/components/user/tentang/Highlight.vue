<template>
  <section class="highlight-section py-5">
    <div class="container">

      <!-- ITEM 1 -->
      <div class="row mb-2 align-items-start">

        <!-- IMAGE -->
        <div class="col-md-4 reveal fade-left">
          <div 
            class="image-wrapper"
            @mousemove="handleMouseMove($event, 0)"
            @mouseleave="resetTilt(0)"
          >
            <img 
              src="@/assets/images/tarian.svg"
              class="highlight-img"
              :style="imageStyles[0]"
            />
          </div>
        </div>

        <!-- TEXT -->
        <div class="col-md-8 reveal fade-right">
          <p class="text reveal fade-up">
            Pertunjukan tari tradisional menjadi daya tarik utama Desa Budaya Pampang yang tidak boleh dilewatkan. Setiap hari Minggu siang, pengunjung dapat menyaksikan penampilan Tari Tradisional Suku Dayak Kenyah yang sarat akan makna budaya. Tarian ini bukan sekadar hiburan, melainkan representasi nilai kehidupan, keberanian, serta penghormatan terhadap leluhur yang diwariskan secara turun-temurun.
          </p>

          <p class="text reveal fade-up delay-1">
            Menariknya, pengunjung tidak hanya menjadi penonton, tetapi juga dapat ikut berinteraksi langsung dengan para penari. Dalam beberapa kesempatan, wisatawan diperbolehkan untuk turut menari bersama, menciptakan pengalaman yang lebih dekat dan berkesan. Pertunjukan ini berlangsung di Rumah Lamin sebagai pusat kegiatan budaya, sekaligus menjadi momen yang tepat untuk mengabadikan pengalaman unik bersama masyarakat adat.
          </p>
        </div>

      </div>

      <!-- ITEM 2 -->
      <div class="row mb-2 align-items-start flex-md-row-reverse">

        <!-- IMAGE -->
        <div class="col-md-4 reveal fade-right">
          <div 
            class="image-wrapper"
            @mousemove="handleMouseMove($event, 1)"
            @mouseleave="resetTilt(1)"
          >
            <img 
              src="@/assets/images/lamin.svg"
              class="highlight-img"
              :style="imageStyles[1]"
            />
          </div>
        </div>

        <!-- TEXT -->
        <div class="col-md-8 reveal fade-left">
          <p class="text reveal fade-up">
            Rumah Lamin merupakan rumah adat khas Dayak yang menjadi pusat kehidupan sosial dan budaya masyarakat di Desa Pampang. Bangunan ini memiliki bentuk memanjang dan dihuni oleh beberapa keluarga, mencerminkan nilai kebersamaan dan gotong royong yang kuat. Di dalamnya, pengunjung dapat melihat berbagai ukiran khas, peralatan tradisional, serta elemen arsitektur yang sarat makna filosofis.
          </p>

          <p class="text reveal fade-up delay-1">
            Kunjungan ke Rumah Lamin memberikan pengalaman yang tidak hanya bersifat wisata, tetapi juga edukatif. Pengunjung dapat memahami lebih dekat bagaimana masyarakat Dayak menjaga tradisi dan menjalani kehidupan yang selaras dengan alam dan nilai leluhur. Suasana yang hangat dan autentik menjadikan Lamin sebagai simbol penting dalam pelestarian budaya di Desa Pampang.
          </p>
        </div>

      </div>

      <!-- ITEM 3 -->
      <div class="row align-items-start">

        <!-- IMAGE -->
        <div class="col-md-4 reveal fade-left">
          <div 
            class="image-wrapper"
            @mousemove="handleMouseMove($event, 2)"
            @mouseleave="resetTilt(2)"
          >
            <img 
              src="@/assets/images/susur-sungai.svg"
              class="highlight-img"
              :style="imageStyles[2]"
            />
          </div>
        </div>

        <!-- TEXT -->
        <div class="col-md-8 reveal fade-right">
          <p class="text reveal fade-up">
            Selain budaya, Desa Pampang juga menawarkan keindahan alam melalui pengalaman menyusuri Sungai Pampang yang masih asri. Perjalanan menuju kawasan sungai dapat ditempuh sekitar 1,5 jam, dengan pemandangan hutan alami yang terjaga sepanjang perjalanan. Suasana yang tenang dan udara yang segar menjadikan aktivitas ini cocok untuk melepas penat.
          </p>

          <p class="text reveal fade-up delay-1">
            Sungai Pampang memiliki daya tarik berupa air terjun dan sumber mata air alami yang jernih, serta kolam alami yang aman untuk dinikmati bersama keluarga. Anak-anak maupun orang dewasa dapat merasakan kesegaran air sekaligus menikmati panorama alam yang eksotis. Aktivitas susur sungai ini menjadi pelengkap sempurna bagi wisata budaya, menghadirkan keseimbangan antara pengalaman budaya dan keindahan alam.
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/* =========================
   🎬 SCROLL REVEAL
========================= */
onMounted(() => {
  const elements = document.querySelectorAll('.reveal')

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        obs.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
  })

  elements.forEach(el => observer.observe(el))
})

/* =========================
   🧠 3D IMAGE
========================= */
const imageStyles = ref([{},{},{}])

const handleMouseMove = (e, index) => {
  const { offsetWidth, offsetHeight } = e.currentTarget
  const x = e.offsetX
  const y = e.offsetY

  const rotateX = ((y / offsetHeight) - 0.5) * 8
  const rotateY = ((x / offsetWidth) - 0.5) * -8

  imageStyles.value[index] = {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`
  }
}

const resetTilt = (index) => {
  imageStyles.value[index] = {
    transform: 'rotateX(0) rotateY(0) scale(1)'
  }
}
</script>

<style scoped>

/* SECTION */
.highlight-section {
  background: #f8f9fa;
}

/* TEXT */
.text {
  font-size: 0.95rem;
  line-height: 1.85;
  color: #444;
  text-align: justify;
  margin-bottom: 14px;
}

/* =========================
   🖼 IMAGE 3D
========================= */
.image-wrapper {
  perspective: 1000px;
}

.highlight-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;

  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

/* =========================
   🎬 ANIMATION
========================= */
.reveal {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-left {
  transform: translateX(-60px);
}

.fade-right {
  transform: translateX(60px);
}

.fade-up {
  transform: translateY(40px);
}

.delay-1 {
  transition-delay: 0.15s;
}

.reveal.active {
  opacity: 1;
  transform: translate(0,0);
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .row {
    flex-direction: column !important;
  }

  .highlight-img {
    margin-bottom: 15px;
  }
}

</style>