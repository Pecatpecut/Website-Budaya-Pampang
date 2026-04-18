## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

# 🛠️ Backend API — Website Desa Budaya Pampang

## 📌 Overview

Backend ini digunakan untuk mendukung website **Desa Budaya Pampang** yang dibangun menggunakan:

* 🎯 Frontend: Vue 3 (SPA)
* 🧩 Backend: Native PHP (REST API)
* 🗄️ Database: MySQL

Backend bertugas untuk:

* Menyediakan data ke frontend (JSON)
* Mengelola data admin (CRUD)
* Menyimpan data ke database

---

## ⚙️ Teknologi

* PHP Native (tanpa framework)
* MySQL
* REST API (JSON)
* CORS enabled

---

## 🧱 Struktur Database

### 📍 1. Tabel `kontak`

```sql
CREATE TABLE kontak (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alamat TEXT,
  email VARCHAR(100),
  telepon VARCHAR(20),
  instagram VARCHAR(50),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 📍 2. Tabel `info_beranda`

```sql
CREATE TABLE info_beranda (
  id INT AUTO_INCREMENT PRIMARY KEY,

  jam_weekdays VARCHAR(50),
  jam_sunday VARCHAR(50),

  parkir_motor INT,
  parkir_mobil INT,
  parkir_bus INT,

  wisata_tarian INT,
  wisata_lamin INT,
  wisata_susur INT,

  tambahan_foto VARCHAR(50),
  tambahan_sewa VARCHAR(50),

  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 📍 3. Tabel `agenda`

```sql
CREATE TABLE agenda (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255),
  deskripsi TEXT,
  tanggal DATE,
  gambar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 📍 4. Tabel `galeri`

```sql
CREATE TABLE galeri (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255),
  gambar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 📍 5. Tabel `postingan`

```sql
CREATE TABLE postingan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255),
  isi TEXT,
  gambar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 📍 6. Tabel `admin`

```sql
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(255)
);
```

---

## 🔗 API Endpoint

### 🔐 Auth

```
POST /api/login.php
```

---

### 📞 Kontak

```
GET  /api/kontak.php
POST /api/kontak.php
```

---

### 🏠 Info Beranda

```
GET  /api/info.php
POST /api/info.php
```

---

### 📅 Agenda

```
GET    /api/agenda.php
POST   /api/agenda.php
PUT    /api/agenda.php?id=1
DELETE /api/agenda.php?id=1
```

---

### 🖼️ Galeri

```
GET    /api/galeri.php
POST   /api/galeri.php
DELETE /api/galeri.php?id=1
```

---

### 📰 Postingan

```
GET    /api/postingan.php
POST   /api/postingan.php
PUT    /api/postingan.php?id=1
DELETE /api/postingan.php?id=1
```

---

## 📦 Format Data

### 🔹 Info Beranda (Response)

```json
{
  "jamOperasional": {
    "weekdays": "08.00 - 17.00",
    "sunday": "14.00"
  },
  "parkir": {
    "motor": 5000,
    "mobil": 10000,
    "bus": 20000
  },
  "wisata": {
    "tarian": 45000,
    "lamin": 15000,
    "susur": 30000
  },
  "tambahan": {
    "foto": "25000 / 5 foto",
    "sewa": "50000 - 100000"
  }
}
```

---

## 🧪 Contoh Implementasi API

### 📁 `/api/kontak.php`

```php
<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "pampang");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $result = $conn->query("SELECT * FROM kontak LIMIT 1");
  echo json_encode($result->fetch_assoc());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  $stmt = $conn->prepare("
    UPDATE kontak SET 
      alamat=?, email=?, telepon=?, instagram=? 
    WHERE id=1
  ");

  $stmt->bind_param(
    "ssss",
    $data['alamat'],
    $data['email'],
    $data['telepon'],
    $data['instagram']
  );

  $stmt->execute();

  echo json_encode(["success" => true]);
}
```

---

## ⚠️ Aturan Penting (Kontrak Data)

### 💰 Harga (WAJIB)

* Disimpan sebagai **INTEGER**
* Contoh:

```json
"motor": 5000
```

### ❌ Jangan kirim:

```json
"motor": "Rp 5.000"
```

---

## 🔐 Security Basic

* Gunakan `password_hash()` untuk password
* Gunakan prepared statement (WAJIB)
* Validasi input user
* Hindari query langsung (raw query)

---

## 🔄 Integrasi dengan Frontend

Frontend akan:

* Menggunakan API ini via `fetch` / `axios`
* Mengganti state lokal (`adminData.js`) dengan data dari API

---

## 🚀 Next Development

Beberapa pengembangan yang bisa dilakukan:

* JWT Authentication
* Upload image validation
* Pagination (agenda & postingan)
* MVC structure (PHP)
* Migration ke Laravel (optional)

---

## 🎯 Tujuan Akhir

* Website fully dynamic (tidak hardcoded)
* Admin dapat mengelola konten secara real
* Frontend & backend terintegrasi dengan baik
