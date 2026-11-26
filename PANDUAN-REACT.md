# Aplikasi Lahan — React + Tailwind + Express/MySQL

Versi baru dari template FreeDash yang **tampilannya tetap sama**, hanya teknologinya yang diganti:

- Tampilan: React + Tailwind CSS (utility Tailwind murni, tanpa Bootstrap/jQuery)
- Backend: Node.js + Express + MySQL
- Bahasa teks UI: Bahasa Indonesia
- Halaman yang dibuat: **Dasbor** dan **Masuk** (landing page dihapus sesuai permintaan)

Folder lama `src/` (template Bootstrap asli) sudah dihapus. `package.zip` masih disimpan sebagai arsip referensi.
File gambar asli sudah disalin ke `frontend/public/images/`.

## 0. Cara paling singkat (dari root)

Dari folder utama proyek, jalankan:

```bash
npm install:all   # hanya perlu sekali, kalau node_modules belum ada
npm run dev       # menyalakan backend :5000 dan frontend :5173 sekaligus
```

Tekan `Ctrl+C` untuk menghentikan keduanya. Kalau ingin menjalankan satu per satu, ikuti bagian 1 dan 2 di bawah.

Catatan PowerShell: kalau muncul error `npm.ps1 cannot be loaded because running scripts is disabled`, pakai `npm.cmd run dev` (atau `npm.cmd install:all`). Alternatif permanen: jalankan `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` sekali, lalu `npm run dev` seperti biasa.

## 1. Menjalankan Frontend

```bash
cd frontend
npm install
npm run dev
```

Buka http://localhost:5173. Halaman awal akan mengarah ke `/login`.

Akun demo (tanpa MySQL pun bisa masuk): **admin** / **admin123**.

Build produksi:

```bash
npm run build
npm run preview
```

## 2. Menjalankan Backend (Express + MySQL)

```bash
cd backend
copy .env.example .env
npm install
```

Isi `.env` sesuai MySQL Anda, lalu siapkan tabel dan data awal:

```bash
mysql -u root -p < schema.sql      # jalankan dari folder backend
npm run seed                       # isi akun admin + data dasbor
npm run dev                        # http://localhost:5000
```

Kalau `DB_HOST` dikosongkan, backend berjalan dalam **mode demo** (tetap merespons endpoint dengan data statis).

Endpoint yang tersedia:

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| GET | `/api/health` | Status server dan database |
| POST | `/api/auth/login` | Masuk, mengembalikan JWT |
| GET | `/api/auth/me` | Data akun (butuh Bearer token) |
| GET | `/api/dashboard/stats` | Angka kartu dasbor |
| GET | `/api/dashboard/leaders` | Data tabel pemimpin |

Frontend sudah memakai proxy Vite `/api → http://localhost:5000`. Untuk memakai alamat lain, isi `frontend/.env` dengan `VITE_API_URL=https://alamat-backend`.

## 3. Struktur

```
frontend/
  src/
    components/  Sidebar, Topbar, ikon Feather, grafik SVG
    pages/       Dashboard.jsx, Login.jsx
    lib/api.js   pemanggil API + JWT
    index.css    tema Tailwind (warna/font template lama)
  public/images/ aset gambar dari package.zip
backend/
  server.js      route Express
  db.js          koneksi pool MySQL
  schema.sql     struktur database
  seed.js        data awal
```

Catatan: grafik donut/batang/garis/peta dibuat dengan SVG agar tidak memakai jQuery/c3/Chartist, sementara warna, jarak, font, dan susunan elemen mengikuti template lama.
