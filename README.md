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
