import { Router, Request, Response } from 'express';
import { authenticate, AuthRequest } from '../middlewares/auth.middleware.js';

const router = Router();

// FR-01: Masuk dengan kredensial & peran (GM, Staff Ahli, Staff) serta divisi
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // TODO (Dev): Validasi email dan password menggunakan bcryptjs
  // TODO (Dev): Generate JWT token dengan payload { id, email, role, division }
  res.json({
    message: '[Template] Endpoint login',
    token: 'jwt-token-placeholder',
  });
});

// FR-01 & FR-02: Registrasi dengan nomor WhatsApp aktif
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, role, division } = req.body;

  // TODO (Dev): Validasi input unik email & nomor WhatsApp (FR-02)
  // TODO (Dev): Hash password menggunakan bcryptjs
  // TODO (Dev): Simpan pengguna ke database via prisma.user.create
  res.status(201).json({
    message: '[Template] Endpoint registrasi',
    user: { name, email, phone, role, division },
  });
});

// Profil pengguna saat ini
router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  // TODO (Dev): Ambil detail profil pengguna berdasarkan req.user.id
  res.json({
    message: '[Template] Profil pengguna',
    user: req.user,
  });
});

export const authRoutes = router;
