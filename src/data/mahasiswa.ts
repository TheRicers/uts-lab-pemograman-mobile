/**
 * Dataset statis direktori mahasiswa.
 *
 * Didefinisikan di luar komponen utama (module scope) sesuai ketentuan soal,
 * sehingga tidak dibuat ulang setiap kali komponen di-render.
 */

export type Mahasiswa = {
  id: string;
  nama: string;
  prodi: string;
};

export const DAFTAR_MAHASISWA: Mahasiswa[] = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Sistem Informasi' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Teknik Informatika' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi' },
  { id: '6', nama: 'Fajar Ramadhan', prodi: 'Teknologi Informasi' },
  { id: '7', nama: 'Gita Lestari', prodi: 'Teknik Informatika' },
  { id: '8', nama: 'Hendra Wijaya', prodi: 'Sistem Informasi' },
];
