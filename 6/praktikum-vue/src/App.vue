<script setup>
import BukuCatatan from './components/BukuCatatan.vue'
</script>

<template>
  <div class="app-wrapper">
    <!-- Header Aplikasi -->
    <header class="app-header">
      <div class="header-inner">
        <div class="brand-wrapper">
          <svg class="vue-logo" viewBox="0 0 261.76 226.69">
            <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883" />
            <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e" />
          </svg>
          <div>
            <h1 class="brand-title">Praktikum 06 &mdash; Vue.js 3</h1>
            <p class="brand-sub">Reaktivitas, Form Binding, List Rendering, &amp; Computed Property</p>
          </div>
        </div>

        <div class="user-identity">
          <span>👤 Muhamad Dwi Cahyo</span>
          <span>&bull;</span>
          <span>NIM: 202569040042</span>
          <span>&bull;</span>
          <span>TI 3C</span>
        </div>
      </div>
    </header>

    <!-- Konten Utama -->
    <main class="app-main">
      <BukuCatatan />

      <!-- Footer Info -->
      <footer class="app-footer">
        <p>&copy; 2026 Muhamad Dwi Cahyo &mdash; NIM: 202569040042 &bull; TI 3C</p>
        <p style="margin-top: 4px; font-size: 0.8rem;">
          Tugas Praktikum Mandiri Pemrograman Web (Vue.js + Vite)
        </p>
      </footer>
    </main>
  </div>
</template>
