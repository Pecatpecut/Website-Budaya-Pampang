<template>
  <section class="info-section">
    <div class="container">

      <div class="row text-center g-4">

        <div
          class="col-md-3"
          v-for="(item, i) in infoList"
          :key="i"
        >
          <div
            class="info-card"
            :class="{ show: visibleCards.includes(i) }"
            ref="cardRefs"
          >

            <!-- ICON -->
            <div class="icon">
              <i :class="item.icon"></i>
            </div>

            <!-- TITLE -->
            <h6 class="title">{{ item.title }}</h6>

            <!-- CONTENT -->
            <div class="content">
              <p v-for="(text, j) in item.data" :key="j">
                {{ text }}
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const infoList = [
  {
    title: 'Jam Operasional',
    icon: 'bi bi-clock',
    data: [
      'Senin s/d Sabtu',
      '08.00 - 17.00 WITA',
      '',
      'Minggu',
      '14.00 WITA'
    ]
  },
  {
    title: 'Tiket Parkir',
    icon: 'bi bi-truck',
    data: [
      'Motor',
      'Rp 5.000',
      'Mobil',
      'Rp 10.000',
      'Bus',
      'Rp 20.000'
    ]
  },
  {
    title: 'Tiket Wisata',
    icon: 'bi bi-person',
    data: [
      'Pertunjukan Tarian',
      'Rp 45.000',
      'Kunjungan ke Lamin',
      'Rp 15.000',
      'Susur Sungai (min 10 org)',
      'Rp 30.000'
    ]
  },
  {
    title: 'Biaya Opsional',
    icon: 'bi bi-camera',
    data: [
      'Foto bersama penari',
      'Rp 25.000 / 5 foto',
      'Sewa pakaian adat',
      'Rp 50.000 - 100.000'
    ]
  }
]

/* =========================
   SCROLL REVEAL
========================= */
const cardRefs = ref([])
const visibleCards = ref([])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.value.indexOf(entry.target)
          if (!visibleCards.value.includes(index)) {
            visibleCards.value.push(index)
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  cardRefs.value.forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.info-section {
  background: #0f0f0f;
  color: white;
  padding: 100px 0;
}

/* CARD BASE */
.info-card {
  padding: 25px;
  border-radius: 16px;
  transition: all 0.4s ease;

  /* hidden awal */
  opacity: 0;
  transform: translateY(40px);
}

/* SHOW */
.info-card.show {
  opacity: 1;
  transform: translateY(0);
}

/* ICON */
.icon {
  font-size: 2rem;
  color: #f4c542;
  margin-bottom: 15px;
  transition: 0.3s;
}

/* TITLE */
.title {
  font-weight: 600;
  margin-bottom: 15px;
}

/* TEXT */
.content p {
  margin: 4px 0;
  font-size: 0.9rem;
  opacity: 0.85;
  transition: 0.3s;
}

/* ✨ HOVER EFFECT */
.info-card:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255,255,255,0.03);
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

/* ICON ANIMATION */
.info-card:hover .icon {
  transform: scale(1.2) rotate(5deg);
  color: #ffd95a;
}

/* TEXT HIGHLIGHT */
.info-card:hover .content p {
  opacity: 1;
}
</style>