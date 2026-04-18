<template>
  <section class="info-section">
    <div class="container">

      <div class="row justify-content-center text-center">

        <div
          class="col-md-6 col-lg-3 mb-4"
          v-for="(item, i) in infoList"
          :key="i"
        >
          <div class="info-card">

            <!-- ICON -->
            <div class="icon-wrapper">
              <i :class="item.icon"></i>
            </div>

            <!-- TITLE -->
            <h5 class="title">{{ item.title }}</h5>

            <!-- CONTENT -->
            <div class="content">
              <div 
                v-for="(text, j) in item.data" 
                :key="j"
                :class="getClass(j)"
              >
                {{ text }}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { adminData } from '@/store/adminData'

// 🔥 AMBIL DATA DARI ADMIN
const info = adminData.kontakInfo.infoSection

// 🔥 BUILD STRUCTURE SESUAI DESIGN KAMU
const infoList = computed(() => [
  {
    title: 'Jam Operasional',
    icon: 'bi bi-clock',
    data: [
      'Senin s/d Sabtu',
      info.jamOperasional.weekdays,
      '',
      'Minggu',
      info.jamOperasional.sunday
    ]
  },
  {
    title: 'Tiket Parkir',
    icon: 'bi bi-truck',
    data: [
      'Motor',
      'Rp ' + info.parkir.motor,
      'Mobil',
      'Rp ' + info.parkir.mobil,
      'Bus',
      'Rp ' + info.parkir.bus
    ]
  },
  {
    title: 'Tiket Wisata',
    icon: 'bi bi-person',
    data: [
      'Pertunjukan Tarian',
      'Rp ' + info.wisata.tarian,
      'Kunjungan ke Lamin',
      'Rp ' + info.wisata.lamin,
      'Susur Sungai (min 10 org)',
      'Rp ' + info.wisata.susur
    ]
  },
  {
    title: 'Biaya Opsional',
    icon: 'bi bi-camera',
    data: [
      'Foto bersama penari',
      'Rp ' + info.tambahan.foto,
      'Sewa pakaian adat',
      'Rp ' + info.tambahan.sewa
    ]
  }
])

// styling logic (tetap sama)
const getClass = (index) => {
  if (index % 2 === 1) return 'price'
  if (index % 2 === 0) return 'label'
}
</script>

<style scoped>
/* (STYLE KAMU TIDAK DIUBAH SAMA SEKALI) */
.info-section {
  background: #0b0b0b;
  color: white;
  padding: 110px 0;
}

.info-card {
  padding: 30px 20px;
  border-radius: 16px;
  transition: all 0.4s ease;
  background: transparent;
}

.info-card:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,0.03);
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(244, 197, 66, 0.08);
  border: 1px solid rgba(244, 197, 66, 0.3);
  transition: 0.3s;
}

.icon-wrapper i {
  font-size: 1.8rem;
  color: #f4c542;
}

.info-card:hover .icon-wrapper {
  transform: scale(1.1);
  background: rgba(244, 197, 66, 0.15);
}

.title {
  font-weight: 600;
  margin-bottom: 20px;
}

.content {
  font-size: 0.9rem;
}

.label {
  color: #aaa;
  margin-top: 8px;
}

.price {
  font-weight: 600;
  color: white;
  margin-bottom: 5px;
}

.content div:empty {
  height: 10px;
}

@media (max-width: 768px) {
  .info-card {
    padding: 25px 15px;
  }
}
</style>