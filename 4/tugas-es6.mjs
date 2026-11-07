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
 * Data transaksi belanja (Array of Objects)
 * Berisi 8 data transaksi belanja mencakup beragam kategori untuk pengujian menyeluruh
 * Setiap objek memiliki atribut: id, barang, harga, qty, dan kategori
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
    barang: "Monitor LED 24 Inch IPS",
    harga: 1650000,
    qty: 1,
    kategori: "Elektronik",
  },
  {
    id: 5,
    barang: "Buku Catatan Grid A5",
    harga: 35000,
    qty: 3,
    kategori: "Alat Tulis",
  },
  {
    id: 6,
    barang: "Pulpen Gel 0.5mm Pack",
    harga: 45000,
    qty: 2,
    kategori: "Alat Tulis",
  },
  {
    id: 7,
    barang: "Kemeja Flannel Pria",
    harga: 180000,
    qty: 2,
    kategori: "Pakaian",
  },
  {
    id: 8,
    barang: "Kopi Arabika Gayo 250gr",
    harga: 75000,
    qty: 3,
    kategori: "Makanan & Minuman",
  },
];

/**
 * Helper: Format angka menjadi format mata uang Rupiah (IDR)
 * Menggunakan Arrow Function ES6
 * 
 * @param {number} nominal - Angka yang akan diformat
 * @returns {string} String dalam format Rupiah, misal "Rp 8.500.000"
 */
export const formatRupiah = (nominal) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nominal);

/**
 * Menampilkan daftar transaksi awal ke format string tabel terstruktur
 * Menggunakan Arrow Function dan Object Destructuring: `({ id, barang, harga, qty, kategori })`
 * 
 * @param {Array<Object>} daftar - Array data transaksi
 * @returns {string} Teks representasi tabel
 */
export const formatTabelTransaksi = (daftar) => {
  const baris = daftar.map(({ id, barang, harga, qty, kategori }) => 
    `| ${String(id).padEnd(2)} | ${barang.padEnd(26)} | ${kategori.padEnd(18)} | ${formatRupiah(harga).padStart(14)} | ${String(qty).padStart(3)} unit |`
  );

  const pembatas = "+----+----------------------------+--------------------+----------------+-----------+";
  const header = "| ID | Nama Barang                | Kategori           | Harga Satuan   | Kuantitas |";

  return [pembatas, header, pembatas, ...baris, pembatas].join("\n");
};

/**
 * FUNGSI 1: filter()
 * Menyaring transaksi belanja berdasarkan kategori tertentu
 * Menggunakan Arrow Function dan Object Destructuring pada parameter: `({ kategori })`
 * 
 * @param {Array<Object>} daftar - Dataset transaksi
 * @param {string} targetKategori - Nama kategori yang ingin disaring
 * @returns {Array<Object>} Array hasil saringan kategori
 */
export const filterTransaksiByKategori = (daftar, targetKategori) =>
  daftar.filter(({ kategori }) => kategori.toLowerCase() === targetKategori.toLowerCase());

/**
 * Mengambil daftar kategori unik dari data transaksi menggunakan Set & Spread Operator
 * Arrow Function & Destructuring: `({ kategori })`
 */
export const ambilDaftarKategori = (daftar) => [
  ...new Set(daftar.map(({ kategori }) => kategori)),
];

/**
 * FUNGSI 2: map()
 * Menghitung subtotal tiap barang (subtotal = harga * qty)
 * Menggunakan Arrow Function dan Object Destructuring parameter: `({ harga, qty, ...rest })`
 * Mengembalikan objek transaksi baru yang diperkaya properti `subtotal`
 * 
 * @param {Array<Object>} daftar - Dataset transaksi
 * @returns {Array<Object>} Array transaksi yang memuat kalkulasi subtotal
 */
export const hitungSubtotal = (daftar) =>
  daftar.map(({ harga, qty, ...rest }) => ({
    ...rest,
    harga,
    qty,
    subtotal: harga * qty,
  }));

/**
 * Format string tabel transaksi yang menyertakan kolom Subtotal
 * Menggunakan Arrow Function & Object Destructuring: `({ id, barang, harga, qty, subtotal, kategori })`
 */
export const formatTabelSubtotal = (daftarDenganSubtotal) => {
  const baris = daftarDenganSubtotal.map(
    ({ id, barang, harga, qty, subtotal, kategori }) =>
      `| ${String(id).padEnd(2)} | ${barang.padEnd(26)} | ${kategori.padEnd(18)} | ${formatRupiah(harga).padStart(13)} | ${String(qty).padStart(3)} | ${formatRupiah(subtotal).padStart(14)} |`
  );

  const pembatas = "+----+----------------------------+--------------------+---------------+-----+----------------+";
  const header   = "| ID | Nama Barang                | Kategori           | Harga Satuan  | Qty | Subtotal       |";

  return [pembatas, header, pembatas, ...baris, pembatas].join("\n");
};

/**
 * FUNGSI 3: reduce()
 * Menghitung total keseluruhan nilai transaksi belanja
 * Menggunakan Arrow Function dan Object Destructuring pada parameter akumulator callback:
 * `(akumulator, { subtotal, harga, qty })`
 * Jika item belum memiliki field `subtotal`, otomatis dihitung dari `harga * qty`
 * 
 * @param {Array<Object>} daftar - Dataset transaksi
 * @returns {number} Nilai total belanja dalam angka
 */
export const hitungTotalKeseluruhan = (daftar) =>
  daftar.reduce(
    (akumulator, { subtotal, harga, qty }) =>
      akumulator + (subtotal !== undefined ? subtotal : harga * qty),
    0
  );

// Verifikasi kalkulasi total keseluruhan
const grandTotal = hitungTotalKeseluruhan(transaksiBelanja);
console.log(`Total keseluruhan transaksi belanja: ${formatRupiah(grandTotal)}`);
