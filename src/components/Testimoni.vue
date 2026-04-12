<template>
  <section class="testimoni-section">
    <div class="container">

      <!-- TITLE -->
      <h2 class="section-title text-center mb-5">
        Apa Kata <span>Mereka</span>
      </h2>

      <div class="scroll-wrapper">

        <!-- GRADIENT -->
        <div class="fade-left"></div>
        <div class="fade-right"></div>

        <!-- TRACK -->
        <div
        class="scroll-track"
        ref="track"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="handleLeave"
        @mouseenter="pauseAuto"
        >

          <div
            class="testi-card"
            v-for="(item, i) in loopReviews"
            :key="i"
            @click="openReview(item.link)"
          >

            <!-- STARS -->
            <div class="stars">
              <span v-for="(star, index) in getStars(item.rating)" :key="index">
                {{ star }}
              </span>
            </div>

            <p class="comment">
              “{{ item.comment }}”
            </p>

            <div class="user">
              <strong>{{ item.name }}</strong>
              <small>Google Maps</small>
            </div>

          </div>

        </div>
      </div>

      <!-- BUTTON -->
      <div class="text-center mt-5">
        <a
          href="https://www.google.com/maps/place/Desa+Budaya+Pampang"
          target="_blank"
          class="btn-review"
        >
          Tulis Review di Google Maps →
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/* DATA */
const reviews = [
  {
    name: 'Andi',
    comment: 'Budaya masih sangat terjaga!',
    rating: 4.5,
    link: 'https://maps.google.com'
  },
  {
    name: 'Siti',
    comment: 'Tarian sangat keren!',
    rating: 5,
    link: 'https://maps.google.com'
  },
  {
    name: 'Budi',
    comment: 'Pengalaman luar biasa.',
    rating: 4,
    link: 'https://maps.google.com'
  }
]

/* DUPLIKASI (WAJIB BIAR LOOP) */
const loopReviews = [...reviews, ...reviews]

/* ⭐ RATING */
const getStars = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 !== 0
  const empty = 5 - full - (half ? 1 : 0)

  return [
    ...Array(full).fill('★'),
    ...(half ? ['☆'] : []),
    ...Array(empty).fill('✩')
  ]
}

/* TRACK */
const track = ref(null)

/* AUTO SCROLL */
let animationFrame = null
let isPaused = false
const speed = 0.5

const animate = () => {
  if (track.value && !isPaused) {
    track.value.scrollLeft += speed

    if (track.value.scrollLeft >= track.value.scrollWidth / 2) {
      track.value.scrollLeft = 0
    }
  }

  animationFrame = requestAnimationFrame(animate)
}

const pauseAuto = () => {
  isPaused = true
}

const resumeAuto = () => {
  isPaused = false
}

/* DRAG */
let isDown = false
let startX
let scrollLeft

const startDrag = (e) => {
  isDown = true
  isPaused = true
  startX = e.pageX - track.value.offsetLeft
  scrollLeft = track.value.scrollLeft
}

const onDrag = (e) => {
  if (!isDown) return
  const x = e.pageX - track.value.offsetLeft
  const walk = (x - startX) * 1.5
  track.value.scrollLeft = scrollLeft - walk
}

const stopDrag = () => {
  isDown = false
  isPaused = false
}

const handleLeave = () => {
  stopDrag()
  resumeAuto()
}

/* CLICK */
const openReview = (link) => {
  window.open(link, '_blank')
}

/* START AUTO SCROLL */
onMounted(() => {
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.testimoni-section {
  padding: 40px 0;
  background: #ffffff;
}

/* TITLE */
.section-title {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.section-title span {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 500;
}

/* WRAPPER */
.scroll-wrapper {
  position: relative;
}

/* GRADIENT */
.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, #f8f8f8, transparent);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, #f8f8f8, transparent);
}

/* TRACK */
.scroll-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
}

/* HIDE SCROLL */
.scroll-track::-webkit-scrollbar {
  display: none;
}

/* CARD */
.testi-card {
  min-width: 300px;
  background: white;
  padding: 20px;
  border-radius: 16px;
  cursor: grab;
  transition: 0.3s;
  flex-shrink: 0;
}

.testi-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* TEXT */
.stars {
  color: #f4c542;
  margin-bottom: 10px;
}

.comment {
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.user small {
  color: #888;
}

/* BUTTON */
.btn-review {
  background: #c0392b;
  color: white;
  padding: 12px 24px;
  border-radius: 999px;
  text-decoration: none;
}
</style>