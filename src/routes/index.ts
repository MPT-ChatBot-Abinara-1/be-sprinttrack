import { Router } from 'express';
import { authRoutes } from './auth.routes.js';
import { taskRoutes } from './task.routes.js';
import { sprintRoutes } from './sprint.routes.js';
import { botRoutes } from './bot.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/sprints', sprintRoutes);
router.use('/bot', botRoutes);

export const appRouter = router;
