<template>
  <section id="sejarah-section" class="sejarah-section py-4">
    <div class="container">

      <!-- TITLE -->
      <div class="text-center mb-4 reveal fade-up">
        <h2 class="title">
          <span>Sejarah</span> Turun Temurun
        </h2>
      </div>

      <!-- TOP ROW -->
      <div class="row g-2 align-items-start">

        <!-- TEXT LEFT -->
        <div class="col-lg-6 reveal fade-left">
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
        <div class="col-lg-6 reveal fade-right">
          <div 
            class="image-wrapper"
            @mousemove="handleMouseMove"
            @mouseleave="resetTilt"
          >
            <img 
              src="@/assets/images/lamin.svg"
              class="img-fluid sejarah-img"
              :style="imageStyle"
            />
          </div>
        </div>

      </div>

      <!-- BOTTOM TEXT -->
      <div class="row mt-4">
        <div class="col-12 reveal fade-up">
          <div class="text-content">
            <p>
              Di tanah baru ini, masyarakat mulai membangun kehidupan tanpa melepaskan identitasnya. Tradisi tetap dijaga, nilai-nilai adat terus dihidupkan, dan kebersamaan menjadi fondasi utama dalam kehidupan sehari-hari. Kegiatan seperti gotong royong, perayaan keagamaan, hingga panen raya menjadi bagian yang tidak terpisahkan dari kehidupan mereka.
            </p>

            <p>
              Waktu terus berjalan, namun semangat menjaga budaya tidak pernah pudar. Desa Pampang tumbuh bukan hanya sebagai tempat tinggal, tetapi sebagai ruang pelestarian warisan leluhur yang tetap hidup di tengah modernitas. Hingga akhirnya, pada tahun 1991, Pemerintah Provinsi Kalimantan Timur secara resmi menetapkan Desa Pampang sebagai desa budaya.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/* =========================
   🎬 SCROLL REVEAL (FIXED)
========================= */
onMounted(() => {
  const elements = document.querySelectorAll('.reveal')

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        obs.unobserve(entry.target) // 🔥 penting biar ga bug
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  elements.forEach(el => observer.observe(el))
})

/* =========================
   🔥 3D IMAGE
========================= */
const imageStyle = ref({})

const handleMouseMove = (e) => {
  const { offsetWidth, offsetHeight } = e.currentTarget
  const x = e.offsetX
  const y = e.offsetY

  const rotateX = ((y / offsetHeight) - 0.5) * 10
  const rotateY = ((x / offsetWidth) - 0.5) * -10

  imageStyle.value = {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
  }
}

const resetTilt = () => {
  imageStyle.value = {
    transform: 'rotateX(0) rotateY(0) scale(1)'
  }
}
</script>

<style scoped>

/* SECTION */
.sejarah-section {
  background: #f8f9fa;
}

/* TITLE */
.title {
  font-size: 2.3rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.title span {
  font-family: 'Playfair Display', serif;
  font-weight: 500;
}

/* TEXT */
.text-content p {
  font-size: 1rem;
  line-height: 1.9;
  color: #444;
  text-align: justify;
}

/* =========================
   🖼 IMAGE 3D
========================= */
.image-wrapper {
  display: flex;
  justify-content: flex-end;
  perspective: 1000px;
}

.sejarah-img {
  width: 100%;
  max-width: 480px;
  border-radius: 6px;
  transition: transform 0.2s ease;
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

/* =========================
   🎬 ANIMATION FIX
========================= */

/* DEFAULT (hidden) */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

/* VARIANTS */
.fade-left {
  transform: translateX(-60px);
}

.fade-right {
  transform: translateX(60px);
}

.fade-up {
  transform: translateY(40px);
}

/* ACTIVE */
.reveal.active {
  opacity: 1;
  transform: translate(0, 0);
}

/* 🔥 fallback biar ga ilang */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .image-wrapper {
    justify-content: center;
    margin-top: 20px;
  }
}

</style>