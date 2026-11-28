# Koleksi Praktikum Pemrograman Web

Repositori tugas dan praktikum mandiri untuk mata kuliah **Pemrograman Web / Teknologi Pengembangan Web**.

---

## 👨‍🎓 Identitas Mahasiswa

- **Nama**: Muhamad Dwi Cahyo
- **NIM**: 202569040042
- **Kelas**: TI 3C
- **Program Studi**: S1 Teknik Informatika
- **Tahun Angkatan**: 2024 / 2025

---

## 📂 Struktur Direktori Proyek

```text
pratikum-kuliah/
├── 1/
│   ├── pratikum1.js            # Praktikum 1: Logika JS & estimasi kelulusan
│   └── simple-pratikum1.js     # Praktikum 1: Versi sederhana biodata console
├── 2/
│   ├── pratikum2.html          # Praktikum 2: Profil & portofolio semantik HTML5
│   └── kontak.html             # Praktikum 2: Form kontak & saran (6 tipe input)
├── 3/
│   ├── pratikum3.html          # Praktikum 3: Layout modern CSS Flexbox & CSS Grid
│   ├── kontak.html             # Praktikum 3: Form responsif grid 2-ke-1 kolom
│   └── style.css               # Praktikum 3: External CSS (RWD 375px, 768px, 1200px)
├── 4/
│   └── tugas-es6.mjs           # Praktikum 4: Pemrosesan data transaksi (ES6+ Module)
├── 5/
│   ├── pratikum5.html          # Praktikum 5: Integrasi Web API (Open-Meteo & GitHub)
│   ├── style.css               # Praktikum 5: Styling modern, spinner, & state badges
│   ├── app.js                  # Praktikum 5: Vanilla JS Fetch API & 3 state handling
│   └── index.html              # Praktikum 5: Redirect entrypoint helper
├── 6/
│   ├── praktikum-vue/          # Praktikum 6: Proyek Vite Vue 3 resmi tugas mandiri
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── BukuCatatan.vue # Komponen input form, list v-for, & computed
│   │   │   ├── App.vue         # Root component & identitas mahasiswa
│   │   │   ├── main.js         # Entrypoint mount Vue
│   │   │   └── style.css       # External modern styling responsif
│   │   ├── package.json        # Dependensi & skrip Vite/Vue
│   │   └── vite.config.js      # Konfigurasi Vite bundler
│   ├── pratikum6.html          # Antarmuka web standalone Vue 3 (zero-build)
│   └── index.html              # Redirect entrypoint helper ke pratikum6.html
├── tugas-es6.mjs               # Praktikum 4: Entrypoint root runner alias
├── index.html                  # Portal navigasi terpusat antarmuka web
├── package.json                # Skrip runner & metadata proyek
├── .gitignore
└── README.md
```

---

## 🚀 Ringkasan Modul Praktikum

### 📌 Praktikum 1 — Dasar Pemrograman JavaScript
- **Topik**: Pengenalan sintaks JavaScript, objek (`object`), fungsi (`function`), array mapping, dan manipulasi string.
- **Cara Menjalankan**:
  ```bash
  node 1/pratikum1.js
  # atau
  npm run p1
  ```

---

### 📌 Praktikum 2 — Struktur Semantik HTML5 & Form Input
- **Topik**: Implementasi dokumen web semantik (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) dan form kontak interaktif dengan 6 jenis tipe input (`text`, `email`, `tel`, `select`, `radio`, `textarea`, `checkbox`) beserta validasi regex nomor telepon Indonesia.
- **Berkas**: `2/pratikum2.html` dan `2/kontak.html`.

---

### 📌 Praktikum 3 — Styling Modern CSS (Flexbox & CSS Grid Auto-Fit)
- **Topik**:
  1. **Flexbox (1D Layout)**: Header terpusat dengan badge identitas, navbar fleksibel dan sticky, kartu portofolio berorientasi vertikal, dan footer adaptif.
  2. **CSS Grid (2D Layout) Auto-Fit**: Galeri 4 kartu portofolio menggunakan `repeat(auto-fit, minmax(250px, 1fr))` tanpa hardcoding jumlah kolom.
  3. **Responsive Web Design (RWD)**: Diuji pada resolusi Chrome DevTools:
     - **Mobile**: 375px (1 kolom penuh)
     - **Tablet**: 768px (2 kolom adaptif)
     - **Desktop**: 1200px (4 kolom sejajar dengan max-width 1140px)
  4. **Formulir Responsif**: Grid 2 kolom yang otomatis beralih menjadi 1 kolom di layar mobile (≤ 600px).
- **Berkas**: `3/pratikum3.html`, `3/kontak.html`, dan `3/style.css`.

---

### 📌 Praktikum 4 — Pemrograman JavaScript Modern (ES6+)
- **Topik**: Pengolahan data array of objects transaksi belanja konsumen memanfaatkan fitur modern ES6+:
  1. **Arrow Functions (`=>`)**: Diterapkan secara konsisten pada seluruh fungsi pemrosesan data, kalkulasi, dan formatting.
  2. **Destructuring**: Object destructuring pada parameter fungsi (`{ id, barang, harga, qty, kategori }`, `{ harga, qty, ...rest }`, dan parameter akumulator `(acc, { subtotal })`).
  3. **Array `filter()`**: Menyaring transaksi berdasarkan kategori tertentu (misal: "Elektronik").
  4. **Array `map()`**: Menghitung subtotal tiap barang (`subtotal = harga * qty`) dan menghasilkan objek transaksi yang diperkaya.
  5. **Array `reduce()`**: Mengakumulasikan nilai subtotal untuk memperoleh grand total keseluruhan belanja dan menghitung metrik statistik (total kuantitas, item termahal).
  6. **Method Chaining Deklaratif**: Menggabungkan `filter().map().reduce()` dalam pipeline terpadu untuk rekapitulasi total biaya per kategori.
  7. **Format Mata Uang Rupiah**: Menggunakan API standar `Intl.NumberFormat('id-ID', ...)`.
- **Berkas**: `4/tugas-es6.mjs` dan `tugas-es6.mjs`.
- **Cara Menjalankan**:
  ```bash
  # Menjalankan modul praktikum 4
  node 4/tugas-es6.mjs

  # Atau via root runner
  node tugas-es6.mjs

  # Atau menggunakan skrip npm
  npm run p4
  ```


### 📌 Praktikum 5 — Integrasi Web API Publik (Fetch API)
- **Topik**: Pembuatan aplikasi web menggunakan JavaScript murni (Vanilla JS) yang berinteraksi dengan REST API publik secara asinkron (`async/await` & `fetch()`) dengan penanganan kondisi state menyeluruh:
  1. **Integrasi Open-Meteo Weather API**:
     - Geocoding API (`https://geocoding-api.open-meteo.com/v1/search`) untuk pencarian koordinat nama kota.
     - Forecast API (`https://api.open-meteo.com/v1/forecast`) untuk prakiraan suhu aktual, suhu terasa, kelembapan udara, kecepatan angin, curah hujan, kondisi WMO, dan status siang/malam tanpa autentikasi/API key.
  2. **Integrasi GitHub REST API (Slide Pertemuan 06)**:
     - Endpoint profil publik (`https://api.github.com/users/{username}`).
     - Menampilkan avatar pengguna, nama lengkap, bio, jumlah repositori publik, serta tautan menuju profil asli GitHub.
  3. **Penanganan 3 Kondisi Wajib (State Handling)**:
     - **Loading State**: Animasi CSS spinner + teks loading selama pemanggilan jaringan berlangsung.
     - **Success State**: Menampilkan kartu data responsif saat status response `200 OK`.
     - **Error / 404 Not Found State**: Menampilkan pesan kesalahan ramah pengguna jika kota tidak terdaftar atau username tidak ditemukan (`"User tidak ditemukan"`).
  4. **Bebas Ketergantungan**: Murni Vanilla JavaScript, zero-dependency.
- **Berkas**: `5/pratikum5.html`, `5/style.css`, `5/app.js`, dan `5/index.html`.
- **Cara Menjalankan**:
  ```bash
  npx serve .
  # lalu buka http://localhost:3000/5/pratikum5.html
  ```


### 📌 Praktikum 6 — Aplikasi Web Reaktif dengan Vue.js 3 & Vite
- **Topik**: Pengembangan aplikasi web modern berbasis komponen reaktif menggunakan Vue 3 (`<script setup>` Composition API) dan bundler Vite:
  1. **Inisialisasi Proyek Vite**:
     - Dibuat menggunakan template resmi: `npm create vite@latest praktikum-vue -- --template vue`.
     - Local development server cepat dengan Hot Module Replacement (HMR).
  2. **Komponen `BukuCatatan.vue`**:
     - **Input Judul Buku**: Elemen `<input type="text">` terhubung dengan reaktivitas `v-model.trim`.
     - **Kategori Buku**: Dropdown `<select>` dengan pilihan kategori literasi & keilmuan TI (`v-model`).
     - **Status Baca**: Elemen `<input type="checkbox">` untuk menandai buku telah selesai atau belum dibaca.
     - **Two-Way Data Binding**: Interaksi form langsung memperbarui state reaktif tanpa manipulasi DOM manual.
  3. **List Rendering (`v-for`)**:
     - Menampilkan seluruh katalog buku dari array reaktif `daftarBuku` dengan atribut unik `:key="buku.id"`.
     - Aksi interaktif: toggle status baca (selesai / belum selesai) dan tombol hapus buku.
  4. **Computed Properties (`computed()`)**:
     - Menghitung jumlah buku yang berstatus selesai dibaca secara otomatis (`daftarBuku.filter(b => b.selesai).length`).
     - Menghitung total buku keseluruhan, buku belum selesai, dan persentase progres membaca buku.
     - Filter dinamis berdasarkan status baca dan kategori buku.
  5. **Dua Mode Eksekusi Fleksibel**:
     - **Mode Vite Dev Server (Official)**: Dijalankan langsung melalui Vite server.
     - **Mode Standalone Web (`6/pratikum6.html`)**: Memanfaatkan Vue 3 CDN native yang dapat langsung diakses melalui portal web tanpa build step.
- **Berkas**: `6/praktikum-vue/src/components/BukuCatatan.vue`, `6/praktikum-vue/src/App.vue`, `6/pratikum6.html`, `6/index.html`.
- **Cara Menjalankan**:
  ```bash
  # 1. Menjalankan Vite Development Server (Praktikum 6)
  npm run p6
  # Atau masuk ke folder proyek
  cd 6/praktikum-vue
  npm run dev

  # 2. Atau akses via Web Portal statis
  npm start
  # lalu buka http://localhost:3000/6/pratikum6.html
  ```

---

## 💻 Cara Menjalankan Portal Web

1. **Buka Langsung di Browser**:
   - Cukup buka file `index.html` dengan klik dua kali atau pilih *Open with Chrome / Edge / Firefox*.
2. **Atau Menggunakan Local Web Server**:
   ```bash
   npx serve .
   # atau
   npm start
   ```
   Lalu buka tautan yang muncul (misalnya `http://localhost:3000`).
