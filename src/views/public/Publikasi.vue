<template>
  <Navbar />
  <Hero />
  <Galeri />
  <Postingan />
  <Footer />
</template>

<script setup>
import Navbar from '@/components/user/Navbar.vue';
import Hero from '@/components/user/publikasi/PublikasiHero.vue';
import Galeri from '@/components/user/publikasi/GaleriPublik.vue';
import Postingan from '@/components/user/publikasi/PostinganPublik.vue';
import Footer from '@/components/user/Footer.vue';
</script>