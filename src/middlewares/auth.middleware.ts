import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'GM' | 'STAFF_AHLI' | 'STAFF';
  division: 'MEKANIK' | 'ELEKTRIK' | 'PEMROGRAMAN';
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Akses ditolak: Token tidak ditemukan' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Akses ditolak: Token tidak valid atau kedaluwarsa' });
  }
}

export function requireRole(...allowedRoles: Array<'GM' | 'STAFF_AHLI' | 'STAFF'>) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Akses ditolak: Peran Anda tidak memiliki izin untuk aksi ini' });
      return;
    }
    next();
  };
}

// Middleware validasi internal key untuk request dari WhatsApp Bot
export function requireBotApiKey(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.headers['x-bot-api-key'] || req.headers['authorization'];
  if (!apiKey || apiKey !== config.botApiKey && apiKey !== `Bearer ${config.botApiKey}`) {
    res.status(401).json({ message: 'Akses bot tidak valid' });
    return;
  }
  next();
}
