<template>
  <div>

    <StatsSection :stats="statsData" />

    <div class="grid-two">
      <AgendaSection :items="upcomingAgenda" />
      <GaleriPreview :items="latestGaleri" />
    </div>

    <PostPreview :items="latestPost" />

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FileText, Image, Calendar } from 'lucide-vue-next'
import { adminData } from '@/store/adminData.js'
import dayjs from 'dayjs'

import StatsSection  from '@/components/admin/dashboard/StatsSection.vue'
import AgendaSection from '@/components/admin/dashboard/AgendaSection.vue'
import GaleriPreview from '@/components/admin/dashboard/GaleriPreviewAdmin.vue'
import PostPreview   from '@/components/admin/dashboard/PostPreview.vue'

// Hanya tampilkan agenda yang akan datang di dashboard
const upcomingAgenda = computed(() =>
  adminData.agenda
    .filter(a => dayjs(a.date).isSame(dayjs(), 'day') || dayjs(a.date).isAfter(dayjs()))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)
)

const latestGaleri = computed(() => adminData.galeri.slice(-3).reverse())
const latestPost   = computed(() =>
  [...adminData.postingan]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
)

const statsData = computed(() => [
  { label: 'Postingan', value: adminData.postingan.length, icon: FileText },
  { label: 'Galeri',    value: adminData.galeri.length,    icon: Image    },
  { label: 'Agenda',    value: adminData.agenda.length,    icon: Calendar }
])
</script>

<style scoped>
.grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 900px) { .grid-two { grid-template-columns: 1fr; } }
</style>