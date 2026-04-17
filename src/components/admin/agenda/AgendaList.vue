<template>
  <div class="list">

    <TransitionGroup name="list-anim">
      <div
        v-for="item in agenda"
        :key="item.id"
        class="card"
      >
        <!-- DATE BADGE -->
        <div class="date-badge">
          <span class="date-day">{{ formatDay(item.date) }}</span>
          <span class="date-month">{{ formatMonth(item.date) }}</span>
          <span class="date-time">
            <i class="bi bi-clock me-1"></i>{{ item.time }}
          </span>
        </div>

        <!-- CONTENT -->
        <div class="content">
          <h4>{{ item.title }}</h4>
          <p>
            <i class="bi bi-geo-alt me-1"></i>{{ item.location }}
          </p>
        </div>

        <!-- ACTIONS -->
        <div class="actions">
          <button class="btn-edit" @click="$emit('edit', item)">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-delete" @click="$emit('delete', item.id)">
            <i class="bi bi-trash"></i>
          </button>
        </div>

      </div>
    </TransitionGroup>

  </div>
</template>

<script setup>
defineProps(['agenda'])
defineEmits(['edit', 'delete'])

const formatDay = (dateStr) => {
  if (!dateStr) return '--'
  return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit' })
}

const formatMonth = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  background: white;
  border-radius: 14px;
  border: 1px solid #f0f0f0;
  transition: 0.25s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  border-color: #e8e8e8;
}

/* DATE BADGE */
.date-badge {
  background: linear-gradient(135deg, #fff4e0, #ffeac6);
  border-radius: 12px;
  padding: 12px 14px;
  text-align: center;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-day {
  font-size: 24px;
  font-weight: 700;
  color: var(--red);
  line-height: 1;
}

.date-month {
  font-size: 11px;
  color: #888;
  margin-top: 2px;
  text-transform: capitalize;
}

.date-time {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-top: 6px;
  background: white;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
}

/* CONTENT */
.content {
  flex: 1;
}

.content h4 {
  margin: 0 0 5px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
}

.content p {
  margin: 0;
  color: #888;
  font-size: 13px;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  font-size: 14px;
}

.btn-edit {
  background: #f0f0f0;
  color: #555;
}

.btn-edit:hover {
  background: #e0e0e0;
}

.btn-delete {
  background: #fff0f0;
  color: var(--red);
}

.btn-delete:hover {
  background: var(--red);
  color: white;
}

/* TRANSITION */
.list-anim-enter-active, .list-anim-leave-active {
  transition: all 0.3s ease;
}
.list-anim-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-anim-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>