<template>
  <div class="section-card">

    <div class="section-header">
      <h5>Agenda Mendatang</h5>
      <button class="btn btn-primary btn-sm" @click="router.push('/admin/agenda')">
        Lihat Semua
      </button>
    </div>

    <div v-if="items.length === 0" class="empty">
      <i class="bi bi-calendar3 me-2"></i>Belum ada agenda
    </div>

    <div
      v-for="item in items"
      :key="item.id"
      class="agenda-item"
    >
      <div class="agenda-date">
        <span class="day">{{ formatDay(item.date) }}</span>
        <span class="month">{{ formatMonth(item.date) }}</span>
        <span class="time">{{ item.time }}</span>
      </div>

      <div class="agenda-info">
        <div class="title">{{ item.title }}</div>
        <div class="location">
          <i class="bi bi-geo-alt me-1"></i>{{ item.location }}
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
  items: { type: Array, default: () => [] }
})

const formatDay = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit' }) : '--'
const formatMonth = (d) => d ? new Date(d).toLocaleDateString('id-ID', { month: 'short' }) : ''
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h5 {
  font-weight: 600;
  margin: 0;
}

.empty {
  text-align: center;
  color: #bbb;
  padding: 30px 0;
  font-size: 14px;
}

.agenda-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}

.agenda-item:last-child {
  border-bottom: none;
}

.agenda-date {
  background: linear-gradient(135deg, #fff4e0, #ffeac6);
  border-radius: 10px;
  padding: 10px 12px;
  min-width: 64px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.day {
  font-size: 20px;
  font-weight: 700;
  color: var(--red);
  line-height: 1;
}

.month {
  font-size: 11px;
  color: #888;
  text-transform: capitalize;
}

.time {
  font-size: 11px;
  font-weight: 600;
  color: #555;
  background: white;
  padding: 2px 6px;
  border-radius: 20px;
  margin-top: 4px;
}

.agenda-info .title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.agenda-info .location {
  font-size: 12px;
  color: var(--text-muted, #888);
}
</style>