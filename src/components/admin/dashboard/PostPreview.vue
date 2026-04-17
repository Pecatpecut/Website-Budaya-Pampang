<template>
  <div class="section">

    <div class="header">
      <h3>Postingan Terbaru</h3>
      <button class="btn">Tambah</button>
    </div>

    <div class="post" v-for="i in 3" :key="i">
      <img src="@/assets/images/lamin.svg" />

      <div>
        <h4>Asal-Usul Desa Budaya Pampang</h4>
        <p class="meta">Admin • 10 April 2026</p>
        <p class="desc">Desa Budaya Pampang...</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.section {
  background: white;
  padding: 20px;
  border-radius: 14px;
}

.post {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
}
.post img {
  width: 110px;
}
</style>