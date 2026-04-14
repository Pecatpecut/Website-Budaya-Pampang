<template>
  <div class="scroll-progress"></div>
  <navbar />
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Navbar from './components/user/Navbar.vue'

let observer
let ticking = false

/* =========================
   SCROLL REVEAL
========================= */
const initReveal = () => {
  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          obs.unobserve(entry.target) // hemat performa
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el)
  })
}

/* =========================
   SCROLL PROGRESS BAR
========================= */
const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight

  const progress = scrollTop / docHeight

  const bar = document.querySelector('.scroll-progress')
  if (bar) {
    bar.style.transform = `scaleX(${progress})`
  }

  ticking = false
}

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress)
    ticking = true
  }
}

/* =========================
   LIFECYCLE
========================= */
onMounted(() => {
  initReveal()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  window.removeEventListener('scroll', handleScroll)
})
</script>
