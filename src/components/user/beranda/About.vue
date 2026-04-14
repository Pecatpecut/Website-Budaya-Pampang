<template>
  <section id="about" class="about-section py-5">
    <div class="container">
      <div
        class="row align-items-center g-5 content"
        ref="aboutRef"
        :class="{ show: isVisible }"
      >

        <!-- IMAGE -->
        <div
          class="col-lg-6 image-wrapper"
          @mousemove="handleMouseMove"
          @mouseleave="resetTilt"
        >
          <img
            src="@/assets/images/lamin.svg"
            class="img-fluid rounded about-img"
            :style="imageStyle"
          />
        </div>

        <!-- TEXT -->
        <div class="col-lg-6">

          <!-- TITLE -->
          <h2 class="about-title mb-3">
            <span class="title-main">Sekilas</span>
            <span class="title-accent">Desa Budaya Pampang</span>
          </h2>

          <p class="about-text">
            Desa Budaya Pampang merupakan representasi hidup dari budaya suku Dayak Kenyah yang tetap terjaga di tengah perkembangan zaman. Di sini, tradisi bukan sekadar warisan, melainkan bagian dari kehidupan sehari-hari yang terus dilestarikan dari generasi ke generasi.
          </p>

          <router-link 
            to="/tentang#sejarah-section"
            class="btn btn-danger mt-3 px-4 py-2 rounded-pill"
          >
            Selengkapnya →
          </router-link>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/* =========================
   SCROLL REVEAL
========================= */
const aboutRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.3 }
  )

  if (aboutRef.value) {
    observer.observe(aboutRef.value)
  }
})

/* =========================
   IMAGE TILT 3D
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
.about-section {
  padding: 100px 0;
}

/* SCROLL ANIMATION */
.content {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
}

.content.show {
  opacity: 1;
  transform: translateY(0);
}

/* IMAGE WRAPPER (IMPORTANT FOR 3D) */
.image-wrapper {
  perspective: 1000px;
}

/* IMAGE */
.about-img {
  transition: transform 0.2s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

/* TITLE */
.about-title {
  font-size: 2.4rem;
  font-weight: 600;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  letter-spacing: -1px;
}

/* SEKILAS */
.title-main {
  font-family: 'Inter';
  font-weight: 600;
  color: #111;
}

/* DESA BUDAYA PAMPANG */
.title-accent {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 500;
  color: #111;
}

/* STAGGER */
.word {
  display: inline-block;
  margin-right: 6px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.content.show .word {
  opacity: 1;
  transform: translateY(0);
}

/* TEXT */
.about-text {
  color: #555;
  line-height: 1.7;
  max-width: 500px;
  font-family: 'Inter';
  text-align: justify;
}
</style>