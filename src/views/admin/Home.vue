<template>
  <div>

    <StatsSection :stats="statsData" />

    <div class="grid-two">
      <AgendaSection :items="agendaData" />
      <GaleriPreview :items="galeriData" />
    </div>

    <PostPreview :items="postData" />

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FileText, Image, Calendar } from 'lucide-vue-next'
import { adminData } from '@/store/adminData.js'

import StatsSection from '@/components/admin/dashboard/StatsSection.vue'
import AgendaSection from '@/components/admin/dashboard/AgendaSection.vue'
import GaleriPreview from '@/components/admin/dashboard/GaleriPreview.vue'
import PostPreview from '@/components/admin/dashboard/PostPreview.vue'

/* adminData.agenda memakai field: title, date, time, location */
const agendaData = computed(() => adminData.agenda.slice(0, 3))
const galeriData = computed(() => adminData.galeri.slice(0, 3))
const postData = computed(() => adminData.postingan.slice(0, 3))

const statsData = computed(() => [
  { label: 'Postingan', value: adminData.postingan.length, icon: FileText },
  { label: 'Galeri',    value: adminData.galeri.length,    icon: Image    },
  { label: 'Agenda',    value: adminData.agenda.length,    icon: Calendar }
])
</script>

<style scoped>
.grid-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 900px) {
  .grid-two {
    grid-template-columns: 1fr;
  }
}
</style>