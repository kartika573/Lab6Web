// ===== Pemilihan elemen =====
const form = document.getElementById("formWorkshop");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const pilihSesi = document.getElementById("sesi");
const jumlahNama = document.getElementById("jumlahNama");
const ringkasanLangsung = document.getElementById("ringkasanLangsung");
const tombolReset = document.getElementById("tombolReset");
const pesanSukses = document.getElementById("pesanSukses");
const hasilPendaftaran = document.getElementById("hasilPendaftaran");

const galat = {
  nama: document.getElementById("galatNama"),
  email: document.getElementById("galatEmail"),
  sesi: document.getElementById("galatSesi"),
};

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ===== Fungsi bantu =====
function tampilkanGalat(bidang, input, teks) {
  galat[bidang].textContent = teks;
  input.classList.toggle("salah", teks !== "");
}

function bersihkanGalat() {
  tampilkanGalat("nama", inputNama, "");
  tampilkanGalat("email", inputEmail, "");
  tampilkanGalat("sesi", pilihSesi, "");
}

// Fungsi interaktif 1: ringkasan langsung (event input & change)
function perbaruiRingkasan() {
  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const sesi = pilihSesi.value;

  if (nama === "" && email === "" && sesi === "") {
    ringkasanLangsung.textContent = "Belum ada data yang diisi.";
    return;
  }
  ringkasanLangsung.textContent =
    (nama || "(nama kosong)") + " | " +
    (email || "(email kosong)") + " | " +
    (sesi || "(sesi belum dipilih)");
}

// Fungsi interaktif 2: penghitung karakter nama (event input)
inputNama.addEventListener("input", function () {
  jumlahNama.textContent = inputNama.value.length;
  perbaruiRingkasan();
});
inputEmail.addEventListener("input", perbaruiRingkasan);
pilihSesi.addEventListener("change", function () {
  if (pilihSesi.value !== "") {
    tampilkanGalat("sesi", pilihSesi, "");
  }
  perbaruiRingkasan();
});

// Fungsi interaktif 3: validasi saat submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
  pesanSukses.textContent = "";
  hasilPendaftaran.classList.add("tersembunyi");
  bersihkanGalat();

  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const sesi = pilihSesi.value;
  let valid = true;

  if (nama === "") {
    tampilkanGalat("nama", inputNama, "Nama wajib diisi.");
    valid = false;
  } else if (nama.length < 3) {
    tampilkanGalat("nama", inputNama, "Nama minimal terdiri dari 3 karakter.");
    valid = false;
  }

  if (email === "") {
    tampilkanGalat("email", inputEmail, "Email wajib diisi.");
    valid = false;
  } else if (!polaEmail.test(email)) {
    tampilkanGalat("email", inputEmail, "Format email tidak valid, contoh: nama@contoh.com.");
    valid = false;
  }

  if (sesi === "") {
    tampilkanGalat("sesi", pilihSesi, "Pilih salah satu sesi workshop.");
    valid = false;
  }

  if (!valid) {
    return;
  }

  // Tampilkan hasil memakai textContent (aman dari injeksi HTML)
  document.getElementById("hasilNama").textContent = nama;
  document.getElementById("hasilEmail").textContent = email;
  document.getElementById("hasilSesi").textContent = sesi;
  hasilPendaftaran.classList.remove("tersembunyi");
  pesanSukses.textContent = "Pendaftaran berhasil! Terima kasih, " + nama + ".";
});

// Fungsi interaktif 4: tombol reset (event click)
tombolReset.addEventListener("click", function () {
  form.reset();
  jumlahNama.textContent = "0";
  bersihkanGalat();
  pesanSukses.textContent = "";
  hasilPendaftaran.classList.add("tersembunyi");
  perbaruiRingkasan();
  inputNama.focus();
});
