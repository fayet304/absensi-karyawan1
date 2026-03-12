// ============================================
// DASHBOARD ABSENSI - Main JavaScript
// ============================================

// ============================================
// DATA STORE
// ============================================

// Generate dummy data for 50 employees
const departemenList = ['IT', 'HRD', 'Finance', 'Marketing', 'Operations'];
const jabatanList = {
    'IT': ['Software Engineer', 'Senior Developer', 'Tech Lead', 'DevOps Engineer', 'QA Engineer'],
    'HRD': ['HR Staff', 'HR Manager', 'Recruiter', 'Training Specialist'],
    'Finance': ['Accountant', 'Finance Manager', 'Financial Analyst', 'Tax Specialist'],
    'Marketing': ['Marketing Staff', 'Content Creator', 'Marketing Manager', 'SEO Specialist'],
    'Operations': ['Operations Staff', 'Logistics Coordinator', 'Operations Manager', 'Quality Control']
};

const namaDepan = ['Ahmad', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fitri', 'Gunawan', 'Hani', 'Indra', 'Joko', 
                   'Kartika', 'Lukman', 'Maya', 'Nugroho', 'Oktavia', 'Putra', 'Rina', 'Sandro', 'Tuti', 'Umar',
                   'Vina', 'Wahyu', 'Xena', 'Yudi', 'Zahra', 'Andi', 'Bella', 'Cahyo', 'Dian', 'Eka',
                   'Fajar', 'Gita', 'Hendra', 'Irma', 'Jihan', 'Kevin', 'Linda', 'Mira', 'Nadia', 'Oscar',
                   'Pramudia', 'Qori', 'Rizki', 'Sari', 'Teguh', 'Ulfa', 'Vina', 'Wulan', 'Yoga', 'Zaki'];

const namaBelakang = ['Pratama', 'Wijaya', 'Kusuma', 'Santoso', 'Hidayat', 'Permana', 'Saputra', 'Nugraha', 
                      'Ramadhan', 'Setiawan', 'Wibowo', 'Suryadi', 'Cahyono', 'Darmawan', 'Erawan', 'Firmansyah',
                      'Gunadi', 'Hartono', 'Irawan', 'Jayadi', 'Kurniawan', 'Lestari', 'Mulyono', 'Nugroho',
                      'Oktaviani', 'Putranto', 'Rahayu', 'Susanto', 'Tjahyono', 'Utomo', 'Verdianto', 'Wibisono'];

// Generate employees
let karyawanData = [];
let absensiData = [];

function generateKaryawanData() {
    karyawanData = [];
    for (let i = 1; i <= 50; i++) {
        const namaDepanIdx = (i - 1) % namaDepan.length;
        const namaBelakangIdx = Math.floor(Math.random() * namaBelakang.length);
        const departemen = departemenList[Math.floor(Math.random() * departemenList.length)];
        const jabatan = jabatanList[departemen][Math.floor(Math.random() * jabatanList[departemen].length)];
        
        karyawanData.push({
            id: `EMP${String(i).padStart(3, '0')}`,
            nama: `${namaDepan[namaDepanIdx]} ${namaBelakang[namaBelakangIdx]}`,
            departemen: departemen,
            jabatan: jabatan,
            email: `${namaDepan[namaDepanIdx].toLowerCase()}.${namaBelakang[namaBelakangIdx].toLowerCase()}@company.com`,
            telepon: `08${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            status: Math.random() > 0.1 ? 'Aktif' : 'Non-Aktif',
            tanggalBergabung: generateRandomDate(new Date(2020, 0, 1), new Date(2025, 11, 31))
        });
    }
}

function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateAbsensiData() {
    absensiData = [];
    const today = new Date();
    const statuses = ['hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'izin', 'sakit', 'alpa'];
    
    // Generate for last 30 days
    for (let d = 0; d < 30; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - d);
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        karyawanData.forEach(karyawan => {
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            let jamMasuk = '-';
            let jamKeluar = '-';
            
            if (status === 'hadir') {
                const masukHour = 7 + Math.floor(Math.random() * 2);
                const masukMin = Math.floor(Math.random() * 60);
                jamMasuk = `${String(masukHour).padStart(2, '0')}:${String(masukMin).padStart(2, '0')}`;
                
                const keluarHour = 16 + Math.floor(Math.random() * 2);
                const keluarMin = Math.floor(Math.random() * 60);
                jamKeluar = `${String(keluarHour).padStart(2, '0')}:${String(keluarMin).padStart(2, '0')}`;
            }
            
            absensiData.push({
                karyawanId: karyawan.id,
                karyawanNama: karyawan.nama,
                departemen: karyawan.departemen,
                tanggal: formatDateToISO(date),
                jamMasuk: jamMasuk,
                jamKeluar: jamKeluar,
                status: status,
                catatan: status === 'izin' ? 'Keperluan pribadi' : (status === 'sakit' ? 'Sakit demam' : '-')
            });
        });
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDateToISO(date) {
    return date.toISOString().split('T')[0];
}

function formatDateDisplay(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

function formatDateShort(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update charts with new theme colors
    updateChartsTheme();
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding page
            showPage(page);
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(`page-${pageName}`);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
    
    // Update header
    const titles = {
        'dashboard': { title: 'Dashboard', subtitle: 'Ringkasan kehadiran karyawan' },
        'karyawan': { title: 'Data Karyawan', subtitle: 'Kelola data karyawan perusahaan' },
        'absensi': { title: 'Absensi', subtitle: 'Input dan kelola kehadiran harian' },
        'rekap': { title: 'Rekap', subtitle: 'Rekap kehadiran mingguan dan bulanan' },
        'laporan': { title: 'Laporan', subtitle: 'Generate dan unduh laporan kehadiran' }
    };
    
    document.getElementById('pageTitle').textContent = titles[pageName]?.title || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = titles[pageName]?.subtitle || '';
    
    // Load page data
    if (pageName === 'karyawan') {
        renderKaryawanTable();
    } else if (pageName === 'absensi') {
        renderAbsensiTable();
    } else if (pageName === 'rekap') {
        renderRekapMingguan();
        renderRekapBulanan();
    }
}

// ============================================
// DASHBOARD STATS & CHARTS
// ============================================

let attendanceChart, weeklyChart;

function updateDashboardStats() {
    const today = formatDateToISO(new Date());
    const todayAbsensi = absensiData.filter(a => a.tanggal === today);
    
    // If no data for today, generate today's attendance
    if (todayAbsensi.length === 0) {
        const statuses = ['hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'izin', 'sakit', 'alpa'];
        karyawanData.forEach(karyawan => {
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            let jamMasuk = '-';
            let jamKeluar = '-';
            
            if (status === 'hadir') {
                const masukHour = 7 + Math.floor(Math.random() * 2);
                const masukMin = Math.floor(Math.random() * 60);
                jamMasuk = `${String(masukHour).padStart(2, '0')}:${String(masukMin).padStart(2, '0')}`;
                
                const keluarHour = 16 + Math.floor(Math.random() * 2);
                const keluarMin = Math.floor(Math.random() * 60);
                jamKeluar = `${String(keluarHour).padStart(2, '0')}:${String(keluarMin).padStart(2, '0')}`;
            }
            
            absensiData.unshift({
                karyawanId: karyawan.id,
                karyawanNama: karyawan.nama,
                departemen: karyawan.departemen,
                tanggal: today,
                jamMasuk: jamMasuk,
                jamKeluar: jamKeluar,
                status: status,
                catatan: '-'
            });
        });
    }
    
    const todayData = absensiData.filter(a => a.tanggal === today);
    
    document.getElementById('statTotal').textContent = karyawanData.length;
    document.getElementById('statHadir').textContent = todayData.filter(a => a.status === 'hadir').length;
    document.getElementById('statIzin').textContent = todayData.filter(a => a.status === 'izin').length;
    document.getElementById('statSakit').textContent = todayData.filter(a => a.status === 'sakit').length;
    document.getElementById('statAlpa').textContent = todayData.filter(a => a.status === 'alpa').length;
}

function initCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    // Attendance Pie Chart
    const today = formatDateToISO(new Date());
    const todayData = absensiData.filter(a => a.tanggal === today);
    
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    attendanceChart = new Chart(attendanceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Hadir', 'Izin', 'Sakit', 'Alpa'],
            datasets: [{
                data: [
                    todayData.filter(a => a.status === 'hadir').length,
                    todayData.filter(a => a.status === 'izin').length,
                    todayData.filter(a => a.status === 'sakit').length,
                    todayData.filter(a => a.status === 'alpa').length
                ],
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: textColor
                    }
                }
            },
            cutout: '70%'
        }
    });
    
    // Weekly Line Chart
    const weeklyData = getWeeklyChartData();
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    weeklyChart = new Chart(weeklyCtx, {
        type: 'line',
        data: {
            labels: weeklyData.labels,
            datasets: [{
                label: 'Hadir',
                data: weeklyData.hadir,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Tidak Hadir',
                data: weeklyData.tidakHadir,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: textColor
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function getWeeklyChartData() {
    const labels = [];
    const hadir = [];
    const tidakHadir = [];
    
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = formatDateToISO(date);
        
        labels.push(date.toLocaleDateString('id-ID', { weekday: 'short' }));
        
        const dayData = absensiData.filter(a => a.tanggal === dateStr);
        hadir.push(dayData.filter(a => a.status === 'hadir').length);
        tidakHadir.push(dayData.filter(a => a.status !== 'hadir').length);
    }
    
    return { labels, hadir, tidakHadir };
}

function updateChartsTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    if (attendanceChart) {
        attendanceChart.options.plugins.legend.labels.color = textColor;
        attendanceChart.update();
    }
    
    if (weeklyChart) {
        weeklyChart.options.plugins.legend.labels.color = textColor;
        weeklyChart.options.scales.x.ticks.color = textColor;
        weeklyChart.options.scales.y.ticks.color = textColor;
        weeklyChart.options.scales.y.grid.color = gridColor;
        weeklyChart.update();
    }
}

// ============================================
// RECENT ACTIVITY
// ============================================

function renderRecentActivity() {
    const tbody = document.getElementById('recentActivityBody');
    const recentData = absensiData.slice(0, 10);
    
    tbody.innerHTML = recentData.map(item => `
        <tr>
            <td>
                <div class="employee-cell">
                    <div class="employee-avatar">${getInitials(item.karyawanNama)}</div>
                    <div class="employee-info">
                        <h4>${item.karyawanNama}</h4>
                        <span>${item.karyawanId}</span>
                    </div>
                </div>
            </td>
            <td><span class="status-badge ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
            <td>${item.jamMasuk}</td>
            <td>${item.jamKeluar}</td>
            <td>${formatDateShort(item.tanggal)}</td>
        </tr>
    `).join('');
}

// ============================================
// KARYAWAN MANAGEMENT
// ============================================

let karyawanCurrentPage = 1;
const karyawanPerPage = 10;

function renderKaryawanTable() {
    const searchTerm = document.getElementById('searchKaryawan')?.value.toLowerCase() || '';
    
    let filteredData = karyawanData;
    
    if (searchTerm) {
        filteredData = karyawanData.filter(k => 
            k.nama.toLowerCase().includes(searchTerm) ||
            k.id.toLowerCase().includes(searchTerm) ||
            k.departemen.toLowerCase().includes(searchTerm) ||
            k.jabatan.toLowerCase().includes(searchTerm)
        );
    }
    
    const totalPages = Math.ceil(filteredData.length / karyawanPerPage);
    const startIndex = (karyawanCurrentPage - 1) * karyawanPerPage;
    const endIndex = startIndex + karyawanPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    const tbody = document.getElementById('karyawanTableBody');
    tbody.innerHTML = paginatedData.map(k => `
        <tr>
            <td>${k.id}</td>
            <td>
                <div class="employee-cell">
                    <div class="employee-avatar">${getInitials(k.nama)}</div>
                    <div class="employee-info">
                        <h4>${k.nama}</h4>
                        <span>${k.email}</span>
                    </div>
                </div>
            </td>
            <td>${k.departemen}</td>
            <td>${k.jabatan}</td>
            <td><span class="status-badge ${k.status === 'Aktif' ? 'hadir' : 'alpa'}">${k.status}</span></td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" onclick="viewKaryawan('${k.id}')" title="Lihat">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editKaryawan('${k.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteKaryawan('${k.id}')" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update pagination info
    document.getElementById('karyawanShowStart').textContent = startIndex + 1;
    document.getElementById('karyawanShowEnd').textContent = Math.min(endIndex, filteredData.length);
    document.getElementById('karyawanTotal').textContent = filteredData.length;
    
    // Render pagination
    renderPagination('karyawanPagination', totalPages, karyawanCurrentPage, (page) => {
        karyawanCurrentPage = page;
        renderKaryawanTable();
    });
}

function renderPagination(containerId, totalPages, currentPage, onPageChange) {
    const container = document.getElementById(containerId);
    let html = '';
    
    html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="(${onPageChange})(${currentPage - 1})">
        <i class="fas fa-chevron-left"></i>
    </button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="(${onPageChange})(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<button class="page-btn" disabled>...</button>`;
        }
    }
    
    html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="(${onPageChange})(${currentPage + 1})">
        <i class="fas fa-chevron-right"></i>
    </button>`;
    
    container.innerHTML = html;
}

function showAddKaryawanModal() {
    document.getElementById('modalTitle').textContent = 'Tambah Karyawan Baru';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group">
            <label class="form-label">Nama Lengkap</label>
            <input type="text" class="form-input" id="inputNama" placeholder="Masukkan nama lengkap">
        </div>
        <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="inputEmail" placeholder="email@company.com">
        </div>
        <div class="form-group">
            <label class="form-label">Departemen</label>
            <select class="form-select" id="inputDepartemen">
                <option value="">Pilih Departemen</option>
                ${departemenList.map(d => `<option value="${d}">${d}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Jabatan</label>
            <select class="form-select" id="inputJabatan">
                <option value="">Pilih Jabatan</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Nomor Telepon</label>
            <input type="tel" class="form-input" id="inputTelepon" placeholder="08xxxxxxxxxx">
        </div>
    `;
    
    // Dynamic jabatan based on departemen
    document.getElementById('inputDepartemen').addEventListener('change', function() {
        const dep = this.value;
        const jabatanSelect = document.getElementById('inputJabatan');
        jabatanSelect.innerHTML = '<option value="">Pilih Jabatan</option>';
        if (dep && jabatanList[dep]) {
            jabatanList[dep].forEach(j => {
                jabatanSelect.innerHTML += `<option value="${j}">${j}</option>`;
            });
        }
    });
    
    document.getElementById('modalSaveBtn').onclick = saveKaryawan;
    openModal();
}

function saveKaryawan() {
    const nama = document.getElementById('inputNama').value;
    const email = document.getElementById('inputEmail').value;
    const departemen = document.getElementById('inputDepartemen').value;
    const jabatan = document.getElementById('inputJabatan').value;
    const telepon = document.getElementById('inputTelepon').value;
    
    if (!nama || !email || !departemen || !jabatan) {
        showToast('Mohon lengkapi semua field!', 'error');
        return;
    }
    
    const newId = `EMP${String(karyawanData.length + 1).padStart(3, '0')}`;
    
    karyawanData.push({
        id: newId,
        nama: nama,
        departemen: departemen,
        jabatan: jabatan,
        email: email,
        telepon: telepon,
        status: 'Aktif',
        tanggalBergabung: new Date()
    });
    
    closeModal();
    renderKaryawanTable();
    showToast('Karyawan berhasil ditambahkan!', 'success');
}

function viewKaryawan(id) {
    const k = karyawanData.find(emp => emp.id === id);
    if (!k) return;
    
    document.getElementById('modalTitle').textContent = 'Detail Karyawan';
    document.getElementById('modalBody').innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <div class="employee-avatar" style="width: 80px; height: 80px; margin: 0 auto; font-size: 1.5rem;">
                ${getInitials(k.nama)}
            </div>
            <h3 style="margin-top: 1rem;">${k.nama}</h3>
            <p class="text-muted">${k.id}</p>
        </div>
        <div style="display: grid; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 8px;">
                <span class="text-muted">Email</span>
                <span>${k.email}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 8px;">
                <span class="text-muted">Telepon</span>
                <span>${k.telepon}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 8px;">
                <span class="text-muted">Departemen</span>
                <span>${k.departemen}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 8px;">
                <span class="text-muted">Jabatan</span>
                <span>${k.jabatan}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 8px;">
                <span class="text-muted">Status</span>
                <span class="status-badge ${k.status === 'Aktif' ? 'hadir' : 'alpa'}">${k.status}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-tertiary); border-radius: 8px;">
                <span class="text-muted">Tanggal Bergabung</span>
                <span>${formatDateDisplay(k.tanggalBergabung)}</span>
            </div>
        </div>
    `;
    document.getElementById('modalFooter').style.display = 'none';
    openModal();
}

function editKaryawan(id) {
    const k = karyawanData.find(emp => emp.id === id);
    if (!k) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Karyawan';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group">
            <label class="form-label">Nama Lengkap</label>
            <input type="text" class="form-input" id="inputNama" value="${k.nama}">
        </div>
        <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="inputEmail" value="${k.email}">
        </div>
        <div class="form-group">
            <label class="form-label">Departemen</label>
            <select class="form-select" id="inputDepartemen">
                ${departemenList.map(d => `<option value="${d}" ${d === k.departemen ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Jabatan</label>
            <select class="form-select" id="inputJabatan">
                ${(jabatanList[k.departemen] || []).map(j => `<option value="${j}" ${j === k.jabatan ? 'selected' : ''}>${j}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-select" id="inputStatus">
                <option value="Aktif" ${k.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                <option value="Non-Aktif" ${k.status === 'Non-Aktif' ? 'selected' : ''}>Non-Aktif</option>
            </select>
        </div>
    `;
    
    document.getElementById('modalSaveBtn').onclick = () => updateKaryawan(id);
    document.getElementById('modalFooter').style.display = 'flex';
    openModal();
}

function updateKaryawan(id) {
    const idx = karyawanData.findIndex(emp => emp.id === id);
    if (idx === -1) return;
    
    karyawanData[idx].nama = document.getElementById('inputNama').value;
    karyawanData[idx].email = document.getElementById('inputEmail').value;
    karyawanData[idx].departemen = document.getElementById('inputDepartemen').value;
    karyawanData[idx].jabatan = document.getElementById('inputJabatan').value;
    karyawanData[idx].status = document.getElementById('inputStatus').value;
    
    closeModal();
    renderKaryawanTable();
    showToast('Data karyawan berhasil diperbarui!', 'success');
}

function deleteKaryawan(id) {
    if (confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
        karyawanData = karyawanData.filter(emp => emp.id !== id);
        renderKaryawanTable();
        showToast('Karyawan berhasil dihapus!', 'success');
    }
}

// ============================================
// ABSENSI MANAGEMENT
// ============================================

let absensiCurrentPage = 1;
const absensiPerPage = 10;
let tempAbsensiData = {};

function renderAbsensiTable() {
    const filterDep = document.getElementById('filterDepartemen')?.value || '';
    const filterDate = document.getElementById('filterTanggalAbsensi')?.value || formatDateToISO(new Date());
    
    let filteredData = karyawanData.filter(k => k.status === 'Aktif');
    
    if (filterDep) {
        filteredData = filteredData.filter(k => k.departemen === filterDep);
    }
    
    const totalPages = Math.ceil(filteredData.length / absensiPerPage);
    const startIndex = (absensiCurrentPage - 1) * absensiPerPage;
    const endIndex = startIndex + absensiPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    const tbody = document.getElementById('absensiTableBody');
    tbody.innerHTML = paginatedData.map(k => {
        const existingAbsensi = absensiData.find(a => a.karyawanId === k.id && a.tanggal === filterDate);
        const tempData = tempAbsensiData[k.id] || {};
        
        return `
            <tr>
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar">${getInitials(k.nama)}</div>
                        <div class="employee-info">
                            <h4>${k.nama}</h4>
                            <span>${k.id}</span>
                        </div>
                    </div>
                </td>
                <td>${k.departemen}</td>
                <td>
                    <input type="time" class="form-input" style="width: 120px;" 
                           id="masuk-${k.id}" 
                           value="${tempData.jamMasuk || existingAbsensi?.jamMasuk || ''}"
                           onchange="updateTempAbsensi('${k.id}', 'jamMasuk', this.value)">
                </td>
                <td>
                    <input type="time" class="form-input" style="width: 120px;" 
                           id="keluar-${k.id}" 
                           value="${tempData.jamKeluar || existingAbsensi?.jamKeluar || ''}"
                           onchange="updateTempAbsensi('${k.id}', 'jamKeluar', this.value)">
                </td>
                <td>
                    <select class="form-select" style="width: 120px;" 
                            id="status-${k.id}"
                            onchange="updateTempAbsensi('${k.id}', 'status', this.value)">
                        <option value="">Pilih</option>
                        <option value="hadir" ${existingAbsensi?.status === 'hadir' ? 'selected' : ''}>Hadir</option>
                        <option value="izin" ${existingAbsensi?.status === 'izin' ? 'selected' : ''}>Izin</option>
                        <option value="sakit" ${existingAbsensi?.status === 'sakit' ? 'selected' : ''}>Sakit</option>
                        <option value="alpa" ${existingAbsensi?.status === 'alpa' ? 'selected' : ''}>Alpa</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="form-input" style="width: 150px;" 
                           placeholder="Catatan..."
                           id="catatan-${k.id}"
                           value="${existingAbsensi?.catatan || ''}"
                           onchange="updateTempAbsensi('${k.id}', 'catatan', this.value)">
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="saveAbsensi('${k.id}')">
                        <i class="fas fa-save"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Update pagination info
    document.getElementById('absensiShowStart').textContent = startIndex + 1;
    document.getElementById('absensiShowEnd').textContent = Math.min(endIndex, filteredData.length);
    document.getElementById('absensiTotal').textContent = filteredData.length;
    
    // Render pagination
    renderPagination('absensiPagination', totalPages, absensiCurrentPage, (page) => {
        absensiCurrentPage = page;
        renderAbsensiTable();
    });
}

function updateTempAbsensi(karyawanId, field, value) {
    if (!tempAbsensiData[karyawanId]) {
        tempAbsensiData[karyawanId] = {};
    }
    tempAbsensiData[karyawanId][field] = value;
}

function saveAbsensi(karyawanId) {
    const filterDate = document.getElementById('filterTanggalAbsensi')?.value || formatDateToISO(new Date());
    const karyawan = karyawanData.find(k => k.id === karyawanId);
    
    const jamMasuk = document.getElementById(`masuk-${karyawanId}`).value || '-';
    const jamKeluar = document.getElementById(`keluar-${karyawanId}`).value || '-';
    const status = document.getElementById(`status-${karyawanId}`).value;
    const catatan = document.getElementById(`catatan-${karyawanId}`).value || '-';
    
    if (!status) {
        showToast('Pilih status kehadiran!', 'error');
        return;
    }
    
    // Check if already exists
    const existingIdx = absensiData.findIndex(a => a.karyawanId === karyawanId && a.tanggal === filterDate);
    
    const absensiEntry = {
        karyawanId: karyawanId,
        karyawanNama: karyawan.nama,
        departemen: karyawan.departemen,
        tanggal: filterDate,
        jamMasuk: status === 'hadir' ? jamMasuk : '-',
        jamKeluar: status === 'hadir' ? jamKeluar : '-',
        status: status,
        catatan: catatan
    };
    
    if (existingIdx !== -1) {
        absensiData[existingIdx] = absensiEntry;
    } else {
        absensiData.push(absensiEntry);
    }
    
    delete tempAbsensiData[karyawanId];
    showToast('Absensi berhasil disimpan!', 'success');
}

function setAllStatus(status) {
    const filterDate = document.getElementById('filterTanggalAbsensi')?.value || formatDateToISO(new Date());
    
    karyawanData.filter(k => k.status === 'Aktif').forEach(k => {
        const existingIdx = absensiData.findIndex(a => a.karyawanId === k.id && a.tanggal === filterDate);
        
        const absensiEntry = {
            karyawanId: k.id,
            karyawanNama: k.nama,
            departemen: k.departemen,
            tanggal: filterDate,
            jamMasuk: status === 'hadir' ? '08:00' : '-',
            jamKeluar: status === 'hadir' ? '17:00' : '-',
            status: status,
            catatan: '-'
        };
        
        if (existingIdx !== -1) {
            absensiData[existingIdx] = absensiEntry;
        } else {
            absensiData.push(absensiEntry);
        }
    });
    
    renderAbsensiTable();
    showToast(`Semua karyawan ditandai ${status}!`, 'success');
}

function clearAllStatus() {
    const filterDate = document.getElementById('filterTanggalAbsensi')?.value || formatDateToISO(new Date());
    absensiData = absensiData.filter(a => a.tanggal !== filterDate);
    tempAbsensiData = {};
    renderAbsensiTable();
    showToast('Data absensi direset!', 'warning');
}

// ============================================
// REKAP
// ============================================

function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active tab
            this.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show tab content
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`tab-${tab}`).classList.remove('hidden');
        });
    });
}

function renderRekapMingguan() {
    const tbody = document.getElementById('rekapMingguanBody');
    
    // Get current week data
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        weekDates.push(formatDateToISO(d));
    }
    
    const rekapData = karyawanData.map(k => {
        const karyawanAbsensi = absensiData.filter(a => 
            a.karyawanId === k.id && weekDates.includes(a.tanggal)
        );
        
        const hadir = karyawanAbsensi.filter(a => a.status === 'hadir').length;
        const izin = karyawanAbsensi.filter(a => a.status === 'izin').length;
        const sakit = karyawanAbsensi.filter(a => a.status === 'sakit').length;
        const alpa = karyawanAbsensi.filter(a => a.status === 'alpa').length;
        const totalDays = hadir + izin + sakit + alpa;
        const persentase = totalDays > 0 ? Math.round((hadir / totalDays) * 100) : 0;
        
        return { karyawan: k, hadir, izin, sakit, alpa, persentase };
    });
    
    tbody.innerHTML = rekapData.slice(0, 20).map(r => `
        <tr>
            <td>
                <div class="employee-cell">
                    <div class="employee-avatar">${getInitials(r.karyawan.nama)}</div>
                    <div class="employee-info">
                        <h4>${r.karyawan.nama}</h4>
                        <span>${r.karyawan.id}</span>
                    </div>
                </div>
            </td>
            <td><span class="status-badge hadir">${r.hadir}</span></td>
            <td><span class="status-badge izin">${r.izin}</span></td>
            <td><span class="status-badge sakit">${r.sakit}</span></td>
            <td><span class="status-badge alpa">${r.alpa}</span></td>
            <td>${r.hadir * 8} jam</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div class="progress-bar" style="width: 100px;">
                        <div class="progress-fill hadir" style="width: ${r.persentase}%"></div>
                    </div>
                    <span>${r.persentase}%</span>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderRekapBulanan() {
    const tbody = document.getElementById('rekapBulananBody');
    const month = parseInt(document.getElementById('monthSelect')?.value || new Date().getMonth() + 1);
    const year = parseInt(document.getElementById('yearSelect')?.value || new Date().getFullYear());
    
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    
    const rekapData = karyawanData.map(k => {
        const karyawanAbsensi = absensiData.filter(a => 
            a.karyawanId === k.id && a.tanggal.startsWith(monthStr)
        );
        
        const hadir = karyawanAbsensi.filter(a => a.status === 'hadir').length;
        const izin = karyawanAbsensi.filter(a => a.status === 'izin').length;
        const sakit = karyawanAbsensi.filter(a => a.status === 'sakit').length;
        const alpa = karyawanAbsensi.filter(a => a.status === 'alpa').length;
        const totalDays = hadir + izin + sakit + alpa;
        const persentase = totalDays > 0 ? Math.round((hadir / totalDays) * 100) : 0;
        
        return { karyawan: k, hadir, izin, sakit, alpa, persentase };
    });
    
    tbody.innerHTML = rekapData.slice(0, 20).map(r => `
        <tr>
            <td>
                <div class="employee-cell">
                    <div class="employee-avatar">${getInitials(r.karyawan.nama)}</div>
                    <div class="employee-info">
                        <h4>${r.karyawan.nama}</h4>
                        <span>${r.karyawan.id}</span>
                    </div>
                </div>
            </td>
            <td><span class="status-badge hadir">${r.hadir}</span></td>
            <td><span class="status-badge izin">${r.izin}</span></td>
            <td><span class="status-badge sakit">${r.sakit}</span></td>
            <td><span class="status-badge alpa">${r.alpa}</span></td>
            <td>${r.hadir * 8} jam</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div class="progress-bar" style="width: 100px;">
                        <div class="progress-fill hadir" style="width: ${r.persentase}%"></div>
                    </div>
                    <span>${r.persentase}%</span>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// EXPORT & REPORT
// ============================================

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const reportDepartemen = document.getElementById('reportDepartemen').value;
    const reportFormat = document.getElementById('reportFormat').value;
    
    let data = [];
    let filename = '';
    let headers = [];
    
    const today = new Date();
    
    if (reportType === 'harian') {
        filename = `Laporan_Absensi_Harian_${formatDateToISO(today)}`;
        headers = ['ID', 'Nama', 'Departemen', 'Jam Masuk', 'Jam Keluar', 'Status', 'Catatan'];
        
        let filteredAbsensi = absensiData.filter(a => a.tanggal === formatDateToISO(today));
        if (reportDepartemen) {
            filteredAbsensi = filteredAbsensi.filter(a => a.departemen === reportDepartemen);
        }
        
        data = filteredAbsensi.map(a => [
            a.karyawanId,
            a.karyawanNama,
            a.departemen,
            a.jamMasuk,
            a.jamKeluar,
            a.status,
            a.catatan
        ]);
    } else if (reportType === 'karyawan') {
        filename = `Laporan_Data_Karyawan_${formatDateToISO(today)}`;
        headers = ['ID', 'Nama', 'Email', 'Departemen', 'Jabatan', 'Status', 'Telepon'];
        
        let filteredKaryawan = karyawanData;
        if (reportDepartemen) {
            filteredKaryawan = filteredKaryawan.filter(k => k.departemen === reportDepartemen);
        }
        
        data = filteredKaryawan.map(k => [
            k.id,
            k.nama,
            k.email,
            k.departemen,
            k.jabatan,
            k.status,
            k.telepon
        ]);
    } else {
        filename = `Laporan_Absensi_${reportType}_${formatDateToISO(today)}`;
        headers = ['ID', 'Nama', 'Departemen', 'Hadir', 'Izin', 'Sakit', 'Alpa', 'Persentase'];
        
        let filteredKaryawan = karyawanData;
        if (reportDepartemen) {
            filteredKaryawan = filteredKaryawan.filter(k => k.departemen === reportDepartemen);
        }
        
        data = filteredKaryawan.map(k => {
            const karyawanAbsensi = absensiData.filter(a => a.karyawanId === k.id);
            const hadir = karyawanAbsensi.filter(a => a.status === 'hadir').length;
            const izin = karyawanAbsensi.filter(a => a.status === 'izin').length;
            const sakit = karyawanAbsensi.filter(a => a.status === 'sakit').length;
            const alpa = karyawanAbsensi.filter(a => a.status === 'alpa').length;
            const total = hadir + izin + sakit + alpa;
            const persentase = total > 0 ? Math.round((hadir / total) * 100) + '%' : '0%';
            
            return [k.id, k.nama, k.departemen, hadir, izin, sakit, alpa, persentase];
        });
    }
    
    if (reportFormat === 'excel') {
        exportToCSV(filename, headers, data);
    } else {
        exportToPDF(filename, headers, data);
    }
    
    showToast(`Laporan berhasil di-generate!`, 'success');
}

function exportToCSV(filename, headers, data) {
    let csv = headers.join(',') + '\n';
    data.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
}

function exportToPDF(filename, headers, data) {
    // Create a printable HTML table
    const printWindow = window.open('', '_blank');
    
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${filename}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #1e293b; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
                th { background: #f1f5f9; font-weight: 600; }
                .status-hadir { background: #d1fae5; color: #059669; padding: 2px 8px; border-radius: 4px; }
                .status-izin { background: #dbeafe; color: #2563eb; padding: 2px 8px; border-radius: 4px; }
                .status-sakit { background: #fef3c7; color: #d97706; padding: 2px 8px; border-radius: 4px; }
                .status-alpa { background: #fee2e2; color: #dc2626; padding: 2px 8px; border-radius: 4px; }
                .footer { margin-top: 30px; text-align: right; color: #64748b; font-size: 12px; }
            </style>
        </head>
        <body>
            <h1>${filename.replace(/_/g, ' ')}</h1>
            <p>Tanggal Generate: ${new Date().toLocaleDateString('id-ID', { 
                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
            })}</p>
            <table>
                <thead>
                    <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>${row.map((cell, idx) => {
                            if (headers[idx]?.toLowerCase() === 'status') {
                                return `<td><span class="status-${cell}">${cell}</span></td>`;
                            }
                            return `<td>${cell}</td>`;
                        }).join('')}</tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="footer">
                <p>Dokumen ini digenerate oleh sistem AbsensiPro</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

// Export button handler
function initExportButton() {
    document.getElementById('exportBtn').addEventListener('click', function() {
        const currentPage = document.querySelector('.nav-link.active')?.getAttribute('data-page') || 'dashboard';
        
        if (currentPage === 'karyawan') {
            exportKaryawanData();
        } else if (currentPage === 'absensi') {
            exportAbsensiData();
        } else {
            generateReport();
        }
    });
}

function exportKaryawanData() {
    const headers = ['ID', 'Nama', 'Email', 'Departemen', 'Jabatan', 'Status', 'Telepon'];
    const data = karyawanData.map(k => [
        k.id, k.nama, k.email, k.departemen, k.jabatan, k.status, k.telepon
    ]);
    exportToCSV('Data_Karyawan', headers, data);
    showToast('Data karyawan berhasil di-export!', 'success');
}

function exportAbsensiData() {
    const filterDate = document.getElementById('filterTanggalAbsensi')?.value || formatDateToISO(new Date());
    const headers = ['ID', 'Nama', 'Departemen', 'Tanggal', 'Jam Masuk', 'Jam Keluar', 'Status', 'Catatan'];
    const filteredData = absensiData.filter(a => a.tanggal === filterDate);
    const data = filteredData.map(a => [
        a.karyawanId, a.karyawanNama, a.departemen, a.tanggal, a.jamMasuk, a.jamKeluar, a.status, a.catatan
    ]);
    exportToCSV(`Absensi_${filterDate}`, headers, data);
    showToast('Data absensi berhasil di-export!', 'success');
}

// ============================================
// MODAL
// ============================================

function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('modalFooter').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Close modal on overlay click
document.getElementById('modalOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Initialize theme
    initTheme();
    
    // Generate dummy data
    generateKaryawanData();
    generateAbsensiData();
    
    // Initialize navigation
    initNavigation();
    initTabs();
    
    // Initialize dashboard
    updateDashboardStats();
    initCharts();
    renderRecentActivity();
    
    // Initialize export
    initExportButton();
    
    // Set default dates
    const today = formatDateToISO(new Date());
    document.getElementById('filterTanggalAbsensi').value = today;
    document.getElementById('filterDateFrom').value = today;
    document.getElementById('filterDateTo').value = today;
    
    // Initialize month select
    const currentMonth = new Date().getMonth() + 1;
    document.getElementById('monthSelect').value = currentMonth;
    
    // Search functionality
    document.getElementById('searchKaryawan')?.addEventListener('input', function() {
        karyawanCurrentPage = 1;
        renderKaryawanTable();
    });
    
    // Filter handlers
    document.getElementById('filterDepartemen')?.addEventListener('change', function() {
        absensiCurrentPage = 1;
        renderAbsensiTable();
    });
    
    document.getElementById('filterTanggalAbsensi')?.addEventListener('change', function() {
        absensiCurrentPage = 1;
        renderAbsensiTable();
    });
    
    document.getElementById('monthSelect')?.addEventListener('change', renderRekapBulanan);
    document.getElementById('yearSelect')?.addEventListener('change', renderRekapBulanan);
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);