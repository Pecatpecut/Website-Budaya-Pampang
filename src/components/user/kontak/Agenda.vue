<template>
  <section class="agenda-section py-5">
    <div class="container">

      <!-- TITLE -->
      <h2 class="title">
        <span>Agenda</span> Terdekat
      </h2>

      <div class="row mt-4 align-items-start">

        <!-- 🗓️ CALENDAR -->
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
                :key="date.date"
                class="date"
                :class="{
                  active: isEvent(date.fullDate),
                  today: isToday(date.fullDate)
                }"
                @click="selectDate(date.fullDate)"
              >
                {{ date.date }}
              </div>
            </div>

          </div>
        </div>

        <!-- 🎯 EVENT TERDEKAT -->
        <div class="col-lg-6">
          <div class="agenda-card" v-if="nearestEvent">

            <h4>{{ nearestEvent.title }}</h4>

            <div class="date-display">
              <span class="day">
                {{ getDay(nearestEvent.date) }}
              </span>
              <span class="month">
                {{ getMonth(nearestEvent.date) }}
              </span>
            </div>

            <p class="desc">
              {{ nearestEvent.description }}
            </p>

          </div>

          <div v-else>
            <p>Tidak ada acara mendatang</p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

/* 🔥 DATA (NANTI DARI API) */
const events = ref([
  {
    id: 1,
    title: 'Pertunjukan Tari',
    date: '2026-04-18',
    description: 'Tarian tradisional Dayak Kenyah'
  },
  {
    id: 2,
    title: 'Festival Budaya',
    date: '2026-04-25',
    description: 'Festival budaya tahunan'
  }
])

/* =========================
   CALENDAR STATE
========================= */
const current = ref(dayjs())

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const monthYear = computed(() =>
  current.value.format('MMMM YYYY')
)

/* GENERATE DATES */
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

/* =========================
   EVENT LOGIC
========================= */
const isEvent = (date) =>
  events.value.some(e => e.date === date)

const isToday = (date) =>
  dayjs().format('YYYY-MM-DD') === date

/* EVENT TERDEKAT */
const nearestEvent = computed(() => {
  const today = dayjs()

  return events.value
    .filter(e => dayjs(e.date).isAfter(today))
    .sort((a,b) => dayjs(a.date) - dayjs(b.date))[0]
})

/* SELECT DATE */
const selectDate = (date) => {
  const event = events.value.find(e => e.date === date)
  if (event) {
    alert(`Event: ${event.title}`)
  }
}

/* NAV */
const prevMonth = () => {
  current.value = current.value.subtract(1, 'month')
}

const nextMonth = () => {
  current.value = current.value.add(1, 'month')
}

/* FORMAT */
const getDay = (date) => dayjs(date).format('DD')
const getMonth = (date) => dayjs(date).format('MMM')
</script>

<style scoped>

/* CALENDAR */
.title span {
  font-family: 'Playfair Display', serif;
}

.calendar {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 12px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  font-size: 0.8rem;
  text-align: center;
}

.date {
  text-align: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 6px;
}

.date.active {
  background: #c0392b;
  color: white;
}

.date.today {
  border: 1px solid #c0392b;
}

/* EVENT CARD */
.agenda-card {
  background: #a52a2a;
  color: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
}

.date-display .day {
  font-size: 3rem;
}

.date-display .month {
  font-size: 2rem;
  margin-left: 10px;
}

.desc {
  margin-top: 10px;
  font-size: 0.9rem;
}

</style>