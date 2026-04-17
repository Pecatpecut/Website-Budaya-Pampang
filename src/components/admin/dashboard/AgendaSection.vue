<template>
  <div class="section">

    <div class="header">
      <h3>Agenda Mendatang</h3>
      <button class="btn" @click="goAgenda">Lihat Semua</button>
    </div>

    <div
      class="agenda-item"
      v-for="item in agenda"
      :key="item.id"
    >
      <div class="date-box">
        <span class="tanggal">{{ item.tanggal }}</span>
        <span class="jam">{{ item.jam }}</span>
      </div>

      <div class="info">
        <h4>{{ item.title }}</h4>
        <p>{{ item.tempat }}</p>
      </div>
    </div>

    <p v-if="agenda.length === 0" class="empty">Tidak ada agenda.</p>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  agenda: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const goAgenda = () => router.push('/admin/agenda')
</script>

<style scoped>
.section {
  background: white;
  padding: 20px;
  border-radius: 14px;
  margin-bottom: 25px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header h3 {
  font-size: 16px;
  font-weight: 600;
}

.btn {
  font-size: 13px;
  background: #c0392b;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.agenda-item {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.agenda-item:last-child {
  border-bottom: none;
}

.date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 10px;
  min-width: 90px;
  text-align: center;
}

.tanggal {
  font-size: 12px;
  color: #555;
}

.jam {
  font-size: 14px;
  font-weight: 600;
  color: #c0392b;
}

.info h4 {
  margin: 0 0 4px;
  font-size: 14px;
}

.info p {
  margin: 0;
  font-size: 12px;
  color: #888;
}

.empty {
  color: #aaa;
  font-size: 13px;
  text-align: center;
  padding: 20px 0;
}
</style>