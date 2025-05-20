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

  // ===== Toggle Dark Mode (SEMUA tombol, desktop & mobile) =====
  document.querySelectorAll('.toggle-dark').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      document.body.classList.toggle('dark-mode');
    });
  });

  // ===== Hamburger Dropdown (Mobile Only) =====
  const hamburgerMobile = document.getElementById('top-hamburger-mobile');
  const dropdown = document.getElementById('top-dropdown');
  if (hamburgerMobile && dropdown) {
    hamburgerMobile.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Tutup dropdown kalau klik di luar menu
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target) && !hamburgerMobile.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // Klik menu langsung tutup dropdown
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        dropdown.classList.remove('show');
      });
    });
  }

  // Efek Fade-in
  document.body.classList.add("fade-in");
});
