# AbsensiKu — UTS Lab. Pemograman Mobile

Aplikasi absensi kelas (React Native + Expo + TypeScript) untuk Ujian Tengah
Semester Ganjil 2026/2027, Program Studi Teknologi Informasi,
Universitas Internasional Batam.

Tampilan menggunakan **dark mode** dengan palet navy gelap.

## Konsep Aplikasi

Satu alur, satu tujuan: **mengambil daftar hadir satu sesi kuliah.**

1. Dosen / ketua kelas melihat **Sesi Hari Ini** berupa kartu.
   Status `proses` = sesi sedang berlangsung, `selesai` = sesi sudah ditutup.
2. Menekan **Lihat Detail** pada sebuah kartu akan **memilih sesi** tersebut.
   Bar "Sesi aktif" di bawah kartu ikut berubah.
3. Di bawahnya muncul **Daftar Hadir** untuk sesi aktif itu. Karena satu kelas
   berisi puluhan mahasiswa, kolom pencarian dipakai untuk menemukan nama
   dengan cepat.

Kedua bagian soal saling terhubung: kartu = *sesi*, daftar = *peserta sesi itu*,
dan `onPress` pada kartu mengubah konteks daftar. Pencarian pun punya alasan
nyata, bukan sekadar latihan.

## Cara Menjalankan

```bash
npm install
npx expo start
```

Lalu scan QR code dengan aplikasi **Expo Go** (Android/iOS).

Untuk preview di laptop tanpa HP:

```bash
npm run web
```

> PowerShell di Windows memblokir `npm.ps1` / `npx.ps1`. Jika muncul error
> *"running scripts is disabled"*, gunakan `npm.cmd` dan `npx.cmd`.

## Struktur Proyek

```
.
├── App.tsx                        # Main screen (Q1 + Q2)
├── index.ts                       # Entry point Expo
└── src/
    ├── components/
    │   └── InfoCard.tsx           # Q1 — reusable component
    └── data/
        └── mahasiswa.ts           # Q2 — dataset statis
```

> Catatan: template TypeScript Expo memakai `App.tsx`, bukan `App.js`.
> Soal secara eksplisit mengizinkan `.tsx` untuk komponen, jadi `App.tsx`
> adalah padanan langsung dari `App.js` yang disebut pada rubrik.

## Pemetaan ke Rubrik

### Soal 1 — Custom Reusable Component & Dynamic Props (50 poin)

| Ketentuan | Implementasi |
|---|---|
| File `InfoCard` di `src/components/` | `src/components/InfoCard.tsx` |
| Prop `title` (string) | `title` — nama sesi, mis. "Jaringan Terapan — Sesi 7" |
| Prop `status` (`'selesai'` \| `'proses'`) | `status` — tipe `StatusTugas` |
| Prop `onPress` (function) | `onPress` — memilih sesi lewat `bukaSesi()` |
| `<View>` + `<Text>` | Struktur kartu |
| Badge hijau untuk `selesai` | `#052E16` / teks `#4ADE80` |
| Badge oranye untuk `proses` | `#431407` / teks `#FB923C` |
| Tombol `<TouchableOpacity>` "Lihat Detail" | `styles.button` + `buttonText` |
| Dirender ≥ 2x di main screen | 3 kartu di `ListHeaderComponent` |

Conditional styling memakai dua style terpisah agar eksplisit:

```tsx
const isSelesai = status === 'selesai';

<View style={[styles.badge, isSelesai ? styles.badgeSelesai : styles.badgeProses]} />
<Text style={[styles.badgeText, isSelesai ? styles.badgeTextSelesai : styles.badgeTextProses]} />
```

### Soal 2 — Real-Time Search Filter with FlatList (50 poin)

| Ketentuan | Implementasi |
|---|---|
| Dataset statis ≥ 5 item di luar komponen | `DAFTAR_MAHASISWA` di `src/data/mahasiswa.ts` (8 item) |
| `useState` untuk keyword | `const [keyword, setKeyword] = useState('')` |
| `<TextInput>` controlled | `value={keyword}` + `onChangeText={setKeyword}` |
| Filter `.filter()` + `.toLowerCase()` | Dihitung saat render, case-insensitive |
| `<FlatList>` | `data`, `keyExtractor`, `renderItem`, `ListEmptyComponent` |
| Pesan "Data tidak ditemukan!" | `ListEmptyComponent` |

Filter bersifat *derived state* — hasil dihitung ulang setiap kali `keyword`
berubah, sehingga pencarian benar-benar real-time tanpa `useEffect` tambahan:

```tsx
const hasilFilter = DAFTAR_MAHASISWA.filter((mahasiswa) =>
  mahasiswa.nama.toLowerCase().includes(keyword.toLowerCase())
);
```

## Palet Warna Dark Mode

| Peran | Warna |
|---|---|
| Background layar | `#0B1220` |
| Surface (kartu, input, baris) | `#111C2E` |
| Border | `#1E293B` |
| Teks utama | `#F1F5F9` |
| Teks sekunder | `#8595AB` |
| Aksen (tombol, counter) | `#2563EB` / `#60A5FA` |
| Status selesai | teks `#4ADE80` di atas `#052E16` |
| Status proses | teks `#FB923C` di atas `#431407` |

`app.json` juga di-set `"userInterfaceStyle": "dark"` supaya dialog sistem,
keyboard, dan status bar ikut gelap.

## Mengganti Data

Sesi kuliah ada di `App.tsx` (tiga blok `<InfoCard>`).
Data mahasiswa ada di satu tempat: `src/data/mahasiswa.ts`.

```ts
export const DAFTAR_MAHASISWA: Mahasiswa[] = [
  { id: '1', nama: 'Nama Kamu', prodi: 'Teknologi Informasi' },
  // ...
];
```

## Verifikasi

```bash
npx tsc --noEmit                      # typecheck — lolos tanpa error
npx expo-doctor                       # 20/20 checks passed
npx expo export --platform android    # bundle — tanpa error
```
