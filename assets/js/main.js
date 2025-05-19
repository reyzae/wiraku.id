document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll ke Produk =====
  const scrollBtn = document.getElementById('lihat-produk');
  const kategoriSection = document.getElementById('kategori');
  if (scrollBtn && kategoriSection) {
    scrollBtn.addEventListener('click', e => {
      e.preventDefault();
      kategoriSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== Toggle Dark Mode (Mobile & Desktop) =====
  const darkToggles = document.querySelectorAll('.toggle-dark');
  darkToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  });

  // ===== Floating Compass Menu (Mobile Only) =====
  const compass = document.getElementById('top-compass');
  const dropdown = document.getElementById('top-dropdown');

  if (compass && dropdown) {
    compass.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
      compass.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !compass.contains(e.target)) {
        dropdown.classList.remove('show');
        compass.classList.remove('active');
      }
    });

    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('show');
        compass.classList.remove('active');
      });
    });
  }

  // ===== Render Produk Dinamis dari JSON =====
  function renderProduk(id, url) {
    const container = document.getElementById(id);
    if (!container) return;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        container.innerHTML = data.map(p => `
          <div class="produk-card">
            <h3>${p.nama}</h3>
            <p>${p.deskripsi}</p>
            ${p.status === 'comingsoon'
              ? '<button class="btn-disabled" disabled>Segera Hadir</button>'
              : `<strong>${p.harga}</strong><br><a href="${p.order}" class="btn-utama">Order via WA</a>`
            }
          </div>
        `).join('');
      });
  }

  renderProduk('produkStreaming', 'data/streaming.json');
  renderProduk('produkGame', 'data/game.json');
  renderProduk('produkApps', 'data/apps.json');
  renderProduk('produk-lainnya', '/produk/lainnya.json');

  // ===== Mobile Floating Menu Trigger (jika ada) =====
  const trigger = document.getElementById('menu-trigger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (trigger && mobileMenu) {
    trigger.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
