<template>
  <Navbar />
  <Hero />
  <Agenda />
  <Lokasi />
  <Footer />
</template>

<script setup>
import Navbar from '@/components/user/Navbar.vue';
import Hero from '@/components/user/kontak/KontakHero.vue';
import Lokasi from '@/components/user/kontak/Lokasi.vue';
import Agenda from '@/components/user/kontak/AgendaPublik.vue';
import Footer from '@/components/user/Footer.vue';
</script>