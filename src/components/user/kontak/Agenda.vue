<template>
  <section class="agenda-section py-5">
    <div class="container">

      <!-- TITLE -->
      <h2 class="title">
        <span>Agenda</span> Terdekat
      </h2>

      <div class="row mt-4 align-items-start">

        <!-- =========================
             CALENDAR
        ========================= -->
        <div class="col-lg-6">
          <div class="calendar">

            <div class="calendar-header">
              <button @click="prevMonth">‹</button>
              <h5>{{ monthYear }}</h5>
              <button @click="nextMonth">›</button>
            </div>

            <div class="calendar-grid">

              <div class="day" v-for="d in days" :key="d">
                {{ d }}
              </div>

              <div
                v-for="date in calendarDates"
                :key="date.fullDate"
                class="date"
                :class="{ today: isToday(date.fullDate) }"
                @click="openFromCalendar(date.fullDate)"
              >
                {{ date.date }}
                <span v-if="isEvent(date.fullDate)" class="dot"></span>
              </div>

            </div>

          </div>
        </div>

        <!-- =========================
             EVENT CARD
        ========================= -->
        <div class="col-lg-6">
          <div
            class="agenda-card"
            v-if="nearestEvent"
            @click="openFromCard"
          >

            <h4>{{ nearestEvent.title }}</h4>

            <div class="meta-row">
              <span>📅 {{ nearestEvent.date }}</span>
              <span>⏰ {{ nearestEvent.time }}</span>
            </div>

            <div class="location">
              📍 {{ nearestEvent.location }}
            </div>

            <p class="desc">
              {{ nearestEvent.description }}
            </p>

            <span class="detail-link">
              Lihat detail →
            </span>

          </div>
        </div>

      </div>

      <!-- =========================
           MODAL
      ========================= -->
      <transition name="modal-fade">
        <div v-if="modalOpen" class="modal" @click.self="closeModal">

          <div class="modal-content">

            <button class="close-icon" @click="closeModal">✕</button>

            <h4 class="modal-title">Detail Agenda</h4>

            <div
              v-for="event in selectedEvents"
              :key="event.id"
              class="modal-item"
            >
              <h5>{{ event.title }}</h5>

              <div class="meta">
                <span>📅 {{ event.date }}</span>
                <span>⏰ {{ event.time }}</span>
              </div>

              <div class="location">
                📍 {{ event.location }}
              </div>

              <p>{{ event.description }}</p>
            </div>

          </div>

        </div>
      </transition>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const events = ref([
  {
    id: 1,
    title: 'Pertunjukan Tari',
    date: '2026-04-18',
    time: '14:00 WITA',
    location: 'Rumah Lamin Pampang',
    description: 'Tarian tradisional Dayak Kenyah'
  },
  {
    id: 2,
    title: 'Festival Budaya',
    date: '2026-04-25',
    time: '09:00 WITA',
    location: 'Lapangan Desa Pampang',
    description: 'Festival budaya tahunan'
  }
])

const current = ref(dayjs())
const modalOpen = ref(false)
const selectedEvents = ref([])

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const monthYear = computed(() =>
  current.value.format('MMMM YYYY')
)

const calendarDates = computed(() => {
  const start = current.value.startOf('month')
  const end = current.value.endOf('month')

  let dates = []
  let day = start

  while (day.isBefore(end) || day.isSame(end)) {
    dates.push({
      date: day.date(),
      fullDate: day.format('YYYY-MM-DD')
    })
    day = day.add(1, 'day')
  }

  return dates
})

const isEvent = (date) =>
  events.value.some(e => e.date === date)

const isToday = (date) =>
  dayjs().format('YYYY-MM-DD') === date

const nearestEvent = computed(() => {
  const today = dayjs()

  return events.value
    .filter(e => dayjs(e.date).isAfter(today) || dayjs(e.date).isSame(today))
    .sort((a,b) => dayjs(a.date) - dayjs(b.date))[0]
})

const openFromCalendar = (date) => {
  selectedEvents.value = events.value.filter(e => e.date === date)
  if (selectedEvents.value.length) modalOpen.value = true
}

const openFromCard = () => {
  selectedEvents.value = [nearestEvent.value]
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const prevMonth = () => current.value = current.value.subtract(1,'month')
const nextMonth = () => current.value = current.value.add(1,'month')
</script>

<style scoped>

/* =========================
   TITLE
========================= */
.title {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.title span {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.title::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: #c0392b;
  margin-top: 10px;
}

/* =========================
   CALENDAR
========================= */
.calendar {
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(135deg, #c0392b, #a93226);
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
  margin-bottom: 15px;
}

.calendar-header button {
  background: rgba(255,255,255,0.2);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7,1fr);
  gap: 6px;
}

.day {
  text-align: center;
  font-size: 0.8rem;
  color: #777;
}

.date {
  position: relative;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.date:hover {
  background: rgba(192,57,43,0.1);
}

.date.today {
  border: 1px solid #c0392b;
}

.dot {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background: #c0392b;
  border-radius: 50%;
}

/* =========================
   CARD
========================= */
.agenda-card {
  position: relative;
  background: linear-gradient(135deg, #c0392b, #922b21);
  padding: 30px;
  border-radius: 18px;

  color: white;

  box-shadow: 0 20px 40px rgba(192,57,43,0.3);
  cursor: pointer;
  transition: 0.3s;
}

.agenda-card:hover {
  transform: translateY(-6px);
}

.agenda-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent);
  pointer-events: none;
}

.meta-row {
  display: flex;
  gap: 15px;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.85);
  margin: 12px 0;
}

.location {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: rgba(255,255,255,0.9);
}

.desc {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.9);
}

.detail-link {
  color: white;
  font-size: 0.85rem;
  opacity: 0.9;
}

/* =========================
   MODAL
========================= */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(6px);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 14px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.close-icon {
  position: absolute;
  right: 15px;
  top: 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.meta {
  font-size: 0.8rem;
  color: #777;
  display: flex;
  gap: 10px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.2s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

</style>