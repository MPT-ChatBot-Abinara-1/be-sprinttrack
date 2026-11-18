# be-sprinttrack

Layanan Backend REST API dan WebSocket real-time untuk sistem manajemen sprint **SprintTrack Abinara-1** (Tim Robotik Abinara ITS). Repositori ini menyediakan kerangka server berbasis Express, TypeScript, Socket.io, dan Prisma ORM (PostgreSQL), lengkap dengan skema relasional database, middleware autentikasi JWT, kontrol akses berbasis peran (RBAC), serta endpoint integrasi untuk klien web dan WhatsApp Bot.

## Prasyarat

- Node.js v18 atau lebih baru
- npm v9 atau lebih baru
- PostgreSQL (lokal atau layanan cloud)

## Teknologi Utama

- Node.js & TypeScript
- Express
- Prisma ORM & PostgreSQL
- Socket.io
- JSON Web Token (JWT) & bcryptjs

## Instalasi dan Menjalankan Proyek

1. Clone repositori ini:

   ```bash
   git clone https://github.com/MPT-ChatBot-Abinara-1/be-sprinttrack.git
   cd be-sprinttrack
   ```

2. Pasang seluruh dependensi:

   ```bash
   npm install
   ```

3. Salin file konfigurasi environment dan sesuaikan nilainya:

   ```bash
   cp .env.example .env
   ```

   Untuk Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   Sesuaikan nilai `DATABASE_URL`, `JWT_SECRET`, `BOT_API_KEY`, dan `CLIENT_ORIGIN` pada file `.env`.

4. Generate Prisma Client dan jalankan migrasi database:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. Jalankan server dalam mode pengembangan:

   ```bash
   npm run dev
   ```

   Server API dan WebSocket akan berjalan secara default di `http://localhost:4000`. Endpoint health check tersedia di `GET /health`.

6. Untuk membangun dan menjalankan versi produksi:

   ```bash
   npm run build
   npm run start
   ```

## Struktur Proyek

```text
be-sprinttrack/
├── .env.example                 # Contoh konfigurasi variabel environment
├── .gitignore                   # Daftar file dan direktori yang diabaikan Git
├── package.json                 # Metadata proyek, dependensi, dan skrip npm
├── tsconfig.json                # Konfigurasi compiler TypeScript
├── README.md                    # Dokumentasi proyek
├── prisma/
│   └── schema.prisma            # Definisi skema model database PostgreSQL
└── src/
    ├── index.ts                 # Entry point server Express dan inisialisasi Socket.io
    ├── config/
    │   └── env.ts               # Pembaca konfigurasi environment (.env)
    ├── lib/
    │   ├── prisma.ts            # Instance Prisma Client
    │   └── socket.ts            # Inisialisasi server dan helper broadcast Socket.io
    ├── middlewares/
    │   └── auth.middleware.ts   # Validasi token JWT, guard RBAC, dan Bot API Key
    └── routes/
        ├── index.ts             # Router utama API (/api/v1)
        ├── auth.routes.ts       # Endpoint autentikasi dan profil pengguna
        ├── task.routes.ts       # Endpoint pengelolaan tugas, status Kanban, review, dan log
        ├── sprint.routes.ts     # Endpoint data sprint aktif, burndown, dan laporan performa
        └── bot.routes.ts        # Endpoint khusus integrasi layanan WhatsApp Bot
```

## Skrip Tersedia

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan dengan hot-reload menggunakan `tsx` |
| `npm run build` | Mengompilasi TypeScript ke JavaScript di direktori `dist/` |
| `npm run start` | Menjalankan hasil build produksi dari `dist/index.js` |
| `npm run typecheck` | Memeriksa validitas tipe TypeScript tanpa menghasilkan file output |
| `npm run prisma:generate` | Menghasilkan Prisma Client berdasarkan `prisma/schema.prisma` |
| `npm run prisma:migrate` | Menjalankan migrasi skema Prisma ke database PostgreSQL |
