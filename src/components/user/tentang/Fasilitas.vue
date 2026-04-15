<template>
  <section class="fasilitas-section py-5">
    <div class="container">

      <div class="row align-items-start">

        <!-- FASILITAS -->
        <div class="col-lg-6 fasilitas-box reveal fade-left">
          <h3 class="title">
            <span>Fasilitas</span> Yang Tersedia
          </h3>

          <div class="row">
            <div class="col-6">
              <ul class="list">
                <li v-for="(item, i) in fasilitasLeft" :key="i">
                  <i :class="item.icon"></i>
                  <span>{{ item.text }}</span>
                </li>
              </ul>
            </div>

            <div class="col-6">
              <ul class="list">
                <li v-for="(item, i) in fasilitasRight" :key="i">
                  <i :class="item.icon"></i>
                  <span>{{ item.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- TIPS -->
        <div class="col-lg-6 tips-box reveal fade-right">
          <h3 class="title">
            <span>Tips</span> Berkunjung
          </h3>

          <ul class="list tips">
            <li v-for="(tip, i) in tips" :key="i">
              <span class="check">✔</span>
              <span>{{ tip }}</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

/* DATA */
const fasilitasLeft = [
  { text: 'Areal Parkir', icon: 'bi bi-p-circle' },
  { text: 'Balai Pertemuan', icon: 'bi bi-building' },
  { text: 'Jungle Tracking', icon: 'bi bi-tree' },
  { text: 'Kamar Mandi Umum', icon: 'bi bi-droplet' }
]

const fasilitasRight = [
  { text: 'Kios Souvenir', icon: 'bi bi-bag' },
  { text: 'Kuliner', icon: 'bi bi-cup-hot' },
  { text: 'Musholla', icon: 'bi bi-moon-stars' },
  { text: 'Spot Foto', icon: 'bi bi-camera' }
]

const tips = [
  'Datang di hari Minggu untuk melihat pertunjukan',
  'Gunakan pakaian nyaman',
  'Datang lebih awal untuk mendapatkan tempat terbaik',
  'Siapkan uang tunai untuk tiket dan aktivitas'
]

/* SCROLL REVEAL */
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
</script>

<style scoped>

/* SECTION */
.fasilitas-section {
  background: linear-gradient(90deg, #111 50%, #1a1a1a 50%);
  color: #fff;
}

/* BOX */
.fasilitas-box,
.tips-box {
  padding: 20px 40px;
}

/* TITLE */
.title {
  font-size: 1.6rem;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.title span {
  font-family: 'Playfair Display', serif;
  font-weight: 500;
}

/* LIST BASE */
.list {
  list-style: none;
  padding: 0;
}

.list li {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #ddd;

  transition: all 0.3s ease;
  cursor: pointer;
}

/* 🔥 ICON */
.list i {
  font-size: 1rem;
  color: #c0392b;
  transition: 0.3s;
}

/* 🔥 HOVER EFFECT */
.list li:hover {
  transform: translateX(6px);
  color: #fff;
}

.list li:hover i {
  transform: scale(1.2);
  color: #e74c3c;
}

/* =========================
   TIPS STYLE (DIFFERENT LOOK)
========================= */
.tips li {
  align-items: flex-start;
}

.check {
  color: #e74c3c;
  font-weight: bold;
  margin-top: 2px;
}

/* =========================
   🎬 ANIMATION
========================= */
.reveal {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-left {
  transform: translateX(-60px);
}

.fade-right {
  transform: translateX(60px);
}

.reveal.active {
  opacity: 1;
  transform: translate(0, 0);
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 992px) {
  .fasilitas-section {
    background: #111;
  }

  .fasilitas-box,
  .tips-box {
    padding: 20px;
  }

  .title {
    font-size: 1.4rem;
  }
}

</style>