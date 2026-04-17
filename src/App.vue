<template>
  <div :class="{ 'user-mode': !route.meta.isAdmin && !route.meta.isAuth }">

    <!-- PROGRESS -->
    <div class="scroll-progress"></div>

    <!-- NAVBAR -->
    <Navbar v-if="!route.meta.hideNavbar" />

    <!-- CONTENT -->
    <router-view />

  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/user/Navbar.vue'

const route = useRoute()

/* DETECT ADMIN */
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

let observer = null
let ticking = false

/* 🔥 FIX: RESET OBSERVER */
const initReveal = () => {
  if (observer) observer.disconnect() // ✅ penting

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  })

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el)
  })
}

/* SCROLL */
const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = docHeight > 0 ? scrollTop / docHeight : 0

  const bar = document.querySelector('.scroll-progress')
  if (bar) bar.style.transform = `scaleX(${progress})`

  ticking = false
}

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(updateProgress)
    ticking = true
  }
}

/* 🔥 FIX: PAKAI onMounted SAJA */
onMounted(async () => {
  await nextTick()
  initReveal()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  window.removeEventListener('scroll', handleScroll)
})
</script>