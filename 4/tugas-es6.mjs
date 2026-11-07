/**
 * ==============================================================================
 * PRAKTIKUM 4: PEMROGRAMAN JAVASCRIPT MODERN (ES6+)
 * File        : tugas-es6.mjs
 * Mahasiswa   : Muhamad Dwi Cahyo
 * NIM         : 202569040042
 * Kelas       : TI 3C
 * Program Studi: S1 Teknik Informatika
 * ==============================================================================
 * Modul ini mendemonstrasikan implementasi fitur-fitur modern JavaScript ES6+:
 * - Arrow Functions (`=>`)
 * - Destructuring (Object & Array)
 * - Array Higher-Order Functions: filter(), map(), dan reduce()
 * ==============================================================================
 */

/**
 * Data transaksi belanja dasar (Array of Objects)
 * Minimal 6 data dengan field: id, barang, harga, qty, kategori
 */
export const transaksiBelanja = [
  {
    id: 1,
    barang: "Laptop Asus Vivobook",
    harga: 8500000,
    qty: 1,
    kategori: "Elektronik",
  },
  {
    id: 2,
    barang: "Mouse Wireless Logitech",
    harga: 250000,
    qty: 2,
    kategori: "Elektronik",
  },
  {
    id: 3,
    barang: "Keyboard Mekanikal RGB",
    harga: 450000,
    qty: 1,
    kategori: "Elektronik",
  },
  {
    id: 4,
    barang: "Buku Catatan Grid A5",
    harga: 35000,
    qty: 3,
    kategori: "Alat Tulis",
  },
  {
    id: 5,
    barang: "Pulpen Gel 0.5mm Pack",
    harga: 45000,
    qty: 2,
    kategori: "Alat Tulis",
  },
  {
    id: 6,
    barang: "Kemeja Flannel Pria",
    harga: 180000,
    qty: 2,
    kategori: "Pakaian",
  },
];

console.log(`Berhasil memuat ${transaksiBelanja.length} data transaksi belanja dasar.`);
