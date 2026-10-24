# AbsensiKu

Aplikasi absensi kelas untuk mencatat kehadiran mahasiswa per sesi kuliah.
Dibuat dengan React Native (Expo) dan TypeScript.

Di bagian atas ada kartu-kartu sesi kuliah hari ini beserta statusnya: `proses`
kalau sesi masih berjalan, `selesai` kalau sudah ditutup. Menekan **Lihat
Detail** pada sebuah kartu akan memilih sesi itu, lalu daftar mahasiswa di
bawahnya ikut menyesuaikan. Kolom pencarian dipakai untuk menemukan nama dengan
cepat, karena satu kelas bisa berisi puluhan mahasiswa.

## Fitur

- Daftar sesi hari ini dengan badge status berwarna (hijau untuk selesai,
  oranye untuk proses)
- Pemilihan sesi lewat tombol Lihat Detail
- Pencarian nama mahasiswa secara real-time dan tidak membedakan huruf besar
  atau kecil
- Pesan khusus saat nama yang dicari tidak ada
- Tema gelap

## Menjalankan

```bash
npm install
npx expo start
```

Scan QR code yang muncul dengan aplikasi **Expo Go** di Android atau iOS.

Untuk melihat aplikasi di browser tanpa HP:

```bash
npm run web
```

Kalau memakai PowerShell di Windows dan muncul error "running scripts is
disabled", ganti `npm`/`npx` dengan `npm.cmd`/`npx.cmd`.

## Struktur Proyek

```
.
├── App.tsx                  # Layar utama
├── index.ts                 # Entry point Expo
└── src
    ├── components
    │   └── InfoCard.tsx     # Kartu sesi
    └── data
        └── mahasiswa.ts     # Data mahasiswa
```

## Cara Kerja

**Pemilihan sesi.** `App.tsx` menyimpan `sesiAktif` di dalam state, dengan nilai
awal sesi yang sedang berlangsung. Setiap kartu memanggil `bukaSesi()` lewat
prop `onPress`, dan fungsi itu yang mengganti nilai `sesiAktif`. Nama sesi yang
sedang dipilih ditampilkan di bar "Sesi aktif" di atas daftar.

**Pencarian.** Kata kunci disimpan di state `keyword` dan diikat ke
`TextInput` lewat `value` dan `onChangeText`. Hasil filter tidak disimpan di
state terpisah, tapi dihitung setiap kali render:

```tsx
const hasilFilter = DAFTAR_MAHASISWA.filter((mahasiswa) =>
  mahasiswa.nama.toLowerCase().includes(keyword.toLowerCase())
);
```

Karena dihitung ulang setiap render, daftar langsung berubah saat pengguna
mengetik, tanpa perlu `useEffect`.

**Komponen kartu.** `InfoCard` menerima tiga prop: `title`, `status`, dan
`onPress`. Warna badge ditentukan dari nilai `status`:

```tsx
const isSelesai = status === 'selesai';

<View style={[styles.badge, isSelesai ? styles.badgeSelesai : styles.badgeProses]}>
```

**Layout.** Kartu sesi diletakkan di `ListHeaderComponent` milik `FlatList`, jadi
seluruh halaman (kartu, bar sesi aktif, dan daftar mahasiswa) bergerak dalam satu
area scroll.

## Mengubah Data

Data mahasiswa ada di `src/data/mahasiswa.ts`:

```ts
export const DAFTAR_MAHASISWA: Mahasiswa[] = [
  { id: '1', nama: 'Nama Mahasiswa', prodi: 'Teknologi Informasi' },
  // ...
];
```

Daftar sesi ada di `App.tsx`, berupa tiga blok `<InfoCard>`. Kalau mengubah nama
sesi, string di `title` harus sama dengan yang dikirim ke `bukaSesi()`, kalau
tidak bar "Sesi aktif" akan menampilkan nama yang berbeda dari kartunya.

## Catatan Teknis

Warna utama: latar `#0B1220`, permukaan kartu dan input `#111C2E`, garis
`#1E293B`, teks `#F1F5F9` dan `#8595AB`, aksen biru `#2563EB` / `#60A5FA`.
Badge selesai `#4ADE80` di atas `#052E16`, badge proses `#FB923C` di atas
`#431407`.

`app.json` memakai `"userInterfaceStyle": "dark"` supaya keyboard dan dialog
sistem ikut gelap. Area aman di atas layar ditangani oleh
`react-native-safe-area-context`.
