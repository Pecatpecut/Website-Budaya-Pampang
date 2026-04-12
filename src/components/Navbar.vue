<template>
  <div class="navbar-wrapper" :class="{ scrolled: isScrolled }">
    <nav class="navbar custom-navbar px-4 py-1">
      
      <div class="nav-container" ref="navContainer">
        <!-- SLIDING INDICATOR -->
        <div
          class="active-indicator"
          :style="indicatorStyle"
        ></div>

        <!-- MENU -->
        <ul class="navbar-nav d-flex flex-row align-items-center gap-2 m-0">

          <li
            class="nav-item"
            v-for="(item, index) in menu"
            :key="item.name"
          >
            <a
              href="#"
              class="nav-link px-3 py-1"
              :class="{ active: activeMenu === item.name }"
              @click="setActive(item.name, $event)"
              ref="menuRefs"
            >
              {{ item.name }}
            </a>
          </li>

          <!-- Divider -->
          <div class="divider"></div>

          <!-- Icons -->
          <li class="nav-item">
            <a class="nav-link icon">
              <i class="bi bi-pause"></i>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link icon">
              <i class="bi bi-person"></i>
            </a>
          </li>

        </ul>
      </div>

    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const menu = [
  { name: 'Beranda' },
  { name: 'Tentang Kami' },
  { name: 'Publikasi' },
  { name: 'Kontak' }
]

const activeMenu = ref('Beranda')
const menuRefs = ref([])
const navContainer = ref(null)

const indicatorStyle = ref({
  width: '0px',
  transform: 'translateX(0px)'
})

const updateIndicator = (el) => {
  if (!el) return

  const rect = el.getBoundingClientRect()
  const parentRect = navContainer.value.getBoundingClientRect()

  indicatorStyle.value = {
    width: rect.width + 'px',
    transform: `translateX(${rect.left - parentRect.left}px)`
  }
}

const setActive = async (name, event) => {
  activeMenu.value = name
  await nextTick()
  updateIndicator(event.target)
}

onMounted(async () => {
  await nextTick()
  const activeEl = menuRefs.value.find(
    el => el.textContent === activeMenu.value
  )
  updateIndicator(activeEl)

  window.addEventListener('scroll', handleScroll)
})

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>

/* WRAPPER */
.navbar-wrapper {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}

/* NAVBAR */
.custom-navbar {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* SCROLL */
.navbar-wrapper.scrolled .custom-navbar {
  background: rgba(0, 0, 0, 0.75);
}

/* CONTAINER (IMPORTANT) */
.nav-container {
  position: relative;
}

/* SLIDING INDICATOR */
.active-indicator {
  position: absolute;
  height: 100%;
  background: white;
  border-radius: 999px;
  top: 0;
  left: 0;
  z-index: 0;
  transition: all 0.3s ease;
}

/* NAV LINK */
.nav-link {
  position: relative;
  z-index: 1;
  color: white;
  font-weight: 500;
  border-radius: 999px;
  transition: color 0.3s;
}

/* ACTIVE TEXT */
.nav-link.active {
  color: black;
  font-weight: 600;
}

/* HOVER */
.nav-link:hover {
  color: black;
}

/* ICON */
.nav-link.icon {
  padding: 8px 12px;
}

/* DIVIDER */
.divider {
  width: 1px;
  height: 20px;
  background: rgba(255,255,255,0.4);
  margin: 0 5px;
}

</style>