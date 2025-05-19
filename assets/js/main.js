document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll ke Produk =====
  const scrollBtn = document.getElementById('lihat-produk');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('kategori');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===== Toggle Dark Mode =====
  const darkToggle = document.getElementById('toggle-dark');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      console.log('Dark mode toggled');
    });
  }

 
  // ===== Floating Compass Menu (Top Right) =====
  const compass = document.getElementById('top-compass');
  const dropdown = document.getElementById('top-dropdown');

  if (compass && dropdown) {
    compass.addEventListener('click', (e) => {
      e.stopPropagation(); // supaya tidak langsung tertutup oleh klik luar
      dropdown.classList.toggle('show');
      compass.classList.toggle('active');
    });

    // Klik di luar → tutup
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !compass.contains(e.target)) {
        dropdown.classList.remove('show');
        compass.classList.remove('active');
      }
    });

    // Klik link dalam menu → tutup juga
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('show');
        compass.classList.remove('active');
      });
    });
  }

  // ===== Produk Streaming =====
  const listEl = document.getElementById('produkStreaming');
  if (listEl) {
    fetch('data/streaming.json')
      .then(res => res.json())
      .then(data => {
        listEl.innerHTML = data.map(p => `
          <div class="produk-card">
            <h3>${p.nama}</h3>
            <p>${p.deskripsi}</p>
            <strong>${p.harga}</strong><br>
            <a href="${p.order}" class="btn-utama">Order via WA</a>
          </div>
        `).join('');
      });
  }

  // ===== Produk Game =====
  const gameEl = document.getElementById('produkGame');
  if (gameEl) {
    fetch('data/game.json')
      .then(res => res.json())
      .then(data => {
        gameEl.innerHTML = data.map(p => `
          <div class="produk-card">
            <h3>${p.nama}</h3>
            <p>${p.deskripsi}</p>
            <strong>${p.harga}</strong><br>
            <a href="${p.order}" class="btn-utama">Order via WA</a>
          </div>
        `).join('');
      });
  }

  // ===== Produk Apps =====
  const appsEl = document.getElementById('produkApps');
  if (appsEl) {
    fetch('data/apps.json')
      .then(res => res.json())
      .then(data => {
        appsEl.innerHTML = data.map(p => `
          <div class="produk-card">
            <h3>${p.nama}</h3>
            <p>${p.deskripsi}</p>
            <strong>${p.harga}</strong><br>
            <a href="${p.order}" class="btn-utama">Order via WA</a>
          </div>
        `).join('');
      });
  }

  // ===== Produk Lainnya =====
  const lainnyaEl = document.getElementById('produk-lainnya');
  if (lainnyaEl) {
    fetch('/produk/lainnya.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(produk => {
          const card = document.createElement('div');
          card.className = 'produk-card';

          if (produk.status === 'comingsoon') {
            card.classList.add('disabled');
            card.innerHTML = `
              <h3>${produk.nama}</h3>
              <p>${produk.deskripsi}</p>
              <button class="btn-disabled" disabled>Segera Hadir</button>
            `;
          } else {
            card.innerHTML = `
              <h3>${produk.nama}</h3>
              <p>${produk.deskripsi}</p>
              <strong>${produk.harga}</strong><br>
              <a href="${produk.order}" class="btn-utama">Order via WA</a>
            `;
          }

          lainnyaEl.appendChild(card);
        });
      });
  }

  // ===== Mobile Floating Menu (Bottom Left) =====
  const trigger = document.getElementById('menu-trigger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (trigger && mobileMenu) {
    trigger.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});



