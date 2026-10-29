// ===== Latihan 1: Mengubah teks dengan DOM =====
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");

judul.textContent = "Belajar JavaScript DOM";
pesan.textContent = "Konten berhasil diubah oleh JavaScript.";

// ===== Latihan 2: Event click =====
const tombol = document.getElementById("tombolAksi");

tombol.addEventListener("click", function () {
  pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});

// ===== Latihan 3: Mengubah kelas dan gaya CSS =====
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");

tombolGaya.addEventListener("click", function () {
  teksGaya.classList.toggle("highlight");
  teksGaya.classList.toggle("teks-besar");
});

// Pembanding: classList.add() dan classList.remove()
// add() selalu menambahkan (tidak menggandakan jika sudah ada),
// remove() selalu menghapus, toggle() membalik keadaan.
const tombolTambahKelas = document.getElementById("tombolTambahKelas");
const tombolHapusKelas = document.getElementById("tombolHapusKelas");

tombolTambahKelas.addEventListener("click", function () {
  teksGaya.classList.add("highlight", "teks-besar");
});

tombolHapusKelas.addEventListener("click", function () {
  teksGaya.classList.remove("highlight", "teks-besar");
});

// ===== Latihan 4: Event input dan penghitung karakter =====
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");

namaInput.addEventListener("input", function () {
  jumlahKarakter.textContent = namaInput.value.length;
});

// ===== Latihan 5: Validasi form pendaftaran =====
// (sudah memuat Eksperimen 2: nama minimal 3 karakter)
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

function tampilkanPesanForm(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = jenis;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const usiaInput = document.getElementById("usia").value;
  const usia = Number(usiaInput);
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nama === "") {
    tampilkanPesanForm("Nama wajib diisi.", "error");
  } else if (nama.length < 3) {
    tampilkanPesanForm("Nama minimal terdiri dari 3 karakter.", "error");
  } else if (!polaEmail.test(email)) {
    tampilkanPesanForm("Masukkan email yang valid.", "error");
  } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
    tampilkanPesanForm("Usia harus berupa bilangan bulat 17–100.", "error");
  } else {
    tampilkanPesanForm("Validasi berhasil. Form siap diproses.", "sukses");
    form.reset();
  }
});

// ===== Latihan 6: Daftar tugas (To-do List) + Eksperimen 1 (tombol hapus) =====
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", function () {
  const teks = inputTugas.value.trim();

  if (teks === "") {
    pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
    return;
  }

  const item = document.createElement("li");
  const label = document.createElement("span");
  const selesai = document.createElement("button");
  const hapus = document.createElement("button");

  label.textContent = teks + " ";

  selesai.type = "button";
  selesai.textContent = "Tandai selesai";
  selesai.addEventListener("click", function () {
    item.classList.toggle("selesai");
    selesai.textContent = item.classList.contains("selesai")
      ? "Batalkan selesai" : "Tandai selesai";
  });

  // Eksperimen 1: tombol untuk menghapus satu item
  hapus.type = "button";
  hapus.textContent = "Hapus";
  hapus.className = "hapus";
  hapus.addEventListener("click", function () {
    item.remove();
    pesanTugas.textContent = "Tugas dihapus.";
  });

  item.append(label, selesai, hapus);
  daftarTugas.appendChild(item);
  inputTugas.value = "";
  pesanTugas.textContent = "Tugas ditambahkan.";
  inputTugas.focus();
});

// ===== Eksperimen 3: event change pada dropdown sesi =====
const sesiWorkshop = document.getElementById("sesiWorkshop");
const hasilSesi = document.getElementById("hasilSesi");

sesiWorkshop.addEventListener("change", function () {
  if (sesiWorkshop.value === "") {
    hasilSesi.textContent = "Belum ada sesi dipilih.";
  } else {
    hasilSesi.textContent = "Sesi yang dipilih: " + sesiWorkshop.value;
  }
});

// ===== Eksperimen 4: sembunyikan / tampilkan paragraf dengan class CSS =====
const tombolTampil = document.querySelector("#tombolTampil");
const paragrafBiodata = document.querySelector("#paragrafBiodata");

tombolTampil.addEventListener("click", function () {
  paragrafBiodata.classList.toggle("tersembunyi");
});
