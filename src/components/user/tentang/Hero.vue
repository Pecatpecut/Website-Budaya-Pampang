<template>
  <section 
    class="hero-tentang d-flex align-items-center justify-content-center text-center"
    ref="sectionRef"
  >

    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="content text-white">

      <h1 class="title reveal fade-up">
        Tentang Kami
      </h1>

      <p class="subtitle reveal fade-up delay-1">
        Tradisi yang hidup dalam setiap gerakan dan cerita
      </p>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionRef = ref(null)

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
  }, { threshold: 0.2 })

  elements.forEach(el => observer.observe(el))
})

/* =========================
   🌊 PARALLAX + ZOOM
========================= */
onMounted(() => {
  const section = sectionRef.value

  window.addEventListener('scroll', () => {
    if (!section) return

    const rect = section.getBoundingClientRect()
    const offset = rect.top * 0.2

    section.style.backgroundPosition = `center calc(50% + ${offset}px)`
  })
})
</script>

<style scoped>

/* HERO */
.hero-tentang {
  position: relative;
  height: 70vh;
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
  overflow: hidden;

  /* 🔥 smooth parallax feel */
  transition: background-position 0.2s ease-out;
}

/* 🔥 OVERLAY (UPGRADE) */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(26,26,26,0.7),
    rgba(26,26,26,0.9)
  );
}

/* CONTENT */
.content {
  position: relative;
  z-index: 2;
}

/* TITLE */
.title {
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
  margin-bottom: 10px;
  letter-spacing: -1px;
}

/* SUBTITLE */
.subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  opacity: 0.9;
}

/* =========================
   🎬 ANIMATION
========================= */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.delay-1 {
  transition-delay: 0.15s;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }
}

</style>