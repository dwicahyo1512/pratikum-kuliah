/**
 * PRAKTIKUM 05 — PEMROGRAMAN WEB (VANILLA JAVASCRIPT FETCH API)
 * Topik: Integrasi Web API Publik (Open-Meteo & GitHub REST API)
 * Mahasiswa: Muhamad Dwi Cahyo (NIM: 202569040042) — Kelas: TI 3C
 * 
 * Fitur Utama & Kepatuhan Rubrik:
 * 1. JavaScript Murni (Vanilla JS) tanpa library / framework pihak ketiga.
 * 2. Pemanggilan API publik dengan async/await dan standard fetch().
 * 3. Penanganan 3 State Wajib:
 *    - Loading State: Indikator loading saat HTTP request berjalan.
 *    - Success State: Menampilkan komponen data kartu setelah response 200 OK.
 *    - Error 404 / Not Found State: Menampilkan pesan kesalahan spesifik saat data tidak ditemukan.
 */

// =============================================================================
// KONFIGURASI WMO WEATHER CODE (STANDAR METEOROLOGI DUNIA UNTUK OPEN-METEO)
// =============================================================================
const WMO_WEATHER_MAP = {
    0: { desc: "Langit Cerah", iconDay: "☀️", iconNight: "🌙" },
    1: { desc: "Sebagian Besar Cerah", iconDay: "🌤️", iconNight: "🌤️" },
    2: { desc: "Sebagian Berawan", iconDay: "⛅", iconNight: "⛅" },
    3: { desc: "Berawan Tebal", iconDay: "☁️", iconNight: "☁️" },
    45: { desc: "Berkabut", iconDay: "🌫️", iconNight: "🌫️" },
    48: { desc: "Kabut Mengkristal", iconDay: "🌫️", iconNight: "🌫️" },
    51: { desc: "Gerimis Ringan", iconDay: "🌦️", iconNight: "🌦️" },
    53: { desc: "Gerimis Sedang", iconDay: "🌦️", iconNight: "🌦️" },
    55: { desc: "Gerimis Lebat", iconDay: "🌧️", iconNight: "🌧️" },
    61: { desc: "Hujan Ringan", iconDay: "🌧️", iconNight: "🌧️" },
    63: { desc: "Hujan Sedang", iconDay: "🌧️", iconNight: "🌧️" },
    65: { desc: "Hujan Lebat", iconDay: "🌧️", iconNight: "🌧️" },
    71: { desc: "Salju Ringan", iconDay: "🌨️", iconNight: "🌨️" },
    73: { desc: "Salju Sedang", iconDay: "🌨️", iconNight: "🌨️" },
    75: { desc: "Salju Lebat", iconDay: "❄️", iconNight: "❄️" },
    80: { desc: "Hujan Guyur Ringan", iconDay: "🌦️", iconNight: "🌦️" },
    81: { desc: "Hujan Guyur Sedang", iconDay: "🌧️", iconNight: "🌧️" },
    82: { desc: "Hujan Badai Guyur", iconDay: "⛈️", iconNight: "⛈️" },
    95: { desc: "Badai Petir Ringan/Sedang", iconDay: "⛈️", iconNight: "⛈️" },
    96: { desc: "Badai Petir Disertai Butiran Es", iconDay: "⛈️", iconNight: "⛈️" },
    99: { desc: "Badai Petir Hebat & Es", iconDay: "⛈️", iconNight: "⛈️" }
};

// =============================================================================
// STATE MANAJEMEN APLIKASI
// =============================================================================
let currentMode = 'weather'; // 'weather' (Open-Meteo) atau 'github' (GitHub Profile)

// Referensi Elemen DOM
const tabWeather = document.getElementById('tabWeather');
const tabGithub = document.getElementById('tabGithub');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const formLabel = document.getElementById('formLabel');
const chipsContainer = document.getElementById('chipsContainer');
const stateContainer = document.getElementById('stateContainer');

// =============================================================================
// REKOMENDASI PENCARIAN (CHIPS)
// =============================================================================
const WEATHER_PRESETS = [
    { label: "Palembang", value: "Palembang" },
    { label: "Jakarta", value: "Jakarta" },
    { label: "Surabaya", value: "Surabaya" },
    { label: "Bandung", value: "Bandung" },
    { label: "Tokyo", value: "Tokyo" },
    { label: "Demo 404 (Tidak Ada)", value: "KotaTidakDitemukan999" }
];

const GITHUB_PRESETS = [
    { label: "octocat", value: "octocat" },
    { label: "torvalds", value: "torvalds" },
    { label: "muhamaddwica", value: "muhamaddwica" },
    { label: "Demo 404 (User Tidak Ditemukan)", value: "userTidakAda99999" }
];

// =============================================================================
// HELPER PERGANTIAN MODE & RENDER UI
// =============================================================================
function setMode(mode) {
    currentMode = mode;
    
    if (mode === 'weather') {
        tabWeather.classList.add('active');
        tabGithub.classList.remove('active');
        
        formLabel.textContent = "Cari Prakiraan Cuaca Kota (Open-Meteo API)";
        searchInput.placeholder = "Ketik nama kota, contoh: Palembang, Jakarta, Tokyo...";
        searchInput.value = "";
        
        renderChips(WEATHER_PRESETS);
        renderIdleState(
            "🌦️",
            "Prakiraan Cuaca Terbuka Real-Time",
            "Ketik nama kota di atas atau klik salah satu rekomendasi untuk melihat data cuaca langsung dari Open-Meteo API."
        );
    } else {
        tabGithub.classList.add('active');
        tabWeather.classList.remove('active');
        
        formLabel.textContent = "Cari Profil Pengguna GitHub (GitHub REST API)";
        searchInput.placeholder = "Ketik username GitHub, contoh: octocat, torvalds...";
        searchInput.value = "";
        
        renderChips(GITHUB_PRESETS);
        renderIdleState(
            "🐙",
            "Pencarian Profil GitHub Publik",
            "Ketik username GitHub di atas untuk memanggil REST API GitHub dan melihat avatar, bio, serta repositori publik."
        );
    }
}

function renderChips(presets) {
    chipsContainer.innerHTML = '<span style="font-weight:600;">Coba Cepat:</span>';
    presets.forEach(preset => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip-btn';
        btn.textContent = preset.label;
        btn.onclick = () => {
            searchInput.value = preset.value;
            handleSearch(preset.value);
        };
        chipsContainer.appendChild(btn);
    });
}

// 1. Kondisi Idle / Awal
function renderIdleState(icon, title, desc) {
    stateContainer.innerHTML = `
        <div class="state-idle">
            <div class="idle-icon">${icon}</div>
            <h3>${title}</h3>
            <p>${desc}</p>
        </div>
    `;
}

// 2. Kondisi Loading (Wajib Rubrik: Loading saat request berjalan)
function renderLoadingState(pesan) {
    stateContainer.innerHTML = `
        <div class="state-loading">
            <div class="spinner"></div>
            <p>${pesan}</p>
        </div>
    `;
}

// 3. Kondisi Error / 404 Not Found (Wajib Rubrik: Pesan kesalahan jika tidak ditemukan)
function renderErrorState(title, message) {
    stateContainer.innerHTML = `
        <div class="state-error">
            <div class="error-icon">⚠️</div>
            <div class="error-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        </div>
    `;
}

// =============================================================================
// LOGIKA FETCH API 1: OPEN-METEO WEATHER API
// Endpoint 1 (Geocoding): https://geocoding-api.open-meteo.com/v1/search
// Endpoint 2 (Forecast):  https://api.open-meteo.com/v1/forecast
// =============================================================================
async function fetchOpenMeteoWeather(cityName) {
    renderLoadingState(`Sedang mencari koordinat & cuaca untuk kota "${cityName}" dari Open-Meteo...`);
    
    try {
        // Langkah 1: Panggil Geocoding API untuk mencari latitude & longitude
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=id&format=json`;
        const geoResponse = await fetch(geocodingUrl);
        
        if (!geoResponse.ok) {
            throw new Error(`Gagal menghubungi server Geocoding (Status ${geoResponse.status})`);
        }
        
        const geoData = await geoResponse.json();
        
        // Penanganan Kondisi 404 / Not Found: Kota tidak ada di database Open-Meteo
        if (!geoData.results || geoData.results.length === 0) {
            renderErrorState(
                "Kota Tidak Ditemukan (404 Not Found)",
                `Sistem tidak dapat menemukan data geografis untuk kota "<strong>${escapeHtml(cityName)}</strong>". Periksa kembali penulisan nama kota atau coba kota besar lainnya.`
            );
            return;
        }
        
        const location = geoData.results[0];
        const { name, country, latitude, longitude, admin1, timezone } = location;
        
        // Langkah 2: Panggil Open-Meteo Forecast API berdasarkan koordinat
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            throw new Error(`Gagal memuat data cuaca (Status ${weatherResponse.status})`);
        }
        
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        const units = weatherData.current_units;
        
        // Olah WMO Weather Code
        const wmoInfo = WMO_WEATHER_MAP[current.weather_code] || {
            desc: "Kondisi Tidak Spesifik",
            iconDay: "🌤️",
            iconNight: "🌤️"
        };
        const weatherIcon = current.is_day === 1 ? wmoInfo.iconDay : wmoInfo.iconNight;
        const daytimeLabel = current.is_day === 1 ? "Siang Hari" : "Malam Hari";
        const regionDesc = [admin1, country].filter(Boolean).join(", ");
        
        // Render Hasil Sukses
        stateContainer.innerHTML = `
            <div class="result-card">
                <div class="weather-header">
                    <div class="location-info">
                        <h3>${escapeHtml(name)}</h3>
                        <div class="coords">📍 ${regionDesc} &bull; Lat: ${latitude.toFixed(2)}°, Lon: ${longitude.toFixed(2)}° &bull; Timezone: ${timezone}</div>
                    </div>
                    <div class="weather-badge-main">
                        <div class="icon">${weatherIcon}</div>
                        <div>
                            <div class="temp">${current.temperature_2m}${units.temperature_2m}</div>
                            <div class="condition">${wmoInfo.desc} (${daytimeLabel})</div>
                        </div>
                    </div>
                </div>
                
                <div class="weather-grid">
                    <div class="metric-item">
                        <span class="metric-label">🌡️ Terasa Seperti</span>
                        <span class="metric-value">${current.apparent_temperature} ${units.apparent_temperature}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">💧 Kelembapan Udara</span>
                        <span class="metric-value">${current.relative_humidity_2m} ${units.relative_humidity_2m}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">💨 Kecepatan Angin</span>
                        <span class="metric-value">${current.wind_speed_10m} ${units.wind_speed_10m}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-label">🌧️ Curah Hujan</span>
                        <span class="metric-value">${current.precipitation} ${units.precipitation}</span>
                    </div>
                </div>

                <div class="weather-footer">
                    <span>Sumber Data: <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo Weather API</a> (Lisensi Open-Source Non-Commercial)</span>
                    <span>Waktu Data: ${current.time.replace('T', ' ')}</span>
                </div>
            </div>
        `;
        
    } catch (err) {
        renderErrorState(
            "Gagal Memproses Permintaan",
            `Terjadi kendala saat memanggil Open-Meteo API: ${err.message}. Pastikan koneksi internet Anda aktif.`
        );
    }
}

// =============================================================================
// LOGIKA FETCH API 2: GITHUB USERS REST API (SESUAI SLIDE PERTEMUAN 06)
// Endpoint: https://api.github.com/users/{username}
// =============================================================================
async function fetchGithubProfile(username) {
    renderLoadingState(`Sedang mengambil data profil GitHub untuk "${username}"...`);
    
    try {
        const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
        const response = await fetch(url);
        
        // Penanganan Kondisi Wajib: Status 404 (User tidak ditemukan)
        if (response.status === 404) {
            renderErrorState(
                "User tidak ditemukan",
                `Pengguna dengan username "<strong>${escapeHtml(username)}</strong>" tidak ditemukan di GitHub (Status 404 Not Found).`
            );
            return;
        }
        
        // Penanganan Batas Rate Limit GitHub (403 Forbidden)
        if (response.status === 403) {
            renderErrorState(
                "Batas Request GitHub Tercapai (Rate Limit 403)",
                "Batas kuota request tanpa autentikasi GitHub publik (60 request/jam) sementara habis. Silakan coba beberapa saat lagi."
            );
            return;
        }
        
        if (!response.ok) {
            throw new Error(`Server GitHub merespons dengan status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ambil atribut sesuai spesifikasi tugas di slide:
        // 1. Avatar (avatar_url)
        // 2. Nama (name atau fallback ke login)
        // 3. Bio (bio)
        // 4. Jumlah repositori publik (public_repos)
        // 5. Link profil (html_url)
        const avatarUrl = data.avatar_url || "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
        const namaLengkap = data.name || data.login;
        const usernameGithub = `@${data.login}`;
        const bioText = data.bio ? escapeHtml(data.bio) : "<em>Pengguna ini belum menuliskan bio pada akunnya.</em>";
        const reposCount = data.public_repos !== undefined ? data.public_repos : 0;
        const followersCount = data.followers !== undefined ? data.followers : 0;
        const followingCount = data.following !== undefined ? data.following : 0;
        const profileUrl = data.html_url;
        
        // Render Hasil Sukses
        stateContainer.innerHTML = `
            <div class="result-card github-card">
                <img src="${avatarUrl}" alt="Avatar ${escapeHtml(namaLengkap)}" class="github-avatar" onerror="this.src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'">
                <div class="github-info">
                    <div class="github-name-row">
                        <h3>${escapeHtml(namaLengkap)}</h3>
                        <span class="github-login">${usernameGithub}</span>
                    </div>
                    
                    <p class="github-bio">${bioText}</p>
                    
                    <div class="github-stats">
                        <div class="stat-chip">
                            <strong>${reposCount}</strong> Repositori Publik
                        </div>
                        <div class="stat-chip">
                            <strong>${followersCount}</strong> Pengikut (Followers)
                        </div>
                        <div class="stat-chip">
                            <strong>${followingCount}</strong> Mengikuti (Following)
                        </div>
                    </div>
                    
                    <div>
                        <a href="${profileUrl}" target="_blank" rel="noopener" class="btn-profile-link">
                            <span>Buka Profil GitHub Lengkap &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
    } catch (err) {
        renderErrorState(
            "Gagal Mengambil Data GitHub",
            `Terjadi kendala saat request: ${err.message}. Periksa jaringan internet Anda.`
        );
    }
}

// =============================================================================
// HANDLER PENCARIAN & VALIDASI INPUT
// =============================================================================
function handleSearch(query) {
    const trimmed = (query || "").trim();
    if (!trimmed) {
        renderErrorState(
            "Input Tidak Boleh Kosong",
            currentMode === 'weather'
                ? "Silakan masukkan nama kota yang ingin dicari prakiraan cuacanya."
                : "Silakan masukkan username GitHub yang ingin dicari profilnya."
        );
        searchInput.focus();
        return;
    }
    
    if (currentMode === 'weather') {
        fetchOpenMeteoWeather(trimmed);
    } else {
        fetchGithubProfile(trimmed);
    }
}

// Sanitasi string untuk mencegah XSS
function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================
tabWeather.addEventListener('click', () => setMode('weather'));
tabGithub.addEventListener('click', () => setMode('github'));

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearch(searchInput.value);
});

// Inisialisasi awal saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
    setMode('weather');
    // Opsional: jalankan pencarian default Palembang agar langsung terlihat hasil awalnya
    searchInput.value = "Palembang";
    fetchOpenMeteoWeather("Palembang");
});
