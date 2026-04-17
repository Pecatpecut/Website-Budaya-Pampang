<template>
  <div>

    <StatsSection :stats="statsData" />

    <AgendaSection :agenda="agendaData" />
    <GaleriPreview :galeri="galeriData" />
    <PostPreview :posts="postData" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FileText, Image, Calendar } from 'lucide-vue-next'

import StatsSection from '@/components/admin/dashboard/StatsSection.vue'
import AgendaSection from '@/components/admin/dashboard/AgendaSection.vue'
import GaleriPreview from '@/components/admin/dashboard/GaleriPreview.vue'
import PostPreview from '@/components/admin/dashboard/PostPreview.vue'

/* DATA */
const galeriData = ref([
  { id: 1, img: '/src/assets/images/lamin.svg' },
  { id: 2, img: '/src/assets/images/lamin.svg' },
  { id: 3, img: '/src/assets/images/lamin.svg' }
])

const agendaData = ref([
  {
    id: 1,
    title: 'Pertunjukan Tari',
    tempat: 'Rumah Lamin',
    tanggal: '18 Apr 2026',
    jam: '13.00'
  },
  {
    id: 2,
    title: 'Festival Budaya',
    tempat: 'Lapangan Pampang',
    tanggal: '20 Apr 2026',
    jam: '15.00'
  }
])

const postData = ref([
  { id: 1, title: 'Asal Usul Pampang' },
  { id: 2, title: 'Tradisi Dayak Kenyah' }
])

/* AUTO STATS */
const statsData = computed(() => [
  {
    label: 'Berita',
    value: postData.value.length,
    icon: FileText
  },
  {
    label: 'Galeri',
    value: galeriData.value.length,
    icon: Image
  },
  {
    label: 'Agenda',
    value: agendaData.value.length,
    icon: Calendar
  }
])
</script>