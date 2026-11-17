import { Router, Response } from 'express';
import { authenticate, AuthRequest, requireRole } from '../middlewares/auth.middleware.js';
import { emitTaskStatusUpdated } from '../lib/socket.js';

const router = Router();

// FR-06 & FR-08: Mendapatkan daftar tugas Kanban dengan filter divisi
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { division, sprintId } = req.query;

  // TODO (Dev): Query tasks dari database via prisma.task.findMany
  // TODO (Dev): Kelompokkan per status: TODO, IN_PROGRESS, REVIEW, DONE
  res.json({
    message: '[Template] Daftar tugas Kanban',
    filters: { division, sprintId },
    data: [],
  });
});

// FR-03 & FR-05: Pembuatan tugas baru dengan validasi deadline
router.post(
  '/',
  authenticate,
  requireRole('GM', 'STAFF_AHLI'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { storyId, title, description, priority, deadline, division, assigneeId } = req.body;

    // TODO (Dev): Validasi kolom wajib (FR-03)
    // TODO (Dev): Validasi deadline tidak boleh masa lalu & tidak melebihi deadline User Story induk (FR-05)
    // TODO (Dev): Simpan task ke database via prisma.task.create
    res.status(201).json({
      message: '[Template] Tugas berhasil dibuat',
      task: { storyId, title, priority, deadline, division, assigneeId },
    });
  }
);

// FR-09: Detail tugas, spesifikasi, dan lampiran
router.get('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  // TODO (Dev): Ambil detail task beserta relation logs, story, assignee, reviews via prisma.task.findUnique
  res.json({
    message: `[Template] Detail tugas ${id}`,
    taskId: id,
  });
});

// FR-07 & FR-10: Pembaruan status tugas oleh Staff (dengan ownership check)
router.patch('/:id/status', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  // TODO (Dev): Validasi kepemilikan: jika role STAFF, pastikan task.assigneeId === req.user.id (FR-10)
  // TODO (Dev): Update status tugas di prisma.task.update
  // FR-07: Broadcast pembaruan posisi kartu Kanban secara real-time via WebSocket (maksimal 5 detik)
  emitTaskStatusUpdated({ taskId: id, status });

  res.json({
    message: `[Template] Status tugas ${id} diperbarui menjadi ${status}`,
    taskId: id,
    status,
  });
});

// FR-11: Alur review tugas oleh Staff Ahli (Approve / Reject)
router.post(
  '/:id/review',
  authenticate,
  requireRole('STAFF_AHLI', 'GM'),
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { decision, revisionNote } = req.body; // decision: 'APPROVED' | 'REJECTED'

    // TODO (Dev): Jika decision === 'REJECTED', pastikan revisionNote diisi wajib (FR-11)
    // TODO (Dev): Jika APPROVED ubah task status ke 'DONE', jika REJECTED kembalikan ke 'IN_PROGRESS'
    // TODO (Dev): Simpan riwayat review ke prisma.taskReview.create
    // TODO (Dev): Broadcast WebSocket event (FR-07)
    res.json({
      message: `[Template] Review tugas ${id} dicatat: ${decision}`,
      decision,
      revisionNote,
    });
  }
);

// FR-10: Mencatat log aktivitas tugas beserta timestamp
router.post('/:id/logs', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { message } = req.body;

  // TODO (Dev): Validasi kepemilikan task jika role STAFF
  // TODO (Dev): Simpan log aktivitas ke prisma.activityLog.create
  res.status(201).json({
    message: `[Template] Log aktivitas berhasil ditambahkan pada tugas ${id}`,
    log: { taskId: id, userId: req.user?.id, message },
  });
});

export const taskRoutes = router;
