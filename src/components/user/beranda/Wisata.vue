<template>
  <section class="wisata-section py-5">
    <div class="container">

      <!-- TITLE -->
      <h2 class="section-title mb-3">
        Wisata Yang Bisa <span>Kamu</span> Coba
      </h2>

      <p class="section-desc mb-5">
        Desa Budaya Pampang bukan sekadar tempat bersejarah, tapi juga menawarkan kekayaan budaya Suku Dayak terbesar di Pulau Kalimantan.
      </p>

      <!-- CARD GRID -->
      <div class="row g-4">

        <div
          class="col-md-4"
          v-for="(item, i) in wisataList"
          :key="i"
        >
          <div
            class="wisata-card"
            :class="{ show: visibleCards.includes(i) }"
            ref="cardRefs"
          >

            <!-- IMAGE -->
            <img :src="item.image" class="card-img" />

            <!-- OVERLAY -->
            <div class="overlay"></div>

            <!-- TEXT -->
            <div class="card-content">
              <h5>{{ item.title }}</h5>
              <p>{{ item.desc }}</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const wisataList = [
  {
    title: 'Pertunjukan Tarian',
    desc: 'Saksikan tarian tradisional Dayak Kenyah setiap Minggu.',
    image: new URL('@/assets/images/tarian.svg', import.meta.url).href
  },
  {
    title: 'Kunjungan ke Lamin',
    desc: 'Jelajahi rumah adat khas Pampang dan kehidupan suku Dayak.',
    image: new URL('@/assets/images/lamin-potrait.svg', import.meta.url).href
  },
  {
    title: 'Susur Sungai',
    desc: 'Nikmati keindahan sungai alami dengan suasana segar.',
    image: new URL('@/assets/images/susur-sungai.svg', import.meta.url).href
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
.wisata-section {
  padding: 100px 0;
  background: #fff;
}

/* TITLE */
.section-title {
  font-size: 2rem;
  font-weight: 600;
  font-family: "Inter";
}

.section-title span {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 500;
}

/* DESC */
.section-desc {
  font-family: "Inter";
  max-width: 600px;
  color: #555;
}

/* CARD */
.wisata-card {
  position: relative;
  height: 320px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  /* SCROLL ANIMATION (default hidden) */
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

/* SHOW CLASS */
.wisata-card.show {
  opacity: 1;
  transform: translateY(0);
}

/* IMAGE */
.card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.8),
    rgba(0,0,0,0.3)
  );
  transition: 0.3s;
}

/* TEXT */
.card-content {
  position: absolute;
  bottom: 0;
  padding: 20px;
  color: white;
  z-index: 2;

  /* TEXT ANIMATION */
  transform: translateY(20px);
  opacity: 0.8;
  transition: 0.3s;
}

.card-content h5 {
  font-weight: 600;
}

.card-content p {
  font-size: 0.9rem;
}

/* HOVER EFFECT */
.wisata-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
}

.wisata-card:hover .card-img {
  transform: scale(1.1);
}

.wisata-card:hover .overlay {
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.6),
    rgba(0,0,0,0.2)
  );
}

.wisata-card:hover .card-content {
  transform: translateY(0);
  opacity: 1;
}
</style>