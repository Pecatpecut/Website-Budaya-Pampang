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

// styling logic (label vs price)
const getClass = (index) => {
  if (index % 2 === 1) return 'price'
  if (index % 2 === 0) return 'label'
}
</script>

<style scoped>

/* SECTION */
.info-section {
  background: #0b0b0b;
  color: white;
  padding: 110px 0;
}

/* CARD */
.info-card {
  padding: 30px 20px;
  border-radius: 16px;
  transition: all 0.4s ease;
  background: transparent;
}

/* HOVER (MICROINTERACTION 🔥) */
.info-card:hover {
  transform: translateY(-8px);
  background: rgba(255,255,255,0.03);
}

/* ICON WRAPPER */
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

/* ICON */
.icon-wrapper i {
  font-size: 1.8rem;
  color: #f4c542;
}

/* ICON HOVER EFFECT */
.info-card:hover .icon-wrapper {
  transform: scale(1.1);
  background: rgba(244, 197, 66, 0.15);
}

/* TITLE */
.title {
  font-weight: 600;
  margin-bottom: 20px;
}

/* CONTENT */
.content {
  font-size: 0.9rem;
}

/* LABEL */
.label {
  color: #aaa;
  margin-top: 8px;
}

/* PRICE */
.price {
  font-weight: 600;
  color: white;
  margin-bottom: 5px;
}

/* EMPTY SPACE */
.content div:empty {
  height: 10px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .info-card {
    padding: 25px 15px;
  }
}

</style>