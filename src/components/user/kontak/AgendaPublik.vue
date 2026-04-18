<template>
  <section class="agenda-section py-5">
    <div class="container">

      <h2 class="title"><span>Agenda</span> Terdekat</h2>

      <div class="row mt-4 align-items-start">

        <!-- CALENDAR -->
        <div class="col-lg-6">
          <div class="calendar">
            <div class="calendar-header">
              <button @click="prevMonth">‹</button>
              <h5>{{ monthYear }}</h5>
              <button @click="nextMonth">›</button>
            </div>

            <div class="calendar-grid">
              <div class="day" v-for="d in days" :key="d">{{ d }}</div>

              <!-- empty slots for first day offset -->
              <div v-for="n in startOffset" :key="'e'+n" class="date empty-date"></div>

              <div
                v-for="date in calendarDates"
                :key="date.fullDate"
                class="date"
                :class="{ today: isToday(date.fullDate), 'has-event': isEvent(date.fullDate) }"
                @click="openFromCalendar(date.fullDate)"
              >
                {{ date.date }}
                <span v-if="isEvent(date.fullDate)" class="dot"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- NEAREST EVENT CARD -->
        <div class="col-lg-6">
          <div v-if="nearestEvent" class="agenda-card" @click="openFromCard">
            <h4>{{ nearestEvent.title }}</h4>
            <div class="meta-row">
              <span>📅 {{ formatDate(nearestEvent.date) }}</span>
              <span>⏰ {{ nearestEvent.time }}</span>
            </div>
            <div class="location">📍 {{ nearestEvent.location }}</div>
            <span class="detail-link">Lihat detail →</span>
          </div>

          <div v-else class="no-event">
            <i class="bi bi-calendar-check"></i>
            <p>Tidak ada agenda mendatang saat ini</p>
          </div>
        </div>

      </div>

      <!-- MODAL -->
      <Transition name="modal-fade">
        <div v-if="modalOpen" class="modal" @click.self="closeModal">
          <div class="modal-content">
            <button class="close-icon" @click="closeModal">✕</button>
            <h4 class="modal-title">Detail Agenda</h4>

            <div v-for="event in selectedEvents" :key="event.id" class="modal-item">
              <h5>{{ event.title }}</h5>
              <div class="meta">
                <span>📅 {{ formatDate(event.date) }}</span>
                <span>⏰ {{ event.time }}</span>
              </div>
              <div class="location">📍 {{ event.location }}</div>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { adminData } from '@/store/adminData.js'
import dayjs from 'dayjs'

// Use adminData as source of truth
const events = computed(() => adminData.agenda)

const current    = ref(dayjs())
const modalOpen  = ref(false)
const selectedEvents = ref([])

const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab']

const monthYear   = computed(() => current.value.format('MMMM YYYY'))
const startOffset = computed(() => current.value.startOf('month').day())

const calendarDates = computed(() => {
  const start = current.value.startOf('month')
  const end   = current.value.endOf('month')
  let dates = [], day = start
  while (day.isBefore(end) || day.isSame(end, 'day')) {
    dates.push({ date: day.date(), fullDate: day.format('YYYY-MM-DD') })
    day = day.add(1, 'day')
  }
  return dates
})

const isEvent = (date) => events.value.some(e => e.date === date)
const isToday = (date) => dayjs().format('YYYY-MM-DD') === date

const nearestEvent = computed(() => {
  const today = dayjs()
  return events.value
    .filter(e => dayjs(e.date).isSame(today, 'day') || dayjs(e.date).isAfter(today))
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
})

const openFromCalendar = (date) => {
  selectedEvents.value = events.value.filter(e => e.date === date)
  if (selectedEvents.value.length) modalOpen.value = true
}

const openFromCard = () => {
  selectedEvents.value = [nearestEvent.value]
  modalOpen.value = true
}

const closeModal = () => { modalOpen.value = false }
const prevMonth  = () => { current.value = current.value.subtract(1, 'month') }
const nextMonth  = () => { current.value = current.value.add(1, 'month') }

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : '—'
</script>

<style scoped>
.title { font-size: 2.2rem; margin-bottom: 10px; }
.title span { font-family: 'Playfair Display', serif; font-style: italic; }
.title::after { content: ""; display: block; width: 60px; height: 3px; background: #c0392b; margin-top: 10px; }

/* CALENDAR */
.calendar { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.calendar-header { display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #c0392b, #a93226); padding: 10px 15px; border-radius: 10px; color: white; margin-bottom: 15px; }
.calendar-header button { background: rgba(255,255,255,0.2); border: none; width: 30px; height: 30px; border-radius: 6px; color: white; cursor: pointer; font-size: 18px; }
.calendar-header h5 { margin: 0; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.day { text-align: center; font-size: 0.8rem; color: #777; padding: 4px 0; }
.date { position: relative; text-align: center; padding: 8px 4px; border-radius: 8px; cursor: pointer; transition: 0.2s; font-size: 14px; }
.date:hover { background: rgba(192,57,43,0.1); }
.date.today { border: 2px solid #c0392b; font-weight: 600; }
.date.has-event { background: rgba(192,57,43,0.08); }
.empty-date { cursor: default; }
.dot { position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background: #c0392b; border-radius: 50%; }

/* CARD */
.agenda-card {
  background: linear-gradient(135deg, #c0392b, #922b21); padding: 30px; border-radius: 18px;
  color: white; box-shadow: 0 20px 40px rgba(192,57,43,0.3); cursor: pointer; transition: 0.3s; position: relative; overflow: hidden;
}
.agenda-card:hover { transform: translateY(-6px); }
.agenda-card::before { content: ""; position: absolute; inset: 0; border-radius: 18px; background: radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent); pointer-events: none; }
.agenda-card h4 { font-size: 1.2rem; margin-bottom: 14px; }
.meta-row { display: flex; gap: 15px; font-size: 0.85rem; color: rgba(255,255,255,0.85); margin-bottom: 10px; }
.location { font-size: 0.9rem; margin-bottom: 14px; }
.detail-link { font-size: 0.85rem; opacity: 0.9; }

.no-event { text-align: center; padding: 40px 20px; color: #aaa; }
.no-event i { font-size: 48px; display: block; margin-bottom: 12px; }

/* MODAL */
.modal { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(6px); display: flex; justify-content: center; align-items: center; z-index: 999; }
.modal-content { background: white; padding: 28px; border-radius: 16px; width: 90%; max-width: 400px; position: relative; }
.close-icon { position: absolute; right: 15px; top: 12px; border: none; background: none; cursor: pointer; font-size: 16px; }
.modal-title { font-weight: 700; margin-bottom: 16px; }
.modal-item { padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
.modal-item:last-child { border-bottom: none; }
.modal-item h5 { margin: 0 0 8px; }
.meta { font-size: 0.8rem; color: #777; display: flex; gap: 10px; margin-bottom: 6px; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>