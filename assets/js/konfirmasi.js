document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const produk = params.get('produk') || '-';
  const jumlah = params.get('jumlah') || '-';
  const harga = params.get('harga') || '-';
  const metode = params.get('metode') || '-';
  const bank = params.get('bank') || '';
  const ewallet = params.get('ewallet') || '';

  // Isi input readonly
  document.getElementById('produk').value = produk;
  document.getElementById('jumlah').value = jumlah;
  document.getElementById('harga').value = harga;
  document.getElementById('metode').value = metode;

  // Tampilkan opsi tambahan sesuai metode
  if (metode === 'bank') {
    document.getElementById('opsi-bank').style.display = 'block';
    document.getElementById('bank').value = bank;
  }

  if (metode === 'ewallet') {
    document.getElementById('opsi-ewallet').style.display = 'block';
    document.getElementById('ewallet').value = ewallet;
  }

  // Validasi isi, jika ada yang kosong, tampilkan info error
  if (!produk || !jumlah || !harga || !metode) {
    document.getElementById('whatsapp-link').style.display = 'none';
    alert('Data tidak lengkap. Silakan kembali dan isi ulang formulir.');
    return;
  }

  // Siapkan pesan WhatsApp
  const message = `Halo, saya ingin memesan produk:\n\nProduk: ${produk}\nJumlah: ${jumlah}\nTotal Harga: ${harga}\nMetode Pembayaran: ${metode}${bank ? `\nBank: ${bank}` : ''}${ewallet ? `\nE-Wallet: ${ewallet}` : ''}`;
  const waUrl = `https://wa.me/6285121010199?text=${encodeURIComponent(message)}`;
  document.getElementById('whatsapp-link').setAttribute('href', waUrl);
});
