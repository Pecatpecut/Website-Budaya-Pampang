<template>
  <div class="list">
    <TransitionGroup name="list-anim">
      <div v-for="item in agenda" :key="item.id" class="card" :class="{ past: isPast(item.date) }">

        <!-- DATE BADGE -->
        <div class="date-badge">
          <span class="date-day">{{ formatDay(item.date) }}</span>
          <span class="date-month">{{ formatMonth(item.date) }}</span>
          <span class="date-time"><i class="bi bi-clock me-1"></i>{{ item.time }}</span>
        </div>

        <!-- CONTENT -->
        <div class="content">
          <div class="title-row">
            <h4>{{ item.title }}</h4>
            <span v-if="isPast(item.date)" class="badge-past">Sudah Berlalu</span>
            <span v-else class="badge-upcoming">Akan Datang</span>
          </div>
          <p><i class="bi bi-geo-alt me-1"></i>{{ item.location }}</p>
        </div>

        <!-- ACTIONS -->
        <div class="actions">
          <button class="btn-edit" @click="$emit('edit', item)"><i class="bi bi-pencil"></i></button>
          <button class="btn-del"  @click="$emit('delete', item.id)"><i class="bi bi-trash"></i></button>
        </div>

      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

defineProps(['agenda'])
defineEmits(['edit', 'delete'])

const isPast      = (d) => d && dayjs(d).isBefore(dayjs(), 'day')
const formatDay   = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit' }) : '--'
const formatMonth = (d) => d ? new Date(d).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : ''
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }

.card {
  display: flex; align-items: center; gap: 18px; padding: 16px 20px;
  background: white; border-radius: 14px; border: 1px solid #f0f0f0; transition: 0.25s;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }

/* PAST: redup */
.card.past { opacity: 0.65; background: #fafafa; }
.card.past .date-badge { background: #f0f0f0; }
.card.past .date-day { color: #aaa; }

.date-badge {
  background: linear-gradient(135deg, #fff4e0, #ffeac6);
  border-radius: 12px; padding: 12px 14px; min-width: 80px;
  text-align: center; display: flex; flex-direction: column; align-items: center;
}
.date-day   { font-size: 24px; font-weight: 700; color: var(--red); line-height: 1; }
.date-month { font-size: 11px; color: #888; margin-top: 2px; text-transform: capitalize; }
.date-time  { font-size: 12px; font-weight: 600; color: #555; margin-top: 6px; background: white; padding: 2px 8px; border-radius: 20px; white-space: nowrap; }

.content { flex: 1; }
.title-row { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; flex-wrap: wrap; }
.content h4 { margin: 0; font-size: 15px; font-weight: 600; }
.content p  { margin: 0; color: #888; font-size: 13px; }

.badge-past     { font-size: 11px; padding: 3px 10px; border-radius: 20px; background: #f0f0f0; color: #888; font-weight: 500; }
.badge-upcoming { font-size: 11px; padding: 3px 10px; border-radius: 20px; background: #e8f5e9; color: #2e7d32; font-weight: 500; }

.actions { display: flex; gap: 8px; }
.btn-edit, .btn-del {
  width: 36px; height: 36px; border-radius: 10px; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: 0.2s; font-size: 14px;
}
.btn-edit { background: #f0f0f0; color: #555; }
.btn-edit:hover { background: #e0e0e0; }
.btn-del  { background: #fff0f0; color: var(--red); }
.btn-del:hover { background: var(--red); color: white; }

.list-anim-enter-active, .list-anim-leave-active { transition: all 0.3s ease; }
.list-anim-enter-from { opacity: 0; transform: translateX(-20px); }
.list-anim-leave-to   { opacity: 0; transform: translateX(20px); }
</style>