<template>
  <div class="container py-5">
    <h2>Detail Berita {{ id }}</h2>
    <p>Halaman ini nanti isi dari API / CMS</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>