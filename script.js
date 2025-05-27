const produk = [
  { id: 1, nama: "Jasa Pembuatan Website ( Topup , Toko Online )", hargaMin: 15000, hargaMax: 35000 },
  { id: 2, nama: "Script Bot", hargaMin: 10000, hargaMax: 45000 },
  { id: 3, nama: "Jasa Rename Script", hargaMin: 10000, hargaMax: 20000 },
  { id: 4, nama: "Jasa Pembuatan Script ( Only Pushkontak , Jaga Grup , Cpanel )", hargaMin: 10000, hargaMax: 20000 },
  { id: 5, nama: "Nokos", hargaMin: 7000, hargaMax: 35000 },
  { id: 6, nama: "Admin Panel", harga: 10000 },
  { id: 7, nama: "Reseller Panel", harga: 5000 },
  { id: 8, nama: "Reseller Script Simpel Bot V7", harga: 35000 },
  { id: 9, nama: "Reseller Script Simpel Bot V4", harga: 25000 },
  { id: 10, nama: "Jasa Penambahan Fitur Bot", harga: 13000 },
  { id: 11, nama: "Murnok", harga: 4000 },
  { id: 12, nama: "Reseller Script Bot Store", harga: 30000 }
];

const containerProduk = document.getElementById("container-produk");
const keranjangList = document.getElementById("keranjang-list");
const totalHargaElem = document.getElementById("total-harga");
const bayarButton = document.getElementById("bayar-button");

let keranjang = [];
let total = 0;

function tampilkanProduk() {
  containerProduk.innerHTML = "";
  produk.forEach(p => {
    const div = document.createElement("div");
    div.className = "produk";

    const hargaText = p.harga !== undefined
      ? `Rp${p.harga.toLocaleString()}`
      : `Rp${p.hargaMin.toLocaleString()} - Rp${p.hargaMax.toLocaleString()}`;

    div.innerHTML = `
      <h3>${p.nama}</h3>
      <p>Harga: ${hargaText}</p>
      <p class="chat-admin">Contoh Produk? Chat Admin</p>
      <button onclick="tambahKeKeranjang(${p.id})">Tambah ke Keranjang</button>
    `;
    containerProduk.appendChild(div);
  });
}

function tambahKeKeranjang(id) {
  const produkDipilih = produk.find(p => p.id === id);
  if (!produkDipilih) return;

  let hargaFinal;
  if (produkDipilih.harga !== undefined) {
    hargaFinal = produkDipilih.harga;
  } else {
    hargaFinal = Math.floor((produkDipilih.hargaMin + produkDipilih.hargaMax) / 2);
  }

  keranjang.push({ ...produkDipilih, harga: hargaFinal });
  total += hargaFinal;
  tampilkanKeranjang();
}

function tampilkanKeranjang() {
  keranjangList.innerHTML = "";
  keranjang.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} - Rp${item.harga.toLocaleString()}`;
    keranjangList.appendChild(li);
  });
  totalHargaElem.textContent = total.toLocaleString();
}

function bayar() {
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  let pesan = "Pesanan Anda:\n";
  keranjang.forEach(item => {
    pesan += `- ${item.nama}: Rp${item.harga.toLocaleString()}\n`;
  });
  pesan += `Total: Rp${total.toLocaleString()}\n\nSilakan transfer ke Dana: 083822176542 atau scan QRIS berikut.\n\nSetelah transfer, kirim bukti pembayaran via WhatsApp.`;

  const nomorWhatsApp = "6281936513894"; // ganti nomor tujuan WhatsApp tanpa tanda '+'
  const urlWA = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
  window.open(urlWA, "_blank");
}

tampilkanProduk();

bayarButton.addEventListener("click", bayar);