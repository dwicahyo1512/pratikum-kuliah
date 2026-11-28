<script setup>
import { ref } from 'vue'

// State form input reaktif (v-model)
const judul = ref('')
const kategori = ref('Pemrograman & Web')
const statusSelesai = ref(false)

// Pilihan daftar kategori buku
const opsiKategori = [
  'Pemrograman & Web',
  'Rekayasa Perangkat Lunak',
  'Kecerdasan Buatan & Data',
  'Desain Antarmuka (UI/UX)',
  'Jaringan & Keamanan Sistem',
  'Non-Fiksi & Literasi'
]

// State daftar buku dengan initial mock data untuk demonstrasi
const daftarBuku = ref([
  {
    id: 1,
    judul: 'Memahami Vue.js 3 & Vite Komprehensif',
    kategori: 'Pemrograman & Web',
    selesai: true,
    tanggal: '2026-11-20'
  },
  {
    id: 2,
    judul: 'Arsitektur Clean Code & Design Pattern',
    kategori: 'Rekayasa Perangkat Lunak',
    selesai: false,
    tanggal: '2026-11-22'
  },
  {
    id: 3,
    judul: 'Modern UI/UX Design System dengan Figma',
    kategori: 'Desain Antarmuka (UI/UX)',
    selesai: true,
    tanggal: '2026-11-25'
  }
])

// Pesan umpan balik form
const pesanValidasi = ref('')

// Method untuk menambahkan buku baru ke dalam daftar
function tambahBuku() {
  if (!judul.value.trim()) {
    pesanValidasi.value = 'Judul buku wajib diisi!'
    return
  }

  const bukuBaru = {
    id: Date.now(),
    judul: judul.value.trim(),
    kategori: kategori.value,
    selesai: statusSelesai.value,
    tanggal: new Date().toISOString().split('T')[0]
  }

  daftarBuku.value.unshift(bukuBaru)

  // Reset form kembali ke kondisi awal
  judul.value = ''
  kategori.value = 'Pemrograman & Web'
  statusSelesai.value = false
  pesanValidasi.value = 'Buku berhasil ditambahkan!'

  setTimeout(() => {
    pesanValidasi.value = ''
  }, 2500)
}
</script>

<template>
  <div class="buku-catatan-container">
    <!-- Header Kartu -->
    <div class="komponen-header">
      <div class="header-icon">📚</div>
      <div>
        <h2 class="komponen-title">Manajemen Buku Catatan</h2>
        <p class="komponen-desc">
          Form interaktif penambahan katalog buku bacaan pribadi dengan Vue 3 Two-Way Binding.
        </p>
      </div>
    </div>

    <!-- Form Input Buku -->
    <form @submit.prevent="tambahBuku" class="form-buku">
      <div class="form-row">
        <!-- Input Judul Buku -->
        <div class="form-group flex-2">
          <label for="judul" class="form-label">
            Judul Buku <span class="required">*</span>
          </label>
          <input
            id="judul"
            v-model="judul"
            type="text"
            class="form-control"
            placeholder="Contoh: Belajar Vue 3 & Composition API"
            autocomplete="off"
          />
        </div>

        <!-- Dropdown Kategori Buku -->
        <div class="form-group flex-1">
          <label for="kategori" class="form-label">Kategori</label>
          <select id="kategori" v-model="kategori" class="form-control form-select">
            <option v-for="opsi in opsiKategori" :key="opsi" :value="opsi">
              {{ opsi }}
            </option>
          </select>
        </div>
      </div>

      <!-- Baris Bawah: Checkbox Status Baca & Tombol Submit -->
      <div class="form-footer">
        <label class="checkbox-label">
          <input
            id="statusBaca"
            v-model="statusSelesai"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">Sudah selesai dibaca</span>
        </label>

        <button type="submit" class="btn-submit">
          <span>+ Tambah Buku</span>
        </button>
      </div>

      <!-- Pesan Feedback -->
      <p v-if="pesanValidasi" :class="['alert-feedback', judul.trim() ? 'alert-success' : 'alert-error']">
        {{ pesanValidasi }}
      </p>
    </form>
  </div>
</template>
