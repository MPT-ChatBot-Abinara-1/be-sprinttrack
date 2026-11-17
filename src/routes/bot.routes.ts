import { Router, Request, Response } from 'express';
import { requireBotApiKey } from '../middlewares/auth.middleware.js';
import { emitTaskStatusUpdated } from '../lib/socket.js';

const router = Router();

// Semua endpoint di bawah dilindungi oleh Bot API Key
router.use(requireBotApiKey);

// FR-02: Cari profil pengguna berdasarkan nomor WhatsApp
router.get('/users/by-phone/:phone', async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;

  // TODO (Dev): Query pengguna berdasarkan nomor HP via prisma.user.findUnique({ where: { phone } })
  res.json({
    message: `[Template] Cari pengguna dengan no WhatsApp ${phone}`,
    user: null,
  });
});

// FR-14 & NFR-2: Validasi kepemilikan tugas sebelum bot memproses perintah update/log
router.post('/tasks/verify-ownership', async (req: Request, res: Response): Promise<void> => {
  const { taskId, senderPhone } = req.body;

  // TODO (Dev): Cari user berdasarkan senderPhone
  // TODO (Dev): Cari task berdasarkan taskId
  // TODO (Dev): Pastikan task.assigneeId === user.id
  res.json({
    isOwner: false,
    message: '[Template] Validasi kepemilikan tugas',
    taskId,
    senderPhone,
  });
});

// FR-14 & FR-07: Pembaruan status tugas via WhatsApp Bot (otomatis memicu update realtime Kanban)
router.patch('/tasks/:id/status', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status, updatedByPhone } = req.body;

  // TODO (Dev): Validasi kepemilikan
  // TODO (Dev): Update status tugas via prisma.task.update
  // FR-07: Broadcast pembaruan kartu pada dashboard secara real-time (maksimal 5 detik)
  emitTaskStatusUpdated({ taskId: id, status, updatedBy: updatedByPhone });

  res.json({
    success: true,
    message: `[Template] Status tugas ${id} diperbarui via bot`,
    taskId: id,
    status,
  });
});

// FR-14: Pencatatan log aktivitas dari chat WhatsApp Bot
router.post('/tasks/:id/logs', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { message, authorPhone } = req.body;

  // TODO (Dev): Simpan log aktivitas via prisma.activityLog.create
  res.status(201).json({
    success: true,
    message: `[Template] Log aktivitas tugas ${id} dicatat via bot`,
    log: { taskId: id, message, authorPhone },
  });
});

// FR-13: Ambil daftar tugas yang mendekati batas deadline (sisa <= 24 jam)
router.get('/tasks/approaching-deadline', async (req: Request, res: Response): Promise<void> => {
  const hours = Number(req.query.hours) || 24;

  // TODO (Dev): Cari tugas yang deadline-nya antara NOW s.d. NOW + hours dan status belum DONE
  res.json({
    message: `[Template] Tugas mendekati deadline (${hours} jam)`,
    tasks: [],
  });
});

// FR-13: Ambil daftar pengguna sprint aktif untuk pengingat Daily Standup
router.get('/users/active-sprint', async (_req: Request, res: Response): Promise<void> => {
  // TODO (Dev): Ambil pengguna yang terdaftar di sprint yang sedang berjalan
  res.json({
    message: '[Template] Pengguna aktif sprint untuk standup',
    users: [],
  });
});

export const botRoutes = router;
