// Dimuat di <head> tanpa defer: elemen belum ada di DOM saat baris ini jalan,
// sehingga getElementById menghasilkan null.
const tombol = document.getElementById("tombolAksi");
const pesan = document.getElementById("pesan");

tombol.addEventListener("click", function () {
  pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});
