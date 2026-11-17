import { Router, Response } from 'express';
import { authenticate, AuthRequest, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Mendapatkan data sprint yang sedang aktif
router.get('/active', authenticate, async (_req: AuthRequest, res: Response): Promise<void> => {
  // TODO (Dev): Ambil sprint aktif via prisma.sprint.findFirst({ where: { isActive: true } })
  res.json({
    message: '[Template] Sprint aktif',
    sprint: null,
  });
});

// FR-15: Data grafik Burndown Chart untuk sprint aktif
router.get('/:id/burndown', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  // TODO (Dev): Hitung total bobot/tugas dan sisa tugas per hari untuk Burndown Chart
  res.json({
    message: `[Template] Data Burndown Chart sprint ${id}`,
    sprintId: id,
    points: [],
  });
});

// FR-16: Ringkasan performa sprint selesai (jumlah tugas selesai, tertunda, kinerja divisi)
router.get('/:id/report', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  // TODO (Dev): Agregasi total tugas selesai, pending, dan metrik performa divisi
  res.json({
    message: `[Template] Laporan performa sprint ${id}`,
    summary: {
      totalDone: 0,
      totalPending: 0,
      divisionPerformance: {},
    },
  });
});

export const sprintRoutes = router;
