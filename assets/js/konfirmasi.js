document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const produk = params.get("produk");
  const jumlah = params.get("jumlah");
  const harga = params.get("harga");
  const metode = params.get("metode");
  const bank = params.get("bank") ? params.get("bank").toUpperCase() : "";
  const ewallet = params.get("ewallet") ? params.get("ewallet").toUpperCase() : "";

  // Mapping label produk (bisa dikembangkan sesuai kebutuhan)
  const produkLabel = {
    netflix: "Netflix Premium",
    disney: "Disney+ Premium",
    spotify: "Spotify Premium"
  };

  // Tampilkan isi form
  document.getElementById("produk").value = produkLabel[produk] || (produk ? produk.toUpperCase() : "");
  document.getElementById("jumlah").value = jumlah || "";
  document.getElementById("harga").value = harga || "";
  document.getElementById("metode").value = metode ? metode.toUpperCase() : "";

  // Jika metode transfer bank
  if (metode === "bank") {
    document.getElementById("opsi-bank").style.display = "block";
    document.getElementById("bank").value = bank;
  }

  // Jika metode e-wallet
  if (metode === "ewallet") {
    document.getElementById("opsi-ewallet").style.display = "block";
    document.getElementById("ewallet").value = ewallet;
  }

  // Buat teks WhatsApp otomatis
const pesan = `Halo admin, saya ingin melakukan pemesanan:\n\n` +   // <-- 2x \n
  `Produk: ${produkLabel[produk] || (produk ? produk.toUpperCase() : "")}\n` +
  `Jumlah: ${jumlah || ""}\n` +
  `Harga: ${harga || ""}\n` +
  `Metode Pembayaran: ${metode ? metode.toUpperCase() : ""}` +
  `${bank ? `\nBank: ${bank}` : ""}` +
  `${ewallet ? `\nE-Wallet: ${ewallet}` : ""}`;

  const whatsappLink = `https://wa.me/6285121010199?text=${encodeURIComponent(pesan)}`;
  document.getElementById("whatsapp-link").href = whatsappLink;
});


  // Alert Setelah klik Order 
function showNotif() {
  const notif = document.createElement('div');
  notif.textContent = "Pesanan Anda akan diproses di WhatsApp.";
  notif.style.position = "fixed";
  notif.style.bottom = "30px";
  notif.style.left = "50%";
  notif.style.transform = "translateX(-50%)";
  notif.style.background = "#333";
  notif.style.color = "#fff";
  notif.style.padding = "16px 30px";
  notif.style.borderRadius = "8px";
  notif.style.zIndex = 9999;
  notif.style.fontSize = "1.1rem";
  notif.style.boxShadow = "0 2px 16px rgba(0,0,0,0.13)";
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 1000);
}

document.getElementById("whatsapp-link").addEventListener("click", function(e) {
  e.preventDefault(); // Blokir redirect default
  showNotif();
  const waUrl = this.href;
  setTimeout(function() {
    window.open(waUrl, "_blank");
  }, 1100);
});
