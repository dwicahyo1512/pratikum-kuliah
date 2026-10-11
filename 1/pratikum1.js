/**
 * profil.js — Tugas Mandiri Praktikum 1
 */

const profil = {
  nama: "Muhamad Dwi Cahyo",
  nim: "202569040042",
  minatTopikWeb: [
    "Suka Ngoding",
  ],
  tahunMasuk: 2025,
  lamaStudi: 4, // tahun
};

function estimasiLulus() {
  return profil.tahunMasuk + profil.lamaStudi;
}

function biodata() {
  const garis = "=".repeat(46);

  return [
    garis,
    "BIODATA DIRI".padEnd(22),
    garis,
    `Nama                : ${profil.nama}`,
    `NIM                 : ${profil.nim}`,
    `Minat Topik Web     :`,
    ...profil.minatTopikWeb.map((m) => `   - ${m}`),
    `Estimasi Lulus      : ${estimasiLulus()}`,
    garis,
  ].join("\n");
}

// Output di terminal saat dijalankan dengan Node.js
if (typeof window === "undefined") {
  console.log(biodata());
}

// Bisa juga dipanggil dari file lain
module.exports = { profil, biodata, estimasiLulus };
