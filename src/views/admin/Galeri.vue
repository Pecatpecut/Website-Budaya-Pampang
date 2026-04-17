<script setup>
import { adminData } from '@/store/adminData'

const tambahGaleri = () => {
  adminData.galeri.push({
    id: Date.now()
  })
}

const hapusGaleri = () => {
  adminData.galeri.pop()
}
</script>

<template>
  <button @click="tambahGaleri">Tambah</button>
  <button @click="hapusGaleri">Hapus</button>
</template>