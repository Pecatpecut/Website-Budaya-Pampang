<template>
  <section 
    class="cta-section d-flex align-items-center justify-content-center text-center"
    ref="sectionRef"
  >
    
    <!-- OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="content text-white reveal fade-up">
      <h2 class="title">
        <span>Rencanakan</span> Kunjunganmu Sekarang
      </h2>

      <button class="cta-btn" @click="goToKontak">
        Hubungi Kami →
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sectionRef = ref(null)

/* NAVIGATE */
const goToKontak = () => {
  router.push('/kontak')
}

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
    threshold: 0.2
  })

  elements.forEach(el => observer.observe(el))
})

/* =========================
   🌊 PARALLAX EFFECT
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

/* SECTION */
.cta-section {
  position: relative;
  height: 45vh;
  background: url('@/assets/images/lamin.svg') center/cover no-repeat;
  overflow: hidden;

  transition: background-position 0.2s ease-out;
}

/* OVERLAY (🔥 upgrade gradient) */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.65),
    rgba(0,0,0,0.85)
  );
}

/* CONTENT */
.content {
  position: relative;
  z-index: 2;
}

/* TITLE */
.title {
  font-size: 2.3rem;
  margin-bottom: 20px;
  letter-spacing: -1px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.title span {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 500;
}

.title strong {
  font-weight: 700;
}

/* =========================
   🔥 BUTTON PREMIUM
========================= */
.cta-btn {
  background: #e74c3c;
  color: white;
  border: none;

  padding: 12px 28px;
  border-radius: 999px;
  font-size: 0.95rem;

  transition: all 0.3s ease;

  box-shadow: 0 6px 20px rgba(231,76,60,0.4);
}

/* HOVER */
.cta-btn:hover {
  transform: translateY(-3px) scale(1.03);
  background: #c0392b;
  box-shadow: 0 10px 30px rgba(231,76,60,0.5);
}

/* =========================
   🎬 ANIMATION
========================= */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
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
    font-size: 1.7rem;
  }
}

</style>