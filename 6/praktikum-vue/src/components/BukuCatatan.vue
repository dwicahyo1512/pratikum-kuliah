<script setup>
import { computed, ref } from 'vue'

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

// State daftar buku dengan data awal
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
  },
  {
    id: 4,
    judul: 'Dasar Pemrograman Cloudflare Workers & D1 Database',
    kategori: 'Pemrograman & Web',
    selesai: false,
    tanggal: '2026-11-27'
  }
])

// Pesan umpan balik form
const pesanValidasi = ref('')

// State filter
const filterStatus = ref('semua') // 'semua' | 'selesai' | 'belum'
const filterKategori = ref('semua')

// COMPUTED PROPERTIES (Wajib Praktikum)
// 1. Menghitung jumlah buku yang sudah selesai dibaca
const jumlahSelesai = computed(() => {
  return daftarBuku.value.filter(buku => buku.selesai).length
})

// 2. Menghitung total keseluruhan buku
const totalBuku = computed(() => {
  return daftarBuku.value.length
})

// 3. Menghitung jumlah buku yang belum selesai dibaca
const jumlahBelumSelesai = computed(() => {
  return totalBuku.value - jumlahSelesai.value
})

// 4. Menghitung persentase progres membaca
const persentaseSelesai = computed(() => {
  if (totalBuku.value === 0) return 0
  return Math.round((jumlahSelesai.value / totalBuku.value) * 100)
})

// 5. Menyaring daftar buku berdasarkan filter kategori dan status
const daftarBukuTerfilter = computed(() => {
  return daftarBuku.value.filter(buku => {
    // Saring berdasarkan status
    const matchStatus =
      filterStatus.value === 'semua' ||
      (filterStatus.value === 'selesai' && buku.selesai) ||
      (filterStatus.value === 'belum' && !buku.selesai)

    // Saring berdasarkan kategori
    const matchKategori =
      filterKategori.value === 'semua' || buku.kategori === filterKategori.value

    return matchStatus && matchKategori
  })
})

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

// Method untuk mengubah status selesai dibaca suatu buku
function toggleStatus(id) {
  const target = daftarBuku.value.find(b => b.id === id)
  if (target) {
    target.selesai = !target.selesai
  }
}

// Method untuk menghapus buku dari daftar
function hapusBuku(id) {
  daftarBuku.value = daftarBuku.value.filter(b => b.id !== id)
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

    <!-- Ringkasan Statistik Berbasis Computed Properties -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-label">Total Buku</span>
        <span class="stat-value">{{ totalBuku }}</span>
      </div>
      <div class="stat-card stat-success">
        <span class="stat-label">Selesai Dibaca</span>
        <span class="stat-value">{{ jumlahSelesai }}</span>
      </div>
      <div class="stat-card stat-warning">
        <span class="stat-label">Belum Selesai</span>
        <span class="stat-value">{{ jumlahBelumSelesai }}</span>
      </div>
      <div class="stat-card stat-progress">
        <span class="stat-label">Progres Baca</span>
        <span class="stat-value">{{ persentaseSelesai }}%</span>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: persentaseSelesai + '%' }"></div>
        </div>
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

    <!-- Toolbar Filter & Informasi List Rendering -->
    <div class="toolbar-list">
      <div class="filter-group">
        <span class="filter-label">Filter Status:</span>
        <button
          type="button"
          :class="['filter-btn', { active: filterStatus === 'semua' }]"
          @click="filterStatus = 'semua'"
        >
          Semua ({{ totalBuku }})
        </button>
        <button
          type="button"
          :class="['filter-btn', { active: filterStatus === 'selesai' }]"
          @click="filterStatus = 'selesai'"
        >
          Selesai ({{ jumlahSelesai }})
        </button>
        <button
          type="button"
          :class="['filter-btn', { active: filterStatus === 'belum' }]"
          @click="filterStatus = 'belum'"
        >
          Belum ({{ jumlahBelumSelesai }})
        </button>
      </div>

      <div class="filter-select-group">
        <select v-model="filterKategori" class="filter-category-select">
          <option value="semua">Semua Kategori</option>
          <option v-for="opsi in opsiKategori" :key="opsi" :value="opsi">
            {{ opsi }}
          </option>
        </select>
      </div>
    </div>

    <!-- Tampilan Daftar Buku Menggunakan v-for -->
    <div class="daftar-buku">
      <div v-if="daftarBukuTerfilter.length === 0" class="empty-state">
        <span class="empty-icon">📭</span>
        <p class="empty-text">Tidak ada buku yang sesuai dengan kriteria filter.</p>
      </div>

      <transition-group name="list" tag="ul" class="buku-list" v-else>
        <li
          v-for="buku in daftarBukuTerfilter"
          :key="buku.id"
          :class="['buku-item', { 'buku-selesai': buku.selesai }]"
        >
          <div class="buku-info">
            <div class="buku-header-row">
              <span class="badge-kategori">{{ buku.kategori }}</span>
              <span class="buku-tanggal">📅 {{ buku.tanggal }}</span>
            </div>
            <h3 class="buku-judul">{{ buku.judul }}</h3>
            <div class="buku-status-badge">
              <span v-if="buku.selesai" class="badge-selesai">✓ Selesai Dibaca</span>
              <span v-else class="badge-belum">⏳ Belum Selesai</span>
            </div>
          </div>

          <div class="buku-actions">
            <button
              type="button"
              class="btn-toggle"
              :title="buku.selesai ? 'Tandai belum selesai' : 'Tandai sudah selesai'"
              @click="toggleStatus(buku.id)"
            >
              {{ buku.selesai ? '↩ Batal' : '✓ Selesai' }}
            </button>
            <button
              type="button"
              class="btn-delete"
              title="Hapus buku ini"
              @click="hapusBuku(buku.id)"
            >
              🗑 Hapus
            </button>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>
