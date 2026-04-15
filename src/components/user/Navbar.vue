<template>
  <header class="navbar-wrapper">
    <div class="container navbar-inner">

      <!-- LOGO -->
      <div class="logo">
        <span class="logo-main">Desa Budaya</span> <span class="logo-accent">Pampang</span>
      </div>

      <!-- MENU DESKTOP -->
      <nav class="menu" ref="menuContainer">

        <!-- INDICATOR -->
        <div class="nav-indicator" :style="indicatorStyle"></div>

        <router-link
          v-for="(item, i) in menu"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          ref="menuRefs"
        >
          {{ item.name }}
        </router-link>

      </nav>

      <!-- RIGHT -->
      <div class="nav-right">

        <div class="divider"></div>

        <!-- AUDIO -->
        <div class="nav-icons" @click="handleAudio">
          <i 
            class="bi"
            :class="isPlaying ? 'bi-pause-circle-fill active' : 'bi-headphones'"
          ></i>
        </div>

        <!-- HAMBURGER -->
        <div class="hamburger" @click="toggleMenu">
          <span :class="{ active: isOpen }"></span>
          <span :class="{ active: isOpen }"></span>
          <span :class="{ active: isOpen }"></span>
        </div>

      </div>

    </div>

    <!-- MOBILE MENU -->
    <transition name="menu-fade">
      <div v-if="isOpen" class="mobile-menu">
        <router-link @click="closeMenu" to="/">Beranda</router-link>
        <router-link @click="closeMenu" to="/tentang">Tentang Kami</router-link>
        <router-link @click="closeMenu" to="/publikasi">Publikasi</router-link>
        <router-link @click="closeMenu" to="/kontak">Kontak</router-link>
      </div>
    </transition>

  </header>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { initAudio, toggleAudio, getAudioState } from '@/utils/audioPlayer'

const route = useRoute()

/* MENU */
const menu = [
  { name: 'Beranda', path: '/' },
  { name: 'Tentang Kami', path: '/tentang' },
  { name: 'Publikasi', path: '/publikasi' },
  { name: 'Kontak', path: '/kontak' }
]

/* MOBILE */
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

/* INDICATOR */
const menuRefs = ref([])
const menuContainer = ref(null)

const indicatorStyle = ref({
  width: '0px',
  transform: 'translateX(0px)',
  transition: 'all 0.35s ease'
})

let lastIndex = 0

const updateIndicator = (el, index) => {
  if (!el || !menuContainer.value) return

  const rect = el.getBoundingClientRect()
  const parentRect = menuContainer.value.getBoundingClientRect()

  const movingRight = index > lastIndex

  indicatorStyle.value = {
    width: rect.width + 'px',
    transform: `translateX(${rect.left - parentRect.left}px)`,
    transition: movingRight
      ? 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
      : 'all 0.4s cubic-bezier(0.65, 0, 0.35, 1)'
  }

  lastIndex = index
}

const setActive = async () => {
  await nextTick()
  const index = menu.findIndex(i => i.path === route.path)
  const el = menuRefs.value[index]
  if (el) updateIndicator(el.$el || el, index)
}

onMounted(() => {
  setActive()
  initAudio()
  isPlaying.value = getAudioState()
})

watch(() => route.path, setActive)

/* AUDIO */
const isPlaying = ref(false)

const handleAudio = () => {
  isPlaying.value = toggleAudio()
}
</script>

<style scoped>

/* NAVBAR */
.navbar-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: white;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* LOGO */
.logo {
  font-size: 1.5rem;
  font-weight: 600;
}

.logo-accent {
  color: #c0392b;
}

/* DESKTOP MENU */
.menu {
  position: relative;
  display: flex;
  gap: 28px;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #c0392b;
  border-radius: 2px;
}

.nav-link {
  text-decoration: none;
  color: #555;
  padding: 6px 0;
}

.nav-link:hover {
  color: #c0392b;
}

/* RIGHT */
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.divider {
  width: 1px;
  height: 20px;
  background: rgba(0,0,0,0.1);
}

/* AUDIO */
.nav-icons i {
  font-size: 1.3rem;
  cursor: pointer;
  transition: 0.3s;
}

.nav-icons i:hover {
  color: #c0392b;
  transform: scale(1.15);
}

.nav-icons i.active {
  color: #c0392b;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* HAMBURGER */
.hamburger {
  display: none;
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;
}

.hamburger span {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #333;
  left: 0;
  transition: all 0.3s ease;
}

.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { top: 8px; }
.hamburger span:nth-child(3) { top: 16px; }

.hamburger span.active:nth-child(1) {
  transform: rotate(45deg);
  top: 8px;
}

.hamburger span.active:nth-child(2) {
  opacity: 0;
}

.hamburger span.active:nth-child(3) {
  transform: rotate(-45deg);
  top: 8px;
}

/* MOBILE MENU */
.mobile-menu {
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;

  background: white;
  padding: 25px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.mobile-menu a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  font-weight: 500;

  padding: 10px 20px;
  border-radius: 999px;

  transition: all 0.3s ease;
}

.mobile-menu a:hover {
  background: #f5f5f5;
  color: #c0392b;
}

.mobile-menu a.router-link-active {
  background: #c0392b;
  color: white;
}

/* ANIMATION */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: 0.3s;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* RESPONSIVE */
@media (max-width: 768px) {

  .menu {
    display: none;
  }

  .hamburger {
    display: block;
  }

}
</style>