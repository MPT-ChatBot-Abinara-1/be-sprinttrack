# be-sprinttrack

Backend REST API & Real-time Service untuk **SprintTrack Abinara-1** (Tim Robotik Abinara ITS) menggunakan **Node.js, Express, TypeScript, Socket.io, dan Prisma ORM (PostgreSQL)**.

Template ini menyediakan struktur endpoint, skema database hierarkis Prisma, middleware autentikasi/RBAC, dan broadcast WebSocket sesuai **PRD Baseline Sprint 1** tanpa memuat logika bisnis rumit sehingga developer siap melanjutkan implementasinya.

---

## 🎯 Pemetaan Arsitektur ke PRD

| Kebutuhan PRD | Deskripsi | Letak File Template |
|---|---|---|
| **FR-01 & FR-02** | Autentikasi pengguna, peran (GM, Staff Ahli, Staff), divisi, & nomor WhatsApp | `prisma/schema.prisma`<br>`src/routes/auth.routes.ts`<br>`src/middlewares/auth.middleware.ts` |
| **FR-03 & FR-05** | Manajemen pembuatan tugas, atribut prioritas, & validasi deadline | `src/routes/task.routes.ts` |
| **FR-06 & FR-08** | Papan Kanban 4 kolom (To Do, In Progress, Review, Done) & filter divisi | `src/routes/task.routes.ts` (`GET /tasks`) |
| **FR-07** | Sinkronisasi perubahan status kartu Kanban real-time via WebSocket (<= 5 detik) | `src/lib/socket.ts`<br>`src/routes/task.routes.ts` |
| **FR-10 & NFR-2** | Akses terbatas: Staff hanya dapat mengubah tugas milik sendiri (*ownership check*) | `src/middlewares/auth.middleware.ts`<br>`src/routes/task.routes.ts` |
| **FR-11** | Alur review hasil kerja oleh Staff Ahli (Approve ke Done / Reject dengan catatan revisi) | `src/routes/task.routes.ts` (`POST /tasks/:id/review`) |
| **FR-13 & FR-14** | Endpoint integrasi WhatsApp Bot (validasi kepemilikan, update status, catat log) | `src/routes/bot.routes.ts` |
| **FR-15 & FR-16** | Data analitik sprint (Burndown Chart & ringkasan performa) | `src/routes/sprint.routes.ts` |

---

## 📁 Struktur Direktori

```text
be-sprinttrack/
├── .env.example               # Contoh variabel environment
├── .gitignore                 # Konfigurasi ignore git
├── package.json               # Dependensi & skrip npm
├── tsconfig.json              # Konfigurasi TypeScript
├── README.md                  # Panduan proyek
├── prisma/
│   └── schema.prisma          # Skema model Prisma (Sprint, Story, Task, User, dll)
└── src/
    ├── index.ts               # Inisialisasi Express & Server Socket.io
    ├── config/
    │   └── env.ts             # Parsing konfigurasi environment
    ├── lib/
    │   ├── prisma.ts          # Prisma Client instance
    │   └── socket.ts          # Inisialisasi & helper broadcast Socket.io
    ├── middlewares/
    │   └── auth.middleware.ts # JWT verification, RBAC role guard, & Bot API Key guard
    └── routes/
        ├── index.ts           # Router utama (/api/v1)
        ├── auth.routes.ts     # Endpoint login, registrasi, & profil (FR-01/02)
        ├── task.routes.ts     # Endpoint Kanban, status update, review, & log (FR-03/06/07/11)
        ├── bot.routes.ts      # Endpoint khusus integrasi WhatsApp Bot (FR-13/14)
        └── sprint.routes.ts   # Endpoint analitik Burndown & laporan sprint (FR-15/16)
```

---

## 🚀 Cara Menjalankan

### 1. Salin Environment
```bash
cp .env.example .env
```
Sesuaikan `DATABASE_URL` ke database PostgreSQL lokal atau Cloud Anda.

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Generate Prisma Client & Jalankan Migrasi
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Jalankan Server Mode Pengembangan
```bash
npm run dev
```
Server akan berjalan di `http://localhost:4000` dengan WebSocket aktif.

Backend REST API & Real-time Service untuk **SprintTrack Abinara-1** (Tim Robotik Abinara ITS) menggunakan **Node.js, Express, TypeScript, Socket.io, dan Prisma ORM (PostgreSQL)**.

Template ini menyediakan struktur endpoint, skema database hierarkis Prisma, middleware autentikasi/RBAC, dan broadcast WebSocket sesuai **PRD Baseline Sprint 1** tanpa memuat logika bisnis rumit sehingga developer siap melanjutkan implementasinya.

---

## 🎯 Pemetaan Arsitektur ke PRD

| Kebutuhan PRD | Deskripsi | Letak File Template |
|---|---|---|
| **FR-01 & FR-02** | Autentikasi pengguna, peran (GM, Staff Ahli, Staff), divisi, & nomor WhatsApp | `prisma/schema.prisma`<br>`src/routes/auth.routes.ts`<br>`src/middlewares/auth.middleware.ts` |
| **FR-03 & FR-05** | Manajemen pembuatan tugas, atribut prioritas, & validasi deadline | `src/routes/task.routes.ts` |
| **FR-06 & FR-08** | Papan Kanban 4 kolom (To Do, In Progress, Review, Done) & filter divisi | `src/routes/task.routes.ts` (`GET /tasks`) |
| **FR-07** | Sinkronisasi perubahan status kartu Kanban real-time via WebSocket (<= 5 detik) | `src/lib/socket.ts`<br>`src/routes/task.routes.ts` |
| **FR-10 & NFR-2** | Akses terbatas: Staff hanya dapat mengubah tugas milik sendiri (*ownership check*) | `src/middlewares/auth.middleware.ts`<br>`src/routes/task.routes.ts` |
| **FR-11** | Alur review hasil kerja oleh Staff Ahli (Approve ke Done / Reject dengan catatan revisi) | `src/routes/task.routes.ts` (`POST /tasks/:id/review`) |
| **FR-13 & FR-14** | Endpoint integrasi WhatsApp Bot (validasi kepemilikan, update status, catat log) | `src/routes/bot.routes.ts` |
| **FR-15 & FR-16** | Data analitik sprint (Burndown Chart & ringkasan performa) | `src/routes/sprint.routes.ts` |

---

## 📁 Struktur Direktori

```text
be-sprinttrack/
├── .env.example               # Contoh variabel environment
├── .gitignore                 # Konfigurasi ignore git
├── package.json               # Dependensi & skrip npm
├── tsconfig.json              # Konfigurasi TypeScript
├── README.md                  # Panduan proyek
├── prisma/
│   └── schema.prisma          # Skema model Prisma (Sprint, Story, Task, User, dll)
└── src/
    ├── index.ts               # Inisialisasi Express & Server Socket.io
    ├── config/
    │   └── env.ts             # Parsing konfigurasi environment
    ├── lib/
    │   ├── prisma.ts          # Prisma Client instance
    │   └── socket.ts          # Inisialisasi & helper broadcast Socket.io
    ├── middlewares/
    │   └── auth.middleware.ts # JWT verification, RBAC role guard, & Bot API Key guard
    └── routes/
        ├── index.ts           # Router utama (/api/v1)
        ├── auth.routes.ts     # Endpoint login, registrasi, & profil (FR-01/02)
        ├── task.routes.ts     # Endpoint Kanban, status update, review, & log (FR-03/06/07/11)
        ├── bot.routes.ts      # Endpoint khusus integrasi WhatsApp Bot (FR-13/14)
        └── sprint.routes.ts   # Endpoint analitik Burndown & laporan sprint (FR-15/16)
```

---

## 🚀 Cara Menjalankan

### 1. Salin Environment
```bash
cp .env.example .env
```
Sesuaikan `DATABASE_URL` ke database PostgreSQL lokal atau Cloud Anda.

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Generate Prisma Client & Jalankan Migrasi
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Jalankan Server Mode Pengembangan
```bash
npm run dev
```
Server akan berjalan di `http://localhost:4000` dengan WebSocket aktif.
