document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("invoiceForm");
  const produkSelect = document.getElementById("produk");
  const jumlahSelect = document.getElementById("jumlah");
  const hargaInput = document.getElementById("harga");
  const metodeSelect = document.getElementById("metode");
  const opsiBank = document.getElementById("opsi-bank");
  const opsiEwallet = document.getElementById("opsi-ewallet");

  // Harga produk by kombinasi produk + jumlah
  const hargaProduk = {
    netflix: {
      "1 Profile": 39000,
      "2 Profile": 59000,
      "3 Profile": 79000,
      "4 Profile": 99000
    },
    disney: {
      "1 Profile": 45000,
      "2 Profile": 65000
    }
  };

  // Saat pilih produk
  produkSelect.addEventListener("change", () => {
    const produk = produkSelect.value;

    jumlahSelect.innerHTML = "";
    hargaInput.value = "";

    if (hargaProduk[produk]) {
      jumlahSelect.disabled = false;

      const profiles = Object.keys(hargaProduk[produk]);
      profiles.forEach(profile => {
        const opt = document.createElement("option");
        opt.value = profile;
        opt.textContent = profile;
        jumlahSelect.appendChild(opt);
      });

      // Set default ke "1 Profile" (atau pertama)
      jumlahSelect.value = profiles.includes("1 Profile") ? "1 Profile" : profiles[0];
      updateHarga(); // langsung update harga
    } else {
      jumlahSelect.disabled = true;
    }
  });

  // Saat pilih jumlah
  jumlahSelect.addEventListener("change", updateHarga);

  function updateHarga() {
    const produk = produkSelect.value;
    const jumlah = jumlahSelect.value;

    if (hargaProduk[produk] && hargaProduk[produk][jumlah]) {
      const harga = hargaProduk[produk][jumlah];
      hargaInput.value = "Rp " + harga.toLocaleString("id-ID");
    } else {
      hargaInput.value = "";
    }
  }

  // Saat pilih metode bayar
  metodeSelect.addEventListener("change", function () {
    opsiBank.style.display = "none";
    opsiEwallet.style.display = "none";
    if (this.value === "bank") {
      opsiBank.style.display = "block";
    } else if (this.value === "ewallet") {
      opsiEwallet.style.display = "block";
    }
  });

  // Saat form disubmit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const produk = produkSelect.value;
    const jumlah = jumlahSelect.value;
    const harga = hargaInput.value;
    const metode = metodeSelect.value;
    const bank = document.getElementById("bank")?.value || "";
    const ewallet = document.getElementById("ewallet")?.value || "";

    if (!produk || !jumlah || !harga || !metode || (metode !== "qris" && !bank && !ewallet)) {
      alert("Mohon lengkapi semua data terlebih dahulu.");
      return;
    }

    const params = new URLSearchParams({
      produk,
      jumlah,
      harga,
      metode,
      bank,
      ewallet,
    });

    window.location.href = `konfirmasi.html?${params.toString()}`;
  });
});
