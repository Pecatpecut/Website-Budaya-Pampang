<template>
  <header class="navbar-wrapper">
    <div class="container navbar-inner">

      <!-- LOGO -->
      <div class="logo">
        <span class="logo-main">Desa Budaya</span> <span class="logo-accent">Pampang</span>
      </div>

      <!-- MENU DESKTOP -->
      <nav class="menu">
        <router-link to="/" class="nav-link">Beranda</router-link>
        <router-link to="/tentang" class="nav-link">Tentang Kami</router-link>
        <router-link to="/publikasi" class="nav-link">Publikasi</router-link>
        <router-link to="/kontak" class="nav-link">Kontak</router-link>
      </nav>

      <!-- RIGHT -->
      <div class="nav-right">

        <div class="divider"></div>

        <div class="nav-icons">
          <i class="bi bi-headphones"></i>
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
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style scoped>

/* WRAPPER */
.navbar-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;

  background: rgba(255, 255, 255);

  border-bottom: 1px solid rgba(0,0,0,0.05);
}

/* INNER */
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* 🔥 LOGO */
.logo {
  font-size: 1.5rem;
  font-weight: 600;
  transition: 0.3s;
}

.logo-main {
  color: #222;
}

.logo-accent {
  color: #c0392b;
}

/* 🔥 RESPONSIVE LOGO */
@media (max-width: 992px) {
  .logo {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .logo {
    font-size: 1rem;
  }
}

/* MENU */
.menu {
  display: flex;
  gap: 28px;
}

/* 🔥 NAV LINK */
.nav-link {
  text-decoration: none;
  color: #555;
  position: relative;
  padding: 6px 0;
  transition: color 0.25s ease;
}

/* 🔥 HOVER (TEXT ONLY) */
.nav-link:hover {
  color: #c0392b;
}

/* ACTIVE */
.router-link-active {
  color: #000;
  font-weight: 500;
}

.router-link-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: #c0392b;
}

/* RIGHT */
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* DIVIDER */
.divider {
  width: 1px;
  height: 20px;
  background: rgba(0,0,0,0.1);
}

/* ICON */
.nav-icons i {
  font-size: 1.2rem;
  cursor: pointer;
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

/* ANIMASI X */
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
  display: flex;
  flex-direction: column;
  text-align: center;

  padding: 20px 0;
  gap: 15px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.mobile-menu a {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}

/* ANIMATION */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s ease;
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