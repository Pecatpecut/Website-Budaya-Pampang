## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

# 🌐 Website Desa Budaya Pampang

## 📌 Overview

Project ini adalah website **Desa Budaya Pampang** yang terdiri dari:

* 🌐 **Public Website** (untuk pengunjung)
* 🔐 **Admin Dashboard** (untuk mengelola konten)

Frontend dibuat menggunakan:

* Vue 3
* Bootstrap

Backend dirancang menggunakan:

* Native PHP (REST API)
* MySQL Database

---

## 🧭 Struktur Halaman

### 🌐 Public

* `/` → Home
* `/tentang` → Tentang Kami
* `/publikasi` → Berita / Postingan
* `/kontak` → Kontak

### 🔐 Admin

* `/login`
* `/admin`

  * `/admin` → Dashboard
  * `/admin/agenda`
  * `/admin/galeri`
  * `/admin/postingan`
  * `/admin/kontak`

---

## 🔐 Sistem Autentikasi

Saat ini frontend menggunakan:

* localStorage (sementara)

Backend diharapkan:

* Validasi login dengan database
* Menggunakan session atau token (JWT opsional)
* Mengembalikan token ke frontend

---

## 🗂 Struktur Data

### 📅 Agenda

```json
{
  "id": 1,
  "title": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:mm",
  "location": "string"
}
```

### 🖼 Galeri

```json
{
  "id": 1,
  "title": "string",
  "image": "url/path"
}
```

### 📰 Postingan

```json
{
  "id": 1,
  "title": "string",
  "link": "url",
  "source": "string",
  "thumbnail": "url",
  "date": "YYYY-MM-DD"
}
```

### 📞 Kontak

```json
{
  "alamat": "string",
  "email": "string",
  "telepon": "string",
  "instagram": "string"
}
```

---

## 🔌 API Endpoint

### 🔐 Auth

| Method | Endpoint               |
| ------ | ---------------------- |
| POST   | `/api/auth/login.php`  |
| POST   | `/api/auth/logout.php` |

---

### 📅 Agenda

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | `/api/agenda/index.php`          |
| POST   | `/api/agenda/store.php`          |
| PUT    | `/api/agenda/update.php?id={id}` |
| DELETE | `/api/agenda/delete.php?id={id}` |

---

### 🖼 Galeri

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | `/api/galeri/index.php`          |
| POST   | `/api/galeri/store.php`          |
| DELETE | `/api/galeri/delete.php?id={id}` |

---

### 📰 Postingan

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| GET    | `/api/postingan/index.php`          |
| POST   | `/api/postingan/store.php`          |
| DELETE | `/api/postingan/delete.php?id={id}` |

---

### 📞 Kontak

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/api/kontak/index.php`  |
| PUT    | `/api/kontak/update.php` |

---

## 📦 Format Response API

### ✅ Success

```json
{
  "success": true,
  "data": {}
}
```

### ❌ Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🗄️ Struktur Database (MySQL)

### Database

```sql
CREATE DATABASE pampang_db;
USE pampang_db;
```

---

### 👤 users

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 📅 agenda

```sql
CREATE TABLE agenda (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  date DATE,
  time TIME,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🖼 galeri

```sql
CREATE TABLE galeri (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 📰 postingan

```sql
CREATE TABLE postingan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  link TEXT,
  source VARCHAR(100),
  thumbnail VARCHAR(255),
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 📞 kontak

```sql
CREATE TABLE kontak (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alamat TEXT,
  email VARCHAR(100),
  telepon VARCHAR(20),
  instagram VARCHAR(100)
);
```

---

## ⚙️ Struktur Backend (PHP Native)

```
backend/
├── config/
│   └── db.php
│
├── api/
│   ├── auth/
│   ├── agenda/
│   ├── galeri/
│   ├── postingan/
│   └── kontak/
│
├── uploads/
```

---

## ⚙️ Koneksi Database (PHP)

```php
<?php
$conn = new mysqli("localhost", "root", "", "pampang_db");

if ($conn->connect_error) {
  die(json_encode(["success" => false]));
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
?>
```

---

## 🔐 Contoh Login API

```php
<?php
$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = $data['password'];

$query = $conn->prepare("SELECT * FROM users WHERE username=?");
$query->bind_param("s", $username);
$query->execute();

$user = $query->get_result()->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
  echo json_encode([
    "success" => true,
    "token" => base64_encode($user['id'])
  ]);
} else {
  echo json_encode([
    "success" => false,
    "message" => "Login gagal"
  ]);
}
```

---

## 📅 Contoh API Agenda (GET)

```php
<?php
$result = $conn->query("SELECT * FROM agenda");

$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode([
  "success" => true,
  "data" => $data
]);
```

---

## 🖼 Upload File (Galeri)

```php
<?php
$file = $_FILES['image'];
$filename = time() . "_" . $file['name'];

move_uploaded_file($file['tmp_name'], "../../uploads/" . $filename);

echo json_encode([
  "success" => true,
  "image" => $filename
]);
```

---

## 🔗 Integrasi Frontend (Contoh)

```js
import axios from 'axios'

const API = 'http://localhost/backend/api'

export const getAgenda = async () => {
  const res = await axios.get(`${API}/agenda/index.php`)
  return res.data
}
```

---

## ⚠️ Catatan Penting

* Backend hanya menyediakan REST API (JSON)
* Frontend tidak membutuhkan SSR
* Gunakan prepared statement untuk keamanan
* Aktifkan CORS
* Validasi input & file upload

---

## 🚀 Tujuan Akhir

* Website dapat digunakan secara real
* Data tersimpan di database
* Admin dapat mengelola konten
* Frontend dan backend terintegrasi dengan baik
