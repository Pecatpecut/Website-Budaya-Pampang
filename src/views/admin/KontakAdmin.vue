<template>
  <div class="kontak-page">

    <!-- HEADER -->
    <div class="page-header">
      <h2 class="page-title">Pengaturan Kontak</h2>
      <p class="page-sub">Kelola informasi kontak & info beranda</p>
    </div>

    <!-- ================= KONTAK ================= -->
    <div class="form-card">

      <div class="field">
        <label class="label"><i class="bi bi-geo-alt"></i> Alamat</label>
        <textarea v-model="form.alamat" class="form-textarea" rows="3"/>
      </div>

      <div class="row-fields">
        <div class="field">
          <label class="label"><i class="bi bi-envelope"></i> Email</label>
          <div class="input-wrap">
            <input v-model="form.email"/>
          </div>
        </div>

        <div class="field">
          <label class="label"><i class="bi bi-telephone"></i> Telepon</label>
          <div class="input-wrap">
            <input v-model="form.telepon"/>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label"><i class="bi bi-instagram"></i> Instagram</label>
        <div class="input-wrap prefix">
          <span>@</span>
          <input v-model="instagramHandle"/>
        </div>
      </div>

      <div class="form-footer spaced">
        <button class="btn-primary" @click="saveKontak">
          <i class="bi bi-save"></i> Simpan Perubahan
        </button>
      </div>

    </div>

    <!-- ================= INFO ================= -->
    <div class="form-card">

      <h6 class="section-title">
        <i class="bi bi-info-circle"></i> Info Beranda
      </h6>

      <!-- PARKIR -->
      <div class="group">
        <p class="group-title">Tiket Parkir</p>

        <div class="row-fields">
          <div class="field">
            <label class="label">Motor</label>
            <div class="input-wrap prefix">
              <span>Rp</span>
              <input v-model="parkirMotor" inputmode="numeric"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Mobil</label>
            <div class="input-wrap prefix">
              <span>Rp</span>
              <input v-model="parkirMobil" inputmode="numeric"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Bus</label>
            <div class="input-wrap prefix">
              <span>Rp</span>
              <input v-model="parkirBus" inputmode="numeric"/>
            </div>
          </div>
        </div>
      </div>

      <!-- WISATA -->
      <div class="group">
        <p class="group-title">Tiket Wisata</p>

        <div class="row-fields">
          <div class="field">
            <label class="label">Tarian</label>
            <div class="input-wrap prefix">
              <span>Rp</span>
              <input v-model="wisataTarian" inputmode="numeric"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Lamin</label>
            <div class="input-wrap prefix">
              <span>Rp</span>
              <input v-model="wisataLamin" inputmode="numeric"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Susur Sungai</label>
            <div class="input-wrap prefix">
              <span>Rp</span>
              <input v-model="wisataSusur" inputmode="numeric"/>
            </div>
          </div>
        </div>
      </div>

      <!-- OPSIONAL -->
      <div class="group">
        <p class="group-title">Biaya Opsional</p>

        <div class="row-fields">
          <div class="field">
            <label class="label">Foto</label>
            <div class="input-wrap">
              <input v-model="info.tambahan.foto"/>
            </div>
          </div>

          <div class="field">
            <label class="label">Sewa</label>
            <div class="input-wrap">
              <input v-model="info.tambahan.sewa"/>
            </div>
          </div>
        </div>
      </div>

      <div class="form-footer spaced">
        <button class="btn-primary" @click="saveInfo">
          <i class="bi bi-save"></i> Simpan Info
        </button>
      </div>

    </div>

    <!-- ================= PREVIEW ================= -->
    <div class="preview-card">
      <h6 class="preview-title">
        <i class="bi bi-eye"></i> Preview Kontak Publik
      </h6>

      <div class="preview-item">
        <i class="bi bi-geo-alt"></i> {{ form.alamat }}
      </div>

      <div class="preview-item">
        <i class="bi bi-envelope"></i> {{ form.email }}
      </div>

      <div class="preview-item">
        <i class="bi bi-telephone"></i> {{ form.telepon }}
      </div>

      <div class="preview-item">
        <i class="bi bi-instagram"></i> {{ form.instagram }}
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { adminData } from '@/store/adminData'

const form = adminData.kontakInfo
const info = adminData.kontakInfo.infoSection

// FORMAT
const formatRupiah = (val) => {
  if (!val) return ''
  return new Intl.NumberFormat('id-ID').format(val)
}

const parseNumber = (val) => {
  return val.replace(/\D/g, '')
}

// INSTAGRAM
const instagramHandle = computed({
  get: () => (form.instagram || '').replace('@', ''),
  set: val => form.instagram = val ? '@' + val : ''
})

// PARKIR
const parkirMotor = computed({
  get: () => formatRupiah(info.parkir.motor),
  set: val => info.parkir.motor = parseNumber(val)
})

const parkirMobil = computed({
  get: () => formatRupiah(info.parkir.mobil),
  set: val => info.parkir.mobil = parseNumber(val)
})

const parkirBus = computed({
  get: () => formatRupiah(info.parkir.bus),
  set: val => info.parkir.bus = parseNumber(val)
})

// WISATA
const wisataTarian = computed({
  get: () => formatRupiah(info.wisata.tarian),
  set: val => info.wisata.tarian = parseNumber(val)
})

const wisataLamin = computed({
  get: () => formatRupiah(info.wisata.lamin),
  set: val => info.wisata.lamin = parseNumber(val)
})

const wisataSusur = computed({
  get: () => formatRupiah(info.wisata.susur),
  set: val => info.wisata.susur = parseNumber(val)
})

// ACTION
const saveKontak = () => alert('Kontak disimpan')
const saveInfo = () => alert('Info disimpan')
</script>

<style scoped>

/* HEADER */
.page-header { margin-bottom: 24px; }
.page-title { font-size: 24px; font-weight: 700; }
.page-sub { font-size: 14px; color: #888; }

/* CARD */
.form-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}

/* TITLE */
.section-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}

/* GROUP */
.group { margin-bottom: 22px; }
.group-title { font-weight: 600; margin-bottom: 10px; }

/* LABEL */
.label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
}

/* INPUT */
.input-wrap {
  border: 1.5px solid #e5e5e5;
  border-radius: 4px;
  padding: 10px 14px;
  background: #fafafa;
  display: flex;
  align-items: center;
}

.input-wrap input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
}

.input-wrap.prefix span {
  margin-right: 6px;
  color: #888;
}

/* TEXTAREA */
.form-textarea {
  width: 100%;
  border-radius: 12px;
  border: 1.5px solid #e5e5e5;
  padding: 12px;
  background: #fafafa;
}

/* GRID */
.row-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
}

/* BUTTON */
.btn-primary {
  background: linear-gradient(135deg, #c0392b, #a52a2a);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(165,42,42,0.25);
}

/* FOOTER SPACING */
.form-footer.spaced {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* PREVIEW */
.preview-card {
  background: white;
  border-radius: 16px;
  padding: 22px;
  border: 1px solid #eee;
}

.preview-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

.preview-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #444;
}

.preview-item i {
  color: #c0392b;
}

</style>