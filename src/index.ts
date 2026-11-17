import http from 'http';
import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { initSocket } from './lib/socket.js';
import { appRouter } from './routes/index.js';

const app: Express = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: config.clientOrigin }));
app.use(express.json());

// Socket.io initialization for real-time Kanban sync (FR-07)
initSocket(server);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1', appRouter);

server.listen(config.port, () => {
  console.log(`🚀 SprintTrack Backend API running on port ${config.port}`);
  console.log(`🔌 WebSocket server active for real-time Kanban updates`);
});
