import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { config } from '../config/env.js';

let io: Server | null = null;

export function initSocket(server: HttpServer): Server {
  io = new Server(server, {
    cors: {
      origin: config.clientOrigin,
      methods: ['GET', 'POST', 'PATCH'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.io has not been initialized');
  }
  return io;
}

// FR-07: Broadcast pembaruan kartu pada dashboard Kanban (maksimal 5 detik)
export function emitTaskStatusUpdated(task: unknown): void {
  if (io) {
    io.emit('task:updated', task);
  }
}
