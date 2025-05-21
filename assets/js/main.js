document.addEventListener('DOMContentLoaded', () => {
  // ====================== Produk Loader (Streaming, Apps, Game, Lainnya) ======================

  // Streaming
  const streamingDiv = document.getElementById('produkStreaming');
  if (streamingDiv) {
    fetch('data/streaming.json')
      .then(res => res.json())
      .then(data => {
        streamingDiv.innerHTML = data.map(item => `
          <div class="produk-card${item.status === 'comingsoon' ? ' produk-disabled' : ''}">
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <strong>${item.harga || ''}</strong>
            ${
              item.status === 'comingsoon'
                ? '<br><button class="btn-disabled" disabled>Segera Hadir</button>'
                : `<br><a href="${item.order}" class="btn-utama">Order</a>`
            }
          </div>
        `).join('');
      })
      .catch(err => {
        streamingDiv.innerHTML = "<div style='color:red'>Gagal memuat produk</div>";
        console.error("Gagal load streaming.json:", err);
      });
  }

  // Apps
  const appsDiv = document.getElementById('produkApps');
  if (appsDiv) {
    fetch('data/apps.json')
      .then(res => res.json())
      .then(data => {
        appsDiv.innerHTML = data.map(item => `
          <div class="produk-card${item.status === 'comingsoon' ? ' produk-disabled' : ''}">
            <h3>${item.nama}</h3>
            <p>${item.deskripsi}</p>
            <strong>${item.harga || ''}</strong>
            ${
              item.status === 'comingsoon'
                ? '<br><button class="btn-disabled" disabled>Segera Hadir</button>'
                : `<br><a href="${item.order}" class="btn-utama">Order</a>`
            }
          </div>
        `).join('');
      })
      .catch(err => {
        appsDiv.innerHTML = "<div style='color:red'>Gagal memuat produk</div>";
        console.error("Gagal load apps.json:", err);
      });
  }

  // Game
  const gameDiv = document.getElementById('produkGame');
  if (gameDiv) {
    fetch('data/game.json')
      .then(res => res.json())
      .then(data => {
        gameDiv.innerHTML = data.map(p => `
          <div class="produk-card${p.status === 'comingsoon' ? ' produk-disabled' : ''}">
            <h3>${p.nama}</h3>
            <p>${p.deskripsi}</p>
            ${
              p.status === 'comingsoon'
                ? '<button class="btn-disabled" disabled>Segera Hadir</button>'
                : `<strong>${p.harga}</strong><br><a href="${p.order}" class="btn-utama">Order</a>`
            }
          </div>
        `).join('');
      })
      .catch(err => {
        gameDiv.innerHTML = "<div style='color:red'>Gagal memuat produk game</div>";
        console.error("Gagal load data/game.json:", err);
      });
  }

  // Lainnya
  const lainnyaDiv = document.getElementById('produkLainnya');
  if (lainnyaDiv) {
    fetch('data/lainnya.json')
      .then(res => res.json())
      .then(data => {
        lainnyaDiv.innerHTML = data.map(p => `
          <div class="produk-card${p.status === 'comingsoon' ? ' produk-disabled' : ''}">
            <h3>${p.nama}</h3>
            <p>${p.deskripsi}</p>
            ${
              p.status === 'comingsoon'
                ? '<br><button class="btn-disabled" disabled>Segera Hadir</button>'
                : `<strong>${p.harga}</strong><br><a href="${p.order}" class="btn-utama">Order</a>`
            }
          </div>
        `).join('');
      })
      .catch(err => {
        lainnyaDiv.innerHTML = "<div style='color:red'>Gagal memuat produk</div>";
        console.error("Gagal load lainnya.json:", err);
      });
  }

  // ====================== Fitur Umum ======================
  // Scroll ke Produk
  const scrollBtn = document.getElementById('lihat-produk');
  const kategoriSection = document.getElementById('kategori');
  if (scrollBtn && kategoriSection) {
    scrollBtn.addEventListener('click', e => {
      e.preventDefault();
      kategoriSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

// ========== Toggle Dark Mode dengan localStorage ==========

const DARK_KEY = 'wiraku_darkmode';

// 1. Saat load halaman, cek localStorage dulu
if (localStorage.getItem(DARK_KEY) === '1') {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.remove('dark-mode');
}

// 2. Event untuk SEMUA toggle dark mode button
document.querySelectorAll('.toggle-dark').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    document.body.classList.toggle('dark-mode');
    // Simpan ke localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem(DARK_KEY, '1');
    } else {
      localStorage.removeItem(DARK_KEY);
    }
    updateDarkToggleIcon();
  });
});

// 3. Set icon dark mode saat halaman dimuat
updateDarkToggleIcon();


  // Hamburger Dropdown (Mobile Only)
  const hamburgerMobile = document.getElementById('top-hamburger-mobile');
  const dropdown = document.getElementById('top-dropdown');
  if (hamburgerMobile && dropdown) {
    hamburgerMobile.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target) && !hamburgerMobile.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        dropdown.classList.remove('show');
      });
    });
  }

  // Efek Fade-in
  document.body.classList.add("fade-in");
});

// ======================== Toggle Icon Matahari/Bulan ========================
function updateDarkToggleIcon() {
  const isDark = document.body.classList.contains('dark-mode');
  const moonIcons = [
    document.getElementById('moon-icon'),
    document.getElementById('moon-icon-desktop'),
    document.getElementById('moon-icon-mobile')
  ].filter(Boolean);
  moonIcons.forEach(el => {
    el.textContent = isDark ? '🌙' : '☀️';
  });
}


